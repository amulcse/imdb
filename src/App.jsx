import { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import PosterCarousel from './components/PosterCarousel';
import { movies } from './data/movies';
import './App.css';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="app">
      <LeftPanel
        selectedMovie={selectedMovie}
        onSearch={(q) => console.log('Search:', q)}
      />
      <main className="right-panel">
        <PosterCarousel
          movies={movies}
          selectedId={selectedMovie?.id}
          onSelect={setSelectedMovie}
        />
      </main>
    </div>
  );
}
