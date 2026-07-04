const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        empId: document.getElementById("empId").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        designation: document.getElementById("designation").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (user.password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Registration Successful!");

    window.location.href = "index.html";

});