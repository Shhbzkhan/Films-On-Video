// src/components/AdultMovieDetail.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./RegularMovieDetail.css"; // Reuse same CSS
import supabase from "../supabaseClient";
import { useCart } from "../context/CartContext";

const AdultMovieDetail = () => {
  const { index } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.page || 1;
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchMovie() {
      const idx = parseInt(index, 10);
      const { data, error } = await supabase
        .from("Adult_titles")
        .select("*")
        .order("id", { ascending: true })
        .range(idx, idx);

      if (error) {
        console.error("Error fetching movie detail:", error);
      } else if (data && data.length > 0) {
        setMovie(data[0]);
      }
      setLoading(false);
    }
    fetchMovie();
  }, [index]);

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  const handleBack = () => {
    navigate("/adult-movies", { state: { page: fromPage } });
  };

  const handleAddToCart = () => {
    addToCart(movie);
    alert(`Added "${movie.Title}" to your cart!`);
  };

  return (
    <div className="movie-detail-container">
      <img
        src={movie.PosterURL || "https://via.placeholder.com/300"}
        alt={movie.Title}
        className="detail-poster"
      />
      <div className="movie-info">
        <h1>{movie.Title}</h1>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Production House:</strong> {movie.Production}</p>
        <p><strong>Price:</strong> ${movie.Price}</p>
        {movie.IMDBRating && <p><strong>IMDb Rating:</strong> {movie.IMDBRating}/10</p>}
        {movie.Runtime && <p><strong>Runtime:</strong> {movie.Runtime} minutes</p>}
        <p><strong>Description:</strong> {movie.Description || "No description available."}</p>
        {movie.StockAvailable !== undefined && (
          <p><strong>Availability:</strong> {movie.StockAvailable > 0 ? `${movie.StockAvailable} in stock` : "Out of stock"}</p>
        )}

        <div className="button-group">
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
          <button onClick={handleBack} className="back-button">
            ← Back to Adult Titles
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdultMovieDetail;
