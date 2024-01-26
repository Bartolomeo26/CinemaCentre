import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Alert from '../Alert';

export default function Login()
{
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { setAuthState } = useContext(AuthContext);
    const [error, setError] = useState(null);

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
        await axios.post('http://localhost:3000/users/login', formData).then((response) =>
        {
            if (response.data.error) setError(response.data.error);
            else
            {
                localStorage.setItem('accessToken', response.data);
                setAuthState(true);
                navigate('/');
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
                            <img src="./src/assets/loginImage.jpg" alt=""
                                className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <input className="form-control" type="text" id="username" name="username" value={formData.username} onChange={handleChange} autoFocus required />

                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input className="form-control" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                                    </div>
                                    <button type="submit" className="btn btn-success btn-block">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}