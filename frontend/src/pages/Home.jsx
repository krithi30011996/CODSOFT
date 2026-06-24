import { Link } from "react-router-dom";

function Home() {

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

<div className="hero">

<h1>

QuizSphere

</h1>

<p>

Create • Explore • Play • Learn

</p>

</div>

<div className="home-grid">

<Link
to="/create"
className="feature-card"
>

✏️

<h3>

Create Quiz

</h3>

<p>

Build your own quizzes

</p>

</Link>

<Link
to="/quizzes"
className="feature-card"
>

🔍

<h3>

Explore

</h3>

<p>

Find quizzes

</p>

</Link>

<Link
to="/profile"
className="feature-card"
>

👤

<h3>

Profile

</h3>

<p>

View activity

</p>

</Link>

<Link
to="/login"
className="feature-card"
>

🔐

<h3>

Login

</h3>

<p>

Access account

</p>

</Link>

</div>

{

recent && (

<div className="recent">

<h2>

Recent Quiz

</h2>

<p>

{recent.title}

</p>

</div>

)

}

</div>

);

}

export default Home;