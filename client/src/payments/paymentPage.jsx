import "./payments.css";
import PaypalPayment from './paypalModal.jsx';
import PropTypes from 'prop-types';


const PaymentsPage = ({ isOpen, onClose, orderAmount }) => {

  const totalAmount = orderAmount * 25; 
        
    const openCirlcesMarkt = (url) => {
        window.open(url, '_blank'); // Opens the URL in a new tab/window
      };  

        if (!isOpen) return null;
      

  return (
    <div>
    <br></br>
     <span className="profileMessegePayments">If you are part of the Circles UBI community you can get your month voucher from the marketplace: </span>
        <br></br>
        <button className="CRC-button"  onClick={() => openCirlcesMarkt('https://market.joincircles.net/en/articles/microgreens-mix')}>Pay with Circles</button>
        <br></br>
        <span className="profileMessegePayments">Otherwise just send us {totalAmount} Euros:</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}> X </a>
        <PaypalPayment payAmount={totalAmount}/>
      
     
    </div>
  );
};
PaymentsPage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderAmount: PropTypes.string,
};

export default PaymentsPage;
