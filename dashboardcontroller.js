// =============================
// HRMS Dashboard JavaScript
// =============================

// Get user data
const userName = localStorage.getItem("userName") || "Employee";
const department = localStorage.getItem("department") || "IT Department";
const designation = localStorage.getItem("designation") || "Software Engineer";

// Display user name
const navUser = document.getElementById("userName");
const welcomeUser = document.getElementById("welcomeName");

if (navUser) {
    navUser.textContent = userName;
}

if (welcomeUser) {
    welcomeUser.textContent = userName;
}

// Today's Date
const today = document.getElementById("todayDate");

if (today) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    today.innerHTML = new Date().toLocaleDateString("en-IN", options);
}

// Live Clock (Optional)
const clock = document.getElementById("liveClock");

if (clock) {

    function updateClock() {

        const now = new Date();

        clock.innerHTML = now.toLocaleTimeString();

    }

    updateClock();

    setInterval(updateClock, 1000);

}

// Attendance Chart
const chartCanvas = document.getElementById("attendanceChart");

if (chartCanvas) {

    new Chart(chartCanvas, {

        type: "bar",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri"
            ],

            datasets: [

                {

                    label: "Attendance %",

                    data: [
                        90,
                        95,
                        88,
                        97,
                        92
                    ],

                    backgroundColor: [

                        "#0d6efd",
                        "#198754",
                        "#ffc107",
                        "#dc3545",
                        "#6610f2"

                    ],

                    borderRadius: 10

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100

                }

            }

        }

    });

}

// Quick Action Messages
document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function () {

        const text = this.innerText.trim();

        if (text === "Mark Attendance") {

            console.log("Attendance page opened.");

        }

        if (text === "Apply Leave") {

            console.log("Leave page opened.");

        }

        if (text === "Payroll") {

            console.log("Payroll page opened.");

        }

        if (text === "Profile") {

            console.log("Profile page opened.");

        }

    });

});

// Logout
function logout() {

    const confirmLogout = confirm("Do you really want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("loggedIn");

        window.location.href = "index.html";

    }

}

// Greeting
const greeting = document.getElementById("greeting");

if (greeting) {

    const hour = new Date().getHours();

    if (hour < 12) {

        greeting.innerHTML = "☀️ Good Morning";

    }

    else if (hour < 17) {

        greeting.innerHTML = "🌤️ Good Afternoon";

    }

    else {

        greeting.innerHTML = "🌙 Good Evening";

    }

}

// Page Loaded
window.onload = function () {

    console.log("HRMS Dashboard Loaded Successfully.");

};
