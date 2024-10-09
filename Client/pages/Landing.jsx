import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import job from "../images/jobtracking.jpeg";

function Landing(){
    return(
        <div className="landing-container">
            <nav className="navbar">
            <img src={logo} alt="logo"></img>
            <h2>Jobster</h2>
        </nav>
        <div className="landing-display">
            <h1>Job Tracking App</h1>
            <div className="button-container">
                <Link className="login" to="/login">Login</Link>
                <Link className="register" to="/register">Register</Link> 
            </div>
            <img src={job} alt="job-search"></img>
        </div>
    </div>
    )
};

export default Landing;