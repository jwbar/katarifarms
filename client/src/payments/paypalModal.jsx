import "./payments.css";
import axios from 'axios'; // if you're using axios for API calls
import PayPalButton from './paypalButton';

const PaypalPayment = ({ payAmount }) => {

  const handlePaymentSuccess = async (paymentDetails) => {
    console.log('Payment successful:', paymentDetails);

    // 1. Send an email to notify about successful payment
    try {
      await axios.post('/api/sendPaymentEmail', {
        subject: 'Payment successful',
        body: `Payment of amount ${paymentDetails.amount} was successful!`,
        // ... any other email details
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    // 2. Update the user's details in the database
    const dateNow = new Date().toISOString(); // ISO string format of current date
    try {
      await axios.put('/api/updateUserDetails', {
        subscriptionStatus: 4,
        lastPaymentOn: dateNow,
        // ... user identifier to update the right record
      });
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  return (
    <fieldset>
      <legend>PayPal Payment</legend>
    
      <PayPalButton
        amount={payAmount}  // Use the calculated totalAmount here
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </fieldset>
  );
};

export default PaypalPayment;
