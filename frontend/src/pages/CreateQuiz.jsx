import { useState, useEffect } from "react";
import API from "../services/quizService";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {

    const navigate = useNavigate();

    useEffect(() => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {

            navigate("/login");

        }

    }, []);

    const [title, setTitle] =
        useState("");

    const [thumbnail, setThumbnail] =
        useState("");

    const [category, setCategory] =
        useState("General");

    const [question, setQuestion] =
        useState("");

    const [options, setOptions] =
        useState([
            "",
            "",
            "",
            ""
        ]);

    const [correct, setCorrect] =
        useState("");

    const [questions, setQuestions] =
        useState([]);

    function updateOption(index, value) {

        const copy =
            [...options];

        copy[index] =
            value;

        setOptions(copy);

    }

    function addQuestion() {

        if (

            !question ||

            options.some(op => !op) ||

            !correct

        ) {

            alert(
                "Fill all fields"
            );

            return;

        }

        const newQuestion = {

            question,

            options: [...options],

            correct

        };

        setQuestions(

            (prev) =>

                [

                    ...prev,

                    newQuestion

                ]

        );

        alert(

            "Question Added"

        );

        setQuestion("");

        setOptions([
            "",
            "",
            "",
            ""
        ]);

        setCorrect("");

    }

    async function saveQuiz() {

        console.log({

            title,
            thumbnail,
            category,
            questions

        });
        try {

            await API.post(
                "/quiz",
                {
                    title,
                    thumbnail,
                    category,
                    questions
                }
            );

            alert(
                "Quiz Saved"
            );

        }

        catch (error) {

            console.log(
                error
            );

            alert(
                "Save Failed"
            );

        }


    }

    return (

        <div className="create-page">

            <h1>
                Create Quiz
            </h1>

            <input
                placeholder="Thumbnail Image URL"
                value={thumbnail}
                onChange={(e) =>
                    setThumbnail(
                        e.target.value
                    )
                }
            />

            <select
                value={category}
                onChange={(e) =>
                    setCategory(
                        e.target.value
                    )
                }
            >

                <option value="General">
                    General
                </option>

                <option value="Programming">
                    Programming
                </option>

                <option value="Science">
                    Science
                </option>

                <option value="Math">
                    Math
                </option>

                <option value="History">
                    History
                </option>

            </select>

            <input
                placeholder="Quiz Title"
                value={title}
                onChange={(e) =>
                    setTitle(
                        e.target.value
                    )
                }
            />

            <textarea
                placeholder="Question"
                value={question}
                onChange={(e) =>
                    setQuestion(
                        e.target.value
                    )
                }
            />

            {
                options.map(
                    (op, index) => (

                        <input
                            key={index}
                            placeholder={`Option ${index + 1}`}
                            value={op}
                            onChange={(e) =>
                                updateOption(
                                    index,
                                    e.target.value
                                )
                            }
                        />

                    )
                )
            }

            <select
                value={correct}
                onChange={(e) =>
                    setCorrect(
                        e.target.value
                    )
                }
            >

                <option value="">
                    Select Correct Answer
                </option>

                {
                    options.map(
                        (op, index) => (

                            <option
                                key={index}
                                value={op}
                            >

                                Option {index + 1}

                            </option>

                        )
                    )
                }

            </select>

            <div className="buttons">

                <button
                    onClick={addQuestion}
                >

                    Add Question

                </button>

                <button
                    onClick={saveQuiz}
                >

                    Save Quiz

                </button>

            </div>

            <div>

                {
                    questions.map(
                        (item, index) => (

                            <div
                                key={index}
                                className="question-box"
                            >

                                <h3>

                                    Question {index + 1}

                                </h3>

                                <p>

                                    {item.question}

                                </p>

                                <ul>

                                    {
                                        item.options.map(
                                            (op, i) => (

                                                <li key={i}>

                                                    {op}

                                                </li>

                                            )
                                        )
                                    }

                                </ul>

                            </div>

                        )
                    )
                }

            </div>

        </div>

    );

}

export default CreateQuiz;