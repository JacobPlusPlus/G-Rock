import { useState, useEffect } from 'react';
import './App.css';

// Komponent reprezentujący pojedynczy utwór
const TrackCard = ({ number, title, artist }) => {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-10px)`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)'
    });
  };

  return (
    <article 
      className="track-card" 
      style={style} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <span className="track-number">{number}</span>
      <h3 className="track-title">{title}</h3>
      <p className="track-artist">{artist}</p>
    </article>
  );
};

// Główny komponent aplikacji
function App() {
  const [flashOpacity, setFlashOpacity] = useState(0);

  // Hook generujący losowe błyskawice w tle
  useEffect(() => {
    let timeoutId;

    const triggerLightning = () => {
      const isDouble = Math.random() > 0.7;
      setFlashOpacity((Math.random() * 0.5 + 0.3).toString());

      setTimeout(() => {
        setFlashOpacity(0);
        if (isDouble) {
          setTimeout(() => {
            setFlashOpacity(0.6);
            setTimeout(() => {
              setFlashOpacity(0);
            }, 50);
          }, 100);
        }
      }, 50 + Math.random() * 100);

      const nextStrikeTime = Math.random() * 7000 + 3000;
      timeoutId = setTimeout(triggerLightning, nextStrikeTime);
    };

    // Odpalamy pierwszą błyskawicę chwilę po załadowaniu
    timeoutId = setTimeout(triggerLightning, 2000);

    // Czyszczenie interwału, gdy komponent znika
    return () => clearTimeout(timeoutId);
  }, []);

  // Przykładowa lista utworów (łatwa do edycji)
  const tracks = [
    { id: '01', title: 'Placeholder Title Alpha', artist: 'TBA Artist' },
    { id: '02', title: 'Cybernetic Riff', artist: 'TBA Artist' },
    { id: '03', title: 'Overdrive Protocol', artist: 'TBA Artist' },
    { id: '04', title: 'Placeholder Title Omega', artist: 'TBA Artist' },
  ];

  return (
    <>
      <div 
        className="flash-overlay" 
        style={{ opacity: flashOpacity }} 
      />
      <div className="ambient-dust" />

      <header>
        <div className="logo-container">
          <span className="logo-letter">G</span>
          
          <svg className="logo-bolt" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          
          <span className="logo-letter">ROC</span>
          
          <svg className="logo-k-guitar" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <line x1="25" y1="5" x2="25" y2="115" />
            <line x1="32" y1="5" x2="32" y2="115" strokeWidth="1" strokeDasharray="4" />
            <polygon points="15,5 35,5 30,20 20,20" fill="var(--neon-red)" />
            <path d="M25 55 Q 60 20 80 15 Q 70 35 45 60" fill="none" />
            <path d="M25 65 Q 60 80 85 105 Q 60 115 40 85" fill="none" />
            <circle cx="50" cy="70" r="8" stroke="var(--neon-red)" fill="transparent" />
            <line x1="25" y1="60" x2="55" y2="90" strokeWidth="1" />
          </svg>
        </div>
        <p className="subtitle">Wysokie Napięcie</p>
      </header>

      <main>
        <h2 className="section-title">SETLISTA // 01</h2>
        <section className="tracklist">
          {tracks.map((track) => (
            <TrackCard 
              key={track.id} 
              number={track.id} 
              title={track.title} 
              artist={track.artist} 
            />
          ))}
        </section>

        <section className="spotify-section">
          <h2 className="spotify-title">DOŚWIADCZ PEŁNEJ MOCY</h2>
          <br />
          <a href="https://open.spotify.com/playlist/4SgMhgFuhFx4uljc3uX6Fg" className="spotify-btn">Odpal Playlistę Spotify 🎧</a>
        </section>
      </main>
    </>
  );
}

export default App;