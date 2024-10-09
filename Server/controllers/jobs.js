import Job from "../Schema/jobs.js";

export const getAllJobs = async (req, res) => {
    try {
        const userId = req.userId;
        const queryObj = { userId };

        const { status, jobType, search, sort } = req.query;

        if (status) {
            queryObj.status = status;
        }
        if (jobType) {
            queryObj.jobType = jobType;
        }

        if (search) {
            queryObj.$or = [
                { company: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }
        
        let sortObj = {};

        switch(sort){
            case "newest":
                sortObj = {createdAt: 1};
                break;
            case "oldest":
                sortObj = {createdAt: -1};
                break;
            case "a-z":
                sortObj = {company: 1};
                break;
            case "z-a":
                sortObj = {company: -1};
                break;
            default:
                sortObj = {createdAt: -1}
        };

        // Find jobs with the constructed query object and sorting
        const jobs = await Job.find(queryObj).sort(sortObj);

        if (jobs.length === 0) {
            return res.status(404).json({jobs: []});
        }
        res.status(200).json({ msg: "Success in getting all jobs status is 200", jobs, });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ msg: error.message });
    }
};


export const getJob = async (req, res) => {
    try {
       

        const userId = req.userId;
        const jobId = req.params.id; // Ensure this matches your client request

    
        const job = await Job.findById(jobId);
        
        if (!job) {
            return res.status(404).json({ msg: "Job not found" });
        }
       
        if (userId.toString() !== job.userId.toString()) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        res.status(200).json({ msg: "Success in getting job", job });
    } catch (error) {
        console.error("Server Error:", error); // Log server errors
        res.status(500).json({ msg: "Server error" });
    }
};



export const createJob = async (req,res) =>{

    const {company,position,location,status,jobType} = req.body;
    try{
        const job = await Job.create({company,position,location,status,jobType, userId: req.userId});
        await job.save();
        
        console.log(job._id);
        res.status(200).json({msg: "Success in creating job",job});

    }catch(error){
        console.log(error)
        res.status(500).json({msg: error.message});
    }
}

export const updateJob = async (req,res) =>{
    try{
        const jobId = req.params.id;
        const userId = req.userId;
        const job = await Job.findByIdAndUpdate(jobId, req.body, {new:true});
        if(!job){  
            res.status(404).json({msg: "Cannot find job to update"});
        }
        if(userId.toString() !== job.userId.toString()){
            res.status(401).json({msg: "Unacthorized"});
        }
        res.status(200).json({msg: "Success in updating job", job})

    }catch(error){
        res.status(500).json({msg: error});
    }
}


export const deleteJob = async (req, res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.id;

        // Step 1: Find the job
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ msg: "Job not found to delete" });
        }

        // Step 2: Check if the user is authorized
        if (userId.toString() !== job.userId.toString()) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Step 3: Delete the job
        const result = await Job.findByIdAndDelete(jobId);

        // Check if the deletion was successful
        if (!result) {
            return res.status(404).json({ msg: "Failed to delete the job" });
        }

        // Step 4: Respond with success
        res.status(200).json({ msg: "Content has been removed" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};




