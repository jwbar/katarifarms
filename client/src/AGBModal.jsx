import AGB  from './agb';
import PropTypes from 'prop-types';
import './css/agb.css';

const AgbModal = ({ isOpen, onClose }) => {

  document.body.classList.remove('modal-open');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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

