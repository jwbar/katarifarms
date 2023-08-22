import { useNavigate } from 'react-router-dom';
import  Radishsketch1 from '../../src/assets/radish-sketch1.webp'
import RegistrationForm from './RegistrationForm.jsx';
import  '../css/App.css';

const Suscribe= () => {
 

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
  <button onClick={() => window.open('/login',"_self")}>Login</button>
  
  </div>
      </div>
      <RegistrationForm />
    </div>
    </>

);

};
export default Suscribe