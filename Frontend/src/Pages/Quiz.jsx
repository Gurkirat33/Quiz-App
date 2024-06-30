import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ShowResult from "../Components/ShowResult";
import Loading from "../Components/Loading";

const Quiz = () => {
  const catagoryName = useParams().catagory;
  const selectedDiff = useParams().selectedDiff;
  console.log(catagoryName, selectedDiff);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState({});
  const questionToRender = questions[activeQuestion];

  useEffect(() => {
    async function getQuestions() {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/v1/gemini/${catagoryName}/${selectedDiff}`,
          {}
        );
        setLoading(false);
        setQuestions(res.data.data);
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
        setQuestions([]);
      }
    }
    getQuestions();
  }, [catagoryName]);

  const handleAnswerClick = (questionId, optionValue) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionValue,
    }));
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/v1/gemini/check-answers", {
        answers: userAnswers,
      });
      setActiveQuestion(questions.length);
      setResult(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  if (loading) return <Loading />;
  return (
    <>
      {activeQuestion === questions.length ? (
        <ShowResult result={result} questions={questions} />
      ) : (
        <div className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-md mt-8 md:mt-16">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {questionToRender?.question}
          </h1>
          <ul>
            {questionToRender?.options?.map((option, index) => (
              <li
                key={index}
                className={`flex items-center gap-4 border-2 border-gray-300 rounded-md p-4 my-2 cursor-pointer transition-colors   ${
                  userAnswers[questionToRender.questionId] === option.value
                    ? "bg-slate-200"
                    : ""
                }`}
                onClick={() =>
                  handleAnswerClick(questionToRender.questionId, option.value)
                }
              >
                <span className="text-lg">{option.label}</span>
                <span className="text-lg">{option.value}</span>
              </li>
            ))}
          </ul>
          {activeQuestion === questions.length - 1 ? (
            // Show submit button on the last question
            <button
              className="block mx-auto mt-8 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-md font-semibold shadow-md hover:from-purple-500 hover:to-pink-600 transition duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            // Show next button for other questions
            <button
              className="block mx-auto mt-8 px-6 py-3 bg-gray-800 text-white rounded-md font-semibold shadow-md hover:bg-gray-900 transition duration-300"
              onClick={() => setActiveQuestion(activeQuestion + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
