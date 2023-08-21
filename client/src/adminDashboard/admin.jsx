
import "./admin.css";
import Tuesdays from './tuesdays';
import CSVImporter from './csvImport';
import B2Cimport from "./B2Cimport";
import Grass from "/src/assets/grass-leaf-plant.svg";
import { isValidElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import HarvestRecords from "./HarvestRecords";

const Admin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // You should get this from your actual user state or context
    // For now, we'll assume it's stored in local storage for simplicity
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.role !== 'admin') {
        // Redirect to login page if the user isn't logged in or doesn't have an "Admin" role
        navigate('/login');
    }
    console.log(user.role)
}, [navigate]);

  //check for the day
  const currentDate = new Date();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekNumber = currentDate.getDay();
  const dayOfWeekString = weekdays[dayOfWeekNumber];

  const  numOfSubscribers = '2';
  const   subscribersTotal =  numOfSubscribers*125;
  const [mixTotal, setMixTotal] = useState(0); 
  const [B2CmixTotal, setB2CMixTotal] = useState(0); 
  const    total2Harvest = subscribersTotal + mixTotal + B2CmixTotal;
  const   howMuchofEach =  total2Harvest/5;
    
  

  return (
    <div className="admin-overlay"> 
    <div className="admin-content"> 
      <br/> 
      <span className='adminWelcome'>Hallo! happy {dayOfWeekString} </span> 
      <br/>
      You have <span className='adminWelcome'> {numOfSubscribers} </span> subscribers to haverst today 
      <br />
      that is a total of <span className='adminWelcome'>  {total2Harvest} </span> -//-  <span className='adminWelcome'> {howMuchofEach} </span> of each type 
      <br/>

      <div className="admin-fieldsets-container"> 
        <div className="admin-fieldsets-box"> 
          <fieldset>  
            <legend>Upload Marktschwarmer CSV</legend>
            <CSVImporter onMixTotalChange={setMixTotal} /> 
          </fieldset>
          </div>
          <br />  
          <div className="admin-fieldsets-box"> 
          <fieldset>  
            <legend>Upload B2B CSV</legend>
            <B2Cimport onB2CMixTotalChange={setB2CMixTotal} /> 
          </fieldset>
        </div>  
        <div className="admin-fieldsets-box"> 
          <HarvestRecords /> 
        </div>
      </div>

      <img src={Grass} alt="grass" className='footerImage'/>
    </div>
  </div>
  );


};

export default Admin;
