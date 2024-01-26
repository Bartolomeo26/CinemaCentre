const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    actors: [{
        type: Schema.Types.Number,
        ref: "Actor"
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    favouriteNumber:{
        type: Number,
        min: 0,
        default: 0
    }
})

module.exports = mongoose.model('Movie', movieSchema);