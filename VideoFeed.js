import React from 'react';

function VideoFeed() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Live Emotion Detection</h2>
      <img
        src="http://127.0.0.1:5000/video_feed"
        alt="Live Feed"
        className="rounded shadow border"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}

export default VideoFeed;
