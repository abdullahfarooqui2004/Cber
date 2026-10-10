import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/axios";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../../store/slices/authSlice";


const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth) || localStorage.getItem("token")

    useEffect(() => {
        const handleLogout = async () => {
            try{
                await api.get("/user/logout", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
            catch(error){
                console.log(error)
            }
            finally{
                localStorage.removeItem("token");
                dispatch(logout())

                navigate("/home", {replace: true})
            }
        };
        handleLogout();
    }, [token, dispatch, navigate])

  return (
		<div className="h-screen w-full flex items-center justify-center">
			<p className="text-gray-600 font-medium">Signing out...</p>
		</div>
  );
}

export default Logout