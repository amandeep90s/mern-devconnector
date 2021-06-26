const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateEducationInput = (data) => {
    let errors = {};

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
