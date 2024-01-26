import { Link } from "react-router-dom"
import StarIcon from "@mui/icons-material/Star"
export default function SeriesCard({ serie })
{

    return (
        <Link to={`/series/${serie._id}`} key={serie._id}>
            <div className="card m-2 mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-0 ">
                    <div className="col-md-4">
                        <img src={serie.imageUrl} className="img-fluid rounded-start" alt="serie image" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title fw-bold">{serie.title}</h5>
                                <h5><StarIcon style={{ color: 'gold' }} />{serie.rating}/10</h5>
                            </div>
                            <p className="card-text">{serie.description}</p>
                            <p className="card-text"><small className="text-body-secondary">Seasons: {serie.seasons}</small></p>
                            <p className="card-text"><small className="text-body-secondary">Year: {serie.releaseYear}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}