import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
export default function ActorsList()
{

    
    

    const [actors, setActors] = useState(null);
    useEffect(() =>
    {
        async function getActors()
        {
            axios.get("http://localhost:3000/actors").then((response) => { console.log(response.data); setActors(response.data); });
        }
        getActors();
    }, [])
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <h1 className="ms-2">All the actors: </h1>
        <div className="d-flex flex-wrap justify-content-center w-100">
            {actors && actors.map((actor) =>
            {
                return (
                    <Link to={`/actors/${actor._id}`} key={actor._id}>
                        <div className="card m-2 mb-3" style={{ width: 476 }}>
                            <div className="row g-0 h-100">
                                <div className="col-md-4">
                                    <img src={actor.imageUrl} className="img-fluid rounded-start" style={{ maxHeight: 240 }} alt="actor image" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{actor.name} {actor.surname}</h5>
                                        <p className="card-text">Country: {actor.country}</p>
                                        <p className="card-text">Birth Date: {actor.birthYear}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
        </div>
    )
}