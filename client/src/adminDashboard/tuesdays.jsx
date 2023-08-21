import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tuesdays() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Define your filter criteria here
      const filters = {
        DeliveryDay: 'Tuesday',
        ActiveStatus: "Yes",        // Add more filters as needed
      };

      const response = await axios.get('http://localhost:5173/api/get-data', {
        params: filters,
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Data Sets with Specific Filters</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {/* Render the properties you want */}
            Username: {item.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tuesdays;
