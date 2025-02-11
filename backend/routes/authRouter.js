const { signUp, login } = require("../controllers/authContorller");
const { signUpValidation, loginValidation } = require("../middlewares/authValidation");

const router = require("express").Router();

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, login);

module.exports = router;
