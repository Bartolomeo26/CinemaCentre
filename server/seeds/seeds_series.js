const mongoose = require('mongoose');
const Series = require('../models/series')
const {series} = require('../data/series');
main()
    .then(() => console.log("Mongo connection working!"))
    .catch(err => console.log(err));


async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/js-project');
}

async function addSeries()
{
    await Series.deleteMany({});
    for (let i = 1; i <= 5; i++)
    {
        const newSeries = await Series.create({...series[i-1], _id: i });
        await newSeries.save();
    }

}
addSeries();