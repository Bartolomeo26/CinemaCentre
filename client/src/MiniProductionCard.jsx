import { Link } from "react-router-dom"
import StarIcon from '@mui/icons-material/Star';

export default function MiniProductionCard({ production, type })
{


    return (
        <Link to={`/${type}/${production._id}`} key={production._id}>
            <div className="card m-2 mb-3" style={{ maxWidth: 200 }}>
                <div className="row g-0 ">
                    <div className="col-md-4">
                        <img src={production.imageUrl} className="img-fluid rounded-start" alt="production image" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body pt-0 pb-0">
                            <div className="d-flex flex-column justify-content-between mt-2">
                                <p className="mb-0 mt-0 user-rating">Your rating:<StarIcon style={{ color: 'gold', fontSize: 'small' }} /> {production.rating}</p>
                                <h5 className="card-title fs-6 fw-bold">{production.title}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )

}