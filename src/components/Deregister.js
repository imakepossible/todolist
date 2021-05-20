import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';
import moment from 'moment';
import ScotchInfoBar from './ScotchInfoBar';
import Modal from "react-modal";
 

function Deregister() {
  const [isOpen, setIsOpen] = useState(false);
  var email = "";

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const deleteData = async() => {
	  if(email!=''){
    const response = await axios.delete(
      'api_url_to_delete_this_email_user_from_db' + email.toLowerCase()
    ).then(function (slots) {
		document.getElementById("unemail").value = "";
      console.log("unsubscribed successful");
	   toggleModal();
    });
	  }
	  else{
		  alert("Please enter your email address registered with us.");
	  }
   
  }

  let emailChange = (e) => {
    email = e.target.value;
  }

  return (
    <div className="App1" style={{background: "#cecece"}}>
       
      <h2>Enter your email to unsubscribe from our mailing list & to stop alert!</h2>
      <div className="info-input">
        <input className="email-input" id="unemail" type="text" placeholder="YOUR EMAIL" onChange={emailChange} />&nbsp;&nbsp;<button className="fetch-button" onClick={deleteData}>
          Unsubscribe Me
        </button>
        <br />
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>Successfully unsubscribed! You will not receive any further mail from us.</div>
          <button className="close-button" onClick={toggleModal}>Ok</button>
        </Modal>
      </div>

      <ScotchInfoBar seriesNumber="7" />
    </div>
  );
}

export default Deregister;