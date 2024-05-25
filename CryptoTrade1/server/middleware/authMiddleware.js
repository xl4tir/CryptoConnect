const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "Користувач не авторизований" });

        }
        const decodedData = jwt.verify(token, process.env.JWTPRIVATEKEY)
        console.log(decodedData)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({ message: "Користувач не авторизований" });

    }
};