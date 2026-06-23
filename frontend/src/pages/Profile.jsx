import "../styles/profile.css";
import { useEffect, useState } from "react";

function Profile() {

    const [user, setUser] =
        useState({});

    const [favorites, setFavorites] =
        useState(0);

    const [played, setPlayed] =
        useState(0);

    const [badge, setBadge] =
        useState("🥉 Beginner");

    useEffect(() => {

        loadProfile();

    }, []);

    function loadProfile() {

        const currentUser =

            JSON.parse(

                localStorage.getItem(
                    "user"
                )

                ||

                "{}"

            );

        setUser(
            currentUser
        );

        setFavorites(

            JSON.parse(

                localStorage.getItem(
                    "favorites"
                )

                ||

                "[]"

            ).length

        );

        setPlayed(

            JSON.parse(

                localStorage.getItem(
                    "scores"
                )

                ||

                "[]"

            ).length

        );

        setBadge(

            localStorage.getItem(
                "badge"
            )

            ||

            "🥉 Beginner"

        );

    }

    return (

        <div className="profile">

            <div className="profile-header">

                <div className="profile-icon">

                    💎

                </div>

                <div>


                    <h1>

                        {

                            user?.name

                                ?

                                `👋 ${user.name}`

                                :

                                "Guest"

                        }

                    </h1>

                    <p>

                        {

                            user?.email

                            ||

                            "Register and Login"

                        }

                    </p>


                </div>

            </div>

            <div className="profile-grid">

                <div className="mini-card">

                    🏆

                    <h3>

                        {badge}

                    </h3>

                    <span>

                        Badge

                    </span>

                </div>

                <div className="mini-card">

                    ❤️

                    <h3>

                        {favorites}

                    </h3>

                    <span>

                        Favorites

                    </span>

                </div>

                <div className="mini-card">

                    📚

                    <h3>

                        {played}

                    </h3>

                    <span>

                        Played

                    </span>

                </div>

            </div>

        </div>

    );

}

export default Profile;