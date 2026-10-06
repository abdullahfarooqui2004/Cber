import {body} from "express-validator"

export const registerValidationRules = [
    body("fullname.firstname")
        .trim()
        .isLength(3)
        .withMessage("Firstname must be at least 3 character long"),

    body("fullname.lastname")
        .trim()
        .isLength(3)
        .withMessage("Lastname must be at least 3 character long"),

	body("email")
		.trim()
		.isEmail()
		.withMessage("Must provide a valid email address")
		.normalizeEmail(),

	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.matches(/\d/)
		.withMessage("Password must contain at least one number"),
];

export const loginValidationRules = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Must provide a valid email address")
		.normalizeEmail(),

	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.matches(/\d/)
		.withMessage("Password must contain at least one number"),
];
