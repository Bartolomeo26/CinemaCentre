
import { useEffect } from 'react';
import './SearchResultsList.css'
import { Link } from "react-router-dom";

export default function SearchResultsList({ results, clearInput })
{
    return (
        <>
            <div className="results-list d-flex w-100 flex-row text-light">
                <div className="d-flex flex-column align-items-center">
                    <h1 className='fs-4'>Movies</h1>
                    {results[0].map((result) =>
                    {

                        return <Link className="search-result" to={`/movies/${result._id}`} key={result._id} onClick={clearInput}>{result.title}</Link>;
                    })}
                </div>
                <div className="d-flex flex-column align-items-center">
                <h1 className='fs-4'>Actors</h1>
                    {results[1].map((result) =>
                    {

                        return <Link className="search-result" to={`/actors/${result._id}`} key={result._id} onClick={clearInput}>{result.name} {result.surname}</Link>;
                    })}
                </div>
                <div className="d-flex flex-column align-items-center">
                <h1 className='fs-4'>TV Series</h1>
                    {results[2].map((result) =>
                    {

                        return <Link className="search-result" to={`/series/${result._id}`} key={result._id} onClick={clearInput}>{result.title}</Link>;
                    })}
                </div>
            </div>
        </>
    );
};