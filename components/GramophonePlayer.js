import { useEffect, useRef, useState } from "react";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function GramophonePlayer({ songs, currentIndex, isPlaying, setIsPlaying, onNext, onPrev, onSelect }) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const pollRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const song = songs[currentIndex];

  // Load the YouTube IFrame API once, then create a hidden (audio-only) player.
  useEffect(() => {
    function createPlayer() {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "0",
        width: "0",
        videoId: song.youtubeId,
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) onNext();
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
      clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap the track whenever the selected song changes.
  useEffect(() => {
    if (!ready || !playerRef.current || !playerRef.current.loadVideoById) return;
    playerRef.current.loadVideoById(song.youtubeId);
    setCurrent(0);
    setDuration(0);
  }, [currentIndex, ready, song.youtubeId]);

  // Poll progress while playing.
  useEffect(() => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      if (!playerRef.current || !playerRef.current.getCurrentTime) return;
      setCurrent(playerRef.current.getCurrentTime() || 0);
      setDuration(playerRef.current.getDuration() || 0);
    }, 500);
    return () => clearInterval(pollRef.current);
  }, [ready]);

  function togglePlay() {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  function handleSeek(e) {
    const value = Number(e.target.value);
    setCurrent(value);
    if (playerRef.current && playerRef.current.seekTo) playerRef.current.seekTo(value, true);
  }

  return (
    <div className="player-dock">
      <div className="player-bar">
        <div className={`gramophone ${isPlaying ? "playing" : ""}`}>
          <div style={{ position: "relative" }}>
            <div className={`record ${isPlaying ? "spinning" : ""}`} />
            <div className="tonearm" />
          </div>
        </div>

        <div className="player-right">
          <div className="track-meta">
            <div className="title">
              {song.title} <span style={{ opacity: 0.6 }}>&middot; {song.hindiTitle}</span>
            </div>
            <div className="sub">
              {song.singer} — {song.film} ({song.year})
            </div>
          </div>
          <div className="seek-row">
            <span className="seek-time">{formatTime(current)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={current}
              onChange={handleSeek}
              aria-label="Seek"
            />
            <span className="seek-time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="transport">
          <button onClick={onPrev} aria-label="Previous song">⏮</button>
          <button className="play-toggle" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button onClick={onNext} aria-label="Next song">⏭</button>
        </div>
      </div>
      {/* Hidden YouTube player — audio only, no visible video */}
      <div ref={containerRef} style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} />
    </div>
  );
}
