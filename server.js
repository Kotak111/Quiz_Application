const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config()
const cookieParser=require("cookie-parser")
app.use(cookieParser())
require("./config/db")
const port = process.env.PORT
const UserRoutes=require("./routes/user.route")
const QuizRoutes=require("./routes/quiz.route")
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Quiz_Application API',
        version: '1.0.0',
        description: 'API for managing quiz',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Replace with your API base URL
        },
    ],
};
// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/quiz.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth",UserRoutes)
app.use("/api/v1/quiz",QuizRoutes)
app.get("/",(req,res)=>{
    res.send("<center><h1>Quiz_Application All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/Quiz_Application target=_blank>Repository :- Quiz_Application</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))