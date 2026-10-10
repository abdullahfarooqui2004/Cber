import {Outlet} from 'react-router-dom'

const AuthRootLayout = () => {
  return (
    <>
    <div className="w-full h-screen">
        <Outlet/>
    </div>
    </>
  )
}

export default AuthRootLayout