 Name: ${emailInput.name} <br> 
    Email: ${emailInput.email} <br> 
    Mobile No: ${emailInput.mobile} <br> 
    Resume: <a href="${imagelist}" target="_blank">${imagelist}</a><br>
    pageUrl: ${window.location.href} 

    <div style='max-width: 40%; margin: 0 auto; padding: 4rem 3rem; background-color: white;'><div style='display:flex; justify-content: center; align-items:center; padding: 2rem 0; border-top: 4px solid #B5DB00;'><img src='https://www.fresharaagroexports.com/assets/Images/career_job.webp' width='343' height='247' /></div><div><p>Hey Team,<br><br>We noticed a new job submission your website. Details Below.<br><br>Name<br><span style='color: #006B9E;'>${emailInput.name}</span><br><br>Email ID<br><span style='color: #006B9E;'>${emailInput.email}</span><br><br>Phone Number<br><span style='color: #006B9E;'>${emailInput.mobile}</span><br></br>Resume<br><span style='color: #006B9E;'><a href='${imagelist}' target='_blank'>${imagelist}</a></span><br><br>Page Url<br><span style='color: #006B9E;'>${window.location.href}</span></p></div></div>


     message: `
                Name: ${emailInput.name} <br> 
                Email: ${emailInput.email} <br> 
                Mobile No: ${emailInput.mobile} <br> 
                Resume: <a href="${imagelist}" target="_blank">${imagelist}</a><br>
                pageUrl: ${window.location.href} 
            `,  - from career