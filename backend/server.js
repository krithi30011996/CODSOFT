const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");


const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

app.use(

    cors({

        origin: [

            "http://localhost:5173",

            "https://codsoft-sandy-five.vercel.app"

        ],

        methods: [

            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"

        ],

        allowedHeaders: [

            "Content-Type",
            "Authorization"

        ],

        credentials: true

    })

);

app.options("*", cors());
app.use(express.json());
app.use("/api/result", resultRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
    res.send("Quiz Maker Backend Running");
});

app.listen(5000, () => {
    console.log("Server Running");
});