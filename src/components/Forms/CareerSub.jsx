
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
            to: "sales@spius.net",
            cc: "venzotechnologies@gmail.com",
          message: `<table style='max-width: 80%; margin: 0 auto; padding: 4rem 3rem' width="100%" cellspacing="0" cellpadding="0"><tr><td style="border-top:6px solid #B5DB00; padding: 20px;"><div><p>Hey Team,<br><br>We noticed a new job submission on your website. Details Below.<br><br>Name<br><span style="color: #006B9E;">${emailInput.name}</span><br><br>Email ID<br><span style="color: #006B9E;">${emailInput.email}</span><br><br>Phone Number<br><span style="color: #006B9E;">${emailInput.mobile}</span><br><br>Resume<br><span style="color: #006B9E;"><a href='${imagelist}' target='_blank'>${imagelist}</a></span><br><br>Page Url<br><span style="color: #006B9E;">${window.location.href}</span></p></div></td></tr></table>  `,
          subject: "SPI - Careers Enquiry",
        }
    
        // document.getElementById("submitbtn").innerHTML="<div class='animate-pulse'>Processing</div>";

        try {
            const emailResponse = await axios.post(
                "https://sendmailsgen-ramjyh2hea-uc.a.run.app",
                body
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

    const sendFile =(e)=>{
        setUploading(true);
        setImageUpload(e.target.files[0])
        const imageRef = ref(storage, `venzofile/${e.target.files[0].name + v4()}`)
    
        uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImagelist(url);
            setUploading(false);
          })
        })
        .catch((error) => {
            console.error("File upload error:", error);
            setUploading(false); // Ensure uploading state is reset on error
        });
    }

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
                    <input type="hidden" name="access_key" value="eef15f7d-f8da-4e00-a000-c362e14eb7c0" />
                    <input type="hidden" name="from_name" value="Kytz Enquiry" />
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
                                    <div class="opacity-50 text-center lg:block hidden">Accepted files: pdf, doc, docx, jpeg, and png up to 10MB</div>
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
