import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubscribersDay({ deliveryDay, onUserCountChange }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [deliveryDay]);

    const fetchData = async () => {
        try {
            const filters = {
                deliveryDay: deliveryDay,
                subscriptionActive: "Yes",
            };

            const response = await axios.get('/api/get-data', {
                params: filters,
            });
            setData(response.data);

            // Notify the parent component about the user count
            onUserCountChange(response.data.length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <span className='adminWelcome'>People for today: </span>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>
                        Username: {item.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SubscribersDay;
