import { useState } from "react";
import * as reactRouterDom from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import "../auth/Signup.css";
import { signupUser } from "../auth/services/auth.js";

function Signup() {
    const navigate = reactRouterDom.useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        const response = await signupUser({ name, email, password });

        if (response.token) {
            localStorage.setItem("token", response.token);
            navigate("/dashboard");
        } else {
            setError(response.message || "Signup failed");
        }

    };


    return (
        <>
        <Navbar />
        <section className="auth-section">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}

                <label htmlFor="name">full name</label>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="pword">password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">Sign Up</button>
            </form>
            <p>Already have an account? <reactRouterDom.Link to="/login">Login</reactRouterDom.Link></p>
        </section>
        </>
    );
}

export default Signup;