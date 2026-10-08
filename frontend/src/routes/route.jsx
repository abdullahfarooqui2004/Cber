import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";

import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";
import UserLogin from "../pages/User/Login";
import UserAuthLayout from "../Layouts/UserAuthLayout";
import UserRegister from "../pages/User/Register";
import CaptainAuthLayout from "../Layouts/CaptionAuthLayout"
import CaptainLogin from "../pages/Captain/Login"
import CaptainRegister from "../pages/Captain/Register"
import NotFound from "../pages/NotFound"

const router = createBrowserRouter([
	{
		path: PATHS.HOME,
		element: <RootLayout />,
		children: [
			{ 
                index: true,
                element: <Home /> 
            },
            // User Auth
            {
                element: <UserAuthLayout/>,
                children:[
                    {
                    path: PATHS.USER.LOGIN,
                    element: <UserLogin/>
                    },
                    {
                        path: PATHS.USER.SIGNUP,
                        element: <UserRegister/>
                    }
            ]
            },

            // Captain
            {
                path: 'admin',
                element: <CaptainAuthLayout/>,
                children: [
                    {
                        path: 'login',
                        element: <CaptainLogin/>
                    },
                    {
                        path: 'signup',
                        element: <CaptainRegister/>
                    }
                ]
            },

            // 404
            {
                path: "*",
                element: <NotFound/>
            }
			
		],
	},

]);

export default router;