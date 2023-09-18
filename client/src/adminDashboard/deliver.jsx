import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

function Deliver(props) {
    const [datasets, setDatasets] = useState([]);
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);  // Define error state here
    const [center, setCenter] = useState(null);
    const date = props.date || "28.08.23";


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDRAD_SWRzyE_gB5zTHA6g45H2u7iusJj8',
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/get-delivery-by-date/28.08.23`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setDatasets(data.datasets);
                } else {
                    setError(data.message);
                }
            })
            .catch(err => setError(err.message));

    }, [date]);

        useEffect(() => {
        //... Your fetch logic for datasets

        if (datasets[0]) {
            const address = datasets[0].address;
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK') {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    setCenter({ lat, lng });
                } else {
                    console.error('Geocode was not successful for the following reason:', status);
                }
            });
        }
    }, [date, datasets]);

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 52.487910, lng: 13.460510 }}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
}

export default Deliver;  // Make sure you export the correct function name
