import React from 'react'

export default function SamplePage() {

    
    const sendEmail =async(event)=>{
        console.log("hello", event);
        event.preventDefault();
        return
    }

    return (
        <div>
            <form onSubmit={sendEmail} id="w3form" method="POST" className="w-full" >
                {/* <div className="flex lg:flex-row flex-wrap flex-col gap-4">
                    <div className="upload lg:w-[30%]">
                        <input type="text" className="upload_field" value={emailInput["name"]} onChange={handleChange} maxLength="255" placeholder="Enter Name*" required/>
                    </div>
                    <div className="upload lg:w-[30%]">
                        <input type="text"  autoComplete="off" maxLength="255" name="email" value={emailInput["email"]} onChange={handleChange} className="upload_field" style={{Color: "white"}} id="Kemail" placeholder="Enter Email" />
                    </div>
                    <div className="lg:w-[30%]">
                        <input type="text" autoComplete="off" name="mobile" value={emailInput["mobile"]} onChange={handleChange} maxLength="18" id="Knumber" className="upload_field" style={{color: "white"}} placeholder="Phone Number" required />
                    </div>
                    <div className="upload lg:w-[60%]">
                        <input type="text" className="upload_field" name="uploadMessage" id="uploadMessage" placeholder="Enter Job Title" />
                        <span className="uploaderror" id="message_upload_err"> </span>
                    </div>
                    <div className="upload lg:w-[35%]">
                        <input type="file" className="upload_field" autoComplete="off" style={{ color: "white"}} accept='.pdf , .doc , .docx' placeholder='choose file' onChange={sendFile} required />
                        <span className="uploaderror" id="file_upload_err"> </span>
                    </div>
                </div> */}
                <div>
                    <button id="submitbtn" className="branding-stroke-button inline-flex gap-3 items-center self-start fotnt-[Atkinson Hyperlegible] px-20" style={{ backgroundColor : "#B5DB00", Color : "black", Cursor: "pointer" }}>
                        submit
                    </button>
                </div>
            </form> 
        </div>
    )
}
