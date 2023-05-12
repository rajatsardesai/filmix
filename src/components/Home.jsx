import React, { useContext } from 'react'
import Navbar from './Navbar'
import MovieSection from './MovieSection';
import movieContext from '../context/movies/movieContext';

const Home = () => {
    const contexts = useContext(movieContext);
    const { movies, marvelMovies, disneyMovies, pixarMovies, potterMovies, searchValue, setSearchValue, favourites } = contexts;
    return (
        <>
            <main>
                <header>
                    <Navbar heading="Flimix" searchValue={searchValue} setSearchValue={setSearchValue} />
                </header>

                {/* Search movie section */}
                {
                    (searchValue && movies.length > 0) ? <MovieSection movies={movies} heading="Marvel" isSearch={true} /> : null
                }

                {/* Marvel movie section */}
                <MovieSection movies={marvelMovies} heading="Marvel" />

                {/* Disney movie section */}
                <MovieSection movies={disneyMovies} heading="Disney" />

                {/* Pixar movie section */}
                <MovieSection movies={pixarMovies} heading="Pixar" />

                {/* Harry Potter movie section */}
                <MovieSection movies={potterMovies} heading="Harry Potter" />

                {/* Favourites movie section */}
                {
                    favourites.length>0 && <MovieSection movies={favourites} heading="Favourites" isFavourites={true} />
                }
            </main>
        </>
    )
}

export default Home
