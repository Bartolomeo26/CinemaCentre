import React, { useEffect } from 'react'

import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResultsList from '../SearchBar/SearchResultsList'
import { jwtDecode } from "jwt-decode";


function ResponsiveAppBar()
{


    try
    {
        var decodedUser = jwtDecode(localStorage.getItem('accessToken'));

    }
    catch (e)
    {
        console.log(e); var decodedUser = null
    }
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark fs-5">
            <div className="container-fluid">
                <Link className="nav-link text-light me-3 ms-3" to={"/"}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-film"
                        viewBox="0 0 16 16">
                        <path
                            d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                    </svg> CinemaCentre</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/movies"}>Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/series"}>TV Series</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/actors"}>Actors</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Rankings
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={"/rankings/movies"}>Movies</Link></li>
                                <li><Link className="dropdown-item" to={"/rankings/series"}>TV Series</Link></li>
                            </ul>
                        </li>

                    </div>
                    <div className='position-relative ms-1'>
                        <SearchBar />
                    </div>
                    <div className="navbar-nav ms-auto">
                        {!decodedUser ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                                </svg>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/register"}><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                    height="20" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                    <path fillRule="evenodd"
                                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg> Sign In</Link>
                            </li>
                        </>
                            :
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hello, {decodedUser.username}!
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={`/users/${decodedUser.id}`}>Account</Link></li>
                                    <li><Link className="dropdown-item" to={"/logout"}>Logout</Link></li>
                                </ul>
                            </li>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default ResponsiveAppBar;
