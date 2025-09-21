import React, { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./Home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ⭐ Static high-res hero images
  const highResPosters = [
  "https://m.media-amazon.com/images/I/71rNJQ2g-EL._SX1440_.jpg", // Harry Potter
  "https://m.media-amazon.com/images/I/81ai6zx6eXL._SX1440_.jpg", // Inception
  "https://m.media-amazon.com/images/I/81GqtNbs+PL._SX1440_.jpg", // Avengers
];


  const searchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      if (res.data.Search) {
        setMovies(res.data.Search);
      } else {
        setError("No movies found");
        setMovies([]);
      }
    } catch {
      setError("Error fetching movies");
    }
    setLoading(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Movie Finder</h1>
        <Link to="/favorites" className="fav-link">★ Favorites</Link>
      </div>

      {/* 🎞 Static High-Res Movie Carousel */}
      <div className="carousel-container">
        <Slider {...settings}>
          {highResPosters.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Hero ${index + 1}`}
                className="carousel-img"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 🔍 Search Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
