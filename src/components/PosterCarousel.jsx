import { useRef, useState, useCallback } from 'react';
import { getPosterUrl } from '../data/movies';
import './PosterCarousel.css';

const ROWS = 3;
const COLS = 16;
const RADIUS = 340;
const POSTER_WIDTH = 100;
const POSTER_HEIGHT = 150;
const GAP = 5;

export default function PosterCarousel({ movies, selectedId, onSelect }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const hasMoved = useRef(false);
  const DRAG_THRESHOLD = 5;

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

  const totalCells = ROWS * COLS;
  const cells = Array.from({ length: totalCells }, (_, i) => movies[i % movies.length]);

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
          const rotateY = (-theta * 180) / Math.PI;
          const yOffset = (row - (ROWS - 1) / 2) * (POSTER_HEIGHT + GAP);
          const isSelected = selectedId === movie.id;

          return (
            <button
              key={`${row}-${col}-${movie.id}`}
              type="button"
              className={`poster-card ${isSelected ? 'poster-card--selected' : ''}`}
              style={{
                width: POSTER_WIDTH,
                height: POSTER_HEIGHT,
                transform: `
                  translateX(calc(-50% + ${x}px))
                  translateY(${yOffset}px)
                  translateZ(${z}px)
                  rotateY(${rotateY}deg)
                `,
              }}
              onClick={(e) => {
                if (!hasMoved.current) onSelect?.(movie);
                e.stopPropagation();
              }}
              aria-label={`Select ${movie.title}`}
            >
              <img
                src={getPosterUrl(movie)}
                alt=""
                width={POSTER_WIDTH}
                height={POSTER_HEIGHT}
                draggable={false}
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
