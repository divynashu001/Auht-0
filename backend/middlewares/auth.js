const jwt = require("jsonwebtoken");

const ensureAuthoriation = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthoried, Jwt token required!",
    });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthoried, Jwt token wrong or expired!",
    });
  }
};

module.exports = ensureAuthoriation;
