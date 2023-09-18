import React, { useState, useEffect } from 'react';
import "./dispo.css";
import Papa from 'papaparse';

function Dispo() {
    const [datasets, setDatasets] = useState([]);
    const [error, setError] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/datasets")
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
     
    }, []);

    const handleSubtract = (id, subscriptionStatus) => {
        fetch(`http://localhost:5000/api/datasets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscriptionStatus: subscriptionStatus - 1
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the datasets state
                setDatasets(prevDatasets => 
                    prevDatasets.map(dataset => 
                        dataset._id === id 
                            ? {...dataset, subscriptionStatus: dataset.subscriptionStatus - 1}
                            : dataset
                    )
                );
            } else {
                console.error('Error updating dataset:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        setClickedButtons(prev => [...prev, id]);

    };

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Use FileReader to read the contents of the file
        const reader = new FileReader();
        reader.onload = (evt) => {
            const content = evt.target.result;
            const jsonData = csvToJSON(content);
            setCsvData(jsonData);
        };
        reader.readAsText(file);
    }

    
    function csvToJSON(csv) {
        let jsonData = [];
        Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                jsonData = results.data;
            }
        });
        return jsonData;
    }
    
    const mergedData = [...datasets, ...csvData];

    return (
        <div className='dispo'>
          {/* CSV file upload input */}
          <div>
                <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>

            <h4>Deliveries-Today</h4>
            <ol>
                {mergedData.map((dataset, index )=> (
                    <li key={dataset._id || 'csv-' + index}>
                        <fieldset>      
                            <legend>
                                <a href={`https://t.me/${dataset.telegram}`} target="_blank" rel="noopener noreferrer">{dataset.username}</a>
                                :</legend>
                            {dataset.lastName} <span />{dataset.phone} <br />
                            {dataset.address}, {dataset.plz}
                            <em><br /> {dataset.deliveryInstructions}</em><br />
                            <button 
    onClick={() => handleSubtract(dataset._id, dataset.subscriptionStatus)} 
    style={{
        backgroundColor: clickedButtons.includes(dataset._id) ? 'gray' : 'black', 
        border: '1px solid black', 
        padding: '5px',
        color: 'white',  // added for clear visibility
        fontSize: '16px' // to increase the size
    }}>
    Deliver
</button>
                        </fieldset> 
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Dispo;
