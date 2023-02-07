const bcrypt = require('bcrypt');
const knex = require('../database/connection');


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

module.exports = {
    registerUser
}