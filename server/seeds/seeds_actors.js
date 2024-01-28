const mongoose = require('mongoose');
const Actor = require('../models/actor');
const { actors } = require('../data/actors')
main()
    .then(() => console.log("Mongo connection working!"))
    .catch(err => console.log(err));


async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/js-project');
}

async function addActors()
{
    await Actor.deleteMany({})
    for (let i = 1; i <= 71; i++)
    {
        const actor = await Actor.create({ ...actors[i - 1], _id: i });
        await actor.save();
    }

}
addActors();