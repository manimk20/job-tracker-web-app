import Navbar from "../src/navbar/Navbar.jsx";
import "../src/Home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Navbar />
            <section className="home-hero">
                <h1>Track All your Job Applications in One Place.<br />
                    Stay Organized, Focused, and on Top of your Job Hunt.
                </h1>
                <Link className="login" to="/login">Get Started</Link>
            </section>
        </>
        
    );
}

export default Home;