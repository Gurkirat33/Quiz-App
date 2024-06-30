import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [catagory, setCatagory] = useState("");
  const demoCatagory = [
    "General Knowledge",
    "Science",
    "Sports",
    "History",
    "Geography",
    "Art",
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-purple-500 text-white p-4 text-center">
      <h1 className="md:text-4xl text-3xl font-bold mb-8">
        Welcome to the Quiz App!
      </h1>
      <div className="text-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="catagory" className="text-xl font-bold">
            Enter any catagory to start
          </label>
          <input
            type="text"
            placeholder="eg Science"
            id="catagory"
            onChange={(e) => setCatagory(e.target.value)}
            className="p-2 border-2 border-white focus:outline-none text-black"
          />
          <p>or</p> <p>Choose one of the following</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
            {demoCatagory.map((catagory) => (
              <Link
                key={catagory}
                className="border-2 border-white p-2 rounded-md"
                to={`/home/${catagory}`}
              >
                {catagory}
              </Link>
            ))}
          </div>
          <Link
            to={`/home/${catagory}`}
            className="border-2 bg-white text-black border-black font-medium mt-2 p-2"
          >
            Start the quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
