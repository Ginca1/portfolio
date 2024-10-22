
import './App.css'; // Make sure you have your styles defined in App.css

import emailjs from 'emailjs-com';
import React, { useState, useRef } from 'react';




const MessageForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const validEmailProviders = ['gmail.com', 'yahoo.com', 'inbox.lv']; // Add more valid providers as needed

  const isValidEmail = (email) => {
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return false; // Email should have exactly one '@' symbol
    const domain = emailParts[1];
    return validEmailProviders.includes(domain);
  };

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    // Clear validation error when user starts typing
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    // Validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z]{3,13}$/.test(formData.name)) {
      errors.name = 'Name must be between 3 and 13 characters long and contain only letters';
    }
  
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email.trim())) {
      errors.email = 'Email domain is not supported or invalid';
    }
  
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 3 || formData.message.length > 100) {
      errors.message = 'Message must be between 3 and 100 characters long';
    }

    if (Object.keys(errors).length === 0) {
      // If no errors, proceed with sending the email
      const serviceID = 'service_6lllce2';
      const templateID = 'template_ulyli2o';
      const userID = 'Ilvpge3rDVHct963t';
  
      const templateParams = {
        to_name: formData.name,
        from_name: formData.email,
        message: formData.message
      };
  
      emailjs.send(serviceID, templateID, templateParams, userID)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setFormData({
            name: '',
            email: '',
            message: ''
          });
          setSuccessMessage('Your message has been sent successfully!');
        }, (error) => {
          console.log('FAILED...', error);
          setSuccessMessage('');
        });
    } else {
      // Display validation errors
      setFormErrors(errors);
      setSuccessMessage('');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Your name:
        <input type="text" id="name" value={formData.name} onChange={handleChange} />
        {formErrors.name && <span className="error" style={{ color: 'red' }}>{formErrors.name}</span>}
      </label>
      <label>
        Your email:
        <input type="email" id="email" value={formData.email} onChange={handleChange} />
        {formErrors.email && <span className="error" style={{ color: 'red' }}>{formErrors.email}</span>}
      </label>
      <label>
        Message:
        <textarea 
          id="message" 
          onChange={handleChange} 
          placeholder="Enter your message here..."
          value={formData.message}
          style={{ height: '60px' }}
        />
        {formErrors.message && <span className="error" style={{ color: 'red' }}>{formErrors.message}</span>}
      </label>
      <button type="submit">Send</button>
      {successMessage && <div className="success" style={{ color: 'green' }}>{successMessage}</div>}
    </form>
  );
};

