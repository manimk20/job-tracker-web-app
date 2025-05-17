document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = signupForm.querySelector('input[type="text"]').value;
            const email = signupForm.querySelector('input[type="email"]').value;
            const password = signupForm.querySelector('input[type="password"]').value;

            if (!name || !email || !password) {
                alert("Please fill in all fields");
                return;
            }

            const user = { name, email, password };
            localStorage.setItem("jobtracker-user", JSON.stringify(user));
            alert("Signup successfull You can now login.");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            const storedUser = JSON.parse(localStorage.getItem("jobtracker-user"));

            if (
                storedUser &&
                email === storedUser.email &&
                password === storedUser.password
            ) {
                alert("Login Successfull");
                // localStorage.setItem("isLoggedIn", "true");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password");
            }
        });
    }
});