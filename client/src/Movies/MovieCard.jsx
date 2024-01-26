import { Link } from "react-router-dom"
import StarIcon from '@mui/icons-material/Star';

export default function MovieCard({ movie })
{


    return (
        <Link to={`/movies/${movie._id}`} key={movie._id}>
            <div className="card m-2 mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-0 ">
                    <div className="col-md-4">
                        <img src={movie.imageUrl} className="img-fluid rounded-start" alt="movie image" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title fw-bold">{movie.title}</h5>
                                <h5><StarIcon style={{ color: 'gold' }} />{movie.rating}/10</h5>
                            </div>
                            <p className="card-text">{movie.description}</p>
                            <p className="card-text mt-auto"><small className="text-body-secondary">Year: {movie.releaseYear}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )

}