import Review from "./Review";

export default function ReviewsList({ reviews, deleteReview, user})
{
    
    return (
        <div>
            {reviews.map(review =>
            {
                return <Review key={review._id} review={review} deleteReview={deleteReview} user={user}/>
            })}
        </div>
    );

}