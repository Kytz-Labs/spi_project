{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}
import "../newform.css"
import "../form.css"
import React, { useState, useEffect } from 'react'
import { v4 } from "uuid"
import { storage } from '../../firebase/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { EmailAuthCredential } from "firebase/auth/web-extension"
import axios from "axios"


export default function Career() {
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
        // if (submit) return;
        setSubmit(true)
        setContactform(true);

        const body = {
          to: "lourdushelton@gmail.com",
          cc: "sathishkumar@venzotechnologies.com",
          message: " Name:" + " " + emailInput["name"] + " " + " <br> Email:" + " " + emailInput["email"] + " " + " <br> Mobile No:" + " " + emailInput["mobile"] + " " + " <br> Resume:" + " " + imagelist,
          subject: "SPI Career Form",
        }
        const apicall = setTimeout(async () => {
                const emailResponse = await axios.post("https://sendmailsgen-ramjyh2hea-uc.a.run.app", body);
                setEmailInput(
                { name: "",
                email: "",
                mobile: "",
                message: ""}
            )
            document.getElementById("submitbtn").innerHTML="Submit";
            document.getElementById("enquire_popup_form").style.display="none";
            document.querySelector(".enquire_thnkmss").style.display="block";
            setSubmitSuccess(true);
        }, 8000);
        
        document.getElementById("submitbtn").innerHTML="<div className='animate-pulse'>Processing</div>";
        try {
            // If the email sending is successful, setSubmitSuccess to true
            
        } catch (error) {
            console.error("Error sending email:", error);
            // Handle the error if needed
        }
        finally {
            setSubmit(false); // Reset submit state of success or failure
           
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
                document.getElementById("enquire_popup_form").style.display="block";
                document.querySelector(".enquire_thnkmss").style.display="none";
                document.getElementById("enquire_form").style.display="none";
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [submitSuccess]);

  return (
        <div className="fixed hidden inset-0 backdrop-blur-2xl overflow-y-auto h-full w-full justify-center items-center" id="enquire_form">
            <div className="relative shadow-lg w-11/12 rounded-md">
                { /* <!-- contact form --> */ }
                <div className="enquire_contact_form" id="enquire_popup_form">
                    { /* <!-- close button --> */ }
                    <div className="absolute top-4 right-0 m-6 kytz_form_close lg:max-w-[60%]" style={{ zIndex: "1" }}>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" stroke="white">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="">
                        <div className="inner-layer bg-[#1B1B1B] flex lg:flex-row flex-col gap-12">
                            <div className="lg:flex hidden">
                                <div className="">
                                    <img src="/career_image.webp" alt="IT Professional" width="189px" height="100%" />
                                </div>
                            </div>
                            <div className="flex-1 px-8 lg:py-0 py-10">
                                <div className="form_title my-8">
                                    Hiring Made Easy with <span className="text-[#B5DB00]">SPI</span>
                                </div>
                                { /* <!-- contact form --> */ }
                                <div className="self-center contact_form" id="upload_form">
                                    <div className="form_section">
                                        <form onSubmit={sendEmail} id="w3form" method="POST" className="w-full" >
                                            <div className="flex lg:flex-row flex-wrap flex-col gap-4">
                                                <div className="upload lg:w-[30%]">
                                                    <input type="text" name="name" className="upload_field" value={emailInput["name"]} onChange={handleChange} maxLength="255" placeholder="Enter Name*" />
                                                </div>
                                                <div className="upload lg:w-[30%]">
                                                    <input type="email"  autoComplete="off" maxLength="255" name="email" value={emailInput["email"]} onChange={handleChange} className="upload_field" style={{Color: "white"}} id="Kemail" placeholder="Enter Email" required />
                                                </div>
                                                <div className="lg:w-[30%]">
                                                    <input type="text" autoComplete="off" name="mobile" value={emailInput["mobile"]} onChange={handleChange} maxLength="18" id="Knumber" className="upload_field" style={{color: "white"}} placeholder="Phone Number" required />
                                                </div>
                                                <div className="upload lg:w-[60%]">
                                                    <input type="text" className="upload_field" name="message" value={emailInput["message"]} id="message" placeholder="Enter Job Title" onChange={handleChange} />
                                                    {/* <span className="uploaderror" id="message_upload_err"> </span> */}
                                                </div>
                                                <div className="upload lg:w-[35%]">
                                                    <input type="file" className="upload_field" autoComplete="off" style={{ color: "white"}} accept='.pdf , .doc , .docx' placeholder='choose file' onChange={sendFile} required />
                                                    <span className="uploaderror" id="file_upload_err"> </span>
                                                </div>
                                            </div>
                                            <div>
                                                <button id="submitbtn" className="branding-stroke-button inline-flex gap-3 items-center self-start fotnt-[Atkinson Hyperlegible] px-20" style={{ backgroundColor : "#B5DB00", Color : "black", Cursor: "pointer" }}>
                                                    submit
                                                </button>
                                            </div>
                                        </form> 
                                        <div id="message" className="text-white pt-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- thank messaage --> */}
                <div class="enquire_thnkmss text-center bg-white lg:max-w-[60%] mx-auto">
                    { /* <!-- close button --> */ }
                    <div className="absolute top-4 right-0 m-6 kytz_form_close lg:max-w-[60%]" style={{ zIndex: "1" }}>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" stroke="white">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                            </svg>
                        </button>
                    </div>
                    <h3 class="text-2xl leading-6 font-medium text-gray-900" style={{ lineHeight:"2rem"}}>Thank you for reaching out to us! We have received your enquiry and are thrilled to learn more about your interest. </h3>
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