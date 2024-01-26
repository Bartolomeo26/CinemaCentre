import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';



export default function ReviewForm({ addReview })
{
    const [formData, setFormData] = useState({ text: "", rating: 1 });


    
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
        setFormData({ text: "", rating: 1 });
        await addReview(formData);

    }

    return (
        <form onSubmit={handleSubmit} className="mb-3 w-50 ps-3">
            <Typography component="legend">{formData.rating} stars</Typography>
            <Rating name="rating" defaultValue={1} max={10} value={formData.rating} onChange={handleChange} />
            <div className="mb-3">
                <label htmlFor="text" className="form-label">Review</label>
                <textarea name="text" className="form-control" id="text" cols="30" value={formData.text} onChange={handleChange} rows="3"></textarea>
            </div>
            <button className="btn btn-success">Submit</button>
        </form>
    );

}