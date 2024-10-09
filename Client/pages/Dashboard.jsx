import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import BigSideBar from "../components/BigSideBar";
import SmallSideBar from "../components/SmallSideBar";
import { SideBarContext } from "../Context/useContext";
import { useContext } from "react";


function Dashboard(){

    const {closeSideBar} = useContext(SideBarContext);

    return(
        <div className={`dashboard-container ${closeSideBar? "closed" : ""}`}>
            <BigSideBar />
            <SmallSideBar/>
            <NavBar />
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
    )
};

export default Dashboard;