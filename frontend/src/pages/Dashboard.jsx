import { useEffect, useState } from "react";
import API from "../services/quizService";

function Dashboard() {

    const [stats, setStats] =
        useState({

            total: 0,

            favorites: 0

        });

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const res =

                await API.get(
                    "/quiz"
                );

            const fav =

                JSON.parse(

                    localStorage.getItem(
                        "favorites"
                    )

                    ||

                    "[]"

                );

            setStats({

                total:
                    res.data.length,

                favorites:
                    fav.length

            });

        }

        catch (error) {

            console.log(
                error
            );

        }

    }

    const user =

        JSON.parse(

            localStorage.getItem(
                "user"
            )

            ||

            "{}"

        );

    return (

        <div className="home">

            <h1>

                👤 Welcome

                {

                    user?.name

                    ||

                    "User"

                }

            </h1>

            <div className="cards">

                <div className="card">

                    <h2>

                        📚

                    </h2>

                    <p>

                        Total Quizzes

                    </p>

                    <h1>

                        {

                            stats.total

                        }

                    </h1>

                </div>

                <div className="card">

                    <h2>

                        ❤️

                    </h2>

                    <p>

                        Favorites

                    </p>

                    <h1>

                        {

                            stats.favorites

                        }

                    </h1>

                </div>

                <div className="card">

                    <h2>

                        🏆

                    </h2>

                    <p>

                        Completed

                    </p>

                    <h1>

                        0

                    </h1>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;