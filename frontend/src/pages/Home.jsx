import { NavLink } from "react-router-dom";
import { PATHS } from "../routes/paths";
import logo from "../assets/logo.svg"

export default function Home() {
		const background = `h-screen bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1737228292259-a59765c58f04?q=80&w=498&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-8 flex justify-between flex-col w-full`
	return (
		<div className={background}>
			<img className="w-16 ml-8" src={logo} alt="Logo" />

			<div className="bg-white py-5 px-4">
				<h2 className="text-3xl font-bold">Get started with Cber</h2>
				<NavLink to={PATHS.USER.LOGIN} className="w-full flex items-center justify-center bg-[#1a5fb4] text-white py-3 rounded mt-4">
					Continue
				</NavLink>
			</div>
		</div>
	);
}
