import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    async function submit() {
        try {
            await register({
                name,
                email,
                password
            });
            alert("Registered Successfully");
            navigate("/login");
        }
        catch(error) {
            alert(error.message);
        }
    }
    return (
        <div className="create-page">
            <h1>Register</h1>
            <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button onClick={submit}>Register</button>
        </div>
    );

}

export default Register;