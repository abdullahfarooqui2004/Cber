import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import AuthRootLayout from "../Layouts/AuthRootLayout"
import Home from "../pages/Home";
import UserLogin from "../pages/User/Login";
import UserAuthLayout from "../Layouts/UserAuthLayout";
import UserRegister from "../pages/User/Register";
import CaptainAuthLayout from "../Layouts/CaptionAuthLayout";
import CaptainLogin from "../pages/Captain/Login";
import CaptainRegister from "../pages/Captain/Register";
import NotFound from "../pages/NotFound";

import Dashboard from "../pages/Dashboard";
import UserRootLayout from "../Layouts/UserRootLayout";
import Logout from "../pages/User/Logout";

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
                        element: <Logout/>
                    }
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
		path: PATHS.DASHBOARD,
		element: <UserRootLayout/>,
		children: [{ index: true, element: <Dashboard /> },],
	},
]);

export default router;
