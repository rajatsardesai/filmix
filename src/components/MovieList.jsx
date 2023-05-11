import React, { useContext } from 'react'
import movieContext from '../context/movies/movieContext';

export default function MovieList(props) {
    const contexts = useContext(movieContext);
    const { addFavouriteMovie, removeFavouriteMovie, AddFavourites, RemoveFavourites } = contexts;
    const { isFavourites } = props;
    return (
        <>
            {props.movies.map((movie, index) => {
                return (
                    movie.Poster ?
                        <div className="col-md-3 col-12" key={index}>
                            <div className="image-container d-flex justify-content-start">
                                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt={movie.Title} />
                                <div className="overlay d-flex justify-content-center align-items-center" onClick={() => !isFavourites ? addFavouriteMovie(movie) : removeFavouriteMovie(movie)}>
                                    {
                                        !isFavourites ?
                                            <>
                                                <AddFavourites />
                                            </>
                                            : <>
                                                <RemoveFavourites />
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        : <p className="text-light" key={index}>{movie}</p>
                )
            })}
        </>
    )
}
