// src/components/AdultMovies.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieList.css"; // shared styles
import supabase from "../supabaseClient";

const AdultMovies = () => {
  const location = useLocation();
  const initialPage = location.state?.page || 1;
  const [filterProduction, setFilterProduction] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const moviesPerPage = 12;

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("Adult_titles").select("*");
      if (error) {
        console.error("Error fetching data:", error.message || error);
      } else {
        setMovies(data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const productionList = useMemo(() => {
    const allProds = movies.map((m) => m.Production).filter(Boolean);
    const uniqueProds = [...new Set(allProds)];
    uniqueProds.sort((a, b) => a.localeCompare(b));
    return uniqueProds;
  }, [movies]);

  if (loading) return <div>Loading Adult Movies...</div>;

  const getFilteredAndSortedMovies = () => {
    let temp = [...movies];
    if (filterProduction) {
      temp = temp.filter((movie) => movie.Production === filterProduction);
    }
    switch (sortOption) {
      case "title-asc":
        temp.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case "title-desc":
        temp.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      default:
        break;
    }
    return temp;
  };

  const filteredMovies = getFilteredAndSortedMovies();
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="movies-container content">
      <h2>Adult Movies</h2>

      <div className="filter-sort-bar">
        <label htmlFor="productionFilter">Production House:</label>
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
            <option key={prod} value={prod}>{prod}</option>
          ))}
        </select>

        <label htmlFor="sortOption">Sort by:</label>
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
        </select>
      </div>

      <div className="movie-list">
        {currentMovies.map((movie, index) => {
          const absoluteIndex = indexOfFirstMovie + index;

          return (
            <Link
              to={`/adult-movies/${absoluteIndex}`}
              state={{ page: currentPage }}
              className="movie-card clickable-card"
              key={absoluteIndex}
            >
              <img
                src={movie.PosterURL || "https://via.placeholder.com/150"}
                alt={movie.Title}
                className="movie-poster"
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <p>Price: ${movie.Price}</p>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 3),
              Math.min(totalPages, currentPage + 2)
            )
            .map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={num === currentPage ? "active" : ""}
              >
                {num}
              </button>
            ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
      )}
    </div>
  );
};

export default AdultMovies;
