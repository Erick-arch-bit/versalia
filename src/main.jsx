import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { poems } from './contentLoader';

function App() {
  const [selectedPoem, setSelectedPoem] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPoem(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const selectedIndex = selectedPoem ? poems.findIndex((poem) => poem.id === selectedPoem.id) : -1;
  const totalCount = String(poems.length).padStart(2, '0');
  const showPrevious = () => setSelectedPoem(poems[(selectedIndex - 1 + poems.length) % poems.length]);
  const showNext = () => setSelectedPoem(poems[(selectedIndex + 1) % poems.length]);

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Volver al inicio">
          <span className="wordmark-v">V</span><span>ersalia</span>
        </a>
        <nav className="topnav" aria-label="Este pequeño lugar">
          <a href="#collection">lo nuestro</a>
          <a href="#about">para mi amor</a>
        </nav>
        <div className="topbar-stamp" aria-label="Solo para mi amor">amor<br />para ti</div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-gridline hero-gridline-one" />
          <div className="hero-gridline hero-gridline-two" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> para mi amor · sin fecha</p>
            <h1 id="hero-title">Amor, hay cosas que solo saben <em>decirse</em> despacio.</h1>
            <p className="hero-intro">Te hice este pequeño lugar, amor, para guardar lo que siento por ti cuando un mensaje se queda corto.</p>
            <button className="text-cta" type="button" onClick={scrollToCollection}>
              <span>Leer lo nuestro</span>
              <span className="cta-arrow" aria-hidden="true">↘</span>
            </button>
          </div>

          <div className="hero-art" aria-label="La marca secreta de mi amor y yo">
            <div className="orbit orbit-large" />
            <div className="orbit orbit-small" />
            <div className="orbit-dot orbit-dot-top" />
            <div className="orbit-dot orbit-dot-side" />
            <div className="hero-monogram">V</div>
            <div className="hero-caption hero-caption-top">guardado<br /><strong>para ti</strong></div>
            <div className="hero-caption hero-caption-bottom">sin prisa,<br /><strong>amor</strong></div>
            <div className="hero-stamp"><span>✳</span><small>solo<br />nosotros</small></div>
          </div>

          <div className="hero-footer">
            <span>desde aquel día</span>
            <span>lo que somos cuando nadie mira</span>
            <span>baja despacio ↓</span>
          </div>
        </section>

        <section className="collection" id="collection" aria-labelledby="collection-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-number">01</span> nuestras páginas</p>
              <h2 id="collection-title">Lo que guardé<br /><em>de nosotros.</em></h2>
            </div>
            <p className="section-aside">Pequeñas cosas.<br />De esas que solo<br />tú reconoces, amor.</p>
          </div>

          <div className="poem-rail" role="list" aria-label="Páginas para ella">
            {poems.map((poem) => (
              <button
                className={`poem-card card-${poem.className}`}
                key={poem.id}
                type="button"
                role="listitem"
                style={{ '--card-accent': poem.accent }}
                onClick={() => setSelectedPoem(poem)}
                aria-label={`Leer ${poem.title}`}
              >
                <span className="card-ghost-number">{poem.number}</span>
                <span className="card-topline"><span>{poem.collection}</span><span>{poem.type === 'carta' ? 'una carta' : 'un poema'}</span></span>
                <span className="card-orbit" aria-hidden="true" />
                <span className="card-copy">
                  <span className="card-kicker">{poem.mood}</span>
                  <span className="card-title">{poem.title}</span>
                  <span className="card-subtitle">{poem.subtitle}</span>
                </span>
                <span className="card-excerpt">{poem.excerpt}</span>
                <span className="card-open">leer esto <b>↗</b></span>
              </button>
            ))}
          </div>
          <div className="rail-footer"><span>una página cada vez</span><span className="rail-line" /><span>{poems.length} recuerdos</span></div>
        </section>

        <section className="note-section" id="about" aria-labelledby="note-title">
          <div className="note-mark">✳</div>
          <div className="note-content">
            <p className="eyebrow"><span className="eyebrow-number">02</span> lo que quería decirte</p>
            <h2 id="note-title">No son solo cartas.<br /><em>Son todo lo que crece<br />y siento por ti.</em></h2>
            <p>Amor, te hice este pequeño rincón porque aquí caben tus recuerdos, nuestras conversaciones y todo eso que sigue creciendo dentro de mí cuando pienso en ti.</p>
          </div>
          <div className="note-signature">para mi amor,<br /><span>con todo lo que siento</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top"><span className="wordmark-v">V</span><span>ersalia</span></a>
        <span>hecho por mí, para mi amor</span>
        <span>todo lo que siento</span>
      </footer>

      {selectedPoem && (
        <div className="reader-overlay" role="dialog" aria-modal="true" aria-labelledby="reader-title" onClick={(event) => event.target === event.currentTarget && setSelectedPoem(null)}>
          <article className={`reader-sheet reader-${selectedPoem.className}`}>
            <div className="reader-topbar">
              <span>para mi amor / {selectedPoem.number}</span>
              <button className="close-reader" type="button" onClick={() => setSelectedPoem(null)} aria-label="Volver a nuestras páginas">volver <b>×</b></button>
            </div>
            <div className="reader-body">
              <div className="reader-meta">
                <span className="reader-index">{selectedPoem.number} — {totalCount}</span>
                <span>{selectedPoem.type === 'carta' ? 'una carta' : 'un poema'}</span>
                <span>{selectedPoem.year}</span>
              </div>
              <div className="reader-main">
                <p className="reader-kicker">{selectedPoem.mood}</p>
                <h2 id="reader-title">{selectedPoem.title}</h2>
                <p className="reader-subtitle">{selectedPoem.subtitle}</p>
                <div className="poem-lines">
                  {selectedPoem.lines.map((line, index) => line ? <span key={`${selectedPoem.id}-${index}`}>{line}</span> : <span className="poem-break" key={`${selectedPoem.id}-${index}`} />)}
                </div>
              </div>
              <aside className="reader-aside">
                <span className="aside-rule" />
                <p>{selectedPoem.note}</p>
                <span className="aside-symbol">✳</span>
              </aside>
            </div>
            <div className="reader-footer">
              <button type="button" onClick={showPrevious}>← anterior</button>
              <span>te quiero, amor</span>
              <button type="button" onClick={showNext}>siguiente →</button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
