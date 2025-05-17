import DBNavbar from "../src/navbar/DBNavbar.jsx";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { fetchJobs, addJob, updateJob, deleteJob } from "../src/api/jobApi.js";

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowform] = useState(false);
    const [formData, setFormData] = useState({ company: "", role: "", status: "Applied" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const loadJobs = async () => {
            const data = await fetchJobs();
            console.log("fetchJobs returned:", data);
            console.log("typeof data.jobs:", typeof data.jobs);
            console.log("data.jobs isArray:", Array.isArray(data.jobs));
            console.log("data.jobs content:", data.jobs)

            setJobs(Array.isArray(data.jobs) ? data.jobs : []);
        };
        loadJobs();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value});
    };

    const toggleForm = () => setShowform(!showForm);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.company || !formData.role) { 
            alert("Company and Role are required.")
            return;
        }
        
        try {
            if (editId) {
                const updated = await updateJob(editId, formData);
                if (!updated || !updated.job || !updated.job.id) {
                    console.error("Invalid response from updateJob:", updated);
                    return;
                }
                setJobs(jobs.map(job => job.id === editId ? updated.job : job));
                setEditId(null);
            } else {
                const newJob = await addJob(formData);
                if (!newJob || !newJob.job || !newJob.job.id) {
                    console.error("New job returned invalid structure:", newJob);
                    return;
                }
                setJobs([newJob.job, ...jobs]);
            }
            setFormData({ company: "", role: "", status: "Applied" });
            setShowform(false);
        } catch (err) {
            console.error("Error saving job:", err);
        } 
        
    };
    
    const handleEdit = (id) => {
        const selectedJob =jobs.find(j => j.id === id);
        if (!selectedJob) {
            console.error("Job not found with id:", id)
            return;
        }
        setFormData({ 
            company: selectedJob.company,
            role: selectedJob.role, status:
            selectedJob.status })
        setEditId(id);
        setShowform(true);
    };
    
    const handleDelete = async (jobId) => {
        try {
            await deleteJob(jobId);
            setJobs(jobs.filter(job => job.id !== jobId));
        } catch (err) {
            console.error("Error deleting job:", err);
        }
    };

    const clearJobs = () => {
        setJobs([]);
    };

    return (
        <>
            <DBNavbar />
            <div className="container">
                <div className="sidebar">
                    <h3>Recently added</h3>
                    <ul>
                        {jobs.map((job, i) => 
                            job ? (
                            <li key={job.id || i}>{job.company}</li>
                        ) : null
                    )}
                    </ul>
                    {jobs.length === 0 && <p>No jobs to show</p>}
                    <button id="clearBtn" onClick={clearJobs}>Clear all</button>
                </div>
                <div className="main">
                    <button onClick={toggleForm}>{showForm ? "Close" : "+Add Job"}</button>
                    {showForm && (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="company"
                                placeholder="Company name"
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                id="role"
                                placeholder="Role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required 
                            />
                            <select id="status" value={formData.status} onChange={handleInputChange}>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Selected">Selected</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    <div id="jobCards">
                        {jobs.map((job,i) => 
                            job ? (
                                <div className="job-card" key={job.id || i}>
                                    <strong>{job.role}</strong> at {job.company} <br />
                                    Status: {job.status} <br />
                                    <small>Date: {job.created_at ? new Date(job.created_at).toDateString() : "N/A"}</small> <br />
                                    <button className="job-btn" onClick={() => handleEdit(job.id)}>Edit</button>
                                    <button className="job-btn1" onClick={() => handleDelete(job.id)}>Delete</button>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;