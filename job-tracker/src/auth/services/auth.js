import API_BASE from "../../api/api.js";

export const signupUser = async (userData) => {
    try {
        const res = await fetch(`${API_BASE}/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const message = await res.text();
            return { message: message || "Request Failed"}
        }
        return res.json();
    } catch (error) {
        console.error("Signup Error:", error)
        return { message: "Network error"}
    }
};

export const loginUser = async (credentials) => {
    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        if (!res.ok) {
            const message = await res.text();
            return { message: message || "Request Failed"}
        }
        return res.json();
    } catch (error) {
        console.error("Login Error:", error)
        return { message: "Network error"}
    }
    
};