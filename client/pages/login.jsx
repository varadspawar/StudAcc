import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="w-full h-screen flex-col justify-center items-center">
			<div className="flex flex-col justify-center min-h-screen">
				<div>
					<form  className="text-center border-[1px] shadow-2xl border-blue-400 max-w-md rounded-lg items-center p-4 mx-auto bg-gradient-to-r from-blue-500 to-purple-500" onSubmit={handleSubmit}>
						<h1 className="py-4 text-2xl text-center font-bold">Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="w-full mb-4 p-2 rounded-md text-center border border-blue-400 bg-white"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="w-full mb-4 p-2 rounded-md text-center border border-blue-400 bg-white"
						/>
						{error && <div className="">{error}</div>}
						<button type="submit" className="border p-4 rounded-md bg-blue-300">
							Login
						</button>
					</form>
				</div>
				<div className="flex items-center justify-center space-x-2">
					<p>New Here?</p>
					<Link to="/signup">
						<button type="button" className="">
							<h1 className='text-blue-500 underline'>Sign Up</h1>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;