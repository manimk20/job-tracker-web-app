import pool from "../db.js";

export const createJob = async (req, res) => {
    const { company, role, status } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            "INSERT INTO jobs (user_id, company, role, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [userId, company, role, status]
        );
        const createdJob = result.rows[0];
        res.status(201).json({ job: createdJob });
    } catch (err) {
        console.error("Create Job Error:", err.message)
        res.status(500).json({ message: "Server error" });
    }
};

export const getJobs = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            "SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );
        res.json({ jobs: result.rows});
        console.log("jobs for user:", userId, result.rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { company, role, status } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            "UPDATE jobs SET company = $1, role = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [company, role, status, id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Job not found or unauthorized" });
        }

        const updatedJob = result.rows[0];
        res.status(200).json({ job: updatedJob });
    } catch (err) {
        console.error("Update Job Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const userId =  req.user.id;

    try {
        await pool.query("DELETE FROM jobs WHERE id = $1 AND user_id = $2", [id, userId]);
        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};