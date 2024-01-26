import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import MovieCard from "./MovieCard";
export default function MoviesList()
{
    const [movies, setMovies] = useState(null);
    useEffect(() =>
    {
        async function getMovies()
        {
            axios.get("http://localhost:3000/movies").then((response) =>
            {
                console.log(response.data);
                let moviesData = response.data;
                moviesData.sort((a, b) =>
                {
                    const nameA = a.title.toUpperCase();
                    const nameB = b.title.toUpperCase();
                    if (nameA < nameB)
                    {
                        return -1;
                    }
                    if (nameA > nameB)
                    {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
                setMovies(moviesData);
            });
        }
        getMovies();
    }, [])
    return (
        <>
            <div className="d-flex flex-column align-items-center w-100">
                <h1 className="ms-2">All the movies: </h1>
                <div className="d-flex w-100">
                    <div className="d-flex flex-wrap justify-content-center">
                        {movies && movies.map((movie) =>
                        {
                            return (
                                <MovieCard key={movie._id} movie={movie} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}