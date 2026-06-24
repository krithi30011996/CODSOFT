import { useNavigate } from "react-router-dom";

function Home() {

    const navigate =
        useNavigate();
   




    const recent =

        JSON.parse(

            localStorage.getItem(
                "recentQuiz"
            )

            ||

            "null"

        );
 return(
    <div className="feature-grid">

<Link
to="/create"
className="feature-card"
>

<div className="card-icon">

🧠

</div>

<h2>

Create

</h2>

<p>

Build custom quizzes instantly

</p>

</Link>

<Link
to="/quizzes"
className="feature-card"
>

<div className="card-icon">

🌍

</div>

<h2>

Explore

</h2>

<p>

Play quizzes from everyone

</p>

</Link>

<div className="feature-card">

<div className="card-icon">

🏆

</div>

<h2>

Compete

</h2>

<p>

Track your scores and progress

</p>

</div>

<Link
to="/profile"
className="feature-card"
>

<div className="card-icon">

👤

</div>

<h2>

Profile

</h2>

<p>

View your profile and activity

</p>

</Link>

</div>
 )


  
}

export default Home;