import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/quizService";

function Favorites() {

    const [quizzes, setQuizzes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        loadFavorites();
        window.addEventListener("storage", loadFavorites);
        return () => {
            window.removeEventListener("storage", loadFavorites);
        }

    }, []);

    async function loadFavorites() {

        try {

            const res =

                await API.get(
                    "/quiz"
                );

           const user =

JSON.parse(

localStorage.getItem(
"user"
)

);

const favorites =

JSON.parse(

localStorage.getItem(

`favorites_${user?.email}`

)

||

"[]"

);

            const unique =

                [

                    ...new Set(
                        favorites
                    )

                ];

            setQuizzes(

                res.data.filter(

                    quiz =>

                        unique.includes(
                            quiz._id
                        )

                )

            );

        }

        catch (error) {

            console.log(
                error
            );

        }

    }

    return (

        <div className="home">

            <h1>

                ❤️ Favorite Quizzes

            </h1>

            {

                quizzes.length === 0

                    ?

                    <div className="empty">

                        <h2>

                            No favorites yet

                        </h2>

                    </div>

                    :

                    <div className="cards">

                        {

                            quizzes.map((quiz) => (

                                <div

                                    className="card"

                                    key={quiz._id}

                                    onClick={() =>

                                        navigate(

                                            `/quiz/${quiz._id}`

                                        )

                                    }

                                    style={{

                                        cursor: "pointer"

                                    }}

                                >

                                    <h2>

                                        {quiz.title}

                                    </h2>

                                    <p>

                                        {

                                            quiz.questions?.length

                                            ||

                                            0

                                        }

                                        Questions

                                    </p>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default Favorites;