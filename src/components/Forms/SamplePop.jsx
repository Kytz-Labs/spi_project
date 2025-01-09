
// import Close from "../../../public/assets/close_btn.svg"
import "../../pages/form.css"
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { v4 } from "uuid"
import { storage } from '../../firebase/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export default function CareerForm() {
    const [submit, setSubmit] = useState(false);
    const [imagelist, setImagelist] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [contactF, setContactform ] = useState(false);
    const [emailInput, setEmailInput] = useState({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setEmailInput({ ...emailInput, [e.target.name]: e.target.value });
    }

    const sendEmail =async(event)=>{
        event.preventDefault();
        if (submit) return;
        setSubmit(true)
        setContactform(true);

        const body = {
          to: "sales@spius.net",
          cc: "sathishkumar@venzotechnologies.com",
          message: " Name:" + " " + emailInput["name"] + " " + " <br> Email:" + " " + emailInput["email"] + " " + " <br> Mobile No:" + " " + emailInput["mobile"] + " " + " <br> Resume:" + " " + imagelist,
          subject: "Venzo Careers Form",
        }
        const emailResponse = await axios.post("https://sendmailsgen-ramjyh2hea-uc.a.run.app", body);
        //  console.log(emailResponse)
            setEmailInput(
            { name: "",
            email: "",
            mobile: "",
            message: ""}
        )
        console.log(emailResponse);
        document.getElementById("submitbtn").innerHTML="<div class='animate-pulse'>Processing</div>";
        try {
            // If the email sending is successful, setSubmitSuccess to true
            setSubmitSuccess(true);
        } catch (error) {
            console.error("Error sending email:", error);
            // Handle the error if needed
        }
        finally {
            setSubmit(false); // Reset submit state of success or failure
            document.getElementById("submitbtn").innerHTML="Submit";
        }
    }

    const sendFile =(e)=>{
        setImageUpload(e.target.files[0])
        const imageRef = ref(storage, `venzofile/${e.target.files[0].name + v4()}`)
    
        uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImagelist(url);
          })
        })
    }

    useEffect(() => {
        if (submitSuccess) {
          
          const timeoutId = setTimeout(() => {
            setContactform(false);
            setSubmitSuccess(false);
          }, 5000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [submitSuccess]);

  return (
    <div className="fixed inset-0 backdrop-blur-2xl overflow-y-auto h-full w-full justify-center items-center" id="enquire_form" style={{ display: (contactF == true) ? "flex" : "none" }}>
        {/* modal content */}
        <div className="relative shadow-lg lg:w-3/6 w-11/12 rounded-md">
            { /* close button */ }
            {/* <div className="absolute top-0 right-0 p-6 kytz_form_close" style={{zIndex:  (!submitSuccess) ? "none" : "false" }}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" stroke="white">
                        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                    </svg>
                </button>
            </div> */}
            { /* contact form */ }
            <div className="enquire_contact_form w-full" id="enquire_popup_form" style={{ display: (!submitSuccess) ? "flex" : "none"}}>
                <div className="form_section w-full" style={{backgroundColor: "#292364"}}>
                    <div className="contact_heading pb-6">Join our team</div>
                    <form onSubmit={sendEmail} id="w3form" method="POST" class="w-full">
                        <div className="flex lg:flex-row flex-wrap gap-5 flex-col justify-between form_datas">
                            {/* <div className="line w-full">
                                <input type="text" autoComplete="off" className="line_field" style={{color: "white"}} id="Kname" name="name" value={emailInput["name"]} onChange={handleChange} maxLength="255" placeholder="Name*" required />
                            </div> */}
                            {/* <div className="line w-full">
                                <input type="text" className="line_field" style={{color: "white"}} id="Kcompany" maxLength="40" name="company name" placeholder="Company name (optional)" />
                                <span className="error" id="username_err"> </span>
                            </div> */}
                            <div className="line flex-1">
                                <input type="email" autoComplete="off" maxLength="255" name="email" value={emailInput["email"]} onChange={handleChange} className="line_field" style={{color: "white"}} id="Kemail" placeholder="E-mail*" required />
                            </div>
                            <div className="line flex-1">
                                <input type="number" autoComplete="off" name="mobile" value={emailInput["mobile"]} onChange={handleChange} maxLength="18" id="Knumber" className="line_field" style={{color: "white"}} placeholder="Phone Number" required />
                            </div>
                            <div className="line w-full">
                                <input className="line_field" autoComplete="off" style={{ color: "white"}} type="file" accept='.pdf , .doc , .docx' placeholder='choose file' onChange={sendFile} required />
                            </div>
                            {/* <div className="line w-full">
                                <textarea className="line_field" autoComplete="off" style={{color: "white"}} name="message" id="Kmessage" maxLength="500" placeholder="Tell us about your project*" rows="3" value={emailInput["message"]} onChange={handleChange}></textarea>
                                <span className="error" id="message_err"> </span>
                            </div> */}
                            <div className=""><button className="apply_now mt-2 px-12 py-2" id="submitbtn">Submit</button></div>
                        </div>
                        <div id="message"></div>
                    </form>
                </div>
            </div>

            { /* thank messaage */ }
            <div class="enquire_thnkmss text-center bg-white" style={{ display: (!submitSuccess) ? "none" : "block" }}>
                <h3 class="text-2xl leading-6 font-medium text-gray-900 mt-6" style={{ lineHeight: "2rem"}}>Thank you for reaching out to us! We have received your enquiry and are thrilled to learn more about your interest. </h3>
                <div class="mt-2 px-7 py-3">
                    <p class="text-md text-gray-500">
                        Looking forward to connecting with you soon.  
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}


