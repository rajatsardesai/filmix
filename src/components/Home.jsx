import React, { useContext } from 'react'
import Navbar from './Navbar'
import MovieSection from './MovieSection';
import movieContext from '../context/movies/movieContext';

const Home = () => {
    const contexts = useContext(movieContext);
    const { movies, disneyMovies, pixarMovies, potterMovies, searchValue, setSearchValue, favourites } = contexts;
    return (
        <>
            <main>
                <header>
                    <Navbar heading="Flimix" searchValue={searchValue} setSearchValue={setSearchValue} />
                </header>

                {/* Marvel movie section */}
                <MovieSection movies={movies} heading="Marvel" />

                {/* Disney movie section */}
                <MovieSection movies={disneyMovies} heading="Disney" />

                {/* Pixar movie section */}
                <MovieSection movies={pixarMovies} heading="Pixar" />

                {/* Harry Potter movie section */}
                <MovieSection movies={potterMovies} heading="Harry Potter" />

                {/* Favourites movie section */}
                <MovieSection movies={favourites} heading="Favourites" isFavourites={true} />
            </main>
        </>
    )
}

export default Home
