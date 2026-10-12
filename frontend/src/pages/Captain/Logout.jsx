import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";


const CaptainLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth) || localStorage.getItem("token")

    useEffect(() => {
        const handleLogout = async () => {
            try {
                api.get("/captain/logout", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            } catch (error) {
                console.log(error)
            }
            finally{
                localStorage.removeItem("token")
                localStorage.removeItem("captain")
                dispatch(logout())
                navigate("/home/captain/login", {
                    replace: true
                })
            }
        }

        handleLogout();

    }, [token, dispatch, navigate])

  return (
		<div className="h-screen w-full flex items-center justify-center">
			<p className="text-gray-600 font-medium">Signing out...</p>
		</div>
  )
}

export default CaptainLogout