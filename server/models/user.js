const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favouriteMovies: [{
        type: Schema.Types.Number,
        ref: "Movie"
    }],
    watchedMovies: [{
        type: Schema.Types.Number,
        ref: "Movie"
    }],
    favouriteSeries: [{
        type: Schema.Types.Number,
        ref: "Series"
    }],
    watchedSeries: [{
        type: Schema.Types.Number,
        ref: "Series"
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);