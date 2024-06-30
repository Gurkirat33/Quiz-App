import { Router } from "express";
import {
  checkAnswers,
  generateQuestions,
} from "../Controllers/gemini.controller.js";

const router = Router();

router.get("/:catagoryName", generateQuestions);
router.post("/check-answers", checkAnswers);

export default router;
