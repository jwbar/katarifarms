require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./User');
const Harvest = require("./Harvest");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const app = express();
const port = 5173;


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't match a route above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.cookie('name', 'value', { sameSite: 'strict' });
    next();
});




// Connect to MongoDB
mongoose.connect('mongodb://142.132.239.181:27017/katariUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully connected to MongoDB");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/api/check-existing', async (req, res) => {
    const {email, username} = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.json({ taken: true });
        }

        return res.json({ taken: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});



let transporter = nodemailer.createTransport({
   host: 'katari.farm',
   port: 465,
   secure: true,
    auth: {
        user: process.env.EMAIL,  
        pass: process.env.EMAIL_PASSWORD   // Use your Gmail password. Ideally, use environment variables to store this
    }
});


app.post('/api/create', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
        await newUser.save();

        // Send confirmation email to the new user
        let userMailOptions = {
            from: 'fresh@katari.farm',
            to: req.body.email,
            subject: 'Welcome your Microgreens Subscription',
            text: 'Thank you for registering for your Micogreens Subscriptions: you can log in to your Subcriptions managment account and finish adding your account details and finalize payments here https://katari.farm/user ', 
        };
        await transporter.sendMail(userMailOptions);

        // Send notification email to yourself
        let adminMailOptions = {
            from: 'fresh@katari.farm',
            to: 'fresh@katari.farm',  // Your admin email here
            subject: 'New User Signup Notification',
            text: `A new user has signed up with the email: ${req.body.email} and username: ${req.body.username}`
        };
        await transporter.sendMail(adminMailOptions);

        console.log('User created and emails sent successfully');
        res.status(201).json({ success: true, user: newUser, message: 'Registration and emails sent successfully!' });
    } catch (error) {
        console.error('Error creating user or sending email:', error);
        res.status(500).send('Error creating user or sending email');
    }
});
app.post('/api/login', async (req, res) => {
    const { username, password: providedPassword } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(providedPassword, user.password);

        if (isPasswordValid) {
            return res.status(200).json({ success: true, user });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/api/user-details', async (req, res) => {
  const { username } = req.query;  // Extracting username from query parameters

  // Check if the username is provided
  if (!username) {
      return res.status(400).json({ success: false, message: 'Username required' });
  }

  try {
      // Find the user based on the username
      const user = await User.findOne({ username: username });

      // If user not found, return a 404 error
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // If you want to avoid sending the password (even if it's hashed) to the client
      // we can omit the password from the user object
      user.password = undefined;

      // Return the user details
      return res.status(200).json({ success: true, user });
  } catch (error) {
      // Handle any other errors, for example issues with MongoDB
      console.error('Error fetching user details:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const updateUserInDB = async (userData) => {
  try {
      const { username, ...updateFields } = userData;
      
      // Find the user by the username and update with the provided fields
      const updatedUser = await User.findOneAndUpdate(
          { username: username }, // Filter by username
          { $set: updateFields }, // Update the rest of the fields
          { new: true, runValidators: true } // Return the updated user and run schema validators
      );

      if (updatedUser) {
          console.log('User updated successfully:', updatedUser);
          return true;
      } else {
          console.log('Failed to update user. User not found.');
          return false;
      }
  } catch (error) {
      console.error('Error updating user:', error);
      return false;
  }
}

app.put('/api/update-user-details', async (req, res) => {
  const userData = req.body;

  if (!userData || !userData.username) {
      return res.json({ success: false, message: 'Username and user data required' });
  }

  const updateResult = await updateUserInDB(userData);

    // Send confirmation email to the new user
    let userMailOptions = {
        from: 'fresh@katari.farm',
        to: 'fresh@katari.farm',
        subject: `${req.body.username} update`,
        text: `${req.body.username} updated their profile`,
    }
    await transporter.sendMail(userMailOptions);
  if (updateResult) {
      res.json({ success: true, message: 'User updated successfully' });
  } else {
      res.json({ success: false, message: 'Failed to update user' });
  }
  
});

app.post('/api/sendPaymentEmail', async (req, res) => {
    const { subject, body } = req.body;

    if (!subject || !body) {
        return res.status(400).send('Both subject and body are required.');
    }

    try {
        let info = await transporter.sendMail({
            from: 'fresh@katari.farm',  // sender address
            to: "fresh@katari.farm",                 // list of receivers
            subject: `${req.body.username} Paid for a new Month Subscription`,
            text: bod`${req.body.username} Paid for a new month`,                                  // plain text body
            // html: "<b>Hello world?</b>"               // optional html body
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).send('Email sent successfully.');

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Internal server error.');
    }
});

app.post('/api/Harvest', async (req, res) => {
    try {
        const newHarvest = new Harvest({
            ...req.body,
        });
        await newHarvest.save();
        res.status(201).json({ message: "Harvest saved successfully!" });
    } catch (error) {
        console.error('Error saving harvest:', error);
        res.status(500).json({ message: 'Error saving harvest', error: error.message });
    }
});
