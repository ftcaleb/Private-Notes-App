import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/ContextProvider";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const {login} = useAuth()
  const [mode, setMode] = useState("Light Mode");

  const handleSubmit = (e) => {
    e.preventDefault();
   axios
  .post("http://localhost:3002/login", { email, password })
  .then((res) => {
    console.log(res.data); // should show { message, user }
    if (res.data.user) {
      login(res.data.user); // set user in context
      navigate("/notepad");
    }
  })
  .catch((err) => console.log(err));

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="bg-white p-6 rounded w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <button value={mode} onClick={() => setMode("Dark Mode")}></button>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              className="w-full border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              className="w-full border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2
                       font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">Don’t have an account?</p>

        <Link
          to="/register"
          className="block w-full text-center mt-2 bg-gray-200 text-gray-800
                     py-2 font-semibold hover:bg-gray-300 transition no-underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
