



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomFallbackImage } from "../../utils/fallbackImage.jsx";
import { getAllGenres } from "../../api.js";

export default function GenreGrid() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getAllGenres(); // Use the shared API function

        const formattedGenres = data.map((genre) => ({
          id: genre.genre_id,
          name: genre.name,
          imageUrl: getRandomFallbackImage(genre.genre_id),
          altText: `Default image for ${genre.name}`,
        }));

        setGenres(formattedGenres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    }

    fetchGenres();
  }, []);

  return (
    <section className="genre-grid container">
      <h1 className="genre-title-home">What kind of podcast genres do you enjoy?</h1>
      <p className="genre-description_home">
        Explore different genres from storytelling to true crime, fiction, and more.
      </p>

      <div className="grid">
        {genres.map(({ id, name, imageUrl, altText }) => (
          <div
            key={id}
            className="genre-card"
            onClick={() =>
              navigate(`/podcasts?genre=${encodeURIComponent(name.toLowerCase())}`)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              navigate(`/podcasts?genre=${encodeURIComponent(name.toLowerCase())}`)
            }
          >
            <div className="genre-image-wrapper">
              <img src={imageUrl} alt={altText || name} className="genre-image" />
            </div>
            <div className="genre-overlay">
              <h2>{name}</h2>
              <span className="genre-cta">→ Explore {name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}