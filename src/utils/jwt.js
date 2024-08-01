const jwt = require("jsonwebtoken");

//crear una llave
const generateSing = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d"});

}

//comprobar si una llave es de confianza
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateSing, verifyJwt }