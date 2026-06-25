import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const [user,setUser]=

useState(

JSON.parse(

localStorage.getItem(
"user"
)

||

"null"

)

);

useEffect(()=>{

setUser(

JSON.parse(

localStorage.getItem(
"user"
)

||

"null"

)

);

},[]);
   

    const [dark, setDark] =

        useState(

            localStorage.getItem(
                "dark"
            )

            ===

            "true"

        );

    useEffect(() => {

        if (dark) {

            document.body.classList.add(
                "dark"
            );

        }

        else {

            document.body.classList.remove(
                "dark"
            );

        }

        localStorage.setItem(

            "dark",

            dark

        );

    }, [dark]);

    return (

        <nav className="navbar">

            <h2>

                QuizSphere

            </h2>

            <div className="links">

                <Link to="/">

                    Home

                </Link>

                <Link to="/quizzes">

                    Explore

                </Link>

                <Link to="/create">

                    Create

                </Link>

                {

user

?

(

<Link to="/profile">

👤 Profile

</Link>

)

:

(

<Link to="/register">

Register

</Link>

)

}

              


                <Link to="/favorites">

                    ❤️ Favorites

                </Link>
               

                <button

                    className="theme"

                    onClick={() =>

                        setDark(

                            !dark

                        )

                    }

                >

                    {

                        dark

                            ?

                            "☀️"

                            :

                            "🌙"

                    }

                </button>

            </div>

        </nav>

    );

}

export default Navbar;