const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    birthYear: {
        type: String,
        required: true
    },
    movies: [{
        type: Schema.Types.Number,
        ref: "Movie"
    }],
    series: [{
        type: Schema.Types.Number,
        ref: "Series"
    }]
})



module.exports = mongoose.model('Actor', actorSchema);