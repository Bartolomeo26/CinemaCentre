import axios from "axios";
import SeriesCard from "../Series/SeriesCard";
import { useState, useEffect } from "react";

export default function SeriesRanking()
{
    const [series, setSeries] = useState(null);
    useEffect(() =>
    {
        async function getSeries()
        {
            axios.get("http://localhost:3000/series").then((response) =>
            {
                console.log(response.data);
                let seriesData = response.data.slice(0, 25);
                seriesData.sort((a, b) => b.rating - a.rating);
                setSeries(seriesData.slice(0, 25));
            });
        }
        getSeries();
    }, [])


    return (

        <>
            <div className="d-flex justify-content-center">
                <ul>
                    {series && series.map((serie, i) =>
                    {
                        return (
                            <>
                                <div className="d-flex justify-content-evenly" key={serie._id}>
                                    <p className="fs-4 me-3">{i + 1}</p>
                                    <SeriesCard serie={serie} />
                                </div>
                            </>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}