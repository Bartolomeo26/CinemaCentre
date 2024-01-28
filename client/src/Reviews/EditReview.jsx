import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';



export default function EditReview()
{
    const { id, reviewId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const production = location.pathname.slice(1, 7);

    const [formData, setFormData] = useState({ text: "", rating: 1 });

    useEffect(() =>
    {
        async function getReview()
        {
            await axios.get(`http://localhost:3000/reviews/${reviewId}`).then(response =>
            {
                setFormData({ text: response.data.text, rating: response.data.rating })
            });
        }
        getReview();
    }, [])

    const handleChange = (e) =>
    {
        setFormData(currData =>
        {
            return { ...currData, [e.target.name]: e.target.name === 'rating' ? parseInt(e.target.value) : e.target.value }
        })
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        await axios.put(`http://localhost:3000/${production}/${id}/reviews/${reviewId}`, formData).then((response) =>
        {
            console.log(response);
            navigate(-1);
        })

    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: 550 }}>
            <h1>Edit your review!</h1>
            <form onSubmit={handleSubmit} className="mb-3 w-50 ps-3">
                <Typography component="legend">{formData.rating} stars</Typography>
                <Rating name="rating" defaultValue={1} max={10} value={formData.rating} onChange={handleChange} />
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Review</label>
                    <textarea name="text" className="form-control" id="text" cols="30" value={formData.text} onChange={handleChange} rows="3"></textarea>
                </div>
                <button className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}