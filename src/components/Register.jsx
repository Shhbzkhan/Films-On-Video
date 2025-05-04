// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // YYYY-MM-DD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted - starting registration process");
    setError("");

    // 1️⃣ Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      console.log("Validation failed: Passwords don't match");
      return;
    }
    if (!dateOfBirth) {
      setError("Please enter your date of birth.");
      console.log("Validation failed: Missing date of birth");
      return;
    }

    setLoading(true);
    console.log("Attempting to sign up user with email:", email);

    // 2️⃣ Sign up the user, with redirect back to /login after email confirm
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      { email, password },
      { redirectTo: `${window.location.origin}/login` }
    );
    
    console.log("Sign up response:", signUpData);
    console.log("Sign up error (if any):", signUpError);
    
    if (signUpError) {
      setError(signUpError.message);
      console.log("Sign up failed with error:", signUpError.message);
      setLoading(false);
      return;
    }

    // 3️⃣ If no session returned, email confirmation is required → stop here
    if (!signUpData.session) {
      console.log("No session returned - email confirmation required");
      alert(
        "Registration successful! Please check your email to confirm your account, then log in."
      );
      setLoading(false);
      navigate("/login", { replace: true });
      return;
    }

    // 4️⃣ We have a session (i.e. confirmations disabled) → insert profile
    const userId = signUpData.session.user.id;
    console.log("Session exists - attempting to insert customer with ID:", userId);
    console.log("Customer data to insert:", {
      id: userId,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
    });
    
    const { data: insertData, error: profileError } = await supabase
      .from("customers")
      .insert([
        {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
        },
      ]);
    
    console.log("Insert response data:", insertData);
    console.log("Insert error (if any):", profileError);

    if (profileError) {
      setError("Profile save failed: " + profileError.message);
      console.log("Profile save failed with error:", profileError.message);
      setLoading(false);
      return;
    }

    // 5️⃣ Done! Navigate to login or home
    console.log("Registration complete - navigating to login page");
    setLoading(false);
    navigate("/login", { replace: true });
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
      }}
    >
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>

        <label>
          Date of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "1rem", width: "100%" }}
        >
          {loading ? "Creating…" : "Register"}
        </button>
      </form>
    </div>
  );
}
