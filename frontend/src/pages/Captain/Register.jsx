import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import {api} from "../../utils/axios.js"
import { useDispatch } from "react-redux";
import { setCredentialsCaptain } from "../../store/slices/authSlice.js";
import { toast } from "react-hot-toast";

// Options

const OPTIONS = [
	{
		id: "option-1",
		value: "bike",
		title: "Moto / Bike",
		description: "Fastest for single riders & heavy traffic",
		badge: "Affordable",
	},
	{
		id: "option-2",
		value: "auto",
		title: "Auto",
		description: "Pocket-friendly 3-wheeler for quick commutes",
		badge: "Popular",
	},
	{
		id: "option-3",
		value: "car",
		title: "Car / Cab",
		description: "Comfortable air-conditioned four-wheeler",
		badge: "Comfort",
	},
];

// Default Captain
const CaptainRegister = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [color, setColor] = useState("");
	const [plate, setPlate] = useState("");
	const [capacity, setCapacity] = useState(2);
	const [type, setType] = useState(OPTIONS[0].value);

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();

        const captainCred = {
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                vehicleType : type
            }
        }

        setLoading(false)

        try {
            const res = await api.post("/captain/register", captainCred);
            if(res.status === 201){
            const {token, captain} = res.data
            dispatch(setCredentialsCaptain({token, captain}))
            localStorage.setItem("token", token)
            toast.success("Registered")
            }

            navigate("/")
            
        } catch (error) {
            console.log("captiani: ", error)
            toast.error("Error")
        }
        finally{
            setLoading(false)
        }
	};

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
				</div>

				{/* Email */}

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

				{/* Vehicle Details */}

				<h3 className="text-md mb-2">Vehicle Details</h3>
				<div className="flex flex-col">
					<div className="flex gap-4">
						{/* Color */}
						<input
							className="bg-[#eee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
							value={color}
							onChange={(e) => setColor(e.target.value)}
							type="text"
							placeholder="Red"
							required
						/>
						{/* Plate */}
						<input
							className="bg-[#eee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
							value={plate}
							onChange={(e) => setPlate(e.target.value)}
							type="text"
							placeholder="UP70"
							required
						/>
					</div>
					{/* Capacity */}
					<input
						className="bg-[#eee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
						value={capacity}
						onChange={(e) => setCapacity(e.target.value)}
						type="text"
						placeholder="Capacity"
						min={2}
						required
					/>

					{/* Options */}

					<div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
						<div className="w-full pt-4 border-t border-gray-100">
							<label
								htmlFor="dropdown-select"
								className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2"
							>
								Vehicle Type
							</label>
							<select
								id="dropdown-select"
								value={type}
								onChange={(e) => {
									setType(e.target.value);
									// if (onChange) onChange(e.target.value);
								}}
								className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
							>
								{OPTIONS.map((option) => (
									<option
										key={option.id}
										value={option.value}
									>
										{option.title}
									</option>
								))}
							</select>
						</div>

						{/* Selected Result Display */}
						<div className="mt-5 p-3 rounded-lg bg-gray-50 text-center text-xs text-gray-600">
							Active selection:{" "}
							<span className="font-semibold text-blue-600 uppercase">
								{type}
							</span>
						</div>
					</div>
				</div>

				{/* Submit */}

				<button className="bg-[#e01b24] font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                    {loading ? "Wait a sec": "Register"}
				</button>

				<p className="text-center">
					Already have an account?{" "}
					<NavLink className="text-blue-500" to={PATHS.CAPTAIN.LOGIN}>
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
};

export default CaptainRegister;
