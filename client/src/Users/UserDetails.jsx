import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import MiniProductionCard from "../MiniProductionCard";

export default function UserDetails()
{

    const { id } = useParams();

    const [user, setUser] = useState(null);
    useEffect(() =>
    {
        async function getUser()
        {
            await axios.get(`http://localhost:3000/users/${id}`).then((response) => { setUser(response.data) });
        }
        getUser();
    })
    return (
        <>
            {user && <div className="d-flex flex-column align-items-center justify-content-center w-100">
                <h1 className="mt-3 mb-3">Username: {user.username} </h1>

                <div className="d-flex justify-content-evenly favourite-watched w-100">
                    <div className="d-flex justify-content-around favourite-watched-movies w-50">
                        <div className="d-flex flex-column align-items-center">
                            <h2 className="text-center">Favourite Movies</h2>
                            <div className="d-flex flex-column">
                                {user.favouriteMovies.map((movie) => { return <MiniProductionCard production={movie} type={"movies"} /> })}
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center ms-5">
                            <h2 className="text-center">Watched Movies</h2>
                            <div className="d-flex flex-column">
                                {user.watchedMovies.map((movie) => { return <MiniProductionCard production={movie} type={"movies"} /> })}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around favourite-watched-series ms-5 w-50">
                        <div className="d-flex flex-column align-items-start">
                            <h2 className="text-center">Favourite Series</h2>
                            <div className="d-flex flex-column">
                                {user.favouriteSeries.map((serie) => { return <MiniProductionCard production={serie} type={"series"} /> })}
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-start ms-5">
                            <h2 className="text-center">Watched Series</h2>
                            <div className="d-flex flex-column">
                                {user.watchedSeries.map((serie) => { return <MiniProductionCard production={serie} type={"series"} /> })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            }

        </>
    )
}
