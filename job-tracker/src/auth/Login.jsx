import { useState } from "react"
import * as reactRouterDom from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import "../auth/Login.css";
import { loginUser } from "../auth/services/auth.js";

function Login() {
        const navigate = reactRouterDom.useNavigate();
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const [error, setError] = useState();

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!email || !password) {
                setError("Please fill in all fields");
                return;
            }

            const response = await loginUser({ email, password });

            if(response.token) {
                localStorage.setItem("token", response.token);
                navigate("/dashboard");
            } else {
                setError(response.message || "Login failed");
            }
        };

    return (
        <>
        <Navbar />
        <section className="auth-section">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}

                <label htmlFor="email">Email id</label>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />

                <label htmlFor="pword">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>
                    <input type="checkbox" name="remember" />Remember me  
                </label>

                <button type="submit" className="btn">Login</button>
            </form>
            <p>Don't have an account? <reactRouterDom.Link to="/signup">Sign up</reactRouterDom.Link></p>
        </section>
        </>
    );
}

export default Login;