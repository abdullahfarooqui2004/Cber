import {useState} from "react"
import {NavLink} from "react-router-dom"
import { PATHS } from "../../routes/paths"

const CaptainLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [captainData, setCaptainData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
            email,
            password
        })
        setEmail('')
        setPassword('')
    } 

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
					Login
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

}

export default CaptainLogin