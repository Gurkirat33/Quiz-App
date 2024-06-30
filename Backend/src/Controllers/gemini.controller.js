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
    const { catagoryName } = req.params;
    if (!catagoryName) throw new ApiError(400, "Please provide catagory name");
    const prompt =
      await model.generateContent(`Generate a array of objects [javascript] with 10 multiple-choice questions objects with the following criteria: 
        Category: ${catagoryName}
        Each question should have:
        ID (incremental numbers) [name should be questionId ALWAYS]
        Question text [name should be question ALWAYS]
        correctAnswer [use this exact name]
        Four options (1, 2, 3, 4) , options should be in a array of object , each object should have a label and value
        Ensure the questions are diverse and cover various aspects related to ${catagoryName}.
        the questions should be different everytime
        ALSO DONT SEND ANY EXTRA CONTENT , JUST START WITH A ARRAY OF OBJECTS
        ALWAYS return only a array of objects , nothing else [IMPORTANT]
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
