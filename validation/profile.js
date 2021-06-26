const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = (data) => {
    let errors = {};

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
