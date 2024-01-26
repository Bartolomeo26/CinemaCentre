
export default function MovieMiniCard({movie})
{
    return (
        <div className="d-flex flex-column align-items-center minicard me-3">
        <img src={movie.imageUrl} alt="actor" className="rounded-2"/>
        <p className="fs-6 fw-bold">{movie.title}</p>
        </div>
    )
}