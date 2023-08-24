import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; // Import the useHistory hook if you're using react-router


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      navigate('/user');
    }
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make a POST request to the Express API for user authentication
      const response = await axios.post('/api/login', {
        username: formData.username,
        password: formData.password,
      });
  
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        // Check the user role and navigate accordingly
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
        
      } else {
        alert(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Login failed due to an error.');
    }
  };
  
  document.body.classList.add('modal-open');

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content"> 
      <a href='./'>X</a>
    <form className="login-form" onSubmit={handleSubmit}>
      Username:
      <br />
      <input type="text" name="username" className='formField' placeholder="Username" onChange={handleChange} />
      <br />
      Password:
      <br />
      <input type={showPassword ? "text" : "password"} className='formField' name="password" placeholder="Password" onChange={handleChange} />
      <br />
        <label><input type="checkbox"  className='showPassword' onChange={togglePasswordVisibility}/><span className='showPassword'> ShowPassword</span> </label>
        <br/>
      <div>
        <a href="/forgot-password">Forgot Password?</a>
      </div>
      <button type="submit">Login</button>
    </form>
    </div>
    </div>

  );
};

export default LoginForm;
