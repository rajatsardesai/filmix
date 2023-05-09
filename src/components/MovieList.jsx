import React from 'react'

export default function MovieList(props) {
    const AddFavourites = props.addFavourites;
    const RemoveFavourites = props.removeFavourites;
    return (
        <>
            {props.movies.map((movie, index) => {
                return (
                    movie.Poster ?
                        <div className="col-md-3 col-12" key={index}>
                            <div className="image-container d-flex justify-content-start">
                                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt={movie.Title} />
                                <div className="overlay d-flex justify-content-center align-items-center" onClick={() => props.handleFavouriteClick(movie)}>
                                    {
                                        movie.imdbID !== props.selectedMovie[index] ?
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
