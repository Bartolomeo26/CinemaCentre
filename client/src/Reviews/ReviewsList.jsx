import Review from "./Review";

export default function ReviewsList({ reviews, deleteReview, user, type, production})
{
    
    return (
        <div>
            {reviews.map(review =>
            {
                return <Review key={review._id} review={review} deleteReview={deleteReview} production={production} type={type} user={user}/>
            })}
        </div>
    );

}