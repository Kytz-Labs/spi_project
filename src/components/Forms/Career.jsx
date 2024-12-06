

{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}
import "../newform.css"
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

        if (submit) return;
        setSubmit(true)
        setContactform(true);

        const body = {
          to: "lourdushelton@gmail.com",
          cc: "sathishkumar@venzotechnologies.com",
          message: " Name:" + " " + emailInput["name"] + " " + " <br> Email:" + " " + emailInput["email"] + " " + " <br> Mobile No:" + " " + emailInput["mobile"] + " " + " <br> Resume:" + " " + imagelist,
          subject: "SPI Pulic Sector Form",
        }
        const apicall = setTimeout(async () => {
            const emailResponse = await axios.post("https://sendmailsgen-ramjyh2hea-uc.a.run.app", body);
                setEmailInput(
                { name: "",
                email: "",
                mobile: ""}
            )
            document.querySelector(".enquire_thnkmss").style.display="flex";
            setSubmit(false); 
            setSubmitSuccess(true);
        }, 8000);
        // document.getElementById("submitbtn").innerHTML="<div class='animate-pulse'>Processing</div>";
        try {
            // If the email sending is successful, setSubmitSuccess to true
            // setSubmitSuccess(true);
        } catch (error) {
            console.error("Error sending email:", error);
            // Handle the error if needed
        }
        finally {
            // setSubmit(false); // Reset submit state of success or failure
            // document.getElementById("submitbtn").innerHTML="Submit";
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
    <div className="lg:px-16 px-8 pb-20 bg-black lg:pt-0 pt-12">
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
                        <form onSubmit={sendEmail} id="w3form" method="POST" class="w-full" enctype="multipart/form-data" >
                            <div className="flex lg:flex-row flex-wrap flex-col gap-4">
                                <div className="upload lg:w-[30%]">
                                    <input type="text" className="upload_field" name="name" value={emailInput["name"]} onChange={handleChange} maxLength="255" placeholder="Enter Name*" required/>
                                </div>
                                <div className="upload lg:w-[30%]">
                                    <input type="text"  autoComplete="off" maxLength="255" name="email" value={emailInput["email"]} onChange={handleChange} className="upload_field" style={{Color: "white"}} id="Kemail" placeholder="Enter Email" />
                                </div>
                                <div className="lg:w-[30%]">
                                    <input type="text" autoComplete="off" name="mobile" value={emailInput["mobile"]} onChange={handleChange} maxLength="18" id="Knumber" className="upload_field" style={{color: "white"}} placeholder="Phone Number" required />
                                </div>
                                <div className="upload lg:w-[60%]">
                                    <input type="text" autoComplete="off" className="upload_field" id="uploadMessage" value={emailInput["message"]} onChange={handleChange} name="message" placeholder="Enter Job Title" />
                                    <span className="uploaderror" id="message_upload_err"> </span>
                                </div>
                                <div className="upload lg:w-[35%]">
                                    <input type="file" className="upload_field" autoComplete="off" style={{ color: "white"}} accept='.pdf , .doc , .docx' placeholder='choose file' onChange={sendFile} required />
                                    <span className="uploaderror" id="file_upload_err"> </span>
                                </div>
                            </div>
                            <div>
                                <button id="submitbtn" className="branding-stroke-button inline-flex gap-3 items-center self-start fotnt-[Atkinson Hyperlegible] px-20" style={{ backgroundColor : "#B5DB00", Color : "black", Cursor: "pointer" }}>
                                    { submit ? <div class='animate-pulse'>Processing</div> : "submit"}
                                </button>
                            </div>
                        </form>
                        <div id="message" className="text-white pt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

//  <div className="lg:px-16 px-8 pb-20 bg-black lg:pt-0 pt-12">
//     <div className="inner-layer bg-[#1B1B1B] flex lg:flex-row flex-col gap-12">
//         <div className="lg:flex hidden">
//             <div className="">
//                 <img src="/career_image.webp" alt="IT Professional" width="189px" height="100%">
//             </div>
//         </div>
//         <div className="flex-1 px-8 lg:py-0 py-10">
//             <div className="form_title my-8">
//                 Hiring Made Easy with <span className="text-[#B5DB00]">SPI</span>
//             </div>
//             <!-- contact form -->
//             <div className="self-center contact_form" id="upload_form">
//                 <div className="form_section">
//                     <form className="apply_form" id="applyform" enctype="multipart/form-data" method="post">
//                         <div className="flex lg:flex-row flex-wrap flex-col gap-4">
//                             <div className="upload lg:w-[30%]">
//                                 <input type="text" className="upload_field" id="uploadName" name="uploadName" placeholder="Enter Name">
//                                 <span className="uploaderror" id="username_upload_err"> </span>
//                             </div>
//                             <div className="upload lg:w-[30%]">
//                                 <input type="text" className="upload_field" id="uploadEmail" name="uploadEmail" placeholder="Enter Email">
//                                 <span className="uploaderror" id="email_upload_err"> </span>
//                             </div>
//                             <div className="upload lg:w-[30%]">
//                                 <input type="text" className="upload_field" id="uploadNumber" name="uploadNumber" placeholder="Enter Phone Number">
//                                 <span className="uploaderror" id="mobile_upload_err"> </span>
//                             </div>
//                             <div className="upload lg:w-[60%]">
//                                 <input type="text" className="upload_field" name="uploadMessage" id="uploadMessage" placeholder="Enter Job Title">
//                                 <span className="uploaderror" id="message_upload_err"> </span>
//                             </div>
//                             <div className="upload lg:w-[35%]">
//                                 <input type="file" className="upload_field" name="attachment" id="attachment" placeholder="Attach File">
//                                 <span className="uploaderror" id="file_upload_err"> </span>
//                             </div>
//                         </div>
//                     </form>
//                     <div>
//                         <button id="uploadbtn" type="button" className="branding-stroke-button inline-flex gap-3 items-center self-start fotnt-[Atkinson Hyperlegible] px-20" style="background-color: #B5DB00; color: black; cursor: pointer;">
//                             Submit
//                         </button>
//                     </div>
//                     <div id="message" className="text-white pt-4"></div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
{/* <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js"></script> */}
{/* <script> */}
    {/* function uploadfunction() {
        $("#uploadName").on("input", function() {
            uploaduser();
        })
        $("#uploadEmail").on("input", function() {
            uploademail();
        })
        $('#uploadNumber').on('input', function () {
            uploadmobile();
        });
        $('#uploadMessage').on('input', function () {
            uploadmessage();
        });
        $('#attachment').on('input', function () {
            uploadfile();
        });

        $('#uploadbtn').click(function () {
            if (!uploaduser() && !uploademail() && !uploadmobile() && !uploadfile() && !uploadmessage() ) {
                $("#message").html(`<div className="alert alert-warning">Please fill all required field</div>`);
            } else if (!uploaduser() || !uploademail() || !uploadmobile() || !uploadfile() || !uploadmessage() ) {
                $("#message").html(`<div className="alert alert-warning">Please fill all required field</div>`);
            } else{
                var form = $('#applyform')[0];
                var data = new FormData(form);

                $.ajax({
                    type: "post",
                    url: "./phpmailer/submit.php",
                    data: data,
                    processData: false,
                    contentType: false,
                    cache: false,
                    async: true,
                    beforeSend: function() {
                        $('#uploadbtn').html('<img className="animate-spin" src="../assets/Images/spinner.png">');
                        $('#uploadbtn').attr("disabled", true);
                    },
                    success: function( data ) {
                        console.log(data);
                        $('#applyform').trigger("reset");
                        $('#uploadbtn').html('Submit');
                        $('#uploadbtn').attr("disabled", false);
                        
                        if(data == "upload pdf or word formate"){
                            $("#file_upload_err").html(data);
                        }else{
                            $(".contact_form").css({display: "none"});
                            $(".thnkmss").css({display: "block"});
                            setTimeout(() => {
                                location.reload();
                            }, 5000);
                        }
                    }
                })
            }
        })

        function uploaduser() {
            var pattern = /^[a-zA-Z\s]+$/;
            var user = $('#uploadName').val();
            var validuser = pattern.test(user);
            if(!($("#uploadName").val())){
                $("#username_upload_err").html("field required");
                return false;
            }
            else if ($('#uploadName').val().length < 4) {
                $('#username_upload_err').html('username length is too short');
                return false;
            } else if (!validuser) {
                $('#username_upload_err').html('username should be a-z ,A-Z only');
                return false;
            } else {
                $('#username_upload_err').html('');
                return true;
            }
        }
        function uploademail() {
            var pattern1 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            var email = $('#uploadEmail').val();
            var validemail = pattern1.test(email);
            if (email == "") {
                $('#email_upload_err').html('required field');
                return false;
            } else if (!validemail) {
                $('#email_upload_err').html('invalid email');
                return false;
            } else {
                $('#email_upload_err').html('');
                return true;
            }
        }
        function uploadmobile() {
            if(!($("#uploadNumber").val())){
                $("#mobile_upload_err").html("field required");
                return false;
            }
            if (!$.isNumeric($("#uploadNumber").val())) {
                $("#mobile_upload_err").html("only number is allowed");
                return false;
            } else if ($("#uploadNumber").val().length != 10) {
                $("#mobile_upload_err").html("10 digit required");
                return false;
            }
            else {
                $("#mobile_upload_err").html("");
                return true;
            }
        }
        function uploadfile() {

            if(!($("#attachment").val())){
                $("#file_upload_err").html("field required");
                return false;
            }else {
                $("#file_upload_err").html("");
                return true;
            }
        }
        function uploadmessage() {
            if(!($("#uploadMessage").val())){
                $("#message_upload_err").html("field required");
                return false;
            }else {
                $("#message_upload_err").html("");
                return true;
            }
        }
    }

    $("#Dclose").click(() => {
        $('#applyform').trigger("reset");
        $("#username_upload_err").html("");
        $("#email_upload_err").html("");
        $("#mobile_upload_err").html("");
        $("#message_upload_err").html("");
        $("#file_upload_err").html("");
        $("#message").html("");
        $(".thnkmss").css({display:"none"});
        $(".contact_form").css({display:"block"});
    })

    uploadfunction(); */}
{/* </script> */}