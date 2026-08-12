function Sprockets({ position }) {
  return (
    <div className={`sprocket-row ${position}`}>
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

export default function SongReel({ songs, currentIndex, isPlaying, onSelect }) {
  return (
    <section className="reel-section">
      <div className="reel-heading">
        <h2>Aaj Ki Fehrist — Today&rsquo;s Playlist</h2>
        <span>{songs.length} SONGS</span>
      </div>
      <Sprockets position="top" />
      <div className="reel-track">
        {songs.map((song, index) => {
          const active = index === currentIndex;
          return (
            <button
              key={song.id}
              className={`reel-frame ${active ? "active" : ""}`}
              onClick={() => onSelect(index)}
              aria-pressed={active}
            >
              <span className="reel-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="reel-info">
                <span className="title-row">
                  <span className="title">{song.title}</span>
                  <span className="hin-title">{song.hindiTitle}</span>
                </span>
                <span className="meta">
                  {song.singer} &middot; {song.film}
                </span>
              </span>
              <span className="reel-year">{song.year}</span>
              <span className="reel-play-btn" aria-hidden="true">
                {active && isPlaying ? "❚❚" : "▶"}
              </span>
            </button>
          );
        })}
      </div>
      <Sprockets position="bottom" />
    </section>
  );
}
