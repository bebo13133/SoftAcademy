const { Quote } = require('../models/Quote');
const { errorHandler } = require('../utils/errorHandler');
const { ValidationError } = require('../utils/createValidationError');

const addQuote = async (req, res) => {
    const { quote, value } = req.body;
    const data = { quote, value };

    try {
        await Quote.create({ ...data });

        res.status(200).json({ ...data });
    } catch (error) {
        errorHandler(error, res, req);
    }
};

const getQuote = async (req, res) => {

    try {
        const quote = await Quote.aggregate([{ $sample: { size: 1 } }])

        res.status(200).json(quote);
    } catch (error) {
        errorHandler(error, res, req);
    }
};

module.exports = { addQuote, getQuote }