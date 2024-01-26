import Carousel from './Carousel'
import FavouriteIcon from './Icons/FavouriteIcon'
import TopIcon from './Icons/TopIcon'
import WatchedIcon from './Icons/WatchedIcon';
export default function CarouselRowMovies({movies})
{
console.log(movies)

    return (
        <div className="d-flex flex-row justify-content-around">
            <div>
                   
                {movies && <Carousel title={"Best rated movies"} unique={"topMovies"} data={movies.topMovies} category={'top'} icon={<TopIcon />} dataType={"movies"}/>}

            </div>
            <div>
                {movies && <Carousel title={"Most rated movies"} unique={"watchedMovies"} data={movies.watchedMovies} category={'watched'} icon={<WatchedIcon />} dataType={"movies"} />}
            </div>
            <div>
                {movies && <Carousel title={"Most favourite movies"} unique={"favouriteMovies"} data={movies.favouriteMovies} category={'favourite'} icon={<FavouriteIcon/>}dataType={"movies"} />}
            </div>
        </div>
    )
}