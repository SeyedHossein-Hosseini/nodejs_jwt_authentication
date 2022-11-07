const { Router } = require("express");

const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
} = require("../controllers/authController");

const router = Router();

// this route will send back signup page
router.get("/signup", signup_get);

// this route sends a request to database for signing up
router.post("/signup", signup_post);

// this route will send back login page
router.get("/login", login_get);

// this route sends a request to database for logining in
router.post("/login", login_post);

// for logging out user
router.get("/logout", logout_get);


module.exports = router;
