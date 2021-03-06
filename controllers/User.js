const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load user model
const User = require("../models/User");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

/**
 * Register user controller
 */
exports.userRegister = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200", // size
                r: "pg", // rating
                d: "mm", // default
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
};

/**
 * Login user controller
 */
exports.userLogin = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email }).then((user) => {
        // check for user
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }

        // check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // user matched
                const payload = {
                    id: user._id,
                    name: user.name,
                    avatar: user.avatar,
                }; // create jwt payload

                // sign token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: 3600,
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                        });
                    }
                );
            } else {
                errors.password = "Password incorrect";
                return res.status(400).json(errors);
            }
        });
    });
};

/**
 * Current user details controller
 */
exports.userDetail = (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    });
};
