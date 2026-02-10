import { useState } from 'react';
import './LeftPanel.css';

const SUGGESTIONS = ['Just had a breakup', 'Dystopian future', '1900s sci‑fi'];

export default function LeftPanel({ selectedMovie, onSearch }) {
  const [query, setQuery] = useState('Just had a breakup');

  return (
    <aside className="left-panel">
      <div className="left-panel-grid" aria-hidden="true" />
      <div className="left-panel-content">
        <h1 className="logo">goodflix</h1>
        <p className="headline">Stop Scrolling. Start Watching.</p>
        <p className="description">
          How many times have you sat in front of your TV, scrolling endlessly through options,
          spending hours deciding what to watch, only to eventually give up and switch it off?
          Goodflix is a creative experiment designed to cure that decision fatigue. We recommend
          the best movies based on your specific taste, current mood, or whatever vibe you're chasing.
        </p>

        {selectedMovie ? (
          <section className="movie-details" aria-label="Selected movie">
            <p className="instruction">SELECTED</p>
            <h2 className="movie-details-title">{selectedMovie.title}</h2>
            <p className="movie-details-meta">{selectedMovie.year} · {selectedMovie.genre}</p>
            <p className="movie-details-overview">{selectedMovie.overview}</p>
          </section>
        ) : (
          <p className="instruction">SELECT A POSTER TO REVEAL</p>
        )}

        <div className="search-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search movies, genres, or describe a vibe…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch?.(query)}
            aria-label="Search movies, genres, or describe a vibe"
          />
          <button type="button" className="run-btn" onClick={() => onSearch?.(query)}>
            RUN
          </button>
        </div>
        <div className="suggestions">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="suggestion-tag"
              onClick={() => { setQuery(s); onSearch?.(s); }}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
