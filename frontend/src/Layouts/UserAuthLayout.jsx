import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg"

export default function UserAuthLayout() {
	return (
        <div>
			<div className="flex justify-between items-center  px-5 py-4 border-b border-gray-200 bg-blue-200/50">
				<img className="h-10" src={logo} alt="logo" />
                <h2 className="text-3xl font-bold text-blue-600 ">
                    Cber
                </h2>
			</div>
                
				<Outlet />
        </div>
	);
}
