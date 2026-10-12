import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import { api } from "../utils/axios";
import { setCredentialsUser } from "../store/slices/authSlice";

const UserRootLayout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { token, user } = useSelector((state) => state.auth);
	const storedToken = token || localStorage.getItem("token");

	// Only start in loading state if we have a token but no user in memory
	const [loading, setLoading] = useState(() => Boolean(storedToken && !user));

	useEffect(() => {
		// If no token or user is already loaded, nothing to fetch
		if (!storedToken || user) {
			return;
		}

		let isSubscribed = true;

		api.get("/user/profile", {
			headers: {
				Authorization: `Bearer ${storedToken}`,
			},
		})
			.then((res) => {
				if (isSubscribed && res.status === 200) {
					const userData = res.data.user || res.data;
					dispatch(
						setCredentialsUser({
							token: storedToken,
							user: userData,
						}),
					);
				}
			})
			.catch((err) => {
				console.error(err);
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				if (isSubscribed) {
					navigate("/home/login");
				}
			})
			.finally(() => {
				if (isSubscribed) {
					setLoading(false);
				}
			});

		return () => {
			isSubscribed = false;
		};
		// Keep `user` out of deps so dispatching doesn't cancel the finally block
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storedToken, dispatch, navigate]);

	// 1. No token at all -> Redirect
	if (!storedToken) {
		return <Navigate to="/home" state={{ from: location }} replace />;
	}

	// 2. Only show loading if we STILL do not have the user
	if (loading && !user) {
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<span className="text-gray-500 text-lg">
					Loading session...
				</span>
			</div>
		);
	}

	// 3. User authenticated -> Render routes
	return (
		<div className="w-full h-screen">
			<Outlet />
		</div>
	);
};

export default UserRootLayout;
