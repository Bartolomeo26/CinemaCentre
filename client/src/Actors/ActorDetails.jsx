import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import MovieMiniCard from "../Movies/MovieMiniCard";
import SeriesMiniCard from "../Series/SeriesMiniCard";

export default function ActorDetails()
{

    const { id } = useParams();

    const [actor, setActor] = useState(null);
    useEffect(() =>
    {
        async function getActor()
        {
            await axios.get(`http://localhost:3000/actors/${id}`).then((response) => { setActor(response.data) });
        }
        getActor();
    })
    function calculateAge(date)
    {
        const month = date.slice(0, 2);
        const day = date.slice(3, 5);
        date = date.replace(day, month);
        date = date.replace(month, day);


        var dob = new Date(date);
        var month_diff = Date.now() - dob.getTime();

        //convert the calculated difference in date format  
        var age_dt = new Date(month_diff);

        //extract year from date      
        var year = age_dt.getUTCFullYear();

        //now calculate the age of the user  
        var age = Math.abs(year - 1970);
        return age;
    }
    return (
        <>

            {actor && <div className="mt-3 d-flex flex-column justify-content-start align-items-start">
                <div className="d-flex justify-content-start p-3 bg-light">
                    <div>
                        <div className="d-flex align-items-center">
                            <h1>{actor.name} {actor.surname}</h1>

                        </div>
                        <div className="d-flex w-100">
                            <img src={actor.imageUrl} alt="" className="img-fluid actor-image" />
                            <div className="d-flex flex-column ms-2">
                                <p>Country: {actor.country}</p>
                                <p>Birth Year: {actor.birthYear}</p>
                                <p>Age: {calculateAge(actor.birthYear)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-3 ps-3">
                    <h2>Movies:</h2>
                    <div className="d-flex flex-wrap">
                        {actor.movies.map((movie) => { return <Link to={`/movies/${movie._id}`} key={movie._id}><MovieMiniCard movie={movie} /></Link> })}
                    </div>
                </div>
                <div className="mt-3 mb-3 ps-3">
                    <h2>TV Series:</h2>
                    <div className="d-flex flex-wrap">
                        {actor.series.map((serie) => { return <Link to={`/series/${serie._id}`} key={serie._id}><SeriesMiniCard serie={serie} /></Link> })}
                    </div>
                </div>
            </div>
            }

        </>
    )
}