function App() {

  const [clickedIndex, setClickedIndex] = useState(null); // State to track the clicked h3 element

  // Create refs for each section
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = [aboutRef, skillsRef, projectsRef, educationRef, contactRef]; // Array of refs

  const handleClick = (index) => {
    setClickedIndex(index); // Update the state with the clicked element's index
    sectionRefs[index].current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the respective section
  };


  return (
    <div className="main">
        <div style={{width: '100%'}}  className='row'>
         <div className='navigation1'>
         <div className='row'>
         
         {['About me', 'Skills', 'Projects', 'Education', 'Contact'].map((item, index) => (
              <h3
                className={`blop ${clickedIndex === index ? 'clicked' : ''}`} // Add 'clicked' class if it's clicked
                key={index}
                onClick={() => handleClick(index)} // Handle click to toggle the class
              >
                {item}
              </h3>
            ))}
       
        </div>
        </div>
        </div>
        <div ref={aboutRef}  style={{width: '100%'}} className="row">
          <div className="break">
          <div  style={{height: '100%'}} className='row-e4'>
           <div className='about'>
              <div className='row-l'>
                <h2>Hello, I'm </h2>
              </div>
              <div className='row-l'>
                <h1>Toms Karlis Ginters </h1>
              </div>
              <div className='row-l'>
                <p>I am web developer and currently still learning my profesion.
                  I like my profesion but my job experience is very limited, but I'm eager to learn.

                   </p>
              </div>
              <div className='row-l' style={{marginTop: '7%'}}>
                <h1>Reviews </h1>
              </div>
              <div className='row-l'>
                <p>"Highly efficient and reliable. Demonstrates strong communication skills and adaptability in various situations."
                   </p>
              </div>
              <div style={{marginTop:'4%'}} className='row-l'>
                <img className='phone' src="/phone.png"></img>
                <h4 style={{marginLeft:'5px'}}>+371 20216328</h4>
              </div>
           </div>

              <div className='circle'>
              <div className='row'>
                
              <img className='selfie' src="/selfie.webp"></img>
              </div>
              </div>


          </div>
          <div class="wave-container">
  <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path fill="#1d1d2f" fill-opacity="1" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,160C1120,160,1280,192,1360,208L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
  </svg>
</div>

          <div className='break2'>
            
          </div>
          <div class="box-container">
          <svg class="wave1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
  <path fill="#1d1d2f" fill-opacity="1" d="M0,160L9.6,165.3C19.2,171,38,181,58,160C76.8,139,96,85,115,80C134.4,75,154,117,173,144C192,171,211,181,230,202.7C249.6,224,269,256,288,245.3C307.2,235,326,181,346,170.7C364.8,160,384,192,403,181.3C422.4,171,442,117,461,90.7C480,64,499,64,518,80C537.6,96,557,128,576,138.7C595.2,149,614,139,634,160C652.8,181,672,235,691,224C710.4,213,730,139,749,117.3C768,96,787,128,806,133.3C825.6,139,845,117,864,122.7C883.2,128,902,160,922,176C940.8,192,960,192,979,181.3C998.4,171,1018,149,1037,138.7C1056,128,1075,128,1094,112C1113.6,96,1133,64,1152,85.3C1171.2,107,1190,181,1210,186.7C1228.8,192,1248,128,1267,117.3C1286.4,107,1306,149,1325,154.7C1344,160,1363,128,1382,133.3C1401.6,139,1421,181,1430,202.7L1440,224L1440,0L1430.4,0C1420.8,0,1402,0,1382,0C1363.2,0,1344,0,1325,0C1305.6,0,1286,0,1267,0C1248,0,1229,0,1210,0C1190.4,0,1171,0,1152,0C1132.8,0,1114,0,1094,0C1075.2,0,1056,0,1037,0C1017.6,0,998,0,979,0C960,0,941,0,922,0C902.4,0,883,0,864,0C844.8,0,826,0,806,0C787.2,0,768,0,749,0C729.6,0,710,0,691,0C672,0,653,0,634,0C614.4,0,595,0,576,0C556.8,0,538,0,518,0C499.2,0,480,0,461,0C441.6,0,422,0,403,0C384,0,365,0,346,0C326.4,0,307,0,288,0C268.8,0,250,0,230,0C211.2,0,192,0,173,0C153.6,0,134,0,115,0C96,0,77,0,58,0C38.4,0,19,0,10,0L0,0Z"></path>
</svg>
</div>
          </div>
        </div>

        <div className="rowM">
        <div  ref={skillsRef} className="break1">
        <div  className='row25'>
        <h1>My skills</h1>
        </div>
        <div className='row'>

        <div className="container">
        <div className="card">
          <div className="box">
            <div className="percent html">
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="60"></circle>
              </svg>
              <div className="num">
                <h2>94<span>%</span></h2>
              </div>
            </div>
            <h2 className="text">HTML</h2>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="card">
          <div className="box">
            <div className="percent php">
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="60"></circle>
              </svg>
              <div className="num">
                <h2>80<span>%</span></h2>
              </div>
            </div>
            <h2 className="text">PHP</h2>
          </div>
          </div>
        </div>

        <div className="container">
          <div className="card">
            <div className="box">
              <div className="percent mysql">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="60"></circle>
                  </svg>
                    <div className="num">
                      <h2>92<span>%</span></h2>
                    </div>
              </div>
                  <h2 className="text">MySQL</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="box">
              <div className="percent css">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="60"></circle>
                  </svg>
                    <div className="num">
                      <h2>80<span>%</span></h2>
                    </div>
              </div>
                  <h2 className="text">CSS</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="box">
              <div className="percent react">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="60"></circle>
                  </svg>
                    <div className="num">
                      <h2>69<span>%</span></h2>
                    </div>
              </div>
                  <h2 className="text">REACT</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="box">
              <div className="percent reactnative">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="60"></circle>
                  </svg>
                    <div className="num">
                      <h2>33<span>%</span></h2>
                    </div>
              </div>
                  <h2 className="text">REACT native</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="box">
              <div className="percent java">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="60"></circle>
                  </svg>
                    <div className="num">
                      <h2>50<span>%</span></h2>
                    </div>
              </div>
                  <h2 className="text">Javascript</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <div className="box">
              <div className="percent figma">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="60"></circle>
                  </svg>
                    <div className="num">
                      <h2>88<span>%</span></h2>
                    </div>
              </div>
                  <h2 className="text">Figma</h2>
            </div>
          </div>
        </div>



        </div>
        </div>
        </div>
        <div  className='row8'>
        <div class="cube-container">
        <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
  <path fill="#1d1d2f" fill-opacity="1" d="M0,128L0,96L36.9,96L36.9,96L73.8,96L73.8,256L110.8,256L110.8,288L147.7,288L147.7,128L184.6,128L184.6,0L221.5,0L221.5,64L258.5,64L258.5,32L295.4,32L295.4,224L332.3,224L332.3,256L369.2,256L369.2,256L406.2,256L406.2,96L443.1,96L443.1,160L480,160L480,192L516.9,192L516.9,224L553.8,224L553.8,320L590.8,320L590.8,256L627.7,256L627.7,224L664.6,224L664.6,256L701.5,256L701.5,256L738.5,256L738.5,64L775.4,64L775.4,96L812.3,96L812.3,192L849.2,192L849.2,288L886.2,288L886.2,64L923.1,64L923.1,96L960,96L960,192L996.9,192L996.9,64L1033.8,64L1033.8,192L1070.8,192L1070.8,128L1107.7,128L1107.7,128L1144.6,128L1144.6,160L1181.5,160L1181.5,160L1218.5,160L1218.5,96L1255.4,96L1255.4,288L1292.3,288L1292.3,64L1329.2,64L1329.2,288L1366.2,288L1366.2,96L1403.1,96L1403.1,64L1440,64L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z"></path>
</svg>
</div>
</div>
<div className='rowM'>
        <div className='break3'>
        </div>
          </div>
          <div className='rowM'>
          <div class="cube-container1">
          <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"  preserveAspectRatio="none">
  <path fill="#1d1d2f" fill-opacity="1" d="M0,64L0,224L65.5,224L65.5,288L130.9,288L130.9,96L196.4,96L196.4,256L261.8,256L261.8,256L327.3,256L327.3,160L392.7,160L392.7,96L458.2,96L458.2,288L523.6,288L523.6,160L589.1,160L589.1,96L654.5,96L654.5,32L720,32L720,224L785.5,224L785.5,160L850.9,160L850.9,0L916.4,0L916.4,192L981.8,192L981.8,256L1047.3,256L1047.3,320L1112.7,320L1112.7,288L1178.2,288L1178.2,64L1243.6,64L1243.6,64L1309.1,64L1309.1,128L1374.5,128L1374.5,224L1440,224L1440,0L1374.5,0L1374.5,0L1309.1,0L1309.1,0L1243.6,0L1243.6,0L1178.2,0L1178.2,0L1112.7,0L1112.7,0L1047.3,0L1047.3,0L981.8,0L981.8,0L916.4,0L916.4,0L850.9,0L850.9,0L785.5,0L785.5,0L720,0L720,0L654.5,0L654.5,0L589.1,0L589.1,0L523.6,0L523.6,0L458.2,0L458.2,0L392.7,0L392.7,0L327.3,0L327.3,0L261.8,0L261.8,0L196.4,0L196.4,0L130.9,0L130.9,0L65.5,0L65.5,0L0,0L0,0Z"></path>
</svg>
</div>
</div>

        <div ref={projectsRef} className="rowD">
          <div className='break1' >
            <div className='row10'>
              <h1>My projects</h1>
               </div>
               <div className='row-e'>
      
               <div class="project-card">
  <div class="card-content">
    <img src="/memory.png" alt="memory"></img>
    <div class="project-info">
      <h2>Memory game</h2>
      <p>This was one of my favorit project that I had to make. Its memory game with multiple levels. </p>
    </div>
  </div>
  <a href="https://github.com/Ginca1/memory" class="github-button" target="_blank">GitHub</a>
</div>

   
    <div class="project-card">
  <div class="card-content">
    <img src="/mobile.png" alt="Mobile Game"></img>
    <div class="project-info">
      <h2>Mobile game</h2>
      <p>This was my latest project that I made with 2 more class mates. It is a mobile game with shop and skin mechanics. All created in react native.</p>
    </div>
  </div>
  <a href="https://github.com/KristapsAB/native/tree/main" class="github-button" target="_blank">GitHub</a>
</div>


<div class="project-card">
  <div class="card-content">
    <img src="/shop.png" alt="memory"></img>
    <div class="project-info">
    <h2>Website (Shop)</h2>
    <p>This was one of the first projects that I ever made in react so it's not the best. Basiclly it was suppose to be online shop where you order stuff.</p>
    </div>
  </div>
  <a href="https://github.com/fur1ozz/drogasv2" class="github-button" target="_blank">GitHub</a>
</div>






    
  </div>
  <div className='row-e'>



  <div class="project-card">
  <div class="card-content">
    <img src="/front.png" alt="memory"></img>
    <div class="project-info">
    <h2>Website (Front end)</h2>
    <p>This is my front end project where i made poster into website. </p>
    </div>
  </div>
  <a href="https://github.com/Ginca1/front" class="github-button" target="_blank">GitHub</a>
</div>




<div class="project-card">
  <div class="card-content">
    <img src="/ticket.png" alt="memory"></img>
    <div class="project-info">
    <h2>Website (Tickets)</h2>
        <p>In this project i made website where you can buy tickets for events. And create events with admin priorities.</p>
    </div>
  </div>
  <a href="https://github.com/Ginca1/ticket" class="github-button" target="_blank">GitHub</a>
</div>


  </div>


</div>

               
        </div>
        <div className='row8'>
        <div class="spike-container">
        <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
  <path fill="#1d1d2f" fill-opacity="1" d="M0,192L65.5,96L130.9,224L196.4,64L261.8,32L327.3,96L392.7,128L458.2,224L523.6,160L589.1,160L654.5,256L720,32L785.5,192L850.9,224L916.4,320L981.8,32L1047.3,192L1112.7,96L1178.2,96L1243.6,192L1309.1,32L1374.5,128L1440,128L1440,320L1374.5,320L1309.1,320L1243.6,320L1178.2,320L1112.7,320L1047.3,320L981.8,320L916.4,320L850.9,320L785.5,320L720,320L654.5,320L589.1,320L523.6,320L458.2,320L392.7,320L327.3,320L261.8,320L196.4,320L130.9,320L65.5,320L0,320Z"></path>
</svg>
</div>
</div>
<div className='rowM'>
        <div className='break4'>
        </div>
          </div>
          <div className='rowM'>
          <div class="spike-container1">
          <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
  <path fill="#1d1d2f" fill-opacity="1" d="M0,256L80,160L160,192L240,32L320,32L400,224L480,288L560,64L640,320L720,64L800,96L880,160L960,256L1040,256L1120,224L1200,224L1280,128L1360,160L1440,0L1440,0L1360,0L1280,0L1200,0L1120,0L1040,0L960,0L880,0L800,0L720,0L640,0L560,0L480,0L400,0L320,0L240,0L160,0L80,0L0,0Z"></path>
</svg>
</div>
</div>
        <div   ref={educationRef} className="rowD">
        <div className='break1' >
        <div className='row10'>
              <h1>My education</h1>
               </div>
               <div className='row5'>
                <div className='education'>
                <div className='row'>
                <img className='book' src="/skola.jpg"></img>
                <div className='ed-text'>
                <div className='row2'>
                  <h2 className='educationT' > Elementary Education </h2>
                </div>
                <div className='row5'>
                <h3  className='educationT' >I attended Jāņa Endzelīna Kauguru pamatskola for my elementary education. And I recieved my Elementary Education.  </h3>
                </div>
                </div>
                
                </div>
                </div>
               </div>

               <div className='row5'>
                <div className='education'>
                <div className='row'>
                <img className='book1' src="/vtdt.png"></img>
                <div className='ed-text'>
                <div className='row2'>
                  <h2 className='educationT' > Vocational Education </h2>
                </div>
                <div className='row5'>
                <h3  className='educationT' > I am currently pursuing my vocational education at Vidzeme Technology and Design Vocational school. Currently I'm In the third year of programming.   </h3>
                </div>
                </div>
                
                </div>
                </div>
               </div>

        </div>
        </div>
        <div className='rowM'>
        <div class="c-container">
        <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"  preserveAspectRatio="none">
          <path fill="#1d1d2f" fill-opacity="1" d="M0,192L80,160C160,128,320,64,480,64C640,64,800,128,960,133.3C1120,139,1280,85,1360,58.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
          </path></svg>
          </div>
          </div>

        <div ref={contactRef} style={{width: '100%'}} className="row">
        <div className='breakC' >
               <div className='row5'>
               <div className='contact' >
               <div className='row-l'>
              <h1 className='contactText'>Contact:</h1>
               </div>
               <div className='row'>
               <div className='info'>
               <div className='row-l2'>
                <h3>Facebook: </h3>
                <a href="https://www.facebook.com/toms.ginters.79" target="_blank" rel="noopener noreferrer">
    <img className='icon' src="/Facebook.png" alt="Facebook" />
  </a>
               </div>
               <div className='row-l2'>
                <h3>Instagram: </h3>
                <a href="https://www.instagram.com/g1ncaa/" target="_blank" rel="noopener noreferrer">
                <img className='icon' src="/Instagram.png"></img>
                </a>
               </div>
               <div className='row-l2'>
                <h3>Gmail: ipa21.t.ginters@vtdt.edu.lv </h3>
               </div>
               <div className='row-l2'>
                <h3>Phone:  <img className='icon' src="/phone.png"></img> +371 20216328 </h3>
                
               </div>
               </div>

               <MessageForm />



               </div>
               </div>
        </div>
        </div>
        </div>
        



      </div>
  );
}

export default App;
