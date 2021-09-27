const {validationResult} = require("express-validator");

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return `[${param}]: ${msg}`;
        };


        const errors = validationResult(req).formatWith(errorFormatter);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            message: 'one or more validation error occurred',
            errors: errors.array()
        });
    };
};

module.exports = {validate}
