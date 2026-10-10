// Protection Wrapper

import { useSelector } from 'react-redux';
import {Navigate, useLocation, Outlet} from 'react-router-dom'

const UserRootLayout = () => {
    const location = useLocation();
    const {token} = useSelector((state) => state.auth)
    const storedToken =  token || localStorage.getItem("token")

    if(!storedToken){
        return <Navigate to="/home" state={{ from: location }} replace />;
        }

  return (
    <div className="w-full h-screen">
        <Outlet/>
    </div>
  )
}

export default UserRootLayout