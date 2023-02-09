const knex = require('../database/connection');

const registerQuote = async(req, res) => {
    const { user } = req;

    const { quote } = req.body;

    try {
        const localizeUser = await knex('users').where({id: user.id}).first();

        if (!localizeUser) {
            return res.status(404).json({message: 'User not found'});
        }

        const addQuote = await knex('thoughts').insert({ 
            id_quote: user.id,
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

const editQuote = async(req, res) => {
    const { user } = req;

    const { id } = req.params;

    const { quote } = req.body;

    try {
        const localizeQuote = await knex('thoughts').where({id}).first();

        if (!localizeQuote) {
            return res.status(400).json({message: 'Quote not found'});
        }

        const updateQuote = await knex('thoughts').update({quote}).where({id });

        if (!updateQuote) {
            return res.status(400).json({ message: 'Quote is required'});
        }

        return res.status(200).json({ message: 'Quote updated successfully'}) 
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error.message })
    }
}

module.exports = {
    registerQuote,
    editQuote
}