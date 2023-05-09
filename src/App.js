import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);

  // Get Movies using OMDB API
  const getMoviesRequest = async (searchValue) => {
    let url = "";
    try {
      if (searchValue) {
        url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ddc261d4`;
      } else {
        url = `http://www.omdbapi.com/?s=avengers&apikey=ddc261d4`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.log('Internal server error', error);
      setMovies(["No data found"]);
    }
  };

  // Saves movies to localStorage
  const saveMoviesToLocalStorage = (items) => {
    localStorage.setItem("filmix-favourite-movies", JSON.stringify(items));
  };

  // Saves movie ID's to localStorage
  const saveIDToLocalStorage = (ids) => {
    localStorage.setItem("filmix-selected-movies", JSON.stringify(ids));
  };

  // Checks for favourite movies
  const checkFavouriteMovie = (movieFavourites) => {
    if (movieFavourites) {
      // const findMovie = movies.find(movie => movie.imdbID === movieFavourites.imdbID)
      const selectedMoviesID = [...selectedMovie, movieFavourites];
      setSelectedMovie(selectedMoviesID);
      saveIDToLocalStorage(selectedMoviesID);
    }
  }

  // Add to favourite movies
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveMoviesToLocalStorage(newFavouriteList);
    checkFavouriteMovie(movie.imdbID);
  };

  // Remove from favourite movies
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(favourite => favourite.imdbID !== movie.imdbID);
    const newIDList = selectedMovie.filter(selected => selected !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveMoviesToLocalStorage(newFavouriteList);
    setSelectedMovie(newIDList)
    saveIDToLocalStorage(newIDList);
  };

  // Useeffect hook to trigger once search input triggers
  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  // Useeffect hook to get movies stored in localStorage
  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("filmix-favourite-movies"));
    movieFavourites && setFavourites(movieFavourites);
    const selectedMovies = JSON.parse(localStorage.getItem("filmix-selected-movies"));
    selectedMovies && setSelectedMovie(selectedMovies);
    // checkFavouriteMovie();
  }, []);

  return (
    <>
      <header>
        <Navbar heading="Flimix" searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>

      <main>
        {/* action movie section */}
        <section id="action" className="container-fluid movie-app my-4" >
          <h3>Action Movies</h3>
          <div className="row py-3">
            <MovieList handleFavouriteClick={!movies.includes(favourites) ? addFavouriteMovie : removeFavouriteMovie} movies={movies} addFavourites={AddFavourites} removeFavourites={RemoveFavourites} selectedMovie={selectedMovie} />
          </div>
        </section>

        {/* favourites movie section */}
        <section id="favourites" className="container-fluid movie-app my-4">
          <h3>Favourites</h3>
          <div className="row py-3">
            <MovieList handleFavouriteClick={!movies.includes(favourites) ? addFavouriteMovie : removeFavouriteMovie} movies={favourites} addFavourites={AddFavourites} removeFavourites={RemoveFavourites} selectedMovie={selectedMovie} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
