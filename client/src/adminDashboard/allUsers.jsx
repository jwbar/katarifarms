import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'
function DatabaseContent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

        // Define your filter criteria here
        const filters = {
          deliveryDay: 'Tuesday',
          subscriptionStatus: 1,
          // Add more filters as needed
        };
      const response = await axios.get('https://katari.farm:5173/api/get-data'); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="admin-overlay">
    

    <div className="admin-container">
      <fieldset>  
      <legend> <h2>Active Users:</h2> </legend>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            {/* Add more columns here */}
          </tr>
        </thead>
          <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              {/* Add more columns here */}
            </tr>
          ))}
        </tbody>
        
      </table>
      </fieldset> 
    </div>
    </div>
  );
}

export default DatabaseContent;
