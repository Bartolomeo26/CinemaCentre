const Actor = require('../models/actor');

module.exports.displayActors = async (req, res) =>
{
    res.json(await Actor.find({}));
}

module.exports.displayActor = async (req, res) =>
{
    const { id } = req.params;
    const actor = await Actor.findById(id).populate('movies').populate('series');
    res.json(actor);

}