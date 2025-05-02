// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ← added Link
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

    // 1️⃣ Sign in with Supabase
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // data may contain session.user, or we can fetch the user again
    const user = data.user ?? data.session?.user;

    if (!user) {
      setError("Could not retrieve user session.");
      setLoading(false);
      return;
    }

    // 2️⃣ Check their metadata.role
    const role = user.user_metadata?.role;

    // 3️⃣ Redirect based on role
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
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
      <h2>Sign In</h2>

      {/* New prompt for users to register */}
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
          {loading ? "Signing In…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
