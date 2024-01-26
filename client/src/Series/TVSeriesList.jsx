import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import SeriesCard from "./SeriesCard";
export default function TVSeriesList()
{
    const [series, setSeries] = useState(null);
    useEffect(() =>
    {
        async function getSeries()
        {
            axios.get("http://localhost:3000/series").then((response) =>
            {
                console.log(response.data);
                let seriesData = response.data
                seriesData.sort((a, b) => {
                    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                setSeries(seriesData);
            });
        }
        getSeries();
    }, [])
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <h1 className="ms-2">All the TV Series: </h1>
            <div className="d-flex flex-wrap justify-content-center w-100">
                {series && series.map((serie) =>
                {
                    return (
                        <SeriesCard key={serie._id} serie={serie} />
                    );
                })}
            </div>
        </div>
    )
}