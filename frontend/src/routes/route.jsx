import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import AuthRootLayout from "../Layouts/AuthRootLayout";
import Home from "../pages/Home";
import UserLogin from "../pages/User/Login";
import UserAuthLayout from "../Layouts/UserAuthLayout";
import UserRegister from "../pages/User/Register";
import CaptainAuthLayout from "../Layouts/CaptionAuthLayout";
import CaptainLogin from "../pages/Captain/Login";
import CaptainRegister from "../pages/Captain/Register";
import CaptainLogout from "../pages/Captain/Logout";
import NotFound from "../pages/NotFound";

import CaptainHome from "../pages/Captain/Home";
import UserRootLayout from "../Layouts/UserRootLayout";
import Logout from "../pages/User/Logout";
import UserHome from "../pages/User/Home";
import CaptainRootLayout from "../Layouts/CaptainRootLayout";

const router = createBrowserRouter([
	// Public Layout

	{
		path: PATHS.HOME,
		element: <AuthRootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			// User Auth
			{
				element: <UserAuthLayout />,
				children: [
					{
						path: PATHS.USER.LOGIN,
						element: <UserLogin />,
					},
					{
						path: PATHS.USER.SIGNUP,
						element: <UserRegister />,
					},
					{
						path: PATHS.USER.LOGOUT,
						element: <Logout />,
					},
				],
			},

			// Captain
			{
				path: "/home/captain",
				element: <CaptainAuthLayout />,
				children: [
					{
						path: "login",
						element: <CaptainLogin />,
					},
					{
						path: "signup",
						element: <CaptainRegister />,
					},
					{
						path: "logout",
						element: <CaptainLogout />,
					},
				],
			},

			// 404
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},

	// Protected Layouts

	// Dashboard

	{
		path: PATHS.DASHBOARD.USER.HOME,
		element: <UserRootLayout />,
		children: [
            {
                 index: true,
                 element: <UserHome /> 
            }
        ],
	},

	{
		path: PATHS.DASHBOARD.CAPTAIN.HOME,
		element: <CaptainRootLayout />,
		children: [
			{
				index: true,
				element: <CaptainHome />,
			},
		],
	},
]);

export default router;
