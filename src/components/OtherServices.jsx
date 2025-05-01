import React from "react";
import "./OtherServices.css"; // optional styling if you want

const OtherServices = () => {
  return (
    <div className="other-services-container">
      {/* Big heading: "Free estimate" */}
      <h1>Free estimate</h1>

      {/* Some info about the services */}
      <p>
        We also provide additional services such as PC repair, mobile phone
        repair, console repair, and other electronics. Our experts will give
        you a free estimate to get your device up and running quickly!
      </p>

      {/* A small list or more detail if you want */}
      <ul>
        <li>PC Repair</li>
        <li>Mobile Repair</li>
        <li>Console Repair</li>
        <li>Other Electronics</li>
      </ul>

      <p>
        Have any issues? Bring your device in, and we’ll diagnose it free of
        charge!
      </p>
    </div>
  );
};

export default OtherServices;
