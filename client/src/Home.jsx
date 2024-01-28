import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

import CarouselRowMovies from './Carousel/CarouselRowMovies';
import CarouselRowSeries from './Carousel/CarouselRowSeries';

export default function Home()
{
    const [movies, setMovies] = useState(null);
    const [series, setSeries] = useState(null);
    useEffect(() =>
    {
        async function getData()
        {
            await axios.get("http://localhost:3000/movies").then((response) =>
            {
                const topMovies = response.data.sort((a, b) => b.rating - a.rating).slice(0, 3);
                const favouriteMovies = response.data.sort((a, b) => b.favouriteNumber - a.favouriteNumber).slice(0, 3);
                const watchedMovies = response.data.sort((a, b) => b.reviews.length - a.reviews.length).slice(0, 3);
                setMovies({ topMovies, watchedMovies, favouriteMovies });
            });
            await axios.get("http://localhost:3000/series").then((response) =>
            {
                const topSeries = response.data.sort((a, b) => b.rating - a.rating).slice(0, 3);
                const favouriteSeries = response.data.sort((a, b) => b.favouriteNumber - a.favouriteNumber).slice(0, 3);
                const watchedSeries = response.data.sort((a, b) => b.reviews.length - a.reviews.length).slice(0, 3);
                setSeries({ topSeries, favouriteSeries, watchedSeries });
            });
        }
        getData();
    }, [])
    return (
        <>
            {movies &&
                <div className='d-flex flex-column mb-5 mt-3'>
                    <CarouselRowMovies movies={movies} />
                    <CarouselRowSeries series={series} />
                </div>
            }
        </>
    );

}