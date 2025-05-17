const BASE_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

export const handleResponse = async (res) => {
    const data = await res.json();
    console.log("handleResponse data:", data)
    if(!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
};

export const fetchJobs = async () => {
    try {
        const res = await fetch(`${BASE_URL}/jobs`, {
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await handleResponse(res);
        console.log("Jobs data:", data);
        return { jobs: Array.isArray(data.jobs) ? data.jobs : [] };
    } catch (err) {
        console.error("fetchJobs error:", err);
        return { jobs: [] };
    }
};

export const addJob = async (jobData) => {
    try{
        const res = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(jobData),
        });
        const data = await handleResponse(res);
        return { job: data.job}

    } catch (err) {
        console.error("addJob error:", err.message);
        throw err;
    }
};

export const updateJob = async (id, jobData) => {
   try {
        const res = await fetch(`${BASE_URL}/jobs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(jobData),
        });
        const data = await handleResponse(res);
        return { job: data.job };
   } catch (err) {
        console.error("updateJob error:", err.message);
        throw err;
   }
};

export const deleteJob = async (id) => {
   try {
        const res = await fetch(`${BASE_URL}/jobs/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return handleResponse(res);
   } catch (err) {
        console.error("deleteJob error:", err.message);
        throw err;
   }
};