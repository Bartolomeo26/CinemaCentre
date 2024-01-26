
export default function SeriesMiniCard({serie})
{
    return (
        <div className="d-flex flex-column align-items-center minicard me-3">
        <img src={serie.imageUrl} alt="actor" className="rounded-2"/>
        <p className="fs-6 fw-bold">{serie.title}</p>
        </div>
    )
}