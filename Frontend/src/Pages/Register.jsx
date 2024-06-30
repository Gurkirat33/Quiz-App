import { Link, useNavigate } from "react-router-dom";
import QuizImf from "../assests/quizImg.png";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/user";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleRegisterUser = async () => {
    if (!formData.username || !formData.password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      await axios.post("/api/v1/user/register", {
        username: formData.username,
        password: formData.password,
      });
      toast.success("User registered successfully");
      dispatch(setUser(formData));
      navigate("/home");
    } catch (error) {
      toast.error("Username already exists");
    }
  };
  return (
    <div className="bg-custom-gradient min-h-screen ">
      <div className="section-container flex flex-col md:flex-row  md:justify-center md:items-center md:min-h-[80vh]">
        <div>
          <h1 className="text-3xl font-bold md:text-5xl text-center mt-6 mb-2 md:text-left">
            Register
          </h1>
          <p className="text-slate-600 md:text-lg text-center">
            Join the Quiz Challenge: Create Your Account Today!
          </p>
          <div className="mt-4 space-y-4 max-w-3xl mx-auto">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-medium ">
                Enter a username
              </label>
              <input
                type="text"
                id="name"
                placeholder="Eg John217"
                className="border-2 border-black focus:outline-none p-2 w-full"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="text-lg font-medium ">
                Create password
              </label>
              <input
                type="text"
                id="password "
                placeholder="********"
                className="border-2 border-black focus:outline-none p-2 w-full"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link className="underline underline-offset-2" to="/login">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ease-in-out mt-4 duration-300"
              onClick={handleRegisterUser}
            >
              Register
            </button>
          </div>
        </div>
        <img
          src={QuizImf}
          alt="quizImg"
          className="object-cover md:h-60 ml-12 md:w-60"
        />
      </div>
    </div>
  );
};

export default Register;
