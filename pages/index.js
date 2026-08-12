import Head from "next/head";
import { useState } from "react";
import songs from "../data/songs";
import SongReel from "../components/SongReel";
import GramophonePlayer from "../components/GramophonePlayer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function selectSong(index) {
    setCurrentIndex(index);
  }

  function next() {
    setCurrentIndex((i) => (i + 1) % songs.length);
  }

  function prev() {
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
  }

  return (
    <>
      <Head>
        <title>Sunehri Yaadein — Evergreen Bollywood Radio</title>
      </Head>

      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">सुनहरी यादें</span>
          <span className="brand-sub">Sunehri Yaadein</span>
        </div>
        <div className="now-online">
          <span className="dot" /> playing since 1949
        </div>
      </header>

<section className="marquee">
  <div className="marquee-inner">
    <div className="marquee-eyebrow">एक शाम पुराने गानों के नाम</div>
    <h1>
      <span className="hin">पुरानी धुनें, नई महफ़िल</span>
      
    </h1>
    <p>
      A small radio of the golden-era songs that never really left — Lata, Mukesh, Rafi,
      Kumar Sanu, Udit Narayan
      . Pick a record from the reel below and let it play.
    </p>
  </div>
</section>


      <SongReel
        songs={songs}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        onSelect={selectSong}
      />

      <GramophonePlayer
        songs={songs}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={next}
        onPrev={prev}
        onSelect={selectSong}
      />

      <footer className="site-footer">Built with Next.js &middot; songs streamed via YouTube</footer>
    </>
  );
}
