import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import ReviewsList from "../Reviews/ReviewsList";
import ReviewForm from "../Reviews/ReviewForm";
import Favourite from "../Toggles/Favourite";
import Watched from "../Toggles/Watched";
import Review from "../Reviews/Review";
import { jwtDecode } from "jwt-decode";
import StarIcon from "@mui/icons-material/Star";
import ActorMiniCard from "../Actors/ActorMiniCard";
import Alert from "../Alert";


export default function MovieDetails()
{

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [isWatched, setIsWatched] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [isRevieved, setIsRevieved] = useState(false);
    const [reviews, setReviews] = useState(null);



    useEffect(() =>
    {
        async function getMovie()
        {
            await axios.get(`http://localhost:3000/movies/${id}`)
                .then((response) => { setReviews(response.data.reviews); setMovie(response.data); });


        }
        async function getUser()
        {

            const decodedUser = jwtDecode(localStorage.getItem('accessToken'));
            if (decodedUser)
                await axios.get(`http://localhost:3000/users/${decodedUser.id}`).then((response) =>
                {
                    setUser(response.data);
                });
        }


        getMovie();
        getUser();
    }, [])
    useEffect(() =>
    {

        if (user && movie) setIsWatched(user.watchedMovies.some((el) => { return el._id === movie._id }));
        if (user && movie) setIsFavourite(user.favouriteMovies.some((el) => { return el._id === movie._id }));

    })
    useEffect(() =>
    {

        if (user) setIsRevieved(reviews.some((el) => { return el.author._id === user._id }));


    }, [reviews])

    async function addReview(formData)
    {
        console.log(formData);

        await axios.post(`http://localhost:3000/movies/${id}/reviews`, formData, { headers: { accessToken: localStorage.getItem('accessToken') } })
            .then(function (response)
            {
                setReviews((prevReviews) => { return [...prevReviews, { ...response.data, author: user }] });

                console.log(response.data);

            })
            .catch(function (error)
            {
                console.log(error);
            });
    }
    async function deleteReview(reviewId)
    {
        console.log('hejka')
        setReviews((prevReviews) => { return prevReviews.filter(review => review._id !== reviewId) });
        await axios.delete(`http://localhost:3000/movies/${id}/reviews/${reviewId}`, { headers: { accessToken: localStorage.getItem('accessToken') } })
            .then(function (response)
            {


                console.log(response.data);

            })
            .catch(function (error)
            {
                console.log(error);
            });


    }
    async function addWatched()
    {
        await axios.post(`http://localhost:3000/movies/${id}/watched`, { selected: !isWatched }, { headers: { accessToken: localStorage.getItem('accessToken') } }).then((response) =>
        {
            if (response.data.error) alert(response.data.error)

        })
        console.log(!isWatched)
    }
    async function addFavourite()
    {
        await axios.post(`http://localhost:3000/movies/${id}/favourites`, { selected: !isFavourite }, { headers: { accessToken: localStorage.getItem('accessToken') } }).then((response) =>
        {
            if (response.data.error) alert(response.data.error)

        })
        setIsFavourite(true);
    }
    return (
        <>
            {movie &&

                <div className="mt-3">
                    <div className="d-flex justify-content-start align-items-center bg-light p-3">
                        <div>
                            <div className="d-flex align-items-center">
                                <h1>{movie.title} </h1>
                                {user &&
                                    <div className="ms-4 d-flex">
                                        <div className="d-flex flex-column">
                                            <p className="fs-6 mb-0">Seen it?</p>
                                            <Watched addWatched={addWatched} isSelected={isWatched} />
                                        </div>
                                        <div className="ms-3 d-flex flex-column">
                                            <p className="fs-6 mb-0">Liked it?</p>
                                            <Favourite addFavourite={addFavourite} isSelected={isFavourite} />
                                        </div>

                                    </div>}
                            </div>
                            <h2><StarIcon style={{ color: 'gold', fontSize: 45 }} />{movie.rating}/10 <small className="text-body-secondary fs-6">{movie.reviews.length}{` community ratings (${movie.favouriteNumber} loved it!)`}</small></h2>
                            <div className="d-flex w-50">
                                <img src={movie.imageUrl} alt="" className="img-fluid movie-image" />
                                <div className="d-flex flex-column ms-2">
                                    <p>{movie.description}</p>
                                    <p>Country: {movie.country}</p>
                                    <p>Director: {movie.director}</p>
                                    <p>Year of release: {movie.releaseYear}</p>
                                </div>
                            </div>
                        </div>
                        {user && reviews &&
                            <div className="me-5">

                                {reviews.map((review) =>
                                {
                                    if (review.author._id === user._id)
                                    {
                                        return (<div className="d-flex flex-column align-items-center" key={review._id}>
                                            <h1>Your review!</h1>
                                            <Review review={review} />
                                        </div>
                                        )
                                    }

                                })}
                            </div>
                        }
                    </div>
                    <div className="mt-3 mb-3 ps-3">
                        <h2>Top cast:</h2>
                        <div className="d-flex flex-wrap">
                            {movie.actors.map((actor) => { return <Link to={`/actors/${actor._id}`} key={actor._id}><ActorMiniCard actor={actor} /></Link> })}
                        </div>
                    </div>
                </div>

            }
            {user && (
                isRevieved === true ?
                    <Alert message={"You can't rate the movie more than once."} /> :
                    <ReviewForm addReview={addReview} />
            )}
            {movie &&
                <div className="d-flex flex-column w-25 ps-3">
                    <h2>Reviews: </h2>
                    <ReviewsList reviews={reviews} deleteReview={deleteReview} type={"movies"} production={movie} user={user} />
                </div>
            }

        </>
    )
}
