// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom"
// import { useCart } from "../context/CartContext";
// //import adultMoviesData from "../AdultMovies.json";
// import supabase from "../supabaseClient";
// import "./RegularMovies.css";
// //import { v4 as uuidv4 } from "uuid";

// const AdultMovies = () => {
//   const location = useLocation();
//   const initialPage = location.state?.page || 1;
//   const [filterProduction, setFilterProduction] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const { addToCart } = useCart();
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);  // Define loading state
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const moviesPerPage = 15;

//   // useEffect(() => {
//   //   setMovies(adultMoviesData["Sheet2"] ||[]);
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

//   // 2) Collect unique production houses from the loaded data
//   //    so we can build a dynamic <option> list
//   const productionList = React.useMemo(() => {
//     // Gather all production values
//     const allProds = movies.map((m) => m.Production).filter(Boolean);
//     // Make them unique
//     const uniqueProds = [...new Set(allProds)];
//     // Sort them alphabetically, if desired
//     uniqueProds.sort((a, b) => a.localeCompare(b));
//     return uniqueProds;
//   }, [movies]);

//   // 3) Filtering & Sorting
//   function getFilteredAndSortedMovies() {
//     let temp = [...movies];

//     // (A) Filter by Production if user chose a specific one
//     if (filterProduction) {
//       temp = temp.filter(
//         (movie) => movie.Production && movie.Production === filterProduction
//       );
//     }

//     // (B) Sort based on the selected sortOption
//     switch (sortOption) {
//       case "title-asc":
//         temp.sort((a, b) => a.Title.localeCompare(b.Title));
//         break;
//       case "title-desc":
//         temp.sort((a, b) => b.Title.localeCompare(a.Title));
//         break;
//       case "price-asc":
//         temp.sort((a, b) => (a.Price || 0) - (b.Price || 0));
//         break;
//       case "price-desc":
//         temp.sort((a, b) => (b.Price || 0) - (a.Price || 0));
//         break;
//       default:
//         // no sorting
//         break;
//     }

//     return temp;
//   }

//   const filteredMovies = getFilteredAndSortedMovies();


//   // Pagination
//   const totalMovies = filteredMovies.length;
//   const totalPages = Math.ceil(totalMovies / moviesPerPage);
//   const indexOfLastMovie = currentPage * moviesPerPage;
//   const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
//   const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);



//   // //const totalMovies = movies.length;
//   // const indexOfLastMovie = currentPage * moviesPerPage;
//   // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
//   // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
//   // const totalPages = Math.ceil(movies.length / moviesPerPage);


//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo(0, 0);
//     }
//   };


//   const handleFirst = () => handlePageChange(1);
//   const handleLast = () => handlePageChange(totalPages);
//   const handlePrev = () => handlePageChange(currentPage - 1);
//   const handleNext = () => handlePageChange(currentPage + 1);

//   // build small set of page numbers
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

//   return (
//     <div className="movies-container content">
//       <h2>Adult Movies</h2>
//       {/* Filter & Sort Bar */}
//       <div className="filter-sort-bar" style={{ marginBottom: "20px" }}>
//         {/* Production Filter */}
//         <label htmlFor="productionFilter" style={{ marginRight: "10px" }}>
//           Production House:
//         </label>
//         <select
//           id="productionFilter"
//           value={filterProduction}
//           onChange={(e) => {
//             setFilterProduction(e.target.value);
//             setCurrentPage(1); // reset to page 1 on filter change
//           }}
//         >
//           <option value="">All</option>
//           {productionList.map((prod) => (
//             <option key={prod} value={prod}>
//               {prod}
//             </option>
//           ))}
//         </select>

//         {/* Sorting */}
//         <label htmlFor="sortOption" style={{ marginLeft: "20px", marginRight: "10px" }}>
//           Sort by:
//         </label>
//         <select
//           id="sortOption"
//           value={sortOption}
//           onChange={(e) => {
//             setSortOption(e.target.value);
//             setCurrentPage(1); // reset to page 1 on sort change
//           }}
//         >
//           <option value="">None</option>
//           <option value="title-asc">Title (A-Z)</option>
//           <option value="title-desc">Title (Z-A)</option>
//           <option value="price-asc">Price (Low → High)</option>
//           <option value="price-desc">Price (High → Low)</option>
//         </select>
//       </div>


