import PropTypes from 'prop-types';

const StripePayment = ({ onSuccess, onError }) => {
  const handlePayment = async () => {
    try {
      // Simulate a payment error
      throw new Error('Payment failed');
      
      // Simulate a successful payment
      const paymentDetails = {
        transactionId: '123456',
        amount: 25,
        currency: 'EUR',
      };
      
      // Call the onSuccess function with the payment details
      onSuccess(paymentDetails);
    } catch (error) {
      // Call the onError function with the error
      onError(error);
    }
  };

  return (
    <fieldset>
      <legend>Make a Payment</legend>
      {/* Other payment form elements */}
      <button onClick={handlePayment}>Pay €25</button>
    </fieldset>
  );
};

StripePayment.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default StripePayment;
