import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../utils/axios";
import { setCredentialsUser } from "../../store/slices/authSlice";
import { toast } from "react-hot-toast";


const UserLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch("")

    const submitHandler = async (e) => {
        e.preventDefault();

        const userCred = {
            email,
            password
        }

        setLoading(true);

        try{
            const res = await api.post("/user/login", userCred)
            if(res.status == 200){
                const {token, user} = res.data
                dispatch(setCredentialsUser({token, user}))
                localStorage.setItem("token", token)
                toast.success("Logged In")

                navigate("/")
            }

        }catch(error){
            console.log(error)
            toast.error("Invalid Credentials")
        }
        finally{
            setLoading(false)
        }

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

                {/* Submit */}
				<button className="bg-[#1a5fb4] font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                    {loading ? "Wait a sec": "Login"}
				</button>

				<p className="text-center">
					New here?{" "}
					<NavLink className="text-blue-500" to={PATHS.USER.SIGNUP}>
						Create a new Account
					</NavLink>
				</p>
			</form>
			<NavLink to={PATHS.CAPTAIN.LOGIN} className="bg-[#e01b24]/80 flex justify-center items-center font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
				Log in as Captain
			</NavLink>
		</div>
  );
}

export default UserLogin