//       <div className="movie-list">
//         {currentMovies.map((movie, index) => {
//           const absoluteIndex = indexOfFirstMovie + index;

//           return (
//             <div className="movie-card" key={absoluteIndex}>
//               <img src={movie.PosterURL} alt={movie.Title} className="movie-poster" />
//               <h3>{movie.Title}</h3>
//               <p>{movie.Year}</p>
//               <p>Price: ${movie.Price}</p>

//               {/* Link to /adult-movies/:index */}
//               <p>
//                 <Link to={`/adult-movies/${absoluteIndex}`}
//                       state ={{page: currentPage}} 
//                       className="detail-button"
//                 >
//                   More Detail
//                 </Link>
//               </p>

//               <button onClick={() => addToCart(movie)}>Add to Cart</button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="pagination-container">
//           <button onClick={handleFirst} disabled={currentPage === 1}>First</button>
//           <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          
//           {pageNumbers.map((num) => (
//             <button
//               key={num}
//               onClick={() => handlePageChange(num)}
//               className={num === currentPage ? "active" : ""}
//             >
//               {num}
//             </button>
//           ))}

//           <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
//           <button onClick={handleLast} disabled={currentPage === totalPages}>Last</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdultMovies;







// src/components/AdultMovies.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./RegularMovies.css"; // Using the same styles as RegularMovies
import supabase from "../supabaseClient";

const AdultMovies = () => {
  const location = useLocation();
  const initialPage = location.state?.page || 1;
  const [filterProduction, setFilterProduction] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { addToCart } = useCart();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const moviesPerPage = 15;

  useEffect(() => {
    async function fetchData() {
      console.log("working....");
      const { data, error } = await supabase
        .from("Adult_titles")
        .select("*");
      if (error) {
        console.error("Error fetching data:", error.message || error);
      } else {
        setMovies(data); // Update movies state
        console.log(data);
      }
      setLoading(false); // Update loading state
    }
    fetchData();
  }, []);

  // Always call useMemo unconditionally at the top level
  const productionList = useMemo(() => {
    const allProds = movies.map((m) => m.Production).filter(Boolean);
    const uniqueProds = [...new Set(allProds)];
    uniqueProds.sort((a, b) => a.localeCompare(b));
    return uniqueProds;
  }, [movies]);

  if (loading) return <div>Loading Adult Movies...</div>;

  // Filtering and sorting function for Adult Movies
  function getFilteredAndSortedMovies() {
    let temp = [...movies];

    // Filter by Production House
    if (filterProduction) {
      temp = temp.filter((movie) => movie.Production === filterProduction);
    }

    // Sort based on selected sort option
    switch (sortOption) {
      case "title-asc":
        temp.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case "title-desc":
        temp.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case "price-asc":
        temp.sort((a, b) => (a.Price || 0) - (b.Price || 0));
        break;
      case "price-desc":
        temp.sort((a, b) => (b.Price || 0) - (a.Price || 0));
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
      <h2>Adult Movies</h2>
      {/* Filter & Sort Bar */}
      <div className="filter-sort-bar" style={{ marginBottom: "20px" }}>
        <label htmlFor="productionFilter" style={{ marginRight: "10px" }}>
          Production House:
        </label>
        <select
          id="productionFilter"
          value={filterProduction}
          onChange={(e) => {
            setFilterProduction(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All</option>
          {productionList.map((prod) => (
            <option key={prod} value={prod}>
              {prod}
            </option>
          ))}
        </select>

        {/* Sort Option */}
        <label htmlFor="sortOption" style={{ marginLeft: "20px", marginRight: "10px" }}>
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
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
        </select>
      </div>

      <div className="movie-list">
        {currentMovies.map((movie, index) => {
          const absoluteIndex = indexOfFirstMovie + index;
          return (
            <div className="movie-card" key={absoluteIndex}>
              <img src={movie.PosterURL} alt={movie.Title} className="movie-poster" />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <p>Price: ${movie.Price}</p>
              <p>
                <Link
                  to={`/adult-movies/${absoluteIndex}`}
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
          <button onClick={handleFirst} disabled={currentPage === 1}>First</button>
          <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={num === currentPage ? "active" : ""}
            >
              {num}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          <button onClick={handleLast} disabled={currentPage === totalPages}>Last</button>
        </div>
      )}
    </div>
  );
};

export default AdultMovies;
