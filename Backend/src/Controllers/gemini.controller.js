import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const questionStore = {};

async function generateQuestions(req, res, next) {
  try {
    const { catagoryName, selectedDiff } = req.params;
    if (!selectedDiff) throw new ApiError(400, "Please provide difficulty");
    if (!catagoryName) throw new ApiError(400, "Please provide catagory name");
    const prompt =
      await model.generateContent(`Generate an array of 10 multiple-choice question objects in JavaScript with the following criteria:
      Category: ${catagoryName}
      Difficulty: ${selectedDiff}
      Each question object should have the following structure:
      {
        questionId: 1,
        question: "What is the chemical symbol for water?",
        correctAnswer: "H2O",
        options: [
          { label: "A", value: "H2O" },
          { label: "B", value: "CO2" },
          { label: "C", value: "NaCl" },
          { label: "D", value: "O2" }
        ]
      }
      
      Generate 10 unique questions based on the given category and difficulty. The questions should be diverse and cover various aspects related to ${catagoryName}. Ensure the output is strictly an array of 10 objects as described, without any additional text or content.
      `);

    const result = await prompt.response;
    const text = result.text();

    const response = JSON.parse(text);
    const questions = response.map((question, index) => {
      questionStore[question.questionId] = question.correctAnswer;
      const { correctAnswer, ...questionWithoutAnswer } = question;
      return questionWithoutAnswer;
    });
    return res.status(200).json(new ApiResponse(200, "success", questions));
  } catch (error) {
    next(error);
  }
}

async function checkAnswers(req, res, next) {
  try {
    const { answers } = req.body; // Expected format: { questionId: selectedOption }
    if (!answers) throw new ApiError(400, "Please provide answers");

    let totalQuestions = 0;
    let correctQuestions = 0;
    const detailedResults = [];

    Object.keys(answers).forEach((questionId) => {
      const correctAnswer = questionStore[questionId];
      const userAnswer = answers[questionId];
      const isCorrect = correctAnswer === userAnswer;

      if (userAnswer !== undefined) {
        totalQuestions++;
      }
      if (isCorrect) {
        correctQuestions++;
      }

      detailedResults.push({
        questionId,
        correctAnswer,
        userAnswer,
        isCorrect,
      });
    });

    const response = {
      totalQuestionsAttempted: totalQuestions,
      correctQuestions,
      detailedResults,
    };

    return res.status(200).json(new ApiResponse(200, "success", response));
  } catch (error) {
    next(error);
  }
}

export { generateQuestions, checkAnswers };
