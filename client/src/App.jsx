
import './css/index.css';
import  Suscribe from './app-sections/suscribe.jsx';
import  Admin from './adminDashboard/admin.jsx';
import  AllUsers from './adminDashboard/allUsers.jsx';
import MySubscription from './app-sections/mysubscription.jsx';
import LoginForm from "./LoginForm.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home.jsx";
import AGB from "./AGBModal.jsx";

function App() {

  

  return (
    <div>
  <Router>
    <Routes>
    <Route exact path="/" element={<Home/>} />   
    <Route exact path='/login' element={<LoginForm/>} className="routes"/>
    <Route exact path='/user' element={<MySubscription/>} className="routes" />
<Route exact path="/agb" element={<AGB />} className="routes" />
    <Route exact path='/admin' element={<Admin/>} className="routes"/>
    <Route exact path='/subsribe' element={<Suscribe/>}/>
    <Route exact path='/allusers' element={<AllUsers/>}/>
    </Routes>
  </Router>
  </div>
  )
  }
export default App;
