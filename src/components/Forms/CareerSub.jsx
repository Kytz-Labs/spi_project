
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

    const handleChange = (e) => {
        setEmailInput({ ...emailInput, [e.target.name]: e.target.value });
    }

    const sendEmail =async(event)=>{
        event.preventDefault();
        console.log(event);
        if (submit) return;
        setSubmit(true)
        setContactform(true);

        const body = {
          to: "lourdushelton@gmail.com",
          cc: "sathishkumar@venzotechnologies.com",
          message: " Name:" + " " + emailInput["name"] + " " + " <br> Email:" + " " + emailInput["email"] + " " + " <br> Mobile No:" + " " + emailInput["mobile"] + " " + " <br> Resume:" + " " + imagelist,
          subject: "Venzo Careers Form",
        }
        const apicall = setTimeout(async () => {
            const emailResponse = await axios.post("https://sendmailsgen-ramjyh2hea-uc.a.run.app", body);
                setEmailInput(
                { name: "",
                email: "",
                mobile: ""}
            )
            document.querySelector(".enquire_thnkmss").style.display="flex";
            setSubmitSuccess(true);
        }, 4000);
        document.getElementById("submitbtn").innerHTML="<div class='animate-pulse'>Processing</div>";
        try {
            // If the email sending is successful, setSubmitSuccess to true
            // setSubmitSuccess(true);
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
                document.querySelector(".enquire_thnkmss").style.display="none";
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [submitSuccess]);
  return (
    <div class="contact-form-section flex-1 lg:py-8 bg-[#232323]">
        {/* <!-- contact form --> */}
        <div class="enquire_contact_form" id="enquire_popup_form">
            <div class="form_section">
                <div class="contact_heading pb-4 text-center">{position}</div>
                <div class="post-date pb-6 text-start mb-12">Please complete the form below to apply for this position</div>
                <form onSubmit={sendEmail} id="w3form" method="POST" >
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
                        <div class="line w-full flex items-center justify-center border border-[#FFFFFF1F] p-10">
                            <label for="file-input" class="upload-label text-center">
                                <span class="upload-text">Upload a file</span> or Drag and drop here
                                <div class="opacity-50 text-center">Accepted files: pdf, doc, docx, jpeg, and png up to 10MB</div>
                            </label>
                            <input type="file" id="file-input" class="file-input" accept='.pdf , .doc , .docx' onChange={sendFile} />
                        </div>
                        <div class="flex justify-center w-full">
                            <button class="apply_now mt-10 px-12 py-2" id="submitbtn">Submit</button>
                        </div>
                    </div>
                    <div id="message" class="text-red-500 pt-4"></div>
                    <div class="terms_condition hidden">
                        By clicking send, you accept our <a href="">privacy policy</a> Prefer email? <a href="mailto:hello@kytz.in">hello@kytz.in</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
