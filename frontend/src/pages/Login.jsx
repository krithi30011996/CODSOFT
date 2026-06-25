import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function submit() {
        try {
            const res = await login({ email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.reload();
            alert("Login Success");
            navigate("/");
        }
        catch {
            alert("Login Failed");
        }
    }
    return (
        <div className="create-page">
            <h1>Login</h1>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={submit}>Login</button>
        </div>
    );

}

export default Login;