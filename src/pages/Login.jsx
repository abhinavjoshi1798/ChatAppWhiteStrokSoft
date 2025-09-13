import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { CiMail } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { FiEyeOff } from "react-icons/fi";
import { LOGIN_URL } from "../constants/loginUrlConstants";
import { handleLogin } from "../utils/loginUtils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)

  const { login } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({email, password, login, navigate, setErrors, setLoading, setError})
  };

  return (
    <div className="w-[100%] min-h-screen flex items-center justify-center text-white bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent w-full max-w-sm p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-fit flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-full h-full" />
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold mb-8">
          Login to continue
        </h2>

       {errors && <p className="text-red-400">{errors}</p>} 

        <div className="mb-4">
          <div className="group flex items-center border-b border-gray-500 focus-within:border-blue-400 transition duration-300">
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent py-3 px-2 focus:outline-none"
            />
            <span className="mr-2 text-xl text-gray-400 transition duration-300 group-focus-within:text-blue-400">
              <CiMail />
            </span>
          </div>
        </div>

        <div className="mb-2">
          <div className="group flex items-center border-b border-gray-500 focus-within:border-blue-400 transition duration-300">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent py-3 px-2 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-400 mr-2 text-xl hover:cursor-pointer transition duration-300 group-focus-within:text-blue-400"
            >
              {showPassword ? <FiEyeOff /> : <LuEye />}
            </button>

          </div>
        </div>


        <div className="text-right mb-6">
          <button
            type="button"
            className="text-sm text-gray-400 hover:text-blue-400 hover:cursor-pointer"
          >
            Forgot Password ?
          </button>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-3 bg-white text-black rounded-full font-semibold transition duration-300
             hover:bg-gray-100 
             hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]
             cursor-pointer disabled:cursor-not-allowed"
          disabled={loading}
        >
          {
            loading? (<div className="flex">
          <p>LOG IN</p><div className="w-5 mt-0.5 h-5 ml-2 border-2 border-gray-400 border-t-blue-400 rounded-full animate-spin"></div>
            </div>):"LOG IN"
          } 
           
        </button>

        <div className="text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-white font-semibold hover:cursor-pointer"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
