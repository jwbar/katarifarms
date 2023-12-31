
import axios from "axios";
import { useState } from "react";
import './css/App.css';
import './css/index.css';
import  katarifarmsbanner from './assets/katarifarms.svg' 
import  katarifarmsbannersmall from './assets/katarifarm-banner-small.webp'
import  Suscribe from './app-sections/suscribe.jsx';
import  './css/modal.css';
import WhatMicrogreens from "./app-sections/whatMicrogreens.jsx";
import UpTo40x from "./app-sections/upTo40x.jsx";
import WhatUget from "./app-sections/whatUget.jsx";
import Footer from "./app-sections/footer.jsx";
import AboutUs from "./app-sections/about.jsx";




function Home() {
  const [data, setData] = useState();
  const urlWithProxy = "/api/v1";

  function getDataFromServer() {
    axios
      .get(urlWithProxy)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
      });
  }
  const [isAgbModalOpen, setIsAgbModalOpen] = useState(false);
  return (
    <div className="App">
    
    <div className="section-home" style={{backgroundImage: `url(${katarifarmsbanner})`,'@media(maxwidth: 600px)':{backgroundImage:katarifarmsbannersmall}}}></div>
      <section className="section-white">
      <span className='homeHeader'><br /> Your SuperFood Farming Collective</span> <br /></section>
      {/* ----> what Are Microgreens */}
     <WhatMicrogreens/>
      {/* ----> 40xMore Nutritional Value*/}
      <UpTo40x/>
      {/* ----> Subscribe/Login */}
      <section className="section-green">
        <Suscribe/>
      </section>
      {/* ----> What do you get*/}
      <br/>
      <section className="section-yellow">
     <WhatUget/>
       </section>
      {/* ----> About the Farm*/}
      <section className="section-white">
      <br/>
     <AboutUs />
      </section>
      {/* ----> Footer*/}
      <section className="section-green">
      <Footer isAgbModalOpen={isAgbModalOpen} setIsAgbModalOpen={setIsAgbModalOpen} />

 </section> 
  </div>
  );
};

export default Home;