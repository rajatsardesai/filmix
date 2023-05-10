import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const API_KEY = process.env.REACT_APP_FILMIX_APP;
  const [movies, setMovies] = useState([]);
  const [disneyMovies, setDisneyMovies] = useState([]);
  const [pixarMovies, setPixarMovies] = useState([]);
  const [potterMovies, setPotterMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  // Search Movies using OMDB API
  const searchMoviesRequest = async (searchValue) => {
    try {
      let url = "";
      if (searchValue) {
        url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
      } else {
        url = `http://www.omdbapi.com/?s=marvel&apikey=${API_KEY}`;
      }
      const response = await axios.get(url);
      if (response.data.Search) {
        setMovies(response.data.Search);
      }
    } catch (error) {
      console.log('Internal server error', error);
      setMovies(["No data found"]);
    }
  };

  // Get Disney Movies using OMDB API
  const disneyMoviesRequest = async () => {
    try {
      const url = `http://www.omdbapi.com/?s=disney&apikey=${API_KEY}`;
      const response = await axios.get(url);
      if (response.data.Search) {
        setDisneyMovies(response.data.Search);
      }
    } catch (error) {
      console.log('Internal server error', error);
      setDisneyMovies(["No data found"]);
    }
  };

  // Get Pixar Movies using OMDB API
  const pixarMoviesRequest = async () => {
    try {
      const url = `http://www.omdbapi.com/?s=pixar&apikey=${API_KEY}`;
      const response = await axios.get(url);
      if (response.data.Search) {
        setPixarMovies(response.data.Search);
      }
    } catch (error) {
      console.log('Internal server error', error);
      setPixarMovies(["No data found"]);
    }
  };

  // Get Harry Potter Movies using OMDB API
  const potterMoviesRequest = async () => {
    try {
      const url = `http://www.omdbapi.com/?s=potter&apikey=${API_KEY}`;
      const response = await axios.get(url);
      if (response.data.Search) {
        setPotterMovies(response.data.Search);
      }
    } catch (error) {
      console.log('Internal server error', error);
      setPotterMovies(["No data found"]);
    }
  };

  // Saves movies to localStorage
  const saveMoviesToLocalStorage = (items) => {
    localStorage.setItem("filmix-favourite-movies", JSON.stringify(items));
  };

  // Add to favourite movies
  const addFavouriteMovie = (movie) => {
    if (!favourites.includes(movie)) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveMoviesToLocalStorage(newFavouriteList);
    }
  };

  // Remove from favourite movies
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(favourite => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveMoviesToLocalStorage(newFavouriteList);
  };

  // Useeffect hook to trigger once search input triggers
  useEffect(() => {
    searchMoviesRequest(searchValue);
  }, [searchValue]);

  // Useeffect hook to load movies
  useEffect(() => {
    disneyMoviesRequest();
    pixarMoviesRequest();
    potterMoviesRequest();
  }, []);

  // Useeffect hook to get movies stored in localStorage
  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("filmix-favourite-movies"));
    movieFavourites && setFavourites(movieFavourites);
  }, []);

  return (
    <>
      <header>
        <Navbar heading="Flimix" searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>

      <main>
        {/* Marvel movie section */}
        <section id="action" className="container-fluid movie-app my-4" >
          <h3>{searchValue === "" ? "Marvel" : "Search Results"}</h3>
          <div className="row py-3">
            <MovieList handleFavouriteClick={addFavouriteMovie} movies={movies} isMovies={true} addFavourites={AddFavourites} removeFavourites={RemoveFavourites} />
          </div>
        </section>

        {/* Disney movie section */}
        <section id="action" className="container-fluid movie-app my-4" >
          <h3>Disney</h3>
          <div className="row py-3">
            <MovieList handleFavouriteClick={addFavouriteMovie} movies={disneyMovies} isMovies={true} addFavourites={AddFavourites} removeFavourites={RemoveFavourites} />
          </div>
        </section>

        {/* Pixar movie section */}
        <section id="action" className="container-fluid movie-app my-4" >
          <h3>Pixar</h3>
          <div className="row py-3">
            <MovieList handleFavouriteClick={addFavouriteMovie} movies={pixarMovies} isMovies={true} addFavourites={AddFavourites} removeFavourites={RemoveFavourites} />
          </div>
        </section>

        {/* Harry Potter movie section */}
        <section id="action" className="container-fluid movie-app my-4" >
          <h3>Harry Potter</h3>
          <div className="row py-3">
            <MovieList handleFavouriteClick={addFavouriteMovie} movies={potterMovies} isMovies={true} addFavourites={AddFavourites} removeFavourites={RemoveFavourites} />
          </div>
        </section>

        {/* favourites movie section */}
        <section id="favourites" className="container-fluid movie-app my-4">
          <h3>Favourites</h3>
          <div className="row py-3">
            <MovieList handleFavouriteClick={removeFavouriteMovie} movies={favourites} addFavourites={AddFavourites} removeFavourites={RemoveFavourites} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
