import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import toast from "react-hot-toast";
import { api } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setCredentialsCaptain } from "../../store/slices/authSlice";

const CaptainLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();

		const captainCred = {
			email,
			password,
		};

		setLoading(true);

		try {
			const res = await api.post("/captain/login", captainCred);
			if (res.status === 200) {
				const { token, captain } = res.data;
				dispatch(setCredentialsCaptain({ token, captain }));
				localStorage.setItem("token", token);
				toast.success("Logged In");
			}

			navigate("/");
		} catch (error) {
			console.log("Error: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-7 h-screen flex flex-col justify-between">
			<form onSubmit={submitHandler}>
				<h3 className="text-lg mb-2">What's your email?</h3>
				<input
					className="bg-[#eee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="email@example.com"
					required
				/>

				<h3 className="text-lg mb-2">Enter Password</h3>
				<input
					className="bg-[#eee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					required
				/>

				<button className="bg-[#e01b24] font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                    {loading ? "Wait a sec" : "Login"}
				</button>

				<p className="text-center">
					New here?{" "}
					<NavLink
						className="text-blue-500"
						to={PATHS.CAPTAIN.SIGNUP}
					>
						Create a new Account
					</NavLink>
				</p>
			</form>
			<NavLink
				to={PATHS.USER.LOGIN}
				className="bg-[#1a5fb4]/80 flex justify-center items-center font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
			>
				Log in as User
			</NavLink>
		</div>
	);
};

export default CaptainLogin;
