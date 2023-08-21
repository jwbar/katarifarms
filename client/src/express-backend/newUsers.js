import express  from 'express';
import mongoose  from 'mongoose';
import bodyParser from 'body-parser';
import { string } from 'prop-types';

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/katarifarms-users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema and model
const registrationSchema = new mongoose.Schema({
  // Define your registration fields here
  user: String,
  email: string,
  password: String,
  firstname: String,
  lastname: String,
  telephone: String,
  telegram: String,
  crcWallet: String,
  address: String,
  deliveryInfo: String,
  deliveryDate: String,
  numberOfDeliveries: Number,
  subscriptionStatus: Boolean,
  registrationDate: Date,
  lastPaymentDate: Date,
  VerificationStatus: Boolean,


  // ...
});

const Registration = mongoose.model('Registration', registrationSchema);

// Create a registration route
app.post('/register', async (req, res) => {
  try {
    // Create a new registration entry
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
