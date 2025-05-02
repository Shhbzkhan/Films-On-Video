// src/components/RequireAdmin.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../supabaseClient';

export default function RequireAdmin({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(session?.user?.user_metadata?.role === 'admin');
    });
  }, []);

  if (isAdmin === null) return <div>Checking permissions…</div>;
  return isAdmin ? children : <Navigate to="/login" replace />;
}
