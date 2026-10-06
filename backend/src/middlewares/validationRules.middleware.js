import {body} from "express-validator"

export const userRegisterValidationRules = [
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

export const userLoginValidationRules = [
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

export const captainRegisterValidationRules = [
	body("fullname.firstname")
		.trim()
		.notEmpty()
		.withMessage("First name is required")
		.isLength({ min: 3 })
		.withMessage("First Name must be at least 3 characters long"),

	body("fullname.lastname")
		.trim()
		.notEmpty()
		.withMessage("Last name is required")
		.isLength({ min: 3 })
		.withMessage("Last Name must be at least 3 characters long"),

	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please provide a valid email address")
		.isLength({ min: 5 })
		.withMessage("Email must be at least 5 characters long")
		.normalizeEmail(),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),

	body("vehicle.color")
		.trim()
		.notEmpty()
		.withMessage("Vehicle color is required")
		.isLength({ min: 3 })
		.withMessage("Color must be at least 3 characters long"),

	body("vehicle.plate")
		.trim()
		.notEmpty()
		.withMessage("Vehicle plate is required")
		.isLength({ min: 3 })
		.withMessage("Plate must be at least 3 characters long"),

	body("vehicle.capacity")
		.notEmpty()
		.withMessage("Vehicle capacity is required")
		.isInt({ min: 1 })
		.withMessage("Capacity must be at least 1"),

	body("vehicle.vehicleType")
		.trim()
		.notEmpty()
		.withMessage("Vehicle type is required")
		.isIn(["car", "bike", "auto"])
		.withMessage("Vehicle type must be either 'car', 'bike', or 'auto'"),
];
