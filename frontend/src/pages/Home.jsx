import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="home">

            <div className="hero">

                <p className="hero-sub">

                    Build • Share • Play

                </p>

                <div className="hero-buttons">

                    <Link to="/create">

                        <button>

                            Start Creating

                        </button>

                    </Link>

                    <Link to="/quizzes">

                        <button className="secondary">

                            Explore

                        </button>

                    </Link>

                </div>

            </div>

            <div className="feature-grid">

                <Link to="/create" className="feature-card">

                    <div>🧠</div>

                    <h2>Create</h2>

                    <p>

                        Build custom quizzes instantly

                    </p>

                </Link>

                <Link to="/quizzes" className="feature-card">

                    <div>🌍</div>

                    <h2>Explore</h2>

                    <p>

                        Play quizzes from everyone

                    </p>

                </Link>

                <div className="feature-card">

                    <div>🏆</div>

                    <h2>Compete</h2>

                    <p>

                        Track your scores

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Home;