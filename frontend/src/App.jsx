import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import QuizList from "./pages/QuizList";
import TakeQuiz from "./pages/TakeQuiz";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import Certificate from "./pages/certificate";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/create" element={<CreateQuiz />} />

                <Route path="/quizzes" element={<QuizList />} />

                <Route
                    path="/quiz/:id"
                    element={<TakeQuiz />}
                />

                <Route path="/result" element={<Results />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/leaderboard" element={<Leaderboard />} />

                <Route

                    path="/certificate"

                    element={
                        <Certificate />
                    }

                />
                <Route

                    path="/favorites"

                    element={<Favorites />}

                />
                <Route

                    path="/dashboard"

                    element={<Dashboard />}

                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />



            </Routes>
        </BrowserRouter>
    );
}

export default App;