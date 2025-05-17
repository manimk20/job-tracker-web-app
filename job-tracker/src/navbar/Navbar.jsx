import { Link } from "react-router-dom";
import "../navbar/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h1>Job Tracker</h1>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;