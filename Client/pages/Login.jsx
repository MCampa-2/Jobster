import { Link, useNavigate} from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";




function Login(){
    const navigate = useNavigate();
    
    const [pending, setPending] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const errorToast = () =>{
       toast.error("User is not registered")
    };

    const successToast = () =>{
        toast.success("Successfully logged in")
    }

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev)=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) =>{
        setPending(true);
      try{
        e.preventDefault();
        const response = await axios.post("http://localhost:3000/auth/login", formData,{
            headers: {
                "Content-Type": "application/json"
            }
        });

       
        const {token} = response.data;
        const personLoggedIn = response.data.user.name;


        localStorage.setItem("jwt", token);
        setPending(true);

        if(response.status === 200){
            console.log("Successfull login");
            localStorage.setItem("jwt",token);
            localStorage.setItem("user",personLoggedIn)
            setPending(false);
            successToast();
            setTimeout(()=> navigate("/dashboard"),3000)
        }
        
      }catch(error){
        setPending(false);
        errorToast();
        localStorage.removeItem("jwt");
        console.log(error, error.message);
      }finally {
        setPending(false); // Reset pending state
        setFormData({
            email: "",
            password: ""
        }); // Reset form data
    }
        
    }

   

    return(
        <form method="POST" onSubmit={handleSubmit}>
            <h1 className="login-title">Login</h1>
            <Form type="email" name="email" labelText="Email" onChange={handleChange}/>
            <Form type="password" name="password" labelText="Password" onChange={handleChange}/>
            <div className="submit-container">
            <button type="submit" className="submit-btn">{pending ? "Submitting....": "Submit"}</button>
            <Link className="register-btn" to="/register">Register</Link>
            </div>
            <ToastContainer autoClose={2000}/>
        </form>
    )
};

export default Login;