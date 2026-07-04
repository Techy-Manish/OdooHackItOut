const form = document.getElementById("loginForm");

const togglePassword = document.getElementById("togglePassword");

const password = document.getElementById("password");

// Show / Hide Password

togglePassword.addEventListener("click", () => {

    if(password.type==="password"){

        password.type="text";

        togglePassword.classList.replace("fa-eye","fa-eye-slash");

    }

    else{

        password.type="password";

        togglePassword.classList.replace("fa-eye-slash","fa-eye");

    }

});

form.addEventListener("submit",function(e){

    e.preventDefault();

    const email=document.getElementById("email").value.trim();

    const pass=password.value.trim();

    const role=document.getElementById("role").value;

    if(email===""){

        alert("Please enter email");

        return;

    }

    if(pass===""){

        alert("Please enter password");

        return;

    }

    if(role===""){

        alert("Please select a role");

        return;

    }

    localStorage.setItem("loggedIn","true");

    localStorage.setItem("role",role);

    localStorage.setItem("email",email);

    alert("Login Successful!");

    if(role==="Admin"){

        window.location.href="admin.html";

    }

    else{

        window.location.href="dashboard.html";

    }

});