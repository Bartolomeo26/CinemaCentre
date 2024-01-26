import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";

export default function Register()
{

    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) =>
    {
        setFormData(currData =>
        {
            return { ...currData, [e.target.name]: e.target.value }
        })
    }
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        await axios.post('http://localhost:3000/users/register', formData).then((response) =>
        {

            if (response.data.error) setError(response.data.error);
            else
            {
                setError(false);
                navigate('/login');
            }

        })


    }

    return (
        <>
            <div className="d-flex justify-content-center alert">
                {error && <Alert message={error} />}
            </div>
            <div className="container d-flex justify-content-center align-items-center mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4 mb-5">
                        <div className="card shadow">
                            <img src="./src/assets/registerImage.jpg" alt="" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Register</h5>
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <input className="form-control" type="text" id="username" name="username" value={formData.username} onChange={handleChange} required autoFocus />

                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input className="form-control" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                                    </div>
                                    <button type="submit" className="btn btn-success btn-block">Register</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}