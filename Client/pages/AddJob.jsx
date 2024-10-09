import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



function AddJob(){

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        position: "",
        company: "",
        status: "declined",
        location: "",
        jobType: "part-time"
    });

    const [pending, setPending] = useState(false);
    
    const errorToast = () =>{
        toast.error("Error in adding job")
    };

    const successToast = () =>{
        toast.success("Added job successfully")
    }
    


    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) =>({...prev, [name]: value}));
    }

    const jwtToken = localStorage.getItem("jwt");
  

    const handleSubmit = async (e) =>{
                
                e.preventDefault();

                if(!jwtToken){
                    console.log("Token not provided")
                }

            try{
                setPending(true);
                const response = await axios.post("http://localhost:3000/jobs", formData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`
                    }
                });
    
                if(response.status === 200){
                    console.log("Success in adding job", response.data)
                    setPending(false);
                    successToast();
                    setTimeout(()=> navigate("all-jobs"), 3000);

                 
                }else{
                    errorToast();
                    console.log(response.status);
                }
               
    
            }catch(error){
                setPending(false);
                console.log(error.response ? error.response.data: error.message)
            }
        
    }

  

    return(
        <div className="add-job-container">
        <h2>Add Job</h2>
            <form className="add-job-form" onSubmit={handleSubmit}>
             <div className="job-container">
                <label htmlFor="position">Position:</label>
                <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} required></input>
            </div>
                
            <div className="job-container">
                <label htmlFor="company">Company:</label>
                <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} required></input>
            </div>
                
            <div className="job-container">
            <label htmlFor="status">Staus:</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="pending">pending</option>
                    <option value="interviewed">interviewed</option>
                    <option value="declined">declined</option>
            </select>
            </div>
              
            <div className="job-container"> 
                <label htmlFor="location">Location:</label>
                <input name="location" id="location" value={formData.location} onChange={handleChange} required></input>
            </div>
                
            <div className="job-container">
                <label htmlFor="jobType">Job Type:</label>
                <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange}>
                        <option value="part-time">part-time</option>
                        <option value="full-time">full-time</option>
                        <option value="internship">internship</option>
                    </select>
            </div>
                
                <button type="submit">{pending ? "Submitting...": "Submit"}</button>
            </form>
            <ToastContainer autoClose={3000}/>
        </div>
    )
};

export default AddJob;