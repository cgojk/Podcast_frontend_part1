

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardsEntry from "./CardsEntry.jsx";
import { getAllPodcasts } from "../api.js"; // Import from api.js

export default function DataCards() {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [modalPodcast, setModalPodcast] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const data = await getAllPodcasts({ limit: 3, sort: "rating_DESC" }); // Using reusable API
        setPodcasts(data || []);
      } catch (err) {
        setError(err.message || "Failed to load podcasts");
      }
    }

    fetchPodcasts();
  }, []);

  return (
    <section className="podcast-section">
      <h1 className="team-title">Recent Podcasts</h1>
      <p className="description_title">
        Check out our latest episodes and discover new favorites!
      </p>

      <div className="contacts container">
        {error && <p>Error loading podcasts: {error}</p>}

        {podcasts.map((podcast) => (
          <CardsEntry
            key={podcast.podcast_id || podcast.id}
            id={podcast.podcast_id || podcast.id}
            img={podcast.cover_image_url || podcast.imageUrl}
            altText={podcast.cover_image_alt_text || podcast.altText}
            name={podcast.title || podcast.name}
            description={podcast.description || "No description available."}
            duration={`Episodes: ${podcast.episode_count || podcast.duration}`}
            genre={podcast.genre_name || podcast.genre}
            hosts={podcast.hosts || []}
            averageRating={podcast.average_rating || "N/A"}
            mode="compact"
            linkTo={() =>
              setModalPodcast({
                id: podcast.podcast_id || podcast.id,
                img: podcast.cover_image_url || podcast.imageUrl,
                altText: podcast.cover_image_alt_text || podcast.altText,
                name: podcast.title || podcast.name,
                description: podcast.description || "No description available.",
                genre: podcast.genre_name || podcast.genre,
                duration: `Episodes: ${podcast.episode_count || podcast.duration}`,
                hosts: podcast.hosts || [],
                averageRating: podcast.average_rating || "N/A",
              })
            }
          />
        ))}
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
          </div>
        </div>
      )}
    </section>
  );
}

