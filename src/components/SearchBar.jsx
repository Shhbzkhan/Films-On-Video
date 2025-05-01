// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adultMoviesData from "../AdultMovies.json";
import regularMoviesData from "../RegularMovies.json";
import "./SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ---- Example of how you might track user age authentication ----
  // In a real app, you could get this from user context, Redux store, or login data.
  // For demonstration, let's just hardcode a boolean:
  const isAgeAuthenticated = false; // <-- Set to true if user is allowed adult titles.

  // We do NOT merge the datasets; we pick which dataset to search from:
  const adultMovies = adultMoviesData["Sheet2"] || [];
  const regularMovies = regularMoviesData["Sheet1"] || [];

  // Decide which dataset to use for searching
  const moviesToSearch = isAgeAuthenticated ? adultMovies : regularMovies;

  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Close if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
        setQuery("");
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    // Filter only the chosen dataset
    const filtered = moviesToSearch.filter(
      (movie) =>
        typeof movie.Title === "string" &&
        movie.Title.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleResultClick = (movie) => {
    // If user is adult => navigate to /adult-movies/SerialNo
    // Else => /movies/SerialNo
    if (isAgeAuthenticated) {
      navigate(`/adult-movies/${movie.SerialNo}`, { state: movie });
    } else {
      navigate(`/movies/${movie.SerialNo}`, { state: movie });
    }
    // Reset
    setIsExpanded(false);
    setQuery("");
    setResults([]);
  };

  const handleSeeMore = () => {
    // If user is adult => navigate to /search?query=... for adult context
    // Else => likewise for regular
    // You can keep a single /search route if it merges results or
    // separate them if you want. We'll keep it simple:
    navigate(`/search?query=${encodeURIComponent(query)}`, {
      state: { isAdult: isAgeAuthenticated },
    });
    setIsExpanded(false);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="search-bar-container" ref={containerRef}>
      {/* A rectangle input next to the cart (no icon). */}
      {!isExpanded ? (
        <input
          type="text"
          placeholder="Search"
          className="search-bar-compact"
          onFocus={handleExpand}
        />
      ) : (
        <div className="search-expanded">
          <input
            type="text"
            placeholder="Search films..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
            autoFocus
          />
          {query && results.length > 0 && (
            <ul className="search-results">
              {results.slice(0, 10).map((movie, index) => (
                <li
                  key={movie.SerialNo || index}
                  onClick={() => handleResultClick(movie)}
                >
                  {movie.Title}
                </li>
              ))}

              {/* If more than 10 results, show a "See More" link */}
              {results.length > 10 && (
                <li className="see-more" onClick={handleSeeMore}>
                  See More Results
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
