const router=require("express").Router()
const QuizController=require("../controller/quiz.controller")
const { auth, IsUser, IsAdmin } = require("../utils/auth")
// Admin can handle quizzes

/**
 * @swagger
 * /api/quizzes/addquiz:
 *   post:
 *     summary: Create a new quiz
 *     description: Admin can create a new quiz by providing the title, description, and questions.
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "JavaScript Basics"
 *               description:
 *                 type: string
 *                 example: "Basic JavaScript questions."
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                       example: "What is a closure in JavaScript?"
 *                     choice:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Function inside a function"
 *                     correctAnswer:
 *                       type: string
 *                       example: "Function inside a function"
 *     responses:
 *       200:
 *         description: Quiz created successfully
 *       400:
 *         description: Bad request - Quiz already exists or invalid data
 */
router.post("/addquiz", auth, IsAdmin, QuizController.CreateQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz
 *     description: Admin can delete a quiz by its ID.
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the quiz to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 */
router.delete("/:id", auth, IsAdmin, QuizController.DeleteQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   patch:
 *     summary: Update a quiz
 *     description: Admin can update quiz details by its ID.
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the quiz to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Quiz Title"
 *               description:
 *                 type: string
 *                 example: "Updated quiz description"
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                       example: "Updated question text"
 *                     choice:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 */
router.patch("/:id", auth, IsAdmin, QuizController.UpdateQuiz);

// User can view quizzes and submit answers

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     description: Users can get a list of all quizzes.
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get("/", auth, IsUser, QuizController.GetAllQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     description: Users can get a specific quiz by its ID.
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the quiz to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz retrieved successfully
 *       404:
 *         description: Quiz not found
 */
router.get("/:id", auth, IsUser, QuizController.GetByIdQuiz);

/**
 * @swagger
 * /api/quizzes/{quizId}/submit:
 *   post:
 *     summary: Submit quiz answers and calculate score
 *     description: Users can submit their answers for a quiz and receive a score.
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: quizId
 *         in: path
 *         required: true
 *         description: ID of the quiz to submit answers for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     selectedAnswer:
 *                       type: string
 *                       example: "Function inside a function"
 *     responses:
 *       200:
 *         description: Quiz submitted successfully, with score and total questions
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Internal server error
 */
router.post("/:quizId/submit", auth, IsUser, QuizController.SubmitAnswer);

module.exports=router;