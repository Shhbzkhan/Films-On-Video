// src/components/RequireAdmin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';




export default function RequireAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        // Not signed in
        navigate('/login', { replace: true });
      } else {
        const role = session.user.user_metadata?.role;
        if (role !== 'admin') {
          // Not an admin
          navigate('/', { replace: true });
        } else {
          setLoading(false);
        }
      }
    }
    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Checking permissions...</div>;
  }

  return <>{children}</>;
}