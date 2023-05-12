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

    // Get Movies using OMDB API
    const getMoviesRequest = async (searchValue, setStates) => {
        try {
            let url = "";
            if (searchValue) {
                url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
            } else {
                url = `http://www.omdbapi.com/?s=marvel&apikey=${API_KEY}`;
            }
            const response = await axios.get(url);
            if (response.data.Search) {
                setStates(response.data.Search);
            }
        } catch (error) {
            console.log('Internal server error', error);
            setStates(["No data found"]);
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
        getMoviesRequest(searchValue, setMovies);
        // eslint-disable-next-line
    }, [searchValue]);

    // Useeffect hook to load movies and get movies stored in localStorage
    useEffect(() => {
        getMoviesRequest("disney", setDisneyMovies);
        getMoviesRequest("pixar", setPixarMovies);
        getMoviesRequest("potter", setPotterMovies);
        const movieFavourites = JSON.parse(localStorage.getItem("filmix-favourite-movies"));
        movieFavourites && setFavourites(movieFavourites);
        // eslint-disable-next-line
    }, []);

    return (
        <MovieContext.Provider value={{ movies, disneyMovies, pixarMovies, potterMovies, searchValue, setSearchValue, favourites, addFavouriteMovie, removeFavouriteMovie, AddFavourites, RemoveFavourites }}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieState;
