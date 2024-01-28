const Series = require('../models/series');
const User = require('../models/user');


module.exports.displaySeries = async (req, res) =>
{
    res.json(await Series.find({}));
}

module.exports.displaySerie = async (req, res) =>
{
    const { id } = req.params;
    const series = await Series.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('actors')

    res.json(series);

}

module.exports.addSerieToFavourite = async (req, res) =>
{
    const { id } = req.params;
    const { selected } = req.body;
    console.log(req.body);
    const series = await Series.findById(id);
    const user = await User.findById(req.user.id)

    if (selected)
    {
        user.favouriteSeries.push(series);
        series.favouriteNumber++;
        console.log('Added to favourites!')
    }
    else
    {
        user.favouriteSeries = user.favouriteSeries.filter(favouriteSerie =>
        {
            if (favouriteSerie != parseInt(id))
                return favouriteSerie;
        });
        series.favouriteNumber--;
        console.log('Removed from favourites!')
    }
    await series.save();
    await user.save();
}

module.exports.addSerieToWatched = async (req, res) =>
{
    const { id } = req.params;
    const { selected } = req.body;
    const series = await Series.findById(id);
    const user = await User.findById(req.user.id)

    if (selected)
    {
        user.watchedSeries.push(series);
        console.log('Added to watched!')
    }
    else
    {
        user.watchedSeries = user.watchedSeries.filter(watchedSerie =>
        {
            if (watchedSerie !== parseInt(id))
            {
                
                return watchedSerie;
            }
        });

        console.log('Removed from watched!')

    }
    await series.save();
    await user.save();
}