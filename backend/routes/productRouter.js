const { login } = require("../controllers/authContorller");
const ensureAuthoriation = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", ensureAuthoriation, (req, res)=>{
    // console.log("----LogedIn user details----", req.user);
    
    res.status(200).json([
        {
            product:"TV",
            price: 20000
        },
        {
            product:"Mobile",
            price: 20000
        }
    ])
});

module.exports = router;
