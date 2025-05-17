function toggleForm() {
    const form = document.getElementById("jobForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

const jobCards = document.getElementById("jobCards");
const recentJobs = document.getElementById("recentJobs");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

window.onload = function () {
    jobs.forEach(job => {
        renderJobCard(job);
        renderRecentJob(job);
    });
};

let currentEditId = null;

function editJob(id) {
    currentEditId = id;
    const job = jobs.find(job => job.id === id);
    if (!job) return;

    document.getElementById("company").value = job.company;
    document.getElementById("role").value = job.role;
    document.getElementById("status").value = job.status;

    document.getElementById("jobForm").style.display = "block";
}


function addJob(e) {
    e.preventDefault();
    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const status = document.getElementById("status").value;

    if (currentEditId) {
        const index = jobs.findIndex(j => j.id === currentEditId);
        jobs[index] = {
            ...jobs[index],
            company,
            role,
            status
        };
        currentEditId = null;
    } else {
        const job = {
            id: Date.now(),
            company,
            role,
            status,
            createdAt: new Date()
        };
        jobs.unshift(job);
    }

    localStorage.setItem("jobs", JSON.stringify(jobs));

    renderAllJobs();
    document.getElementById("jobForm").reset();
    document.getElementById("jobForm").style.display = "none";
}

function renderAllJobs() {
    jobCards.innerHTML = "";
    recentJobs.innerHTML = "";
    jobs.forEach(job => {
        renderJobCard(job);
        renderRecentJob(job);
    });
}

function renderJobCard(job) {
    const div = document.createElement("div");
    div.className = "job-card";
    div.setAttribute("data-id", job.id);

    const date = new Date(job.createdAt).toDateString();

    div.innerHTML = `
    <strong>${job.role}</strong> at ${job.company} <br>
    Status: ${job.status} <br>
    <small>Date: ${date}</small><br>
    <button onclick="editJob(${job.id})">Edit</button>
    <button onclick="deleteJob(${job.id})">Delete</button>
    `;
    jobCards.prepend(div);
}

function renderRecentJob(job) {
    const li = document.createElement("li");
    li.textContent = job.company;
    li.setAttribute("data-id", job.id);
    recentJobs.prepend(li);
}

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderAllJobs();
}

function clearJobs() {
    localStorage.removeItem("jobs");
    jobs = [];
    jobCards.innerHTML = "";
    recentJobs.innerHTML = "";
}

function logout() {
    alert("Logged out! Redirecting to homepage.");
    window.location.href = "index.html";
}