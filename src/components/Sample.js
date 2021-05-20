import React, { useState , useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';
import moment from 'moment';
import ScotchInfoBar from './ScotchInfoBar';
import firebase from 'firebase';
import Modal from "react-modal";
import * as emailjs from 'emailjs-com'

function Sample() {
	const [confirmmsg, setConfirmmsg] = useState("Please wait, we are saving your details...");
	const [sampledata, setSampledata] = useState(null);
  const [hospitals, setHospitals] = useState(null);
   const [nohospitals, setnoHospitals] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isAgeFieldsModalOpen, setIsAgeFieldsModalOpen] = useState(false);
  const [isFieldsModalOpen, setIsFieldsModalOpen] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  var PINCODE = 0;
  const pincoderef= React.createRef();
   const emailref= React.createRef();
   const ageref= React.createRef();
  const EMAIL = 'imakepossible@gmail.com'
  var AGE = 18;
  var data = [];
 // const firebaseApp = firebase.apps[0];
  var email = "";
  var id = 1;
  var error = false;
  var phone = "";
  var validEntry = false;

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function toggleEmailErrorModal() {
    setIsEmailModalOpen(!isEmailModalOpen);
  }
  function toggleAgeFieldsModal() {
    setIsAgeFieldsModalOpen(!isAgeFieldsModalOpen);
  }

  function toggleFieldsModal() {
    setIsFieldsModalOpen(!isFieldsModalOpen);
  }

  function toggleAlreadyRegistered() {
    setIsAlreadyRegistered(!isAlreadyRegistered)
    toggleModal();

  }

  function toggleIsLoading(){
    setIsLoading(!isLoading);
  }

  let writeUserData = async () => {
  console.log('write data');
    let today = moment();
    let date = today.format("DD-MM-YYYY");
    let time = today.format('LT');
      const data = { pincode: PINCODE, email: email.toLowerCase(), age: AGE, status:0,create_date:date }; 
 
const headers = {"Access-Control-Allow-Origin": "*"};	  
    const response = await axios.post(
      'api_url_to_store_user_data'
    ,data, { headers }).then(function (response) {
		console.log(response.data.message);
		 setConfirmmsg('Thankyou for joining us. We will email you as soon as a vaccine is available for given details!');
		 setIsOpen(true); // open again if closed on please wait.. msg
		 document.getElementById("pincode").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
	});		


  // send email
let templateParams = {
      from_name: "Vaccine Slot Alert",
      to_name: email,
      subject: "Welcome to Vaccine Slot App",
      message_html: "Dear User,<br><br>Thankyou for registering at our app. We will try to find available slot as per your location (pincode :"+PINCODE+") and send you notifcation at your email address.<br><Br>Thankyou.<br>Your Friend.",
	  pincode : PINCODE,
	  age : AGE,
	  email : email
     };     
	 
	 emailjs.send(
      'service_id',
      'template_4pu7pbc',
       templateParams,
      'user_id'
     );  
		  
    
  }

  let getUserData = () => {
console.log('dfd');
    var ratingRef = firebase.database().ref("ids/" );
  ratingRef.orderByChild('status').equalTo(0).limitToFirst(2).once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
     console.log("The    " + childSnapshot.key + " age is " + childSnapshot.val().age+ " email is " + childSnapshot.val().email+ " pincode is " + childSnapshot.val().pincode);
  });
}); 

 

  }
 
  const fetchData = async (PINCODE,DATE) => {
	  setHospitals(null);
	  setnoHospitals("We are checking for slots, Please wait...");
    const response = await axios.get(
      'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + PINCODE + '&date=' + DATE
    ).then(function (slots) {
      let sessions = slots.data.sessions;
      //console.log(slots);
      let validSlots = sessions.filter(slot => slot.min_age_limit <= AGE && slot.available_capacity > 0)
      //  console.log({date:DATE, validSlots: validSlots.length})
      if (validSlots.length > 0) {
        setHospitals(slots.data);
		setnoHospitals(null);
		console.log(hospitals);
      }
	  else{
		  setHospitals(null);
		  setnoHospitals("Currently no vaccine slot available for given details");
	  }
    });

    //getUserData();
  };

  const sendFirstMail =   () => {
	  setConfirmmsg('Please wait, we are saving your details...');
    toggleModal();
   
    writeUserData();
	 
  }

  let handleChange = (e) => {
    PINCODE = e.target.value;
  }

  let emailChange = (e) => {
    email = e.target.value;
  }

  let ageChange = (e) => {
	 
    AGE = e.target.value;
  }

  /** let phoneChange = (e) => {
     phone = e.target.value;
   }*/
   
   let checkVaccineAvailability = () => {
    
    email = document.getElementById("email").value;
    PINCODE = document.getElementById("pincode").value;
    AGE = document.getElementById("age").value;
      
    email = email.trim();
    phone = phone.trim();
    let validEmail = false;
     

      if (PINCODE == "") {
       
      toggleFieldsModal();
	  pincoderef.current.focus();
    }
	else  if (AGE == "") {
       toggleAgeFieldsModal();
	  ageref.current.focus();
    }
	 

    else if (  PINCODE != ""       ) {
      validEntry = true;
  

    }
      
    if (validEntry ) {
 
        const NewDate = moment(new Date()).format("DD-MM-YYYY");
		//getUserData();
     //sendFirstMail();
		fetchData(PINCODE,NewDate);
		console.log('hospitals'+hospitals);
        
       //!hospitals && toggleIsLoading();        
    }
  }

  let checkAvailability = () => {
    
    email = document.getElementById("email").value;
    PINCODE = document.getElementById("pincode").value;
    AGE = document.getElementById("age").value;
     
    email = email.trim();
    phone = phone.trim();
    let validEmail = false;
     

      if (PINCODE == "") {
       
      toggleFieldsModal();
	  pincoderef.current.focus();
    }
	else  if (AGE == "") {
      
      toggleAgeFieldsModal();
	  ageref.current.focus();
    }
	else if (email == "" || email.includes(" ")) {
      toggleEmailErrorModal();
	  emailref.current.focus();
    }

    else if (email != "" && PINCODE != "" && !email.includes(" ")) {
      validEntry = true;
      validEmail = true;

    }
      
    if (validEntry && validEmail) {
 
        const NewDate = moment(new Date()).format("DD-MM-YYYY");
		//getUserData();
     sendFirstMail();
		//fetchData(PINCODE,NewDate);
      
      //toggleIsLoading();
    }
  }

   let getData = () =>{
	   console.log('in');
getUserData();
   }
  let fetchNext10Days = () => {
    let dates = [];
    let today = moment();
    for (let i = 0; i < 10; i++) {
      let dateString = today.format('DD-MM-YYYY')
      dates.push(dateString);
      today.add(1, 'day');
    }
    return dates;
  }

  return (
    <div className="App">
      <h1>Fetch Vaccine Availability Information</h1>
      <h2>Enter your pincode and email. We'll notify you the moment a vaccine becomes available at your location!</h2>
      <div className="info-input">
        <input id="pincode" ref={pincoderef} className="pincode-input" type="text" placeholder="PINCODE" onChange={handleChange} />
		 <input id="age"  ref={ageref} className="email-input" type="text" placeholder="YOUR AGE" onChange={ageChange} />
        <input id="email"  ref={emailref} className="email-input" type="text" placeholder="YOUR EMAIL" onChange={emailChange} />
        {/*<input className="email-input" type="text" placeholder="PHONE(OPTIONAL)" onChange={phoneChange} />*/}
       
      </div>
      {/* Fetch data from API */}
      <div>
         &nbsp;<button className="fetch-button" onClick={checkVaccineAvailability}>
          Find Vaccine Slots
        </button>&nbsp;<button className="fetch-button" onClick={checkAvailability}>
          Notify Me 
        </button>&nbsp; {/* <button className="fetch-button" onClick={getData}>
          Get Data
        </button>*/}
        <br /> 
        {/*isLoading ? <Spinner /> : null*/}
		
		<Modal
          isOpen={isLoading}
          onRequestClose={toggleIsLoading}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div  >No slot available for given details currently.</div>
          <button className="close-button" onClick={toggleIsLoading}>Ok</button>
        </Modal>
		
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div  >{confirmmsg} {hospitals && `Please check given below hospitals that matched with your given details.`}</div>
          <button className="close-button" onClick={toggleModal}>Ok</button>
        </Modal>
        <Modal
          isOpen={isEmailModalOpen}
          onRequestClose={toggleEmailErrorModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>Please enter valid EMAIL!</div>
          <button className="close-button" onClick={toggleEmailErrorModal}>Ok</button>
        </Modal>
		 <Modal
          isOpen={isAgeFieldsModalOpen}
          onRequestClose={toggleAgeFieldsModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>Please enter valid AGE!</div>
          <button className="close-button" onClick={toggleAgeFieldsModal}>Ok</button>
        </Modal>
        <Modal
          isOpen={isFieldsModalOpen}
          onRequestClose={toggleFieldsModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>Please enter valid PINCODE!</div>
          <button className="close-button" onClick={toggleFieldsModal}>Ok</button>
        </Modal>
        <Modal
          isOpen={isAlreadyRegistered}
          onRequestClose={toggleAlreadyRegistered}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>Email ID already registered with us!</div>
          <button className="close-button" onClick={toggleAlreadyRegistered}>Ok</button>
        </Modal>
      </div>

      {/* Display data from API */}
      <div className="books">
	  <div style={{  color:'red'}}><center>{nohospitals}</center></div>
        {hospitals &&
          hospitals.sessions.map((hospital, index) => {
            const date = hospital.date;
            const time = hospital.slots.map(function(val) {
  return val;
}).join(', ');
            const capacity = hospital.available_capacity;
            const name = hospital.name;
            const address = hospital.address;
            const district = hospital.district_name;
            const feeType = hospital.fee_type;
            const fee = hospital.fee;
			const ageLimit = hospital.min_age_limit;
            const vaccine = hospital.vaccine;

            return (
              <div className="book" key={index}>
                <h3>Hospital {index + 1}</h3>
                <h2>{name}</h2>

                <div className="details">
                  <p>Date of Availability: {date}</p>
                  <p>Time: {time}</p>
                  <p>Capacity Available: {capacity}</p>
				  <p>Age Limit: {ageLimit}</p>
                  <p>Hospital Name: {name}</p>
                  <p>Hospital Address: {address}</p>
                  <p>District: {district}</p>
                  <p>Fee Type: {feeType}</p>
                  <p>Fee: {fee}</p>
                  <p>Vaccine: {vaccine}</p>
                </div>
              </div>
            );
          })}
      </div> 
	  {sampledata}
       <ScotchInfoBar   /> 
	   <div><br/><br/><br/><br/></div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Sample />, rootElement);

export default Sample;