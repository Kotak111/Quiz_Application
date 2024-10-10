const Quiz = require("../models/quiz.model");

//create a quiz 
exports.CreateQuiz = async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        
        const findTitle = await Quiz.findOne({ title: title });
        if (findTitle) {
            return res.status(400).json({
                success: false,
                message: "Quiz with this title already exists."
            });
        }

       
        const quiz = await Quiz.create({
            title,
            description,
            questions
        });

        if (!quiz) {
            return res.status(400).json({
                success: false,
                message: "Failed to create quiz. Please provide valid data."
            });
        }

       
        return res.status(200).json({
            success: true,
            message: "Quiz added successfully",
            quizId: quiz._id
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error occurred while creating quiz"
        });
    }
};
//get All Quiz
exports.GetAllQuiz= async(req,res)=>{
    try {
        const Find=await Quiz.find();
        if(!Find){
            return res.status(400).json({
                success:false,
                message:"No Quiz Found"
            })
        }
       return res.status(200).json({
            success:true,
            quiz:Find
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error occurred while creating quiz"
        });
        
    }
}

//get quiz by id
exports.GetByIdQuiz=async(req,res)=>{
   try {
     const Find=await Quiz.findById(req.params.id)
     if(!Find){
        return res.status(400).json({
             success:false,
             message:"No Quiz Found"
         })
     }
     return res.status(200).json({
         success:true,
         quiz:Find
     })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Server error occurred while creating quiz"
    });
   }
}

//delete quiz 
exports.DeleteQuiz=async(req,res)=>{
  try {
      const Find=await Quiz.findByIdAndDelete(req.params.id)
      if(!Find){
          return res.status(400).json({
               success:false,
               message:"No Quiz Found"
           })
       }
       return res.status(200).json({
           success:true,
           message:"Quiz Deleted"
       })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Server error occurred while creating quiz"
    });
  }
}

//Update quiz 
exports.UpdateQuiz= async(req,res)=>{
    try {
        const quiz=await Quiz.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            description:req.body.description,
            questions:req.body.questions
        },{new:true})
        if(quiz){
           return  res.status(200).json({
                success:true,
                message:"Quiz Are Updated..."
            })
        }
    } catch (error) {
        console.log(error);
    return res.status(500).json({
        success: false,
        message: "Server error occurred while creating quiz"
    });
    }
}
// Submit quiz answers and calculate score
exports.SubmitAnswer = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const { answers } = req.body;
        let score = 0;

        
        if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
            return res.status(400).json({
                error: 'Invalid answers provided. Ensure all questions have an answer.'
            });
        }
        quiz.questions.forEach((question, index) => {
            if (answers[index] && answers[index].selectedAnswer === question.correctAnswer) {
                score += 1;
            }
        });

        res.status(200).json({
            message: 'Quiz submitted successfully',
            score,
            totalQuestions: quiz.questions.length,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit quiz' });
    }
};

  