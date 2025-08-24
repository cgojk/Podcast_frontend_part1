



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PodcastControls from "../../components/PodcastControls";
import { HiDownload } from "react-icons/hi";

import {
  getSinglePodcast,
  getAllPodcastEpisodes,
} from "../../api";
import { getRandomFallbackImage } from "../../utils/fallbackImage";
import { RiArrowLeftLine } from "react-icons/ri";

export default function PodcastListen() {
  const { id } = useParams(); // podcast id
  const navigate = useNavigate();

  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [podcastData, episodeData] = await Promise.all([
          getSinglePodcast(id),
          getAllPodcastEpisodes(id, { sort: "episode_number_ASC" }),
        ]);

        setPodcast(podcastData);
        setEpisodes(episodeData);

        if (episodeData.length > 0) {
          setCurrentEpisode(episodeData[0]); // Default to first episode
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleEpisodeSelect = (episode) => {
    setCurrentEpisode(episode);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: scroll to top
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!podcast || episodes.length === 0) return <p>No content found.</p>;

  const imageToShow =
    podcast.cover_image_url?.trim() || getRandomFallbackImage(podcast.podcast_id);

  return (
    <div className="listen-page container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <RiArrowLeftLine size={24} /> Back
      </button>

      <div className="podcast-listen-header">
        <img
          src={imageToShow}
          alt={`Cover for ${podcast.title}`}
          className="listen-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getRandomFallbackImage(podcast.podcast_id);
          }}
        />
        <div className="listen-info">
          <h1>{podcast.title}</h1>
          <p>{podcast.description}</p>

        
              {currentEpisode?.audio_url && (
                <a
                  href={currentEpisode.audio_url}
                  download
                  className="download-link"
                  aria-label="Download Episode"
                >
                  <HiDownload className="download-icon" />
                  <span className="download-text">Download</span>
                </a>
              )}
  
        </div>
      </div>

      {/* Audio Player for Selected Episode */}
      {currentEpisode && (
        <div className="audio-section">
          <h2>Now Playing: {currentEpisode.title}</h2>
          <PodcastControls
            audioUrl={currentEpisode.audio_url}
            episodeId={currentEpisode.episode_id}
          />
        </div>
      )}

      {/* List of Episodes */}
      <div className="episode-list-section">
        <h2>Other Episodes</h2>
        <ul className="episode-list">
          {episodes.map((episode) => (
            <li key={episode.episode_id}>
              <button
                className={`episode-button ${
                  currentEpisode?.episode_id === episode.episode_id ? "active" : ""
                }`}
                onClick={() => handleEpisodeSelect(episode)}
              >
                Episode {episode.episode_number}: {episode.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}