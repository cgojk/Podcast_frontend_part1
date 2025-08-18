

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import CardsEntry from "../../components/CardsEntry.jsx";
import { getRandomFallbackImage } from "../../utils/fallbackImage.jsx"

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalPodcast, setModalPodcast] = useState(null);

  const navigate = useNavigate();

  // Load genres -*
  useEffect(() => {
    async function loadGenres() {
      try {
        const res = await fetch("http://localhost:3000/api/genres");
        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    }
    loadGenres();
  }, []);

  // Load all podcasts 
  useEffect(() => {
    fetchAllPodcasts();
  }, []);

  async function fetchAllPodcasts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:3000/api/podcasts");
      if (!res.ok) throw new Error("Failed to fetch podcasts");
      const data = await res.json();
      setPodcasts(data);
      setSelectedGenre("All");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle genre button click (submenu)
  async function handleGenreClick(name) {
    setSelectedGenre(name);
    setSearchInput(""); // clear search input
    try {
      setLoading(true);
      setError(null);

      const url =
        name === "All"
          ? "http://localhost:3000/api/podcasts"
          : `http://localhost:3000/api/podcasts?genre=${name.toLowerCase()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch podcasts");
      const data = await res.json();
      setPodcasts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle search form submit
  async function handleSearchSubmit(event) {
    event.preventDefault();
    const genre = searchInput.toLowerCase().trim();

    if (!genre) {
      fetchAllPodcasts(); // reset to all if empty
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:3000/api/podcasts?genre=${genre}`);
      if (!res.ok) throw new Error("Failed to fetch podcasts");
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setPodcasts(data);
      } else {
        setPodcasts([]);
      }
      setSelectedGenre("All"); // deselect submenu
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading podcasts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="podcast-section">
      <h1 className="team-title">Explore our Podcasts</h1>
      <p className="title_section-sm">Browse our curated list of episodes.</p>

      {/* Search Form */}
      <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              name="podcast"
              placeholder="Search by genre..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search podcasts">
              <RiSearchLine size={25} />
            </button>
      </form>
   </div>

      {/* Genre Buttons */}
     <div className="genre-buttons">
        <button
          className={`genre-button ${selectedGenre === "All" ? "active" : ""}`}
          onClick={() => handleGenreClick("All")}
        >
          All
        </button>
        {genres.map((g) => (
          <button
            key={g.genre_id}
            className={`genre-button ${selectedGenre === g.name ? "active" : ""}`}
            onClick={() => handleGenreClick(g.name)}
          >
            {g.name}
          </button>
  ))}
</div>

      {/* Podcast Cards */}
      <div className="contacts">
        {podcasts.length > 0 ? (
          podcasts.map((p) => (
            <CardsEntry
              key={p.podcast_id || p.id}
              id={p.podcast_id || p.id}
              img={p.cover_image_url || p.imageUrl}
              altText={p.cover_image_alt_text || p.altText}
              name={p.title || p.name}
              description={p.description}
              genre={p.genre_name || p.genre}
              duration={`Episodes: ${p.episode_count || p.duration}`}
              hosts={p.hosts}
              averageRating={p.average_rating || p.averageRating}
              mode="compact"
              linkTo={() =>
                setModalPodcast({
                  id: p.podcast_id || p.id,
                  img: p.cover_image_url || p.imageUrl,
                  altText: p.cover_image_alt_text || p.altText,
                  name: p.title || p.name,
                  description: p.description,
                  genre: p.genre_name || p.genre,
                  duration: `Episodes: ${p.episode_count || p.duration}`,
                  hosts: p.hosts,
                  averageRating: p.average_rating || p.averageRating,
                })
              }
            />
          ))
        ) : (
          <p>No podcasts found.</p>
        )}
      </div>


      {/* Modal */}
      {modalPodcast && (
        <div className="modal-overlay" onClick={() => setModalPodcast(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalPodcast(null)}
              className="modal-close-button"
              aria-label="Close modal"
            >
              ×
            </button>
            <CardsEntry
              {...modalPodcast}
              mode="full"
              onImageClick={() => {
                navigate(`/podcasts/${modalPodcast.id}`);
                setModalPodcast(null);
              }}
            />

            {/* <CardsEntry {...modalPodcast} mode="full" /> */}
          </div>
        </div>
      )}
    </section>
  );
}