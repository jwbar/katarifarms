import React, { useState, useEffect } from 'react';
//import "./dispo.css";
import Papa from 'papaparse';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Dispo() {
    const [datasets, setDatasets] = useState([]);
    const [error, setError] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);
    const [formData, setFormData] = useState([]);
    const navigate = useNavigate();  // Initialize navigate

    // Check user role
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || user.role !== 'admin') {
            // Redirect to login page if the user isn't logged in or doesn't have an "Admin" role
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetch("/api/datasets")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setDatasets(data.datasets);
                } else {
                    setError(data.message || 'Unknown error');
                }
            })
            .catch(err => {
                setError(err.message);
            });
        console.log("Sending data:", formData);
    }, []);

    // ... (rest of your component's code)

    return (
        <div className='dispo'>
          {/* CSV file upload input */}
          {/* ... (rest of your render logic) */}
        </div>
    );
}

export default Dispo;
