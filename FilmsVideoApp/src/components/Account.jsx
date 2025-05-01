// src/components/Account.jsx
import React from "react";
import "./Account.css"; // (optional) create a matching CSS file for styling

const Account = () => {
  return (
    <div className="account-container">
      <h1>My Account</h1>

      <p>
        Welcome to your Account page! Here you can:
      </p>
      <ul>
        <li>Update personal information</li>
        <li>Change your password</li>
        <li>Manage payment methods</li>
        <li>View your order history</li>
        <li>And more...</li>
      </ul>
      <p>
        (You can expand this page with more fields or forms as needed.)
      </p>
    </div>
  );
};

export default Account;
