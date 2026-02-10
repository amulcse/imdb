import { useRef, useState, useCallback } from 'react';
import { getPosterUrl } from '../data/movies';
import './PosterCarousel.css';

const ROWS = 3;
const COLS_MAX = 32;
const COLS_MIN = 12;
const RADIUS = 280;
const POSTER_WIDTH = 88;
const POSTER_HEIGHT = 132;
const GAP = 5;

export default function PosterCarousel({ movies, selectedId, onSelect }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [failedPosterIds, setFailedPosterIds] = useState(() => new Set());
  const startX = useRef(0);
  const startRotation = useRef(0);
  const hasMoved = useRef(false);
  const DRAG_THRESHOLD = 5;

  const markPosterFailed = useCallback((movieId) => {
    setFailedPosterIds((prev) => {
      const next = new Set(prev);
      next.add(movieId);
      return next;
    });
  }, []);

  const COLS = movies.length <= 0
    ? COLS_MIN
    : Math.min(COLS_MAX, Math.max(COLS_MIN, Math.ceil(movies.length * 2)));
  const totalCells = ROWS * COLS;
  const cells = Array.from({ length: totalCells }, (_, i) => movies[i % movies.length]);

  const rotationRad = (rotation * Math.PI) / 180;

  const handlePointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasMoved.current = false;
    startX.current = e.clientX;
    startRotation.current = rotation;
  }, [rotation]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) hasMoved.current = true;
    const sensitivity = 0.5;
    setRotation(startRotation.current + dx * sensitivity);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setRotation((r) => r + e.deltaY * 0.2);
  }, []);

  if (movies.length === 0) {
    return (
      <section className="carousel-container carousel-container--empty">
        <p className="carousel-empty-message">No movies match this filter.</p>
      </section>
    );
  }

  return (
    <section
      className="carousel-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      aria-label="Movie poster carousel — drag or scroll to rotate, click a poster to select"
    >
      <div className="carousel-stage carousel-stage--cylinder">
        {cells.map((movie, index) => {
          const col = index % COLS;
          const row = Math.floor(index / COLS);
          const theta = (col / COLS) * 2 * Math.PI - rotationRad;
          const x = Math.sin(theta) * RADIUS;
          const z = Math.cos(theta) * RADIUS;
          const yOffset = (row - (ROWS - 1) / 2) * (POSTER_HEIGHT + GAP);
          const isSelected = selectedId === movie.id;
          const rotateYDeg = (theta * 180) / Math.PI;
          const depthScale = 0.72 + (0.28 * (z + RADIUS)) / (2 * RADIUS);

          return (
            <button
              key={`${row}-${col}-${movie.id}`}
              type="button"
              className={`poster-card ${isSelected ? 'poster-card--selected' : ''}`}
              style={{
                width: POSTER_WIDTH,
                height: POSTER_HEIGHT,
                marginTop: -POSTER_HEIGHT / 2,
                transform: `
                  scale(${depthScale})
                  rotateY(${rotateYDeg}deg)
                  translateZ(${z}px)
                  translateY(${yOffset}px)
                  translateX(calc(-50% + ${x}px))
                `,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(movie);
              }}
              aria-label={`Select ${movie.title}`}
            >
              {failedPosterIds.has(movie.id) ? (
                <div className="poster-card-fallback">
                  <span className="poster-card-fallback-title">{movie.title}</span>
                </div>
              ) : (
                <img
                  src={getPosterUrl(movie)}
                  alt=""
                  width={POSTER_WIDTH}
                  height={POSTER_HEIGHT}
                  draggable={false}
                  loading="lazy"
                  onError={() => markPosterFailed(movie.id)}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
