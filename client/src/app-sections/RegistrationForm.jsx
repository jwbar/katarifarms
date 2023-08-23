import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReCAPTCHA from "react-google-recaptcha";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCaptchaChange = value => {
    setCaptchaValue(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setErrorMessage('Please confirm you are not a robot.');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const formattedDate = moment().format('DD.MM.YY');

      // Check if email or username is already taken
      const checkResponse = await axios.post('http://katari.farm:5173/api/check-existing', {
        email: formData.email,
        username: formData.username,
      });

      if (checkResponse.data.taken) {
        setErrorMessage('Email or username already taken');
        return;
      }

      // POST request to the API
      await axios.post('http://katari.farm:5173/api/create', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user',
        //extra stuff
        firstName: "firstname",
        lastName: "lastName",
        phone:  "phone number",
        telegram: "telegramNick",
        CrcWallet: "if you have one",
        address: "street and house number",
        plz: "your post code",
        deliveryInstructions: "tell us more about how to deliver your greens",
        deliveryDay: "Pick a day",
        subscriptionActive: false,
        subscriptionStatus: 0,
        amount: 1,
        subscriptionDate: formattedDate,
        authenticatedStatus: false,
        lastPaymentOn: "",

    });

      // Clear form fields and show success message
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setSuccessMessage('Registration successful!');

    } catch (error) {
      console.error('Error creating data:', error);
      setErrorMessage('Hmm Something went wrong.. send us an Email so we can figure out what happened!');
    }
  };

  return (
    <div className="registration-form">
      <strong className="subscribeHead">Join Us for Weekly Greens!</strong>
      <br />
      <span className="subscribeText">
        Sign up for our weekly subscription and get fresh microgreens delivered to your door, No commitments, pause or cancel at anytime!
      </span>
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          <input type="text" name="username" placeholder="User Name" className="formField" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          <input type="email" name="email" placeholder="Email" className="formField" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="formField" value={formData.password} onChange={handleChange} required />
          {/*<input type="password" name="password" placeholder="Password" className="formField" value={formData.password} onChange={handleChange} required /> */}
        </label>
        <br />
        <label>
          <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="formField" value={formData.confirmPassword} onChange={handleChange} required />
        </label>
        <br />
        <label><input type="checkbox"  className='showPassword' onChange={togglePasswordVisibility}/><span className='showPassword'> ShowPassword</span> </label>
        <br/>
        <div className="recaptcha-container">  
        <ReCAPTCHA sitekey="6LdvDcMnAAAAAMqbJQM0NN4l1vRtN8UAP_TJOeB_" onChange={handleCaptchaChange}/>
        </div>
        {!passwordsMatch && <p className='formMesseges' style={{ color: 'red' }}>Passwords do not match.</p>}
        {errorMessage && <p  className='formMesseges' style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
