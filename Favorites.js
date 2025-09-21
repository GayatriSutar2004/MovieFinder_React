import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "./Favorites.css";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      <Link to="/" className="back-btn">← Back to Search</Link>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
