import axios from "axios";
import { useEffect, useState } from "react";
import { MdPending } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { RiPassExpiredFill } from "react-icons/ri";


function Stats() {
    const jwtToken = localStorage.getItem("jwt");
    const [jobData, setJobData] = useState([]);

    const getStats = async () => {
        try {
            if (!jwtToken) {
                console.log("Token not provided");
                return;
            }
    
            const response = await axios.get("http://localhost:3000/jobs", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
    
            if (response.status === 200) {
                setJobData(response.data.jobs);
            } else {
                console.log("Bad request");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStats();
    }, []);


    const pendingScore = jobData.filter(i => i.status === "pending").length;
    const interviewedScore = jobData.filter(i => i.status === "interviewed").length;
    const declinedScore = jobData.filter(i => i.status === "declined").length;

    const arr = [pendingScore, interviewedScore, declinedScore];



    return (
        <div>
            <div className="stats-container">
                <div className="stats stats-pending">
                    <h2>{jobData.filter(i => i.status === "pending").length}</h2>
                    <MdPending className="stats-icon pending"/>
                    <p>Pending Applications</p>
                </div>
                <div className="stats stats-interviewed">
                    <h2>{jobData.filter(i => i.status === "interviewed").length}</h2>
                    <RiCalendarScheduleFill className="stats-icon interviewed"/>
                    <p>Interviews Scheduled</p>
                </div>
                <div className="stats stats-declined">
                    <h2>{jobData.filter(i => i.status === "declined").length}</h2>
                    <RiPassExpiredFill className="stats-icon declined"/>
                    <p>Jobs Declined</p>
                </div>
            </div>
        </div>
    );
}

export default Stats;
