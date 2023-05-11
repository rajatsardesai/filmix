import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieContext from './movieContext';
import AddFavourites from '../../components/AddFavourites';
import RemoveFavourites from '../../components/RemoveFavourites';

const MovieState = (props) => {
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
    
    // Useeffect hook to load movies and get movies stored in localStorage
    useEffect(() => {
        disneyMoviesRequest();
        pixarMoviesRequest();
        potterMoviesRequest();
        const movieFavourites = JSON.parse(localStorage.getItem("filmix-favourite-movies"));
        movieFavourites && setFavourites(movieFavourites);
    }, []);

    return (
        <MovieContext.Provider value={{ movies, disneyMovies, pixarMovies, potterMovies, searchValue, setSearchValue, favourites, addFavouriteMovie, removeFavouriteMovie, AddFavourites, RemoveFavourites }}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieState;
