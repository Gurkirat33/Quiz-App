import React from "react";
import { Link } from "react-router-dom";

const ShowResult = ({ result, questions }) => {
  if (!result || !result.data) return null;
  const response = result.data;
  const { totalQuestionsAttempted, correctQuestions, detailedResults } =
    response;

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Quiz Results
        </h1>
        <div className="flex flex-col gap-4 mb-8">
          <p className="text-lg text-gray-700">
            Total Questions: {questions.length}
          </p>
          <p className="text-lg text-gray-700">
            Questions Attempted: {totalQuestionsAttempted}
          </p>
          <p className="text-lg font-bold text-gray-700">
            Correct Answers: {correctQuestions}
          </p>
        </div>
        <div className="space-y-4">
          {detailedResults.map((result) => (
            <div
              key={result.questionId}
              className={`p-4 rounded-lg shadow ${
                result.isCorrect ? "bg-green-200" : "bg-red-200"
              }`}
            >
              <p className="text-lg text-gray-800">
                {questions[result.questionId - 1].question}
              </p>
              <p className="text-sm text-gray-700">
                Your Answer: {result.userAnswer}
              </p>
              <p className="text-sm text-gray-700">
                Correct Answer: {result.correctAnswer}
              </p>
              <p
                className={`text-sm font-bold ${
                  result.isCorrect ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.isCorrect ? "Correct" : "Incorrect"}
              </p>
            </div>
          ))}
        </div>
        <div className="flex  justify-center mt-6">
          <Link
            to="/home"
            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Play Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
