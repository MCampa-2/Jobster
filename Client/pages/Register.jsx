import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from '../components/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SideBarContext } from '../Context/useContext';


function Register() {

    const {userName, setUserName} = useContext(SideBarContext);

    const successToast = () =>{
        return toast.success("Success in registering",{autoClose: 2000})
    }

    const errorToast = () =>{
        return toast.error("User already exists", {autoClose: 2000})
    }


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        email: "",
        password: "",        
    });
    const [pending, setPending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        try {
            const response = await axios.post("http://localhost:3000/auth/register", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(response.status === 201){
                console.log("Successfull registration",response)
                
                setPending(true)
                successToast();
                setTimeout(()=> navigate('/'),3000)
            }
            
            

        } catch (error) {
            console.log("Already registered",error.message)
            setPending(false);
            errorToast();
            setFormData({name: "", email: "", password: "", location: ""})
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className="register-title">Register</h1>
                <Form type="text" name="name" labelText="Name" onChange={handleChange} value={formData.name} />
                <Form type="text" name="location" labelText="Location" onChange={handleChange} value={formData.location} />
                <Form type="email" name="email" labelText="Email" onChange={handleChange} value={formData.email} />
                <Form type="password" name="password" labelText="Password" onChange={handleChange} value={formData.password} />
                <div className="submit-container">
                    <button type="submit" className="submit-btn" disabled={pending}>
                        {pending ? "Submitting..." : "Submit"}
                    </button>
                    <span>Already a member? <Link className="login-btn" to="/login">Login</Link></span>
                </div>
            </form>
            
            <ToastContainer/> {/* Ensure ToastContainer is rendered */}
        </div>
    );
}

export default Register;

