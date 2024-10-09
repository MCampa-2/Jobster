import { useContext } from "react";
import { SideBarContext } from "../Context/useContext";
import logo from "../images/logo.jpg"; 
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
import { ImStatsDots } from "react-icons/im";



function BigSideBar(){

    const {clicked,closeSideBar} = useContext(SideBarContext);

    return(
        <nav className={`big-side-bar ${clicked? "clicked": "" } ${closeSideBar? "closed": ""}`}>
        <img className="big-logo" src={logo} alt="logo"></img>
            <div className="big-link-container">
            <div className="link-container">
            <MdFormatListBulletedAdd className="nav-icon" />
            <Link className="link" to="/dashboard">Add Job</Link>
        </div>
        <div className="link-container">
            <TbListSearch className="nav-icon" />
            <Link className="link" to="/dashboard/all-jobs">All Jobs</Link>
        </div>
        <div className="link-container">
            <ImStatsDots className="nav-icon" />
            <Link className="link" to="/dashboard/stats">Stats</Link>
        </div>
            </div>
        </nav>
    )
};

export default BigSideBar;