// // Layout + sidebar + nav

// /* src/admin/AdminDashboard.jsx */
// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';

// export default function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <aside className="admin-sidebar">
//         <h1>Admin Panel</h1>
//         <ul>
//           <li><Link to="items">All Items</Link></li>
//           <li><Link to="items/new">Add New Item</Link></li>
//         </ul>
//       </aside>
//       <div className="admin-main">
//         <Outlet />
//       </div>
//     </div>
//   );
// }