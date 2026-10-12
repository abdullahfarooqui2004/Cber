import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, Navigate, useNavigate} from "react-router-dom";
import {api} from "../utils/axios.js"
import { setCredentialsCaptain } from "../store/slices/authSlice.js";
import { useEffect, useState } from "react";

const CaptainRootLayout = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();

    const {token, user} = useSelector((state) => state.auth)
    const strToken = token || localStorage.getItem("token")

    const [loading, setLoading] = useState(() => Boolean(strToken && !user))

    useEffect(() => {
        if(!strToken || user){
            return;
        }

        let isSubscribed = true;

        api.get("/captain/profile", {
            headers: {
                Authorization: `Bearer ${strToken}`
            }
        })
        .then((res) => {
            if(isSubscribed || res.status === 200){
                const userData = res.data.user || res.data;
                dispatch(setCredentialsCaptain({token: strToken, user: userData}))
            }
        })
        .catch((error) => {
            console.log(error)
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if(isSubscribed){
                navigate("/home/captain/login")
            }
        }).finally(() => {
            if(isSubscribed)
                setLoading(false)
        })
        return () => {
            isSubscribed = false
        }

    }, [strToken, dispatch, navigate])

    if(!strToken){
        return <Navigate to='/home' state={{from:location}} replace />
    }

    if(loading && !user){
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<span className="text-gray-500 text-lg">
					Loading session...
				</span>
			</div>
		);
    }



  return (
    <>
        <Outlet/>
    </>
  )
}

export default CaptainRootLayout