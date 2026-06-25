import { useNavigate } from "react-router-dom";

function Home() {

    const navigate =
        useNavigate();
    function logout() {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate(
            "/login"
        );

    }




    const recent =

        JSON.parse(

            localStorage.getItem(
                "recentQuiz"
            )

            ||

            "null"

        );



    return (



        <div className="home">
            

            <section className="hero">

                <h1>

                    Create Amazing Quizzes 🚀

                </h1>

                <p>

                    Build • Share • Play

                </p>

                <div className="hero-buttons">

                    <button
                        className="primary"

                        onClick={() =>

                            navigate(
                                "/create"
                            )

                        }

                    >

                        Start Creating

                    </button>

                    <button
                        className="secondary"

                        onClick={() =>

                            navigate(
                                "/quizzes"
                            )

                        }

                    >

                        Explore

                    </button>

                </div>

            </section>

            <div className="home-grid">

                <div
                    className="home-box"
                    onClick={() =>
                        navigate("/create")
                    }
                >

                    <h2>

                        ✏️

                    </h2>

                    <h3>

                        Create

                    </h3>

                    <p>

                        Build quizzes

                    </p>

                </div>

                <div
                    className="home-box"
                    onClick={() =>
                        navigate("/quizzes")
                    }
                >

                    <h2>

                        🌍

                    </h2>

                    <h3>

                        Explore

                    </h3>

                    <p>

                        Play quizzes

                    </p>

                </div>

                <div
                    className="home-box"
                    onClick={() =>
                        navigate("/leaderboard")
                    }
                >

                    <h2>

                        🏆

                    </h2>

                    <h3>

                        Leaderboard

                    </h3>

                    <p>

                        View rankings

                    </p>

                </div>

                <div
                    className="home-box"
                    onClick={() =>
                        navigate("/favorites")
                    }
                >

                    <h2>

                        ❤️

                    </h2>

                    <h3>

                        Favorites

                    </h3>

                    <p>

                        Saved quizzes

                    </p>

                </div>

            </div>
            {

                recent

                &&

                <div className="recent">

                    <h2>

                        Continue Playing

                    </h2>

                    <div className="recent-card">

                        <img

                            src={

                                recent.thumbnail

                                ||

                                "https://placehold.co/600x300"

                            }

                            alt="quiz"

                        />

                        <div>

                            <h3>

                                {recent.title}

                            </h3>

                            <p>

                                {recent.questions?.length}

                                Questions

                            </p>

                            <button

                                onClick={() =>

                                    navigate(

                                        `/quiz/${recent._id}`

                                    )

                                }

                            >

                                Resume

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}

export default Home;