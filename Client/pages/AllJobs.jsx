import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../images/logo.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AllJobs() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [messageError, setMessageError] = useState("");
    const [formData, setFormData] = useState({
        sort: "",
        status: "",
        jobType: "",
        search: ""
    });

    const editSuccessToast = () => toast.success("Edited job successfully");
    const deletedSuccessToast = () => toast.success("Deleted job successfully");
    const errorToast = () => toast.error("Error in adding job");

    const token = localStorage.getItem("jwt");

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getJobs = async () => {
        try {
            const searchParams = new URLSearchParams(formData).toString();
            const response = await axios.get(`http://localhost:3000/jobs?${searchParams}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log("Success in getting all jobs");
                setJobs(response.data.jobs);
                
            }
            
        } catch (error) {
            if(error.message === "Request failed with status code 404"){
                setMessageError("No jobs to display")
            }
           
        }
    };

    useEffect(() => {
        getJobs();
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        getJobs();
    };

    const resetSearch = () => {
        setFormData({
            sort: "",
            status: "",
            jobType: "",
            search: ""
        });
    };

    const editJob = (id) => {
        editSuccessToast();
        navigate(`/dashboard/edit/${id}`);
    };

    const deleteJob = async (jobId) => {
        try {
            const jwtToken = localStorage.getItem("jwt");
            if (!jwtToken) {
                console.log("Token not provided");
            }
            const response = await axios.delete(`http://localhost:3000/jobs/${jobId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            if (!response) {
                errorToast();
                console.log("Could not delete job");
            }
            deletedSuccessToast();
            setTimeout(() => window.location.reload(), 3000);
        } catch (error) {
            console.log(error, error.message);
            
        }
    };

    return (
        <div>
            <div className="add-job-container">
                <h2>All Jobs</h2>
                <form className="add-job-form" onSubmit={handleSubmit}>
                    <div className="job-container">
                        <label htmlFor="search">Search:</label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={formData.search.toLowerCase()}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="job-container">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="declined">Declined</option>
                        </select>
                    </div>

                    <div className="job-container">
                        <label htmlFor="jobType">Job Type:</label>
                        <select
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                            <option value="part-time">Part-time</option>
                            <option value="full-time">Full-time</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>

                    <div className="job-container">
                        <label htmlFor="sort">Sort</label>
                        <select
                            id="sort"
                            name="sort"
                            value={formData.sort}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                    </div>
                    <button type="submit" onClick={resetSearch}>Reset Search Values</button>
                </form>
            </div>

            <h1 className="no-jobs-message" style={{textAlign: "center", fontSize: "2rem", margin: "20px", color: "rgb(60, 60, 60)"}}>{messageError}</h1>
            <div className="all-jobs-container">
                
                    {jobs.map((job) => {

                        const { company, position, jobType, status, location, _id, createdAt } = job;
                        const t = new Date(createdAt);
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const name = month[t.getMonth()];
                        const day = t.getDate();
                        const fullyear = t.getFullYear();
                        const timeCreated = `${name} ${day}, ${fullyear}`;
                        
                        return (
                            <div key={_id} className="job">
                                <div className="job-title-container">
                                    <img src={logo} alt="logo" />
                                    <div className="job-title">
                                        <p>{position}</p>
                                        <p className="company">{company}</p>
                                    </div>
                                </div>
                                <div className="job-details">
                                    <p className="location">{location}</p>
                                    <p className="time-created">{timeCreated}</p>
                                    <p className="jobtype">{jobType}</p>
                                    <p className="status">{status}</p>
                                </div>
                                <div className="update-job">
                                    <button onClick={() => editJob(_id)} className="edit-btn">Edit</button>
                                    <button onClick={() => deleteJob(_id)} className="delete-btn">Delete</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <ToastContainer autoClose={3000} />
        </div>
    );
}

export default AllJobs;
