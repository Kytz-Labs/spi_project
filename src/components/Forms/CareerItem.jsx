
import "./formsub.css"
import React, { useState, useEffect } from 'react'
import { v4 } from "uuid"
import { storage } from '../../firebase/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { EmailAuthCredential } from "firebase/auth/web-extension"
import axios from "axios"

export default function CareerSub({position}) {
    const [submit, setSubmit] = useState(false);
    const [imagelist, setImagelist] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [contactF, setContactform ] = useState(false);
    const [emailInput, setEmailInput] = useState({
      name: "",
      email: "",
      mobile: "",
    });

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [uploading, setUploading] = useState(false); // State to manage file upload loader

    const [ subColor, setColor ] = useState("#141414");
    const [ bgColor, setBg ] = useState("#B5DB00");

    const handleChange = (e) => {
        setEmailInput({ ...emailInput, [e.target.name]: e.target.value });
    }

    const sendEmail =async(event)=>{
        event.preventDefault();
        if (submit || uploading) return; 
        if (submit) return;
        setSubmitSuccess(true)
        setContactform(true);
        setColor("white"); 
        setBg("#006B9E"); 

        const body = {
            access_key: "1aa1acd7-f60e-4bc9-a9a0-0029b1c66c02", // Make sure this is correct
            subject: "SPI Career Form",
            from_name: "SPI Career Form",
            name : emailInput.name,
            email : emailInput.email,
            mobile: emailInput.mobile,
            resume : `${imagelist}`,
            page_url : `${window.location.href}`
        };
    
        // document.getElementById("submitbtn").innerHTML="<div class='animate-pulse'>Processing</div>";

        try {
            const emailResponse = await axios.post(
                "https://api.web3forms.com/submit",
                body,
                {
                    headers: {
                      'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                  }
            );
              setEmailInput({
                name: "",
                email: "",
                mobile: "",
              });
              document.querySelector(".enquire_thnkmss").style.display = "flex";
              const fileInput = document.getElementById('fileInput');
              fileInput.value = '';
              document.getElementById('file_upload_err').textContent = '';
              document.querySelector(".enquire_thnkmss").style.display="flex";
              setSubmitSuccess(true);
        } catch (error) {
            console.error("Error sending email:", error);
        }
        finally {
            // setSubmit(false); // Reset submit state of success or failure
            // document.getElementById("submitbtn").innerHTML="Submit";
        }
    }

   const sendFile = (e) => {
       if (!e.target.files[0]) return; // Prevent errors if no file is selected
   
       setUploading(true);
       const file = e.target.files[0];
       
       const imageRef = ref(storage, `uploads/${file.name}-${v4()}`); 
   
       uploadBytes(imageRef, file)
           .then((snapshot) => 
               getDownloadURL(snapshot.ref)
           )
           .then((url) => {
               setImagelist(url);
               setUploading(false);
           })
           .catch((error) => {
               console.error("File upload error:", error);
               setUploading(false);
           });
   };

    useEffect(() => {
        if (imagelist) {
            console.log("Updated imagelist:", imagelist);
        }
        
        if (submitSuccess) {
            
            const timeoutId = setTimeout(() => {
                setContactform(false);
                setSubmitSuccess(false);
                setColor("white"); 
                setBg("#006B9E"); 
                document.querySelector(".enquire_thnkmss").style.display="none";
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [submitSuccess, imagelist]);

  return (
    <div class="contact-form-section flex-1 lg:py-8 bg-[#232323]">
        {/* <!-- contact form --> */}
        <div class="enquire_contact_form" id="enquire_popup_form">
            <div class="form_section lg:px-16">
                <div class="contact_heading pb-4 text-center lg:px-0 px-8">{position}</div>
                <div class="post-date pb-6 text-start mb-12 lg:px-0 px-8">Please complete the form below to apply for this position</div>
                <form onSubmit={sendEmail} id="w3form" method="POST" class="lg:px-0 px-8" >
                    <div class="flex lg:flex-row flex-wrap gap-5 flex-col justify-between form_datas">
                        <div class="line flex-none w-full pb-5">
                            <label class="new_label pb-3">Full Name<span class="required text-red-500">*</span></label>
                            <input type="text" class="line_field" id="Kname" value={emailInput["name"]} onChange={handleChange} name="name" maxlength="255" placeholder="Enter full name*" required />
                        </div>
                        <div class="line flex-none w-full pb-5">
                            <label class="new_label pb-3">Email Address<span class="required text-red-500">*</span></label>
                            <input type="email" class="line_field" id="Kemail" value={emailInput["email"]} onChange={handleChange} maxlength="40" name="email" placeholder="Enter bussiness email*" />
                        </div>
                        <div class="line flex-1 pb-5">
                            <label class="new_label pb-3">Phone Number<span class="required text-red-500">*</span></label>
                            <input type="text" name="mobile" maxlength="18" id="Knumber" value={emailInput["mobile"]} onChange={handleChange} class="line_field" placeholder="Enter phone number*" required />
                        </div>
                        <div class="line w-full">
                            <div class="new_label pb-3">Attach CV or Resume<span class="required text-red-500">*</span></div>
                            <div class="flex items-center justify-center border border-[#FFFFFF1F] p-10">
                                <label for="file-input" class="upload-label text-center">
                                    {/* <span class="upload-text">Upload a file</span> or Drag and drop here */}
                                    <div class="opacity-50 text-center lg:block hidden">Accepted files: pdf, doc, docx up to 10MB</div>
                                    <input type="file" className="upload_field lg:w-full w-[50%]" autoComplete="off" style={{ color: "white"}} accept='.pdf , .doc , .docx' placeholder='choose file' id="fileInput" onChange={sendFile} required />
                                </label>
                            </div>
                            {uploading && (
                                <div className="text-center font-[500] text-white mt-2 animate-pulse">
                                    Uploading file...
                                </div>
                            )}
                        </div>
                        <div class="flex justify-center w-full">
                            <button class={`apply_now mt-10 px-12 py-2 hover:bg-[#006B9E] hover:text-white bg-[${bgColor}] text-[${subColor}]`} style={{ Cursor: "pointer" }} id="submitbtn">
                                { submitSuccess ? <div class='animate-pulse'>Processing</div> : "Submit"}
                            </button>
                        </div>
                    </div>
                    <div id="message" class="text-red-500 pt-4"></div>
                </form>
            </div>
        </div>
    </div>
  )
}
