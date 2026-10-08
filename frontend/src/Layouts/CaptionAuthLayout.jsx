import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg"


export default function AdminAuthLayout() {
	return (
		<div>
			<div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-red-200/50">
				<img className="h-10" src={logo} alt="logo" />
                <h2 className="font-bold text-red-500 text-3xl">Cber Captains</h2>
			</div>
			<Outlet />
		</div>
	);
}
