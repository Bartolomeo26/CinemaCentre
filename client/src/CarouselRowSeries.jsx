import Carousel from './Carousel'
import FavouriteIcon from './Icons/FavouriteIcon'
import TopIcon from './Icons/TopIcon'
import WatchedIcon from './Icons/WatchedIcon'
export default function CarouselRowSeries({ series })
{


    return (
        <div className="d-flex flex-row justify-content-around mt-5 mb-5">
            <div>

                {series && <Carousel title={"Best rated series"} unique={"topSeries"} category={'top'} data={series.topSeries} icon={<TopIcon />} dataType={"series"} />}

            </div>
            <div>
                {series && <Carousel title={"Most rated series"} unique={"watchedSeries"} category={'watched'} data={series.watchedSeries} icon={<WatchedIcon />} dataType={"series"} />}
            </div>
            <div>
                {series && <Carousel title={"Most favourite series"} unique={"favouriteSeries"} category={'favourite'} data={series.favouriteSeries} icon={<FavouriteIcon />} dataType={"series"} />}
            </div>
        </div>
    )
}