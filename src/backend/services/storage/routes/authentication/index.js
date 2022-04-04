const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).send({ Mensaje: "El token no fue proporcionado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const getUserById = "SELECT Users FROM MIoT.Users WHERE idUsers=$1";
    /*const { rows } = pg.query(getUserById, decoded.userId);*/
    req.userId = decoded;
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = authenticateToken;
