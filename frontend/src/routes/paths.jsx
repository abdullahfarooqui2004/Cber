export const PATHS = {
    // Private Routes
    
    DASHBOARD:{
        USER:{
            HOME: "/"
        },
        CAPTAIN:{
            HOME: "/captain"

        }
    },

    // Public Routes

	HOME: "/home",
	USER: {
		LOGIN: "/home/login",
		SIGNUP: "/home/signup",
        LOGOUT: "/home/logout"
	},
	CAPTAIN: {
		LOGIN: "/home/captain/login",
		SIGNUP: "/home/captain/signup",
        LOGOUT: "/home/captain/logout"
	},
};
