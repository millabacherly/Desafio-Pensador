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

const editUser = async(req,res) => {
    const { user } = req;

    const { username, email, password } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'Required field'});
    }

    try {
        const userFound = await knex('users').where({ username }).andWhere('id', '!=', user.id).first();

        const emailFound = await knex('users').where({ email }).andWhere('id', '!=', user.id).first();

        if (userFound) {
            return res.status(400).json({message: 'User already registered'});
        }

        if (emailFound) {
            return res.status(400).json({message: 'Email already registered'});
        }

        const userData = await knex('users'). where({ id: user.id }).first();

        let encryptedPassword;

        if (!password) {
            encryptedPassword = userData.password;
        } else {
            encryptedPassword = await bcrypt.hash(password, 10);
        }

        const updateUser = await knex('users').update({
            username,
            email,
            password: encryptedPassword
        }).where('id', user.id);

        return res.status(200).json(updateUser);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" + error.message })
    }
}

const viewUser = async(req,res) => {
    const { user } = req;

    try {
        const userLocated = await knex('users').where({ id: user.id}).first();

        if (!userLocated) {
            return res.status(400).json({ message: 'User not found'});
        }

        const { password, ...userLocatedData } = userLocated;

        return res.status(200).json(userLocatedData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" + error.message })
    }
}

module.exports = {
    registerUser,
    login,
    editUser,
    viewUser
}