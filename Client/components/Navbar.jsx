import { useContext, useState } from "react";
import { SideBarContext } from "../Context/useContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoPersonCircleSharp } from "react-icons/io5";




function NavBar(){
    const {clicked, setClicked, setSideBar,closeSideBar} = useContext(SideBarContext);  
    const [logout, setLogout] = useState(false);
    
   const userName = localStorage.getItem("user");
   const navigate = useNavigate();
   
    
    const successToast = () =>{
        toast.success("User logged out successfully")
    }

    const errorToast = () =>{
        toast.error("Could not log out user")
    }

    const openSmallSideBar = () =>{
        setClicked(!clicked);
        console.log("its working")
    };

    const closeBigSideBar = () =>{
        setSideBar(!closeSideBar);
    }

    const logOutOfApp = () =>{
        setLogout(!logout);
    }

    const logOutUser = async () =>{
        try{
            console.log("Success in loggin out")
           localStorage.removeItem("jwt");
           localStorage.removeItem("user")
           toast.dismiss();
            successToast();
            setTimeout(() => navigate("/"),3000)

        }catch(error){
            console.log(error.message)
            errorToast();
        }
    }

   

    return(
        <nav className="navbar-container">
            <RxHamburgerMenu onClick={closeBigSideBar} className="hamburger"/>
            <button className="small-side-bar-button" onClick={openSmallSideBar}><RxHamburgerMenu /></button>
            <h2 className="dashboard-title">Dashboard</h2>
            <img className="logo-nav" src={logo} alt="logo"></img>
            <div className="logout-container">
                <div className="logout" onClick={logOutOfApp}>
                    <IoPersonCircleSharp style={{color: "red"}}/>
                    <p className="logout-text">{userName? userName: "Sign-In"}</p>
                    <IoMdArrowDropdown className="logout-text"/>                
                </div>
                <button className={`logout-button ${logout? "leave"  : " "}`} onClick={logOutUser}>Logout</button>
            </div>
            <ToastContainer autoClose={3000} />
        </nav>
    )
};

export default NavBar;