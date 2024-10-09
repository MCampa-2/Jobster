import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";



function Edit(){

    const {jobId} = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        position: "",
        company: "",
        status: "",
        location: "",
        jobType: ""
    });

    

    const [pending, setPending] = useState(false);
    
    const errorToast = () =>{
        toast.error("Error in adding job")
    };

    const editSuccessToast = () =>{
        toast.success("Edited job successfully")
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
                const response = await axios.patch(`http://localhost:3000/jobs/${jobId}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`
                    }
                });
    
                if(response.status === 200){
                    console.log("Success in adding job", response.data)
                    editSuccessToast();
                    setPending(false);
                    setTimeout(()=> navigate("/dashboard/all-jobs"), 3000);

                 
                }else{
                    errorToast();
                    console.log(response.status);
                }
               
    
            }catch(error){
                setPending(false);
                console.log(error.response ? error.response.data: error.message)
            }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/jobs/${jobId}`,{
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                });
                setFormData({
                    position: res.data.job.position,
                    company: res.data.job.company,
                    status: res.data.job.status,
                    jobType: res.data.job.jobType,
                    location: res.data.job.location
                })
            } catch (error) {
                console.error("Error fetching data:", error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="add-job-container">
        <h2>Edit Job</h2>
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
            <label htmlFor="status">Status:</label>
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

export default Edit;