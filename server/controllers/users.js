const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const User = require('../models/user');

module.exports.displayUser = async (req, res) =>
{
    const { id } = req.params;

    const user = await User.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('favouriteMovies').populate('watchedMovies').populate('favouriteSeries').populate('watchedSeries');
    res.json(user);
}

module.exports.loginUser = async (req, res) =>
{

    const user = req.body;

    const databaseUser = await User.findOne({ username: user.username });
    if (!databaseUser)
    {
        res.json({ error: "Such a user does not exist!" });
    }
    else
    {
        const isUser = await bcrypt.compare(user.password, databaseUser.password);
        if (isUser)
        {

            const accessToken = sign({ username: user.username, id: databaseUser._id }, "verysecret");
            res.json(accessToken)
        }
        else
        {
            res.json({ error: 'Wrong username or password!' });
        }
    }

}

module.exports.registerUser = async (req, res) =>
{
    const user = req.body;

    const isUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email }] })
    if (isUser)
    {
        res.json({ error: "A user with this username or email already exists!" });

    }
    else
    {
        const hash = await bcrypt.hash(user.password, 10);

        await User.create({ ...user, password: hash });
        res.json("Successfully logged in!")
    }
}