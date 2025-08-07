import React from "react";

function VideoStream() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Live Emotion Detection</h2>
      <img
        src="http://localhost:5000/video_feed"
        alt="Live Video"
        className="rounded-lg shadow-md w-full max-w-lg"
      />
    </div>
  );
}

export default VideoStream;
