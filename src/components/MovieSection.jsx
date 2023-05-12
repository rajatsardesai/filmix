import React from 'react';
import useSmoothHorizontalScroll from "use-smooth-horizontal-scroll";
import MovieList from './MovieList';
import 'font-awesome/css/font-awesome.min.css';

export default function MovieSection(props) {
    const { movies, heading, isFavourites, isSearch } = props;
    const { scrollContainerRef, handleScroll, scrollTo } = useSmoothHorizontalScroll();

    return (
        <>
            <section id="action" className="container-fluid movie-app position-relative my-4" >
                <h3 className="mx-4">{!isSearch ? heading : "Searched Results"}</h3>
                <button className="swiper-button-prev" onClick={() => scrollTo(-1000)}>
                    <i className="fa fa-3x fa-angle-left ms-3 text-light"></i>
                </button>
                <div className="row py-3" ref={scrollContainerRef} onScroll={handleScroll}>
                    <MovieList movies={movies} isFavourites={isFavourites} />
                </div>
                <button className="swiper-button-next" onClick={() => scrollTo(1000)} >
                    <i className="fa fa-3x fa-angle-right me-3 text-light"></i>
                </button>
            </section>
        </>
    )
}
