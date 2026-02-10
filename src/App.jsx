import { useState, useMemo } from 'react';
import LeftPanel from './components/LeftPanel';
import PosterCarousel from './components/PosterCarousel';
import { movies } from './data/movies';
import './App.css';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);

  const filteredMovies = useMemo(() => {
    if (!genreFilter) return movies;
    return movies.filter((m) => (m.genres || []).includes(genreFilter));
  }, [genreFilter]);

  const effectiveSelected = selectedMovie && filteredMovies.some((m) => m.id === selectedMovie.id)
    ? selectedMovie
    : null;

  return (
    <div className="app">
      <LeftPanel
        movies={movies}
        selectedMovie={effectiveSelected}
        genreFilter={genreFilter}
        onGenreFilter={setGenreFilter}
        onSearch={(q) => console.log('Search:', q)}
      />
      <main className="right-panel">
        <PosterCarousel
          movies={filteredMovies}
          selectedId={effectiveSelected?.id}
          onSelect={setSelectedMovie}
        />
      </main>
    </div>
  );
}
