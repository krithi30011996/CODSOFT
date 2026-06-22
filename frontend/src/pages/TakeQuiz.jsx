import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/quizService";
import Confetti from "react-confetti";

function TakeQuiz() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [quiz, setQuiz] =
        useState(null);

    const [current, setCurrent] =
        useState(0);

    const [score, setScore] =
        useState(0);

    const [finished, setFinished] =
        useState(false);

    const [selected, setSelected] =
        useState("");

    useEffect(() => {

        loadQuiz();

    }, []);

    async function loadQuiz() {

        try {

            const res =
                await API.get(
                    `/quiz/${id}`
                );

            setQuiz(
                res.data
            );
            const completed =

JSON.parse(

localStorage.getItem(
"completedQuizzes"
)

||

"[]"

);

if(

completed.includes(id)

){

setFinished(

"completed"

);

}

            localStorage.setItem(

                "recentQuiz",

                JSON.stringify(
                    res.data
                )

            );

        }

        catch (error) {

            console.log(
                error
            );

        }

    }

    async function selectAnswer(answer) {

        setSelected(
            answer
        );

        const q =
            quiz.questions[current];

        if (
            answer === q.correct
        ) {

            setScore(
                (prev) =>
                    prev + 1
            );

        }

        setTimeout(async () => {

            if (

                current + 1

                <

                quiz.questions.length

            ) {

                setCurrent(
                    (prev) =>
                        prev + 1
                );

                setSelected("");

            }

            else {

                const finalScore =

                    Math.round(

                        (

                            score

                            /

                            quiz.questions.length

                        )

                        *

                        100

                    );

                const old =

                    JSON.parse(

                        localStorage.getItem(
                            "scores"
                        )

                        ||

                        "[]"

                    );

                old.push({

                    user:

                        JSON.parse(

                            localStorage.getItem(
                                "user"
                            )

                            ||

                            "{}"

                        ).name

                        ||

                        "Kavi",

                    score:

                        finalScore

                });

                localStorage.setItem(

                    "scores",

                    JSON.stringify(
                        old)

                );

                localStorage.setItem(

                    "badge",

                    badge

                );

                try {

                    await API.post(

                        "/result",

                        {

                            user:

                                JSON.parse(

                                    localStorage.getItem(
                                        "user"
                                    )

                                    ||

                                    "{}"

                                ).name

                                ||

                                "Kavi",

                            quizId:

                                quiz._id,

                            quizTitle:

                                quiz.title,

                            score:

                                finalScore,

                            total:

                                quiz.questions.length

                        }

                    );

                }

                catch (error) {

                    console.log(
                        error
                    );

                }
const completed=

JSON.parse(

localStorage.getItem(
"completedQuizzes"
)

||

"[]"

);

if(

!completed.includes(id)

){

completed.push(id);

}

localStorage.setItem(

"completedQuizzes",

JSON.stringify(
completed)

);

setFinished(true);
              
            }

        }, 700);

    }

    if (
        !quiz ||
        !quiz.questions ||
        quiz.questions.length === 0
    ) {

        return (

            <div className="create-page">

                <h2>

                    Loading Quiz...

                </h2>

            </div>

        );

    }
    const percent =

        quiz

            ?

            Math.round(

                (

                    score

                    /

                    quiz.questions.length

                )

                *

                100

            )

            :

            0;

    let badge =

        "🥉 Beginner";

    if (

        percent >= 100

    )

        badge =

            "🏆 Master";

    else if (

        percent >= 80

    )

        badge =

            "🥇 Expert";

    else if (

        percent >= 60

    )

        badge =

            "🥈 Skilled";
  if(

finished==="completed"

){

return(

<div className="result-page">

<div className="result-card">

<h1>

🔒 Already Completed

</h1>

<p>

You already finished this quiz.

</p>

<button

onClick={()=>

navigate(
"/quizzes"
)

}

>

Explore Other Quizzes

</button>

</div>

</div>

);

}
if(finished){

return(

<div className="result-page">

<Confetti/>

<div className="result-card">

<h1>

🎉 Quiz Completed

</h1>

<h2>

{score}

/

{quiz.questions.length}

</h2>

<div className="circle">

{percent}%

</div>

<h2>

{badge}

</h2>

<button

onClick={()=>

navigate("/quizzes")

}

>

🚀 Explore More Quizzes

</button>

</div>

</div>

);

}

return(

<div className="create-page">

<h1>

{quiz.title}

</h1>

<div className="progress">

<div

className="progress-fill"

style={{

width:

`${((current+1)/quiz.questions.length)*100}%`

}}

>

</div>

</div>

<h2>

Question {current+1}

</h2>

<p>

{quiz.questions[current].question}

</p>

{

quiz.questions[current].options.map(

(op,index)=>(

<button

key={index}

className={

selected===op

?

"selected"

:

""

}

onClick={()=>

selectAnswer(op)

}

>

{op}

</button>

)

)

}

</div>

);

}


export default TakeQuiz;