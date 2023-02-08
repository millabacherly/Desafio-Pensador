const knex = require('../database/connection');
const jwt = require('jsonwebtoken');
const passwordJwt = require('../passwordJwt')

const tokenValidation = async(req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({ message: 'To access this resource, the valid token is required.'});
    }

    const bearerToken = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(bearerToken, passwordJwt);

        const loggedInUser = await knex('users').where({ id }).first();

        if (!loggedInUser) {
            return res.status(404).json({ message: 'Unauthorized User'});
        }

        const { password: _, ...dataUser } = loggedInUser;

        req.user = dataUser;

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error.message });
    
    }
}

module.exports = tokenValidation; 