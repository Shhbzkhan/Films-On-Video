// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1️⃣ Sign in
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // 2️⃣ Fetch the current session (so we get the latest user_metadata)
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      setError("Could not get session after login.");
      setLoading(false);
      return;
    }

    // 3️⃣ Extract the role from the JWT-backed session
    const role = session.user.user_metadata?.role;

    // 4️⃣ Redirect based on role
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div style={{
      maxWidth: 400, margin: "2rem auto",
      padding: "1rem", border: "1px solid #ccc"
    }}>
      <h2>Sign In</h2>
      <p style={{ textAlign: "center", marginBottom: "1rem" }}>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "#1e516d", textDecoration: "underline" }}>
          Register here
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            required style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>
        <label>
          Password
          <input
            type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            required style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}
                style={{ marginTop: "1rem", width: "100%" }}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
