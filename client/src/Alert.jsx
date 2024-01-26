export default function Alert({ message })
{

    return (
        <div className="alert alert-warning alert-dismissible fade show w-25 m-3 mb-0" role="alert">
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}