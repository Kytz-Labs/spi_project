{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}
import "../newform.css"
import "../form.css"
import React, { useState, useEffect } from 'react'
import axios from "axios";

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

    const sendEmail =async (event)=>{
        event.preventDefault();
        if (submit) return;
        setSubmit(true)
        setContactform(true);

        const body = {
          to: "lourdushelton@gmail.com",
          cc: "sathishkumar@venzotechnologies.com",
          message: " Name:" + " " + emailInput["name"] + " " + " <br> Email:" + " " + emailInput["email"] + " " + " <br> Mobile No:" + " " + emailInput["mobile"] + " " + " <br> Resume:" + " " + imagelist,
          subject: "SPI Career Form",
        }
        const emailResponse = await axios.post("https://xxx.app", body);
            setEmailInput(
            { name: "",
            email: "",
            mobile: "",
            message: ""}
        )
        document.getElementById("submitbtn").innerHTML="<div className='animate-pulse'>Processing</div>";
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
        <div className="fixed hidden inset-0 backdrop-blur-2xl overflow-y-auto h-full w-full justify-center items-center" id="enquire_form">
            <div className="relative shadow-lg w-11/12 rounded-md">
                { /* <!-- close button --> */ }
                <div className="absolute top-4 right-0 m-6 kytz_form_close" style={{ zIndex: "1" }}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" stroke="white">
                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                        </svg>
                    </button>
                </div>
                { /* <!-- contact form --> */ }
                <div className="enquire_contact_form" id="enquire_popup_form">
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
                                        <form onSubmit={sendEmail} id="w3form" method="POST" class="w-full" >
                                            <div>
                                                <button id="submitbtn" type="submit" className="branding-stroke-button inline-flex gap-3 items-center self-start fotnt-[Atkinson Hyperlegible] px-20" style={{ backgroundColor : "#B5DB00", Color : "black", Cursor: "pointer" }}>
                                                    Submit
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
            </div>
        </div>
    )
}