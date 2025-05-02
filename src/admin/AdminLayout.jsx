// src/admin/AdminLayout.jsx  (or rename your AdminDashboard.jsx)
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <Link to="items">All Items</Link>
          <Link to="items/new">New Item</Link>
        </nav>
      </aside>
      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}
