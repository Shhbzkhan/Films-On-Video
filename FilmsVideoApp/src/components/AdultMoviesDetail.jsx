// src/components/AdultMovieDetail.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
//import adultData from "../AdultMovies.json";
import "./RegularMovieDetail";
import supabase from "../supabaseClient";

const AdultMovieDetail = () => {
  const { index } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.page || 1;

  // useEffect(() => {
  //   // If adultData is an array or has a "Sheet1"/"Movies-Games" property, adjust accordingly:
  //   // e.g. const data = adultData["Sheet1"] || adultData;
  //   const data = adultData["Sheet2"] || adultData;
  //   const movieItem = data[index];
  //   setMovie(movieItem);
  // }, [index]);

  useEffect(() => {
    async function fetchMovie() {
      const idx = parseInt(index, 10);
      // Query the Adult_titles table for one record at the given offset.
      const { data, error } = await supabase
        .from("Adult_titles")
        .select("*")
        .order("id", { ascending: true })
        .range(idx, idx);

      if (error) {
        console.error("Error fetching adult movie detail:", error);
      } else if (data && data.length > 0) {
        setMovie(data[0]);
      }
      setLoading(false);
    }
    fetchMovie();
  }, [index]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  // Now define handleBack
  const handleBack = () => {
    // go back to "/adult-movies" with the same page in state
    navigate("/adult-movies", { state: { page: fromPage } });
  };

  return (
    <div className="movie-detail-container">
      <img
        src={movie.PosterURL}
        alt={movie.Title}
        className="detail-poster"
      />
      <h1>{movie.Title}</h1>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Disc Type:</strong> {movie["Disc type"]}</p>
      <p><strong>Price:</strong> ${movie.Price}</p>
      <p><strong>Description:</strong> {movie.Description}</p>

      {/* Back button => returns to previous page (preserving pagination, if used) */}
      {/* <button className="back-button" onClick={handleBack}>
        ← Back to Adult Titles
      </button> */}

      <button onClick={handleBack}>← Back to Adult Movies</button>

    </div>
  );
};

export default AdultMovieDetail;
