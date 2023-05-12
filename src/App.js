import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import MovieState from './context/movies/MovieState';
import Home from './components/Home';

function App() {
  return (
    <>
      <MovieState>
        <Home />
      </MovieState>
    </>
  );
}

export default App;
