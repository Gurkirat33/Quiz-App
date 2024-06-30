import React, { useEffect, useState } from "react";

const Loading = () => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold mb-4">Are you ready?</div>
      <div className="text-2xl mb-8">{`Quiz starting in ${counter} ${
        counter === 1 ? "second" : "seconds"
      }`}</div>
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
    </div>
  );
};

export default Loading;
