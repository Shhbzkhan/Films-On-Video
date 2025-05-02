import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import RegularMovies from "./components/RegularMovies";
import AdultMovies from "./components/AdultMovies";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import Contact from "./components/Contact";
import RegularMovieDetail from "./components/RegularMovieDetail";
import AdultMovieDetail from "./components/AdultMoviesDetail";
import SearchResults from "./components/SearchResults"; // New search overlay component
import OtherServices from "./components/OtherServices";
import Account from "./components/Account";
import Orders from "./components/Orders";
import NewArrivals from "./components/NewArrivals";
import StaffPicks from "./components/StaffPicks";
import ComingSoon from "./components/ComingSoon";
import Login from "./components/Login";
import About from "./components/About";
import supabase from './supabaseClient';

// Admin imports
import RequireAdmin from './components/RequireAdmin';       // protects /admin
import AdminDashboard from './admin/AdminDashboard';
import ItemList from './admin/ItemList';
import NewItemForm from './admin/NewItemForm';
import EditItemForm from './admin/EditItemForm';




function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleCart = () => setCartOpen((prev) => !prev);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('Regular_titles')
        .select();
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data successfully:', data);
        setData(data);
      }
      setLoading(false);
    }

    fetchData();
  }, []);


  if (loading) return <div>Loading...</div>;

  return (
    <CartProvider>
      <Router>
        <Navbar toggleSidebar={toggleSidebar} toggleCart={toggleCart} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/movies/:index" element={<RegularMovieDetail data={data} />} />
            <Route path="/movies" element={<RegularMovies data={data} />} />
            <Route path="/adult-movies" element={<AdultMovies data={data} />} />
            <Route path="/adult-movies/:index" element={<AdultMovieDetail data={data} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/other-services" element={<OtherServices />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/staff-picks" element={<StaffPicks />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            {/* Admin Section */}
            <Route
              path="/admin/*"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            >
              <Route index element={<ItemList />} />
              <Route path="items" element={<ItemList />} />
              <Route path="items/new" element={<NewItemForm />} />
              <Route path="items/:id/edit" element={<EditItemForm />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;


//   return (
//     <div>
//       <h1>Supabase Data</h1>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>{item.name}</li> // Adjust according to your table structure
//         ))}
//       </ul>
//     </div>
//   );
  
// }

// export default App;



//   return (
//     <CartProvider>
//       <Router>
//         <Navbar toggleSidebar={toggleSidebar} toggleCart={toggleCart} />
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
        
//         <div className="content" >
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/movies/:index" element={<RegularMovieDetail />} />
//             <Route path="/movies" element={<RegularMovies />} />
//             <Route path="/adult-movies" element={<AdultMovies />} />
//             <Route path="/adult-movies/:index" element={<AdultMovieDetail />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/search" element={<SearchResults />} />
//             <Route path="/account" element={<Account />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/other-services" element={<OtherServices />} /> 
//             <Route path="/new-arrivals" element={<NewArrivals />} />
//             <Route path="/staff-picks" element={<StaffPicks />} />
//             <Route path="/coming-soon" element={<ComingSoon />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/about" element={<About />} />        
//           </Routes>
//         </div>

//         <Footer />
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;
