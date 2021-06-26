const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
    userDetail,
    userLogin,
    userRegister,
} = require("../../controllers/User");

/**
 * @route   POST api/users/register
 * @desc    Register user
 * @access  Public
 */
router.post("/users/register", userRegister);

/**
 * @route   POST api/users/login
 * @desc    Login user / Returning JWT Token
 * @access  Public
 */
router.post("/users/login", userLogin);

/**
 * @route   GET api/users/current
 * @desc    Return current user
 * @access  Private
 */
router.get(
    "/users/current",
    passport.authenticate("jwt", { session: false }),
    userDetail
);

module.exports = router;
