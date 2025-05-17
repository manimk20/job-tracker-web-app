import { Link } from "react-router-dom";
import "../navbar/DBNavbar.css";

function DBNavbar() {
    return (
        <nav className="navbar">
            <h1>Job Tracker</h1>
            <ul>
                <li><Link to="/">Logout</Link></li>
            </ul>
        </nav>
    );
}

export default DBNavbar;