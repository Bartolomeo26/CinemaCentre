import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
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

export default function TVSeriesDetails()
{
    const { id } = useParams();

    const [series, setSeries] = useState(null);
    const [user, setUser] = useState(null);
    const [isWatched, setIsWatched] = useState();
    const [isFavourite, setIsFavourite] = useState();
    const [isReviewed, setIsReviewed] = useState(false);
    const [reviews, setReviews] = useState(null);

    useEffect(() =>
    {
        async function getSeries()
        {
            await axios.get(`http://localhost:3000/series/${id}`)
                .then((response) => { setReviews(response.data.reviews); setSeries(response.data); });


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


        getSeries();
        getUser();
    }, [])

    useEffect(() =>
    {
        if (user && series)
        {
            setIsWatched(user.watchedSeries.some((el) => el._id === series._id));
            setIsFavourite(user.favouriteSeries.some((el) => el._id === series._id));
        }
    }, [user]);

    useEffect(() =>
    {
        if (user)
        {
            setIsReviewed(reviews.some((el) => el.author._id === user._id));
        }
    }, [reviews]);

    async function addReview(formData)
    {
        console.log(formData);

        await axios.post(`http://localhost:3000/series/${id}/reviews`, formData, { headers: { accessToken: localStorage.getItem('accessToken') } })
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
        setReviews((prevReviews) => prevReviews.filter(review => review._id !== reviewId));
        await axios.delete(`http://localhost:3000/series/${id}/reviews/${reviewId}`, {
            headers: { accessToken: localStorage.getItem('accessToken') }
        }).then((response) =>
        {
            console.log(response.data);
        })
            .catch((error) =>
            {
                console.log(error);
            });
    }

    async function addWatched()
    {
        setIsWatched(prevWatched => !prevWatched);
        await axios.post(`http://localhost:3000/series/${id}/watched`, {
            selected: !isWatched
        }, {
            headers: { accessToken: localStorage.getItem('accessToken') }
        }).then((response) =>
        {
            if (response.data.error) alert(response.data.error);
        });
    }

    async function addFavourite()
    {
        setIsFavourite(prevFavourite => !prevFavourite);
        await axios.post(`http://localhost:3000/series/${id}/favourites`, {
            selected: !isFavourite
        }, {
            headers: { accessToken: localStorage.getItem('accessToken') }
        }).then((response) =>
        {
            if (response.data.error) alert(response.data.error);
        });
    }

    return (
        <>
            {series &&
                <div className="mt-3">
                    <div className="d-flex justify-content-start align-items-center bg-light p-3">
                        <div>
                            <div className="d-flex align-items-center">
                                <h1>{series.title}</h1>
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
                                    </div>
                                }
                            </div>
                            <h2><StarIcon style={{ color: 'gold', fontSize: 45 }} />{series.rating}/10
                                <small className="text-body-secondary fs-6">
                                    {series.reviews.length} community ratings ({series.favouriteNumber} loved it!)
                                </small>
                            </h2>
                            <div className="d-flex w-50">
                                <img src={series.imageUrl} alt="" className="img-fluid series-image" />
                                <div className="d-flex flex-column ms-2">
                                    <p>{series.description}</p>
                                    <p>Country: {series.country}</p>
                                    <p>Director: {series.director}</p>
                                    <p>Year of release: {series.releaseYear}</p>
                                </div>
                            </div>
                        </div>
                        {user && reviews &&
                            <div className="me-5">
                                {reviews.map((review) =>
                                {
                                    if (review.author._id === user._id)
                                    {
                                        return (
                                            <div className="d-flex flex-column align-items-center" key={review._id}>
                                                <h1>Your review!</h1>
                                                <Review review={review} />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        }
                    </div>
                    <div className="mt-3 mb-3 ps-3">
                        <h2>Top cast:</h2>
                        <div className="d-flex flex-wrap">
                            {series.actors.map((actor) => (
                                <Link to={`/actors/${actor._id}`} key={actor._id}>
                                    <ActorMiniCard actor={actor} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {user && (
                isReviewed === true ?
                    <Alert message={"You can't rate the series more than once."} /> :
                    <ReviewForm addReview={addReview} />
            )}
            {series &&
                <div className="d-flex flex-column w-25 ps-3">
                    <h2>Reviews: </h2>
                    <ReviewsList reviews={reviews} deleteReview={deleteReview} type={"series"} production={series} user={user} />
                </div>
            }
        </>
    );
}
