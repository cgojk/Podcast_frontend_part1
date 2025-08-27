
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import CardsEntry from "../../components/CardsEntry.jsx";
import {
  getAllPodcasts,
  getAllGenres
} from "../../api.js";
import { getRandomFallbackImage } from "../../utils/fallbackImage.jsx";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalPodcast, setModalPodcast] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch genres 
  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await getAllGenres();
        setGenres(data || []);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    }
    loadGenres();
  }, []);

  // Fetch podcasts whenever location.search changes (handles genre param)
  useEffect(() => {
    async function fetchPodcastsBasedOnURL() {
      const params = new URLSearchParams(location.search);
      const genreFromURL = params.get("genre");

      if (genreFromURL) {
        // Capitalize first letter to match the button state
        const capitalizedGenre = genreFromURL.charAt(0).toUpperCase() + genreFromURL.slice(1).toLowerCase();
        await handleGenreClick(capitalizedGenre);
      } else {
        await fetchAllPodcasts();
      }
    }

    fetchPodcastsBasedOnURL();
 
  }, [location.search]);

  async function fetchAllPodcasts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPodcasts();
      setPodcasts(data || []);
      setSelectedGenre("All");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenreClick(name) {
    setSelectedGenre(name);
    setSearchInput("");
    try {
      setLoading(true);
      setError(null);
      const query = name === "All" ? {} : { genre: name.toLowerCase() };
      const data = await getAllPodcasts(query);
      setPodcasts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();
    const genre = searchInput.toLowerCase().trim();

    if (!genre) {
      fetchAllPodcasts();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getAllPodcasts({ genre });
      setPodcasts(data || []);
      setSelectedGenre("All");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading podcasts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="podcast-section podcasts">
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
      <div className="contacts container push-up">
        {podcasts.length > 0 ? (
          podcasts.map((p) => {
            const image = p.cover_image_url || p.imageUrl || getRandomFallbackImage();
            const altText = p.cover_image_alt_text || p.altText || "Podcast cover";

            return (
              <CardsEntry
                key={p.podcast_id || p.id}
                id={p.podcast_id || p.id}
                img={image}
                altText={altText}
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
                    img: image,
                    altText: altText,
                    name: p.title || p.name,
                    description: p.description,
                    genre: p.genre_name || p.genre,
                    duration: `Episodes: ${p.episode_count || p.duration}`,
                    hosts: p.hosts,
                    averageRating: p.average_rating || p.averageRating,
                  })
                }
              />
            );
          })
        ) : (
          <p>No podcasts found.</p>
        )}
      </div>

      {/* Modal */}
      {modalPodcast && (
        <div className="modal-overlay__cards" onClick={() => setModalPodcast(null)}>
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
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="navigation-buttons container">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="nav-button top-button"
        >
          <span className="arrow">↑</span> Back to Top
        </button>

        {podcasts.length > 0 && (
          <button
            onClick={() => {
              const firstPodcast = podcasts[0];
              navigate(`/podcasts/${firstPodcast.podcast_id || firstPodcast.id}`);
            }}
            className="nav-button forward-button"
          >
            <span className="arrow">→</span> Go to First Podcast
          </button>
        )}
      </div>
    </section>
  );
}