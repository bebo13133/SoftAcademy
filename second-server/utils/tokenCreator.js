const jwt = require('./jwtPromisifier')
const { SECRET } = process.env;


module.exports.tokenCreator = async (payloadData) => {
    const payload = {
        _id: payloadData._id,
        email: payloadData.email,
    }

    return jwt.sign(payload, SECRET, { expiresIn: '10m' })
}