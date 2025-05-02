// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName]         = useState("");
  const [lastName, setLastName]           = useState("");
  const [dateOfBirth, setDateOfBirth]     = useState(""); // YYYY-MM-DD
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1) Client‐side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!dateOfBirth) {
      setError("Please enter your date of birth.");
      return;
    }

    setLoading(true);

    // 2) Sign up the user
    //    If email confirmations are enabled, `data.session` will be null.
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 3) If no session returned, email confirmation is required
    if (!signUpData.session) {
      alert(
        "Registration successful! Please check your email to confirm your account before logging in."
      );
      setLoading(false);
      navigate("/login", { replace: true });
      return;
    }

    // 4) We got a session back → user is already confirmed/auto-logged-in.
    const userId = signUpData.session.user.id;

    // 5) Insert the customer profile
    const { error: profileError } = await supabase
      .from("customers")
      .insert([
        {
          id:            userId,
          first_name:    firstName,
          last_name:     lastName,
          date_of_birth: dateOfBirth,
        },
      ]);

    if (profileError) {
      setError("Profile save failed: " + profileError.message);
      setLoading(false);
      return;
    }

    // 6) Done!
    setLoading(false);
    navigate("/", { replace: true });
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
