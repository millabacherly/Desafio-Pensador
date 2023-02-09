const knex = require('../database/connection');

const registerQuote = async(req, res) => {
    const { user } = req;

    const { quote } = req.body;

    try {
        const localizeUser = await knex('users').where({id: user.id}).first();

        if (!localizeUser) {
            return res.status(400).json({message: 'User not found'});
        }

        const addQuote = await knex('thoughts').insert({
            quote
        })

        if(!addQuote) {
            return res.status(400).json({message: 'Quote is required'});
        }

        return res.status(201).json({ message: 'Quote created sucessfully!'});
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error.message })
    }
}

module.exports = {
    registerQuote
}