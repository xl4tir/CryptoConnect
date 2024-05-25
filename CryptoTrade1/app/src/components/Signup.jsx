import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
        login: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8060/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Create Account
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                    - Create your account to access a personal cryptocurrency portfolio. <br /> - Track market trends, share thoughts, and discuss with other members.  Join the community for experiences and connections. <br />  - Log in now to start your crypto journey!
                    </p>
                </div>
                <div className="max-w-md w-full p-6 blue-glassmorphism rounded-md shadow-md">
                    <form onSubmit={handleSubmit}>
                    
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                        />
                        <input
                            type="login"
                            placeholder="Login"
                            name="login"
                            onChange={handleChange}
                            value={data.login}
                            required
                            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                        />
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
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
	);
};

export default Signup;