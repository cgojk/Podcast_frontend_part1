import React from "react";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css'; // This line is required for styling the controls in the adio part of the app

export default function PodcastControls({ audioUrl }) {
  return (
    <div className="audio-player">
      <AudioPlayer
        src={audioUrl}
        autoPlay={false}
        layout="horizontal"
        showJumpControls={true} // ⏮ ⏭ buttons
        showSkipControls={true} //  hide next/prev track
        customAdditionalControls={[true]} // hides loop/download/etc
        customVolumeControls={[true]} // hides volume controls
      />
    </div>
  );
}