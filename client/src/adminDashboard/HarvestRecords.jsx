import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function HarvestRecords() {
  const [formData, setFormData] = useState({
    Radish: "",
    Daikon: "",
    Sunflower: "",
    Peas: "",
    Broccoli: "",
    Mustard: "",
    Fenugreek: "",
    Trays: ""
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formattedDate = moment().format('DD.MM.YY');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the Express API to create data in the database
      await axios.post('http://katari.farm:5173/api/harvest', {
        Date: formattedDate,
        Radish: formData.Radish,
        Daikon: formData.Daikon,
        Sunflower: formData.Sunflower,
        Peas:  formData.Peas,
        Broccoli: formData.Broccoli,
        Mustard: formData.Mustard,
        Fenugreek: formData.Fenugreek,
        Trays: formData.Trays
      });
  
      // Clear form fields and show success message
      setFormData({
        Radish: "",
        Daikon: "",
        Sunflower: "",
        Peas: "",
        Broccoli: "",
        Mustard: "",
        Fenugreek: "",
        Trays: ""
      });
      setSuccessMessage('Registration successful!');
    } catch (error) {
      console.error('Error creating data:', error);
      setErrorMessage('Hmm Something went wrong.. send us an Email so we can figure out what happened!');
    }
  };
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Render component
  return (
    <fieldset className='harvest-form'> 
     <legend><span className='adminWelcome' >Har vest Count</span></legend>
      <form onSubmit={handleSubmit}>
      Radish:
        <br />
        <label>
          <input type="number" name="Radish" placeholder=" " className="harvestField" value={formData.Radish} onChange={handleChange} required />
        </label>
        <br/>
        Daikon:
        <br />  
        <label>
          <input type="number" name="Daikon" placeholder=" " className="harvestField" value={formData.Daikon} onChange={handleChange} required />
        </label>
        <label>
        <br />  
        Peas
        <br />
        <input type="number"  name="Peas" placeholder=" " className="harvestField" value={formData.Peas} onChange={handleChange} required />
        </label>
        <label>
        <br />
        Sunflower
        <br />
          <input type="number" name="Sunflower" placeholder=" " className="harvestField" value={formData.Sunflower} onChange={handleChange} required />
        </label> 
        <label> 
        <br />
        Broccoli
        <br />
        <input type="number" name="Broccoli" placeholder=" " className="harvestField" value={formData.Broccoli} onChange={handleChange} required />
        </label> 
        <label>
        <br />
        Mustard
        <br />
          <input type="number" name="Mustard" placeholder=" " className="harvestField" value={formData.Mustard} onChange={handleChange} required />
        </label>
        <label> 
        <br />
        Fenugreek
        <br />
        <input type="number" name="Fenugreek" placeholder=" " className="harvestField" value={formData.Fenugreek} onChange={handleChange} required />
        </label> 
        <label> 
        <br />
        Trays
        <br />
        <input type="number" name="Trays" placeholder=" " className="harvestField" value={formData.Trays} onChange={handleChange} required />
        </label> 
        
        <br/>
        <button type="submit">Submit</button>
      </form>    </fieldset>
  );
}

export default HarvestRecords;
