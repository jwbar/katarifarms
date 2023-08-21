import  { useState } from 'react';

import  Radishsketch1 from '../../src/assets/radish-sketch1.png'
import RegistrationForm from './RegistrationForm';
import  '../css/App.css';
import LoginModal from '../LoginModal';

const Suscribe= () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
const handleLoginClick = () => {
  setIsModalOpen(true);
  document.body.classList.add('modal-open');
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  document.body.classList.remove('modal-open');
};

return(
<>  
<br/>
<h2>Suscribe</h2>
<div className="signup-form">
<br/>
      <div className="login-image">
      <div className="imageFrame">
      <img src={Radishsketch1} alt="Login" className='Radishsketch1'  />
      </div> 
      <div> Already Joined? <br />  
  <button onClick={handleLoginClick}>Login</button>
  <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
  </div>
      </div>
      <RegistrationForm />
    </div>
    </>

);

};
export default Suscribe