const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const seriesRoutes = require('./routes/series');
const reviewRoutes = require('./routes/reviews');
const actorRoutes = require('./routes/actors');


main()
    .then(() => console.log("Mongo connection working!"))
    .catch(err => console.log(err));


async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/js-project');
}

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/series', seriesRoutes);
app.use('/actors', actorRoutes);
app.use('/', reviewRoutes);


app.listen('3000', () =>
{
    console.log("Everything working on port 3000!")
})









