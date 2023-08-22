import React, { useState } from 'react';
import Radishsketch from '../assets/radish-sketch.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../css/App.css';
import '../css/modal.css';
import AgbModal from "../AGBModal.jsx";
import PropTypes from 'prop-types';


const Footer = ({ isAgbModalOpen, setIsAgbModalOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal's visibility

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (  
        <> 
            <br/><h2>Contact US!</h2>
            <div className="footer"> 
                <div className="footer-container">
                    <div className="footer-box 1"> 
                        <strong> 
                            Katari Farms<br/>
                            <span className='footer-address'>
                                fresh@katari.farm<br/>
                                moosdorfstr 7-9, 12435 Berlin 
                            </span>
                            <br/><br/>
                            <a href="/agb" onClick={(e) => {
                                e.preventDefault();
                                openModal();  // Open the modal when the link is clicked
                            }}>
                                Read our full AGBs here
                            </a>
                            <br/>
                        </strong>
                        <div></div>
                        <div>
                            Connect with us:<br/> 
                            <a href="https://www.instagram.com/katarifarms/" id="footerLinks" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="3x"  />
                            </a>
                        </div> 
                    </div>
                    <br />
                    <div className="footer-box 2" id="fb2"></div>
                    <div className="footer-box 3">
                        <img src={Radishsketch} alt="Login" className="footer-sketch" />
                    </div>
                </div>
                <br/>
            </div>

            {/* Render the AGBmodal with the required props */}
            <AgbModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </> 
    );
}
Footer.propTypes = {
    isAgbModalOpen: PropTypes.bool.isRequired,
    setIsAgbModalOpen: PropTypes.func.isRequired,
  };
export default Footer;
