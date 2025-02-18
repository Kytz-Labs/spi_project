import { useEffect, useState } from "react";

export default function ErrorPage() {
  const [error, setError] = useState(404);
  const [errorTitle, setErrorTitle] = useState("WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND!");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorCode = parseInt(urlParams.get("status")) || 404;
    setError(errorCode);

    let title = "WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND!";
    if (errorCode === 400) title = "Bad Request!";
    else if (errorCode === 401) title = "Unauthorized!";
    else if (errorCode === 403) title = "Forbidden!";
    else if (errorCode === 500) title = "Internal Server Error!";

    setErrorTitle(title);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center error_bg">
      <div className="error_box w-3/6 bg-orange shadow-lg rounded-lg p-10 bg-[#006B9E]">
        <div className="error_code text-[50px] text-white text-center p-5 font-[700] animate-pulse">{error}</div>
        <div className="error_title text-[20px] text-slate-100 text-center">{errorTitle}</div>
        <div className="redirect_button flex justify-between pt-5">
          <a className="text-[16px] font-[400] text-white underline" href="/">Home</a>
          <a className="text-[16px] font-[400] text-white underline" href="/contact-us">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
