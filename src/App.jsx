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
  
  <svg className="logo-k-guitar" viewBox="0 0 483.226 483.226" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.252,360.349c60.967-28.236,103.987-14.331,113.845-4.473c8.572,8.572-17.083,90.488-25.954,117.803
        c-1.583,4.877,0.755,6.841,5.266,4.4l83.477-45.063c4.51-2.437,9.027-8.484,10.165-13.485
        c5.448-23.988,21.259-88.376,37.461-104.582c14.016-14.01,37.971-18.073,51.095-19.251c5.113-0.453,11.312-4.104,13.821-8.572
        l17.396-30.926c2.513-4.468,1.311-5.474-2.985-2.669c-13.053,8.496-40.203,22.218-58.412,4.004
        c-7.881-7.883-6.586-21.206-1.234-35.668L378.504,90.521l0.068,0.074c0,0,15.44-14.99,27.699-9.986
        c0,0,36.323-43.138,60.841-42.688c0,0,8.403-18.839,16.113-33.822L356.771,32.483c0,0,6.592,10.345,3.435,22.319L240.065,176.836
        c-4.296-0.495-8.229-2.066-11.438-5.274c-14.329-14.328,6.404-45.676,17.168-59.875c3.102-4.093,2.023-5.504-2.621-3.338
        l-42.637,19.837c-4.651,2.17-9.155,8.019-10.247,13.032c-3.366,15.49-11.357,46.474-23.501,58.61
        c-13.662,13.661-95.407,29.541-123.064,34.59c-5.048,0.92-9.186,5.771-9.602,10.893c-3.424,42.074-24.353,91.386-33.238,110.726
        C-1.256,360.701,0.595,362.501,5.252,360.349z" />
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