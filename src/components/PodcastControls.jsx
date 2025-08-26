


import React, { useRef, useEffect, useState } from "react";
import { getSingleEpisodeTranscript } from "../api";
import { FaPlay, FaPause } from "react-icons/fa";
// import { HiDownload } from "react-icons/hi";

import '../styles/_controlslisten.scss'; // Import  styles

export default function PodcastControls({ audioUrl, episodeId }) {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [transcript, setTranscript] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState(null);

  // Load saved progress 
  useEffect(() => {
    const savedTime = localStorage.getItem(`podcast-${audioUrl}-progress`);
    if (savedTime && audioRef.current) {
      audioRef.current.currentTime = parseFloat(savedTime);
      setProgress(parseFloat(savedTime));
    }
  }, [audioUrl]);

  // Update progress while playing
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setProgress(currentTime);
    localStorage.setItem(`podcast-${audioUrl}-progress`, currentTime);
  };

  // Load duration when metadata is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const onSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const fetchTranscript = async () => {
    if (!episodeId) {
      setTranscript("Transcript not available.");
      return;
    }
    setLoadingTranscript(true);
    setTranscriptError(null);
    try {
      const data = await getSingleEpisodeTranscript(episodeId);
      setTranscript(data?.transcript || "Transcript not available.");
    } catch (err) {
      setTranscriptError("Failed to load transcript.");
    } finally {
      setLoadingTranscript(false);
    }
  };

  const handleTranscriptToggle = () => {
    if (!showTranscript) {
      fetchTranscript();
    }
    setShowTranscript(!showTranscript);
  };

  return (
    <div className="audio-player-wrapper">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />

      {/* Controls */}
      <div className="controls">
       <button
          onClick={togglePlay}
          className="play-pause-btn"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <FaPause /> : <FaPlay />}
      </button>
        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={onSeek}
          className="progress-bar"
        />

        <div className="time">
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>

      {/* Transcript Toggle Button */}
      <button onClick={handleTranscriptToggle} className="transcript-toggle-btn">
        {showTranscript ? "Hide Transcript" : "Show Transcript"}
      </button>

      {/* Transcript Display */}
      {showTranscript && (
        <div className="transcript-box">
          {loadingTranscript ? (
            <p>Loading transcript...</p>
          ) : transcriptError ? (
            <p className="error">{transcriptError}</p>
          ) : (
            <pre>{transcript}</pre>
          )}
        </div>
      )}

     {/* <a href={audioUrl} download className="download-link" aria-label="Download Episode">
          <HiDownload className="download-icon" />
    </a> */}
    </div>
  );
}