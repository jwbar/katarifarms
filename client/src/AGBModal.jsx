import AGB  from './agb.jsx';
import PropTypes from 'prop-types';
import './css/agb.css';

const AgbModal = ({ isOpen, onClose }) => {
  console.log("Props received by AgbModal:", { isOpen, onClose });
  
  document.body.classList.remove('modal-open');

  if (!isOpen) return null;

  return (
    <div className="agb-overlay">
      <div className="agb-content">
        {/* Changed to a button for better semantics */}
        <AGB />
        <button  onClick={onClose}>Close</button> 
      </div>
    </div>
  );
};

AgbModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AgbModal;

