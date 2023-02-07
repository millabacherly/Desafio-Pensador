const bcrypt = require('bcrypt');
const knex = require('../database/connection');
const jwt = require('jsonwebtoken');
const passwordJwt = require('../passwordJwt')

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const emailExists = await knex('users').where({ email }).first();

        if (emailExists) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await knex('users').insert({
            username,
            email,
            password: encryptedPassword
        })

        return res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

const login = async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await knex('users').where({ username }).first();

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if(!correctPassword) {
            return res.status(404).json({message: "Email or password is invalid"});
        }

        const dataTokenUser = {
            id: user.id,
            username: user.username
        }

        const token = jwt.sign(dataTokenUser, passwordJwt, { expiresIn: '8h' });

        const { password: _, ...dataUser } = user;

        return res.status(200).json({
            user: dataUser,
            token
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error   " + error.message })
    }
}

module.exports = {
    registerUser,
    login
}