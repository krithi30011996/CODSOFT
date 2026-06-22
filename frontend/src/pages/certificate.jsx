import { useLocation } from "react-router-dom";

function Certificate() {

    const location =
        useLocation();

    const {

        name,

        score,

        total

    }

        =

        location.state

        ||

        {

            name: "User",

            score: 0,

            total: 0

        };

    return (

        <div
            className="certificate"
        >

            <h1>

                🏆 Certificate

            </h1>

            <h2>

                {name}

            </h2>

            <p>

                Completed Quiz

            </p>

            <h2>

                {score}

                /

                {total}

            </h2>

            <button

                onClick={() =>

                    window.print()

                }

            >

                Download

            </button>

        </div>

    );

}

export default Certificate;