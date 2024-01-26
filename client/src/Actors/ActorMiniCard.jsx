export default function ActorMiniCard({actor})
{
    return (
        <div className="d-flex flex-column align-items-center minicard me-3">
        <img src={actor.imageUrl} alt="actor" className="rounded-2"/>
        <p className="fs-6 fw-bold">{actor.name} {actor.surname}</p>
        </div>
    )
}