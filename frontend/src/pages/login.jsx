import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./demoAccount";
import Swal from 'sweetalert2'

const Login = () => {
  
  const navigate = useNavigate(); 
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if(res.status===200)
        {
          const userData = res.data;
          login(userData);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You are Logged In',
            showConfirmButton: false,
            timer: 2500
          })
          navigate(`/dash/${res.data.id}`);
        }
      })
      .catch(err=>{
        if(err.response.status==404 || err.response.status===400)
        {
          Swal.fire({
            icon: 'error',
            title: 'OOPS!!!🫨',
            text: 'WRONG CREDENTIALS!',
          })
        }
      })
  };

  return (
    <div className="bg-gradient-to-t from-white via-purple-100 to-indigo-200 flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
       {/* logo */}
       <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-auto h-10 w-auto text-violet-950"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="button" 
            onClick={handleLogin} 
            className="flex w-full justify-center rounded-md bg-[#940B92] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to='/signup'
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
