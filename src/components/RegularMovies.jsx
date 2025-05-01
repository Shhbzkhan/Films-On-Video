// // src/components/RegularMovies.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// //import regularData from "../RegularMovies.json";
// import "./RegularMovies.css";
// import supabase from "../supabaseClient";
// import { useCart } from "../context/CartContext";
// //import { v4 as uuidv4 } from "uuid";


// const RegularMovies = () => {
//   const location = useLocation();
//   const initialPage = location.state?.page || 1;
//   const [filterDisc, setFilterDisc] = useState(""); 
//   const [sortOption, setSortOption] = useState("");
//   const [filterGenre, setFilterGenre] = useState("");
//   //const location = useLocation();
//   //const initialPage = location.state?.page|| 1;
//   const { addToCart } = useCart();
//   const [movies, setMovies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const moviesPerPage = 15;

//   // useEffect(() => {
//   //   setMovies(regularData["Sheet1"] || []);
//   // }, []);

//   useEffect(() => {
//     async function fetchData() {
//       const { data, error } = await supabase
//         .from('Regular_titles')
//         .select('*');
//       if (error) {
//         console.error('Error fetching data:', error.message || error);
//       } else {
//         setData(data);
//       }
//       setLoading(false);
//     }
//   }, []);


//    // ===== Filtering + Sorting Function =====
//   function getFilteredAndSortedMovies() {
//     let temp = [...movies];

//     // A) Filter by disc type
//     if (filterDisc) {
//       temp = temp.filter((movie) => movie.Disc === filterDisc);
//     }

//     // B) Filter by genre
//     if (filterGenre) {
//       temp = temp.filter((movie) => movie.Genre === filterGenre);
//     }

//     // C) Sort by chosen sortOption
//     switch (sortOption) {
//       case "title-asc":
//         temp.sort((a, b) => a.Title.localeCompare(b.Title));
//         break;
//       case "title-desc":
//         temp.sort((a, b) => b.Title.localeCompare(a.Title));
//         break;
//       case "price-asc":
//         temp.sort((a, b) => (a.CurrentPrice || 0) - (b.CurrentPrice || 0));
//         break;
//       case "price-desc":
//         temp.sort((a, b) => (b.CurrentPrice || 0) - (a.CurrentPrice || 0));
//         break;
//       default:
//         // No sorting
//         break;
//     }

//     return temp;
//   }

//   const filteredMovies = getFilteredAndSortedMovies();


//   // const totalMovies = filteredMovies.length;
//   // const indexOfLastMovie = currentPage * moviesPerPage;
//   // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
//   // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
//   // const totalPages = Math.ceil(movies.length / moviesPerPage);

//   // 3) Pagination calculations on filteredMovies
//   const totalMovies = filteredMovies.length;
//   const totalPages = Math.ceil(totalMovies / moviesPerPage);
//   const indexOfLastMovie = currentPage * moviesPerPage;
//   const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
//   const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo(0, 0);
//     }
//   };

//    // Navigation buttons
//   const handleFirst = () => handlePageChange(1);
//   const handleLast = () => handlePageChange(totalPages);
//   const handlePrev = () => handlePageChange(currentPage - 1);
//   const handleNext = () => handlePageChange(currentPage + 1);


//   // Ensure the displayed page numbers stay within bounds
//   const maxPageNumbers = 5;
//   let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
//   let endPage = startPage + maxPageNumbers - 1;
//   if (endPage > totalPages) {
//     endPage = totalPages;
//     startPage = Math.max(1, endPage - maxPageNumbers + 1);
//   }
//   const pageNumbers = [];
//   for (let i = startPage; i <= endPage; i++) {
//     pageNumbers.push(i);
//   }


// //   
// return (
//   <div className="movies-container content">
//     <h2>Regular Movies</h2>

//     {/* ========== Filter & Sort Bar ========== */}
//     <div className="filter-sort-bar" style={{ marginBottom: "1rem" }}>
//         {/* Filter by Disc Type */}
//         <label htmlFor="discFilter" style={{ marginRight: "10px" }}>
//           Disc Type:
//         </label>
//         <select
//           id="discFilter"
//           value={filterDisc}
//           onChange={(e) => {
//             setFilterDisc(e.target.value);
//             setCurrentPage(1);
//           }}
//           style={{ marginRight: "20px" }}
//         >
//           <option value="">All</option>
//           <option value="DVD">DVD</option>
//           <option value="Blu-ray">Blu-ray</option>
//           <option value="4K/Blu-ray">4K/Blu-ray</option>
//           <option value="Collections">4K/Blu-ray</option>

//           {/* Add any other disc types found in your data */}
//         </select>

//         {/* Filter by Genre */}
//         <label htmlFor="genreFilter" style={{ marginRight: "10px" }}>
//           Genre:
//         </label>
//         <select
//           id="genreFilter"
//           value={filterGenre}
//           onChange={(e) => {
//             setFilterGenre(e.target.value);
//             setCurrentPage(1);
//           }}
//           style={{ marginRight: "20px" }}
//         >
//           <option value="">All</option>
//           <option value="Action">Action</option>
//           <option value="Comedy">Comedy</option>
//           <option value="Horror">Horror</option>
//           <option value="Drama">Drama</option>
//           {/* Insert all possible genres from your data */}
//         </select>

//         {/* Sort Option */}
//         <label htmlFor="sortOption" style={{ marginRight: "10px" }}>
//           Sort by:
//         </label>
//         <select
//           id="sortOption"
//           value={sortOption}
//           onChange={(e) => {
//             setSortOption(e.target.value);
//             setCurrentPage(1);
//           }}
//         >
//           <option value="">None</option>
//           <option value="title-asc">Title (A-Z)</option>
//           <option value="title-desc">Title (Z-A)</option>
//           <option value="price-asc">Price (Low to High)</option>
//           <option value="price-desc">Price (High to Low)</option>
//         </select>
//       </div>
//       {/* ========== End Filter & Sort Bar ========== */}
    
