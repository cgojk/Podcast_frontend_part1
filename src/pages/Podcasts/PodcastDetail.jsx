
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  RiPlayCircleFill,
  RiDownload2Line,
  RiShareForwardLine,
  RiHeartFill,
  RiHeadphoneFill,
} from "react-icons/ri";
import { getRandomFallbackImage } from "../../utils/fallbackImage";

export default function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("episode_number_DESC");

  const navigate = useNavigate(); // for navigation

  const toggleSortOrder = () => {
    setSortOrder((prev) =>
      prev === "episode_number_DESC" ? "episode_number_ASC" : "episode_number_DESC"
    );
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:3000/api/podcasts/${id}`),
      fetch(`http://localhost:3000/api/podcasts/${id}/episodes?sort=${sortOrder}`)
    ])
      .then(async ([podcastRes, episodesRes]) => {
        if (!podcastRes.ok) throw new Error("Podcast not found");
        if (!episodesRes.ok) throw new Error("Episodes not found");

        const podcastData = await podcastRes.json();
        const episodesData = await episodesRes.json();

        setPodcast(podcastData);
        setEpisodes(episodesData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, sortOrder]);

  if (loading) return <p>Fetching data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!podcast) return <p>No podcast found.</p>;

  const imageToShow =
    podcast.cover_image_url && podcast.cover_image_url.trim() !== ""
      ? podcast.cover_image_url
      : getRandomFallbackImage(podcast.podcast_id);

  return (
    <>
      <section className="podcast-detail container">
        <div className="wrapper_image_podcast">
          <div className="cards_podcasts_listen">
            <div className="card_image_podcast">
              <div className="aspect-ratio-box">
                <img
                  className="image_podcast_listen"
                  src={imageToShow}
                  alt={`Image of ${podcast.title}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getRandomFallbackImage(podcast.podcast_id);
                  }}
                />
              </div>
            </div>
            <div className="podcast-icons">
              <button aria-label="Play audio" className="icon-button">
                <RiPlayCircleFill size={36} />
              </button>
              <button aria-label="Download podcast" className="icon-button">
                <RiDownload2Line size={32} />
              </button>
              <button aria-label="Share podcast" className="icon-button">
                <RiShareForwardLine size={32} />
              </button>
              <button aria-label="Add to favorites" className="icon-button">
                <RiHeartFill size={32} color="#c2a83f" />
              </button>
            </div>
          </div>

          <div className="podcast-content_detail">
            <h1>{podcast.title}</h1>
            <p>{podcast.description}</p>
            <Link to={`/podcasts/${podcast.podcast_id}/listen`} className="flex-btnicon">
              <RiHeadphoneFill size={32} />
              <h3>Listen podcast</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="podcast-episodes container">
        <h1 className="team-title center">Episodes</h1>
        <div className="episodes-section">
          {/* Sort toggle button */}
          <button onClick={toggleSortOrder} className="sort-button">
            Sort: {sortOrder === "episode_number_DESC" ? "Newest First" : "Oldest First"}
          </button>

          {episodes.length > 0 ? (
            <ul className="episodes-list">
              {episodes.map((episode) => (
                <li key={episode.episode_id} className="episode-card">
                  <div className="episode-image">
                    <img
                      src={imageToShow}
                      alt={`Cover of ${podcast.title}`}
                      className="episode-thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getRandomFallbackImage(podcast.podcast_id);
                      }}
                    />
                  </div>
                  <div className="episode-content">
                    <h4>
                      Episode {episode.episode_number}: {episode.title}
                    </h4>
                    <p>{episode.description}</p>
                    <small>⏱ {episode.duration} mins</small>
                    <audio className="controls_panel" controls src={episode.audio_url} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No episodes found.</p>
          )}
          {/* Navigation Buttons */}
      <div className="navigation-buttons container" >
        <button
          onClick={() => {
            navigate("/podcasts");
          }}
          className="nav-button back-button"
          
        >
          ← Back to All Podcasts
        </button>

        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="nav-button top-button"
          
        >
          ↑ Back to Top
        </button>
      </div>
        </div>
      </section>

      
    </>
  );
}