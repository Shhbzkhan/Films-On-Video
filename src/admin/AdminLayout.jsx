import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h1>Admin Panel</h1>

        {/* Unified “Add New” button */}
        <Link to="items/new" className="btn add-new">
          + Add New Movie
        </Link>

        <nav className="admin-nav">
          <h2>Regular Titles</h2>
          <ul>
            <li><Link to="items"      className="btn-sm">All Items</Link></li>
            <li><Link to="items/new"  className="btn-sm">New Regular Item</Link></li>
          </ul>

          <h2>Adult Titles</h2>
          <ul>
            <li><Link to="adult/items"     className="btn-sm">All Adult Items</Link></li>
            <li><Link to="adult/items/new" className="btn-sm">New Adult Item</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
