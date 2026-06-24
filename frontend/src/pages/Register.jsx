import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    async function submit() {

        try {

            console.log(form);

            await register(form);

            navigate("/login");

        }

        catch (error) {

            console.log(error);

        }

    }


    return (

        <div className="create-page">

            <h1>

                Register

            </h1>

            <input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>

                    setForm({
                        ...form,
                        name: e.target.value
                    })

                }
            />

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>

                    setForm({
                        ...form,
                        email: e.target.value
                    })

                }
            />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>

                    setForm({
                        ...form,
                        password: e.target.value
                    })

                }
            />

            <button onClick={submit}>

                Register

            </button>

        </div>

    );

}

export default Register;