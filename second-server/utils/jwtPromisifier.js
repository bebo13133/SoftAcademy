const jsonwebtoken = require('jsonwebtoken')

module.exports.sign = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, secret, options, (err, result) => {
            if (!err) {
                return resolve(result)
            }
            return reject(result)
        })
    })
}

module.exports.verify = (payload, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(payload, secret, (err, result) => {
            if (!err) {
                return resolve(result)
            }
            return reject(result)
        })
    })
}