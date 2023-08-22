import peassketch from '../assets/microgreens-photo.webp'
import '../css/App.css';
const whatUget = () => { 


return (
  <>
  <br/>
    <h2>WHAT DO YOU GET IN THE SUBSCRIPTION:</h2>
    <div className="whatSub">
    
    <div className="whatLeft">
    <strong>
    <ul>
    <li>
    Four Weekly Deliveries!
    <br/>  </li>
    <li>
    Fresh same day Harvest!
    <br/></li>
    <li>
    A blend of 7 different Microgreens!
    </li>
    </ul>
    </strong>
    </div>
    <div className="whatRight">
    <br />  
      <img src={peassketch} alt="Picture of Micogreens" className={'microgreenspic'} />
      <br/>
    </div>
    </div>
    </>
);

}
export default whatUget;