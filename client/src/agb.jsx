import React from 'react';
import Modal from 'react-modal';
import  "./css/agb.css";


Modal.setAppElement('#root'); // Assuming your app root element has the id 'root'.

const AGBPopup = ({ isOpen, onRequestClose }) => {
   
    document.body.classList.remove('modal-open');

    return (
                    <div className="">
                    <div div className="">  
                    <strong>General Terms and Conditions (AGB) for Katari.farm</strong>

<strong>1. Scope</strong>
<p>These General Terms and Conditions apply to all business relations between Katari.farms, hereinafter referred to as the "Provider", and its customers via the website <a href="https://katari.farm">https://katari.farm</a>, hereinafter referred to as the "Website".</p>

<strong>2. Services</strong>
<p>The Provider offers a subscription service delivering Microgreens to its customers. Subscribers will receive Microgreens four times a month, once a week, for the duration of their subscription.</p>

<strong>3. Conclusion of Contract</strong>
<p>By placing an order on the Website, the customer makes a binding offer to purchase the respective subscription. The contract is concluded when the Provider confirms this offer.</p>

<strong>4. Prices and Payment</strong>
<p>All prices on the Website are inclusive of the legally applicable value added tax. Costs for delivery and shipping are also included. The customer can pay by credit card, PayPal, or bank transfer.</p>

<strong>5. Delivery and Shipping</strong>
<p>The delivery will be made to the delivery address specified by the customer. The delivery time is approximately 11 - 15 on the specified delivery day of your choice.</p>

<strong>6. Right of Withdrawal</strong>
<p>Customers have the right to withdraw from the contract up to one day before the next scheduled delivery. You will be refunded 6.25 for every delivery left in your subscription cycle.</p>

<strong>7. Data Storage and Website Analytics</strong>
<p>We utilize Google Services for website analytics and reCAPTCHA for security purposes. By using our website, users agree to the data processing by Google in the manner and for the purposes set out in Google's privacy policy.</p>
<p>User profiles, including addresses provided by users, are stored securely on our servers. We employ state-of-the-art security measures to protect users' data from unauthorized access.</p>
<p>The addresses provided by users will be used in conjunction with OpenStreetMap services for routing optimization purposes. This ensures efficient delivery routes for our subscription service. By providing their address, users agree to this usage.</p>
<p>We also use cookies to enhance user experience, which includes cookies from third-party services such as PayPal and Instagram. By using our website, users agree to the use of these cookies. Detailed information on our cookie usage can be found in our <a href="#" onClick={() => {/* Load Cookie Policy */}}>Cookie Policy</a>.</p>

<strong>8. Liability</strong>
<p>The Provider's liability for damages, regardless of the legal grounds, in particular from delay, defects, breach of contractual obligations, tort, is limited in accordance with this clause.</p>

<strong>9. Data Protection</strong>
<p>The Provider respects and protects the personal data of customers. Details can be found in the <a href="#" onClick={() => {/* Load Privacy Policy */}}>Privacy Policy</a>.</p>

<strong>10. Final Provisions</strong>
<p>Should any provision of these terms and conditions be invalid, the remainder of the contract remains valid.</p>
<p>Applicable law is the law of Germany.</p>

<strong>11. Contact Details</strong>
<p>Katari Farms<br />
Moosdorfstr, 7-9, 12435<br />
<a href="mailto:fresh@katari.farm">fresh@katari.farm</a></p>
           
            </div>
            </div>
    );
}

export default AGBPopup;
