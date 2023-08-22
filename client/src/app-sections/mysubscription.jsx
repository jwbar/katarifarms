import  { useState, useEffect } from 'react';
import '../css/user.css';
import '../css/App.css';
import { useNavigate } from 'react-router-dom'; // You'll need to import this for redirection
import axios from 'axios';
import PaymentsPage from "../payments/paymentPage.jsx"

const MySubscription = () => {

  const navigate = useNavigate();

  const initialProfile = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegram: '',
    CrcWallet: '',
    address: '',
    plz: '',
    deliveryInstructions: '',
    deliveryDay: '',
    subscriptionStatus: '',
    subscriptionActive: '',
    amount: '',
  };

  const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(loggedInUser || initialProfile);
    const [profile, setProfile] = useState(user);
   
    const PaymentMethod = (props) => {
      const OrderAmount = props.OrderAmount;
  };

    useEffect(() => {
      // Assuming you have a username saved in the loggedInUser object
      const fetchUserData = async () => {
          try {
              const response = await axios.get('http://localhost:5173/api/user-details', {
                  params: {
                      username: loggedInUser.username
                  }
              });
  
              if (response.data.success) {
                  setUser(response.data.user);
             
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
              // Handle the error. Maybe set a state variable to show an error message
          }
      }
  
      fetchUserData();
  
      
  }, []); 

  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
       
        navigate('/login'); 
        return;
    }
   

}, [navigate]);

    
    

  
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedStatus, setselectedStatus] = useState('');
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveProfileToDB = async () => {
    const updatedProfile = {
      ...profile,
      deliveryDay: selectedDay,
      activeStatus: selectedStatus === 'true'
    };
    try {
      const response = await axios.put('http://localhost:5173/api/update-user-details', profile);
      
      if (response.data.success) {
        // If the update is successful, update the 'user' state with the latest data
        setUser(profile);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('Error updating profile. Please try again later.');
    }
  };


  const handleSave = () => {
    // Save the edited profile to the backend or perform necessary actions
    saveProfileToDB();
    setIsEditing(false);
  };

  const handleChange = (e, day, status) => {
    setSelectedDay(day);
    setselectedStatus(status);
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const recipient = 'fresh@katari.farm';
    const subject = 'question about my subscription';
    const body = 'I wanted to reach out to you...';
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlePaymentClick = () => {
      setIsModalOpen(true);
    };
    
    const handleClosePayment = () => {
      setIsModalOpen(false);
      
    };

    const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/'); 
    };

    return  (
        <div className="user-overlay">
    {isEditing ? (
      <span className="user-content">
      <span className="profileMessege">**Keep your profile up to date to ensure your deliveries arrive on time!**</span>
      <fieldset>
     
        <div>
          <label>First Name: </label>
          <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} required/>
        </div>
        <div>
        <label>Last Name: </label> 
          <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} required/>
        </div>
        <div>
          <label>Phone: </label>
          <input type="tel" name="phone" value={profile.phone} onChange={handleChange} required />
        </div>
        <div>
        <label>Telegram: </label>
          <input type="text" name="telegram" value={profile.telegram} onChange={handleChange} required />
        </div>
        <div>
        <label>CrcWallet: </label>
          <input type="text" name="CrcWallet" value={profile.CrcWallet} onChange={handleChange} required/>
        </div>
        </fieldset>
        <fieldset>
        <div>
        <span className="profileMessege">**Address to where Microgreens should be delivered, please clarify the the Ring Name if it differs from your last name**</span>
          <br />
          <label>Address: </label>
          <br />
          <input type="text" name="address" value={profile.address} onChange={handleChange} required/>
        </div>
        <div>
          <label>PLZ </label>
          <br />
          <input type="text" name="plz" value={profile.plz} onChange={handleChange} required/>
        </div>
        <div>
        <label>Delivery Instructions:</label>
        <br/>
          <input type='text' name="deliveryInstructions"  value={profile.deliveryInstructions} onChange={handleChange} required />
        </div>
        <div>
        <label>Amount:
        <br /><span className="profileMessege">Select quantity you would like to receive: 1 is 125g,  2 is 250g etc..</span></label>
        <br/>
          <input type='number' name="amount"  value={profile.amount} onChange={handleChange} required />
        </div>
        </fieldset>
        <fieldset>
    <legend>Delivery Day: </legend>
    <div>
        <button  className={`day-button ${selectedStatus === "true" ? "selected" : ""}`} name="deliveryDay" value="Tuesday" onClick={handleChange}>Tuesday </button>
        <button  className={`day-button ${selectedStatus === "true" ? "selected" : ""}`} name="deliveryDay" value="Thursday" onClick={handleChange}>Thursday </button>
    </div>
</fieldset>
<fieldset>
    <legend>Is your Subscription Active? </legend>
    <div>
        <button  className={`day-button ${selectedStatus === "true" ? "selected" : ""}`} name="subscriptionActive" value="Yes" onClick={handleChange}>Yes, Keep 'em Coming! </button>
        <button  className={`day-button ${selectedStatus === "true" ? "selected" : ""}`} name="subscriptionActive" value="Paused" onClick={handleChange}>No, I need a Pause! </button>
    </div>
</fieldset>
        {/* Add other profile fields here */}
        <button className='Profile-button' onClick={handleSave}>Save Changes</button>
        <br />  
      </span>
    ) : (
      <span className="user-content">
      <span className='userWelcome'>Welcome {user.username} to your profile:</span>
      <br/>
        You have {user.subscriptionStatus} deliveres left in your subscription this month.
        <br/>
      <span className="profileMessege">**Keep your profile up to date to ensure your deliveries arrive on time!**</span>
      <fieldset>
      <div>
          <strong>User Name:</strong> {profile.username}
        </div>
        <div>
          <strong>Email:</strong> {profile.email}
        </div>
        </fieldset>
        <br />  
        <fieldset>      
        <div>
          <strong> First Name:</strong> {profile.firstName}
        </div>
        <div>
          <strong>Last Name:</strong> {profile.lastName}
        </div>
        <div>
          <strong>Phone:</strong> {profile.phone}
        </div>
        <div>
          <strong>Telegram:</strong> {profile.telegram}
        </div>
        <div>
          <strong>CRCWallet:</strong> {profile.CrcWallet}
        </div>
        </fieldset>
        <br />
        <span className="profileMessege">**Address to where Microgreens should be delivered, please clarify the the Ring Name if it differs from your last name**</span>

        <fieldset>
        <div>
          <strong>Address:</strong> {profile.address}
        </div>
        <div>
          <strong>Plz:</strong> {profile.plz}
        </div>
        <div>
          <strong>Delviery Instructions:</strong><br /> {profile.deliveryInstructions}
        </div>
        <div>
          <strong>Amount:<span className="profileMessege">x 125g</span>
</strong><br /> {profile.amount}
        </div>
        </fieldset>
        <br />
        <fieldset> 
        <div>
          <strong>Delivery Day:</strong> {profile.deliveryDay}
        </div>
        <div>
          <strong>Subscription Status:</strong> {profile.subscriptionActive}
        </div>
        </fieldset>
        {/* Display other profile fields here */}
        <button className='Profile-button' onClick={handleEdit}>Edit Profile</button> 
        <br/>
        <span className="profileMessege">Now all you have to do send us your Payment month of Greens:</span>
        <br />  
        <button className='Profile-button-green' onClick={handlePaymentClick}>Pay your Subscription </button>
        <PaymentsPage isOpen={isModalOpen} onClose={handleClosePayment}  orderAmount={profile.amount.toString()}  /> 
        <br/>
        <span className='profileMessege' >If you have any doubts or questions just: </span>
        <br/>
        <a href={mailtoLink}><button className='Profile-button'>send us a quick messege!!</button></a>
        <h4><a className='exit' href='./'  onClick={e => {e.preventDefault(); handleLogout();}}>Exit</a></h4>
      </span>
    )}
   
    </div> 

    );
};

  
  export default MySubscription;