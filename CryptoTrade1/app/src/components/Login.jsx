import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiUrl from "../config";


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${apiUrl}/api/auth`;
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/profile";
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
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-center flex-col mb-10">
                    <h1 className="text-3xl sm:text-5xl text-white  py-1">
                        Login
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                    - Create your account to access a personal cryptocurrency portfolio. <br /> - Track market trends, share thoughts, and discuss with other members.  Join the community for experiences and connections. <br />  - Log in now to start your crypto journey!
                    </p>
                </div>
                <div className="max-w-md w-full p-6 blue-glassmorphism rounded-md shadow-md">
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
						/>

                        <div className="h-[1px] w-full bg-gray-400 my-2" />
						{error && <div className="text-red-500 mb-4">{error}</div>}
						<button type="submit" className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
							Login
						</button>
					</form>
				</div>
				<div >
					<h1 className="text-center mt-5 text-white ">New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="letsToSignUp">
							<p className="letsToSignUp">Sign Up</p>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;