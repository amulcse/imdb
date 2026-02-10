import { useState } from 'react';
import { getAllGenres } from '../data/movies';
import './LeftPanel.css';

const SUGGESTIONS = ['Just had a breakup', 'Dystopian future', '1900s sci‑fi'];

export default function LeftPanel({ selectedMovie, movies = [], genreFilter, onGenreFilter, onSearch }) {
  const [query, setQuery] = useState('');
  const genres = getAllGenres(movies);

  return (
    <aside className="left-panel">
      <div className="left-panel-grid" aria-hidden="true" />
      <div className="left-panel-content">
        <h1 className="logo">IMDb</h1>
        <p className="headline">Stop Scrolling. Start Watching.</p>
        <p className="description">
          Find something to watch. Select a poster to see details, or search and filter by genre below.
        </p>

        {selectedMovie ? (
          <section className="movie-details" aria-label="Selected movie">
            <p className="instruction">SELECTED</p>
            <h2 className="movie-details-title">{selectedMovie.title.toUpperCase()}</h2>
            <div className="movie-meta-grid">
              <div className="meta-box">
                <span className="meta-label">YEAR</span>
                <span className="meta-value">{selectedMovie.year}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">LANG</span>
                <span className="meta-value">{selectedMovie.lang || 'EN'}</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">RATING</span>
                <span className="meta-value">{selectedMovie.rating != null ? selectedMovie.rating : '—'}<span className="meta-rating-suffix"> /10</span></span>
              </div>
            </div>
            <p className="movie-details-overview">{selectedMovie.overview}</p>
            {selectedMovie.quote && (
              <p className="movie-quote">"{selectedMovie.quote}"</p>
            )}
            <div className="details-two-col">
              <div className="vibe-check">
                <p className="vibe-label">VIBE CHECK</p>
                {selectedMovie.duration && (
                  <span className="vibe-duration">Duration {selectedMovie.duration}</span>
                )}
                <div className="vibe-tags">
                  {(selectedMovie.genres || selectedMovie.genre?.split(/,\s*/) || []).map((g) => (
                    <button key={g} type="button" className="vibe-tag" onClick={() => onGenreFilter?.(g)}>
                      {g.trim().toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="creative-team">
                <p className="vibe-label">CREATIVE TEAM</p>
                {selectedMovie.director && (
                  <p className="creative-line">Director: {selectedMovie.director}</p>
                )}
                {selectedMovie.starring && (
                  <p className="creative-line">Starring: {selectedMovie.starring}</p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <p className="instruction">SELECT A POSTER TO REVEAL</p>
        )}

        <div className="search-row">
          <input
            type="text"
            className="search-input"
            placeholder="SEARCH MOVIES, GENRES, OR DESCRIBE A VIBE…"
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

        <div className="genre-filter">
          <p className="genre-filter-label">FILTER BY GENRE</p>
          <div className="genre-tags">
            <button
              type="button"
              className={`genre-tag ${!genreFilter ? 'genre-tag--active' : ''}`}
              onClick={() => onGenreFilter?.(null)}
            >
              All
            </button>
            {genres.map((g) => (
              <button
                key={g}
                type="button"
                className={`genre-tag ${genreFilter === g ? 'genre-tag--active' : ''}`}
                onClick={() => onGenreFilter?.(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
