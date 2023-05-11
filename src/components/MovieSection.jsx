import React, { useContext } from 'react';
import movieContext from '../context/movies/movieContext';
import MovieList from './MovieList';

export default function MovieSection(props) {
    const contexts = useContext(movieContext);
    const { searchValue } = contexts;
    const { movies, heading, isFavourites } = props;
    return (
        <>
            <section id="action" className="container-fluid movie-app my-4" >
                <h3>{searchValue === "" ? heading : "Searched Results"}</h3>
                <div className="row py-3">
                    <MovieList movies={movies} isFavourites={isFavourites} />
                </div>
            </section>
        </>
    )
}
