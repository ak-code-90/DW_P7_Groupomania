const { Users } = require('../models')

exports.createUser = async (req, res) => {
    try {

        const data = req.body;
        await Users.create(data);
        res.json(data);

    }

    catch (error) { res.send(error) }

}