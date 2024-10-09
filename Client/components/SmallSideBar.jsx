import { useContext } from "react";
import { SideBarContext } from "../Context/useContext";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
import { ImStatsDots } from "react-icons/im";








function SmallSideBar(){

    const {clicked, setClicked} = useContext(SideBarContext);

    const closeSmallSideBar = () =>{
        setClicked(!clicked);
    }

    return(
        <div className={`small-side-bar ${clicked ? "clicked" : " " }`}>
            <div className="side-bar">
                <button className="close-small-side-bar" onClick={closeSmallSideBar}>X</button>
                <div className="small-link-container">
                    <img src={logo} alt="logo" style={{width: "100px", height: "100px", borderRadius: "10px"}}></img>
                    <div className="link-container">
                        <MdFormatListBulletedAdd className="nav-icon" />
                        <Link className="link" to="/dashboard" onClick={closeSmallSideBar}>Add Job</Link>
                    </div>
                    <div className="link-container">
                        <TbListSearch className="nav-icon" />
                        <Link className="link" to="/dashboard/all-jobs" onClick={closeSmallSideBar}>All Jobs</Link>
                    </div>
                    <div className="link-container">
                        <ImStatsDots className="nav-icon" />
                        <Link className="link" to="/dashboard/stats" onClick={closeSmallSideBar}>Stats</Link>
                    </div>
                    
                </div>
            </div>

        </div>
    )
};

export default SmallSideBar;