import { useEffect } from "react";
import './Carousel.css';
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { getIconButtonUtilityClass } from "@mui/material";

export default function Carousel({ data, unique, title, dataType, category, icon })
{
    let importantData = null;
    if(category==='top') importantData = `production.rating`
    else if(category==='favourite') importantData = `production.favouriteNumber`
    else importantData=`production.reviews.length`

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h1>{title}</h1>
                <div id={`carousel${unique}`} className="carousel slide">

                    <div className="carousel-inner">
                        {data.map((production, i) =>
                        {
                            if (i === 0)
                                return (
                                    <div className="carousel-item active" key={production._id}>
                                        <Link to={`/${dataType}/${production._id}`} >
                                            <img src={production.imageUrl} className="d-block" alt="..." />
                                            <div className="bg-light icon-home ">
                                                <p>{icon}<span >{eval(importantData)}</span></p>
                                            </div>

                                        </Link>
                                    </div>
                                )
                            else
                                return (
                                    <div className="carousel-item" key={production._id}>
                                        <Link to={`/${dataType}/${production._id}`} >
                                            <img src={production.imageUrl} className="d-block" alt="..." />
                                            <div className="bg-light icon-home z-5">
                                                <p>{icon}<span >{eval(importantData)}</span></p>
                                            </div>

                                        </Link>
                                    </div>
                                )
                        })}
                    </div>

                    <button className="carousel-control-prev carousel-control" type="button" data-bs-target={`#carousel${unique}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next carousel-control" type="button" data-bs-target={`#carousel${unique}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
}