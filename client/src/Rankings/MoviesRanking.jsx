import axios from "axios";
import MovieCard from "../Movies/MovieCard";
import { useState, useEffect } from "react";

export default function MoviesRanking()
{
    const [movies, setMovies] = useState(null);
    useEffect(() =>
    {
        async function getMovies()
        {
            axios.get("http://localhost:3000/movies").then((response) =>
            {
                console.log(response.data);
                let movieData = response.data.slice(0, 25);
                movieData.sort((a, b) => b.rating - a.rating);
                setMovies(movieData.slice(0, 25));
            });
        }
        getMovies();
    }, [])


    return (

        <>
            <div className="d-flex justify-content-center">
                <ul>

                    {movies && movies.map((movie, i) =>
                    {
                        return (
                            <div className="d-flex justify-content-evenly" key={movie._id}>
                                <p className="fs-4 me-3">{i + 1}</p>
                                <MovieCard movie={movie} />
                            </div>
                        );
                    })}

                </ul>
            </div>
        </>
    )
}