function Results() {

    const quiz =

        JSON.parse(
            localStorage.getItem(
                "quizData"
            )
        );

    const answers =

        JSON.parse(
            localStorage.getItem(
                "userAnswers"
            )
        ) || [];

    let score = 0;

    quiz.questions.forEach(
        (q, index) => {

            if (
                answers[index]
                ===
                q.correct
            ) {

                score++;

            }

        }
    );

    return (

        <div
            className="create-page"
        >

            <h1>

                Quiz Result

            </h1>

            <h2>

                Score

            </h2>

            <h1>

                {score}
                /

                {quiz.questions.length}

            </h1>

            <p>

                {
                    score === quiz.questions.length
                        ?

                        "Perfect Score"

                        :

                        score > 0

                            ?

                            "Good Attempt"

                            :

                            "Try Again"

                }

            </p>


        </div>

    );

}

export default Results;