import LoginForm from './LoginForm.jsx';
import PropTypes from 'prop-types';
import './css/modal.css';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button  onClick={onClose}>X</button> {/* Changed to a button for better semantics */}
        <LoginForm />
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;

// For Login Modal (cleaned up the comment)
// import LoginModal from './LoginModal'; <--- move to import section
// 
// const [isModalOpen, setIsModalOpen] = useState(false);
// const handleLoginClick = () => {
//   setIsModalOpen(true);
// };
//
// const handleCloseModal = () => {
//   setIsModalOpen(false);
// };
