const { Users } = require('../models')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                email: email,
                password: hash
            })
            res.json('utilisateur inscrit !')
        })

    }

    catch (error) { res.send(error) }

}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } })

    if (!user) { res.json({ error: 'Utilisateur introuvable !' }) }

    bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) { res.send({ error: 'Mot de passe incorrect !' }) }

        res.json('your are logged in !')
    })



}