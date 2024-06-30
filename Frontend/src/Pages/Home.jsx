import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [catagory, setCatagory] = useState("");
  const navigate = useNavigate();
  const [selectedDiff, setSelectedDiff] = useState("");
  const handleSubmit = () => {
    if (!catagory || !selectedDiff) {
      toast.error("Please select a catagory and difficulty");
      return;
    }
    navigate(`/home/${catagory}/${selectedDiff}`);
  };
  const demoCatagory = [
    "General Knowledge",
    "Science",
    "Sports",
    "History",
    "Geography",
    "Art",
  ];
  const difficuilty = ["easy", "medium", "hard"];
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
          <p>or</p>
          <p className="text-xl font-medium">Choose one of the following</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
            {demoCatagory.map((catagoryItem) => (
              <div
                key={catagoryItem}
                className={`border-2 border-white ${
                  catagoryItem === catagory ? "bg-white text-black" : ""
                } p-2 rounded-md`}
                onClick={() => setCatagory(catagoryItem)}
              >
                {catagoryItem}
              </div>
            ))}
          </div>
          <div>
            <p className="text-xl font-medium py-3">Choose any difficulty</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {difficuilty.map((diff) => (
                <div
                  key={diff}
                  className={` bg-black text-white p-2 rounded-md ${
                    selectedDiff === diff ? "bg-white text-black" : ""
                  }`}
                  onClick={() => setSelectedDiff(diff)}
                >
                  {diff}
                </div>
              ))}
            </div>
          </div>
          <div
            className="border-2 bg-white text-black border-black font-medium mt-2 p-2"
            onClick={handleSubmit}
          >
            Start the quiz
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
