import {useState} from "react"
import {NavLink} from "react-router-dom"
import { PATHS } from "../../routes/paths"

const UserRegister = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            fullname : {
            firstname,
            lastname
            },
            email,
            password
        })
        setEmail('')
        setPassword('')
        setFirstname("")
        setLastname("")
    } 

  return (
		<div className="p-7 h-screen flex flex-col justify-between">
			<form onSubmit={submitHandler}>
				{/* Name */}

				<h3 className="text-lg mb-2">What's your name?</h3>
				<div className="flex gap-4">
					<input
						className="bg-[#eee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						type="text"
						placeholder="John"
						required
					/>
					<input
						className="bg-[#eee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						type="text"
						placeholder="Doe"
						required
					/>

					{/* Email */}
				</div>
				<h3 className="text-lg mb-2">What's your email?</h3>
				<input
					className="bg-[#eee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="email@example.com"
					required
				/>

				{/* Password */}

				<h3 className="text-lg mb-2">Enter Password</h3>
				<input
					className="bg-[#eee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="password"
					required
				/>

				{/* Submit */}

				<button className="bg-[#1a5fb4] font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
					Register
				</button>



				<p className="text-center">
					Already have an account?{" "}
					<NavLink className="text-blue-500" to={PATHS.USER.LOGIN}>
						Login
					</NavLink>
				</p>
			</form>
			<p className="mt-8 text-center text-gray-500 font-base ">
				You consent to receive a verification code by text or Whatsapp.
				Message and data rates may apply.
			</p>
		</div>
  );

}

export default UserRegister