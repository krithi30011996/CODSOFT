import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/quizService";
import toast from "react-hot-toast";

function QuizList() {

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Newest");

    const [page, setPage] = useState(1);

    const [preview, setPreview] = useState(null);

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites") || "[]"));

    const perPage = 6;

    const navigate =
        useNavigate();

    useEffect(() => {

        fetchQuiz();

    }, []);

    useEffect(() => {

        setPage(1);

    }, [search, filter, sort]);

    async function fetchQuiz() {

        try {

            setLoading(true);

            setError("");

            const res = await API.get(
                "/quiz"
            );

            setQuizzes(
                res.data
            );

        }

        catch (error) {

            setError(
                "Unable to load quizzes"
            );

            console.log(
                error
            );

        }

        finally {

            setLoading(
                false
            );

        }

    }

    function toggleFavorite(id) {

        let favorites =

            JSON.parse(

                localStorage.getItem(
                    "favorites"
                )

                ||

                "[]"

            );

        if (

            favorites.includes(id)

        ) {

            favorites =

                favorites.filter(

                    item =>

                        item !== id

                );

        }

        else {

            favorites.push(id);

        }

        localStorage.setItem(

            "favorites",

            JSON.stringify(

                [

                    ...new Set(
                        favorites
                    )

                ]

            )

        );

        window.dispatchEvent(

            new Event(
                "storage"
            )

        );

    }

    async function deleteQuiz(id) {

        try {

            await API.delete(
                `/quiz/${id}`
            );

            fetchQuiz();

        }

        catch (error) {

            console.log(error);

        }

    }

    async function editQuiz(quiz) {

        const newTitle =

            prompt(
                "New title",
                quiz.title
            );

        if (!newTitle)
            return;

        try {

            await API.put(

                `/quiz/${quiz._id}`,

                {
                    ...quiz,
                    title: newTitle
                }

            );

            fetchQuiz();

        }

        catch (error) {

            console.log(error);

        }

    }

    const filtered =

        [...quizzes]

            .filter(

                (quiz) =>

                    (quiz.title || "")

                        .toLowerCase()

                        .includes(

                            search.toLowerCase()

                        )

                    &&

                    (

                        filter === "All"

                        ||

                        quiz.category === filter

                    )

            )

            .sort((a, b) => {

                if (sort === "Most Questions") {

                    return (

                        (b.questions?.length || 0)

                        -

                        (a.questions?.length || 0)

                    );

                }

                return 0;

            });

    const totalPages =

        Math.max(

            1,

            Math.ceil(

                filtered.length

                /

                perPage

            )

        );

    const totalQuestions = quizzes.reduce(

        (total, quiz) =>

            total +

            (

                quiz.questions?.length

                ||

                0

            ),

        0

    );

    const savedCount =

        favorites.length;

    const visible =

        filtered.slice(

            (page - 1) * perPage,

            page * perPage

        );

    return (

        <div className="home">

            <h1>

                Explore Quizzes

            </h1>

            <div className="dashboard">

                <div className="dash-card">

                    <h2>

                        {quizzes.length}

                    </h2>

                    <p>

                        Quizzes

                    </p>

                </div>

                <div className="dash-card">

                    <h2>

                        {totalQuestions}

                    </h2>

                    <p>

                        Questions

                    </p>

                </div>

                <div className="dash-card">

                    <h2>

                        ❤️ {savedCount}

                    </h2>

                    <p>

                        Saved

                    </p>

                </div>

            </div>
            <input

                className="search"

                placeholder="Search quiz"

                value={search}

                onChange={(e) =>

                    setSearch(
                        e.target.value
                    )

                }

            />

            <div className="filters">

                <button onClick={() => setFilter("All")}>

                    All

                </button>

                <button onClick={() => setFilter("Programming")}>

                    Programming

                </button>

                <button onClick={() => setFilter("Science")}>

                    Science

                </button>

                <button onClick={() => setFilter("Education")}>

                    Education

                </button>

            </div>

            <select

                value={sort}

                onChange={(e) =>

                    setSort(
                        e.target.value
                    )

                }

            >

                <option>

                    Newest

                </option>

                <option>

                    Oldest

                </option>

                <option>

                    Most Questions

                </option>

            </select>

            {
                error

                    ?

                    <div className="error-box">

                        <h2>

                            ⚠️ Something went wrong

                        </h2>

                        <p>

                            {error}

                        </p>

                        <button

                            onClick={fetchQuiz}

                        >

                            Retry

                        </button>

                    </div>

                    :

                    loading

                        ?

                        <div className="loading">
                            {

                                [1, 2, 3, 4, 5, 6]

                                    .map(

                                        (item) => (

                                            <div
                                                key={item}
                                                className="skeleton"
                                            />

                                        )

                                    )

                            }


                            <div className="skeleton"></div>

                            <div className="skeleton"></div>

                            <div className="skeleton"></div>

                        </div>

                        :

                        filtered.length === 0

                            ?

                            <div className="empty">

                                <h2>

                                    🔍 No Quizzes Found

                                </h2>

                                <p>

                                    Try another search
                                    or create one.

                                </p>

                                <button

                                    onClick={() =>

                                        navigate(
                                            "/create"
                                        )

                                    }

                                >

                                    Create Quiz

                                </button>

                            </div>

                            :

                            <>

                                {
                                    visible.map((quiz) => (

                                        <div
                                            className="card"
                                            key={quiz._id}
                                        >

                                            {quiz.thumbnail && (
                                                <img
                                                    src={quiz.thumbnail}
                                                    alt={quiz.title}
                                                />
                                            )}

                                            <div className="card-top">

                                                <h2>
                                                    {quiz.title}
                                                </h2>

                                                <button
                                                    type="button"
                                                    className={
                                                        favorites.includes(quiz._id)
                                                            ? "heart active"
                                                            : "heart"
                                                    }
                                                    onClick={(e) => {

                                                        e.preventDefault();

                                                        e.stopPropagation();

                                                        toggleFavorite(
                                                            quiz._id
                                                        );

                                                    }}
                                                >

                                                    {

                                                        favorites.includes(
                                                            quiz._id
                                                        )

                                                            ?

                                                            "❤️"

                                                            :

                                                            "🤍"

                                                    }

                                                </button>

                                            </div>

                                            <p>
                                                {quiz.questions?.length || 0}
                                                Questions
                                            </p>

                                            <div className="action-buttons">

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        navigate(`/quiz/${quiz._id}`);
                                                    }}
                                                >
                                                    Open
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        editQuiz(quiz);
                                                    }}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        await deleteQuiz(quiz._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    ))
                                }
                                <div className="pagination">

                                    <button

                                        disabled={page === 1}

                                        onClick={() =>

                                            setPage(
                                                page - 1
                                            )

                                        }

                                    >

                                        ←

                                    </button>

                                    <span>

                                        Page

                                        {page}

                                        /

                                        {totalPages}

                                    </span>

                                    <button

                                        disabled={page === totalPages}

                                        onClick={() =>

                                            setPage(
                                                page + 1
                                            )

                                        }

                                    >

                                        →

                                    </button>

                                </div>

                            </>

            }
            {

                preview

                &&

                <div
                    className="modal"
                >

                    <div
                        className="modal-box"
                    >

                        <h1>

                            {preview.title}

                        </h1>

                        <p>

                            Category:

                            {

                                preview.category

                                ||

                                "General"

                            }

                        </p>

                        <p>

                            Questions:

                            {

                                preview.questions?.length

                                ||

                                0

                            }

                        </p>

                        <div
                            className="buttons"
                        >

                            <button

                                onClick={() =>

                                    navigate(

                                        `/quiz/${preview._id}`

                                    )

                                }

                            >

                                Start Quiz

                            </button>

                            <button

                                onClick={() =>

                                    setPreview(
                                        null
                                    )

                                }

                            >

                                Close

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}

export default QuizList;