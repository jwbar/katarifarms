import "./payments.css";

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AYwcmLskRJPpT5XmgAoJrLIlfoiDc4SVdeqhtojzxwhtCVB-1YKfJxk-QN0ghzl5oz2Wmiyn3zGly82W", currency:"EUR" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          actions.order.capture().then((details) => {
            // Call the onSuccess callback with the payment details
            onSuccess(details);
          });
        }}
        onError={(err) => {
          // Call the onError callback with the error details
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;