//     <div className="movie-list">
//       {currentMovies.map((movie, index) => {
//         const absoluteIndex = indexOfFirstMovie + index; // the actual index in the entire array

//         return (
//           <div className="movie-card" key={absoluteIndex}>
//             <img src={movie.PosterURL} alt="movie-title" className="movie-poster" />
//             <h3>{movie.Title}</h3>
//             <p>{movie.Disc}</p>
//             <p>{movie.Genre}</p>
//             <p>{movie.Year}</p>
//             <p>Price: ${movie.CurrentPrice}</p>
            
//             {/* Link to /movies/:index */}
//             <p>
//               <Link to={`/movies/${absoluteIndex}`} 
//                     state = {{page: currentPage}} 
//                     className="detail-button"
//               >
//                 More Detail
//               </Link>
//             </p>

//             <button onClick={() => addToCart(movie)}>Add to Cart</button>
//           </div>
//         );
//       })}
//     </div>

//     {/* Pagination */}
//     {totalPages > 1 && (
//       <div className="pagination-container">
//         <button onClick={handleFirst} disabled={currentPage === 1}>First</button>
//         <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>

//         {pageNumbers.map((num) => (
//           <button
//             key={num}
//             onClick={() => handlePageChange(num)}
//             className={num === currentPage ? "active" : ""}
//           >
//             {num}
//           </button>
//         ))}

//         <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
//         <button onClick={handleLast} disabled={currentPage === totalPages}>Last</button>
//       </div>
//     )}
//   </div>
// );
// };

// export default RegularMovies;




// src/components/RegularMovies.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./RegularMovies.css";
import supabase from "../supabaseClient";
import { useCart } from "../context/CartContext";

const RegularMovies = () => {
  const location = useLocation();
  const initialPage = location.state?.page || 1;
  const [filterDisc, setFilterDisc] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const { addToCart } = useCart();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const moviesPerPage = 15;

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Regular_titles")
        .select("*");
      if (error) {
        console.error("Error fetching data:", error.message || error);
      } else {
        setMovies(data); // Update movies state
      }
      setLoading(false); // Update loading state when complete
    }
    fetchData();
  }, []);

  // Show a loading message while data is being fetched.
  if (loading) return <div>Loading Regular Movies...</div>;

  // ===== Filtering + Sorting Function =====
  function getFilteredAndSortedMovies() {
    let temp = [...movies];

    // Filter by disc type if selected
    if (filterDisc) {
      temp = temp.filter((movie) => movie.Disc === filterDisc);
    }

    // Filter by genre if selected
    if (filterGenre) {
      temp = temp.filter((movie) => movie.Genre === filterGenre);
    }

    // Sort based on the chosen option
    switch (sortOption) {
      case "title-asc":
        temp.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case "title-desc":
        temp.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case "price-asc":
        temp.sort((a, b) => (a.CurrentPrice || 0) - (b.CurrentPrice || 0));
        break;
      case "price-desc":
        temp.sort((a, b) => (b.CurrentPrice || 0) - (a.CurrentPrice || 0));
        break;
      default:
        break;
    }
    return temp;
  }

  const filteredMovies = getFilteredAndSortedMovies();
  const totalMovies = filteredMovies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleFirst = () => handlePageChange(1);
  const handleLast = () => handlePageChange(totalPages);
  const handlePrev = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);

  // Calculate page numbers for pagination
  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = startPage + maxPageNumbers - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="movies-container content">
      <h2>Regular Movies</h2>

      {/* ========== Filter & Sort Bar ========== */}
      <div className="filter-sort-bar" style={{ marginBottom: "1rem" }}>
        {/* Filter by Disc Type */}
        <label htmlFor="discFilter" style={{ marginRight: "10px" }}>
          Disc Type:
        </label>
        <select
          id="discFilter"
          value={filterDisc}
          onChange={(e) => {
            setFilterDisc(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginRight: "20px" }}
        >
          <option value="">All</option>
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
          <option value="4K/Blu-ray">4K/Blu-ray</option>
          <option value="Collections">Collections</option>
        </select>

        {/* Filter by Genre */}
        <label htmlFor="genreFilter" style={{ marginRight: "10px" }}>
          Genre:
        </label>
        <select
          id="genreFilter"
          value={filterGenre}
          onChange={(e) => {
            setFilterGenre(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginRight: "20px" }}
        >
          <option value="">All</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Drama">Drama</option>
        </select>

        {/* Sort Option */}
        <label htmlFor="sortOption" style={{ marginRight: "10px" }}>
          Sort by:
        </label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">None</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      {/* ========== End Filter & Sort Bar ========== */}

      <div className="movie-list">
        {currentMovies.map((movie, index) => {
          const absoluteIndex = indexOfFirstMovie + index;
          return (
            <div className="movie-card" key={absoluteIndex}>
              <img
                src={movie.PosterURL}
                alt={movie.Title}
                className="movie-poster"
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Disc}</p>
              <p>{movie.Genre}</p>
              <p>{movie.Year}</p>
              <p>Price: ${movie.CurrentPrice}</p>
              <p>
                <Link
                  to={`/movies/${absoluteIndex}`}
                  state={{ page: currentPage }}
                  className="detail-button"
                >
                  More Detail
                </Link>
              </p>
              <button onClick={() => addToCart(movie)}>Add to Cart</button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button onClick={handleFirst} disabled={currentPage === 1}>
            First
          </button>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={num === currentPage ? "active" : ""}
            >
              {num}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
          <button onClick={handleLast} disabled={currentPage === totalPages}>
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default RegularMovies;

