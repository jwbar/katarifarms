require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./User');
const Harvest = require("./Harvest");
const DeliveryDataset = require('./DeliveryDataset');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');  // Import SendGrid mail library

const app = express();
const port = 5000;


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Invoke the cors middleware
app.use((req, res, next) => {
    res.cookie('name', 'value', { sameSite: 'strict' });
    next();
});


// Setup SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
    const msg = {
        to: to,
        from: process.env.EMAIL,   // Your SendGrid email, or a verified sender
        subject: subject,
        text: text
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/katariUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully connected to MongoDB");
    }
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




app.post('/api/create', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
        await newUser.save();

          // Send confirmation email to the new user
    await sendEmail(req.body.email, 'Welcome to your Microgreens Subscription', 'Thank you for registering for your Micogreens Subscriptions: you can log in to your Subscriptions management account and finish adding your account details and finalize payments here https://katari.farm/user');

    // Send notification email to yourself
    await sendEmail('fresh@katari.farm', 'New User Signup Notification', `A new user has signed up with the email: ${req.body.email} and username: ${req.body.username}`);

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

    // Send confirmation email
    await sendEmail('fresh@katari.farm', `${req.body.username} update`, `${req.body.username} updated their profile`);

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

    await sendEmail("fresh@katari.farm", `${req.body.username} Paid for a new Month Subscription`, `${req.body.username} Paid for a new month`);
    console.log("Response from SendGrid:", response);

    res.status(200).send('Email sent successfully.');
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


///Dispatching!
// ...

app.get('/api/datasets', async (req, res) => {
    try {
        // Get the current day of the week
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const currentDay = daysOfWeek[today.getDay()];

        const datasets = await User.find({ 
            deliveryDay: currentDay, 
            subscriptionActive: 'Yes' 
        });

        if (!datasets || datasets.length === 0) {
            return res.status(404).json({ success: false, message: `No datasets found for ${currentDay} with active subscription` });
        }

        res.status(200).json({ success: true, datasets });
    } catch (error) {
        console.error('Error fetching datasets:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.put('/api/datasets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { subscriptionStatus } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.subscriptionStatus = subscriptionStatus;
        await user.save();

        res.status(200).json({ success: true, message: 'Updated successfully' });

    } catch (error) {
        console.error('Error updating dataset:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
// The "catchall" handler: for any request that doesn't match a route above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// ...
app.post('/api/save-delivery-dataset', async (req, res) => {
    const data = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ success: false, message: 'Data is required and should be an array' });
    }

    try {
        const savedDatasets = await DeliveryDataset.insertMany(data);
        res.status(201).json({ success: true, message: 'Datasets saved successfully', datasets: savedDatasets });
    } catch (error) {
        console.error('Error saving dataset:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
    console.log("Received data:", req.body);
});

// This is just a simplified version, adjust it to your needs
app.get('/api/get-delivery-by-date/:date', async (req, res) => {
    const date = req.params.date;
    try {
        const datasets = await DeliveryDataset.find({ tourDate: date });
        res.status(200).json({ success: true, datasets });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});
