import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export default function Review({ review, deleteReview, user, production, type })
{
    const navigate = useNavigate();

    return (
        <>
            {review.author &&
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/users/${review.author._id}`}>{review.author.username}</Link>
                        </h5>
                        <p className='mb-0 fw-bold'>Rating: {review.rating}/10</p>
                        <Rating name="read-only" value={review.rating} max={10} readOnly />
                        <p className="card-text mt-1 ">{review.text}
                        </p>
                        <div className='d-flex justify-content-between'>
                            <small className='text-body-secondary'>Date: {review.date}</small>
                            {user && user._id === review.author._id &&
                                <div>
                                    <button className='btn btn-sm ' onClick={() => navigate(`/${type}/${production._id}/reviews/${review._id}/edit`, { state: { czesc: 'gowno' } })}><EditIcon style={{ color: 'blue' }} /></button>
                                    <button className='btn btn-sm ' onClick={async () => { await deleteReview(review._id) }}><DeleteIcon style={{ color: 'red' }} /></button>
                                </div>}
                        </div>
                    </div>
                </div>
            }

        </>
    );
}