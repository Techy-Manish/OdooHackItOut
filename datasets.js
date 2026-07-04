// ================= SYSTEM SEED DATA =================
const DEFAULT_USERS = [
  {
    empid: "EMP-1001",
    name: "Alexander Odoo",
    email: "admin@company.com",
    password: "password123",
    role: "Admin",
    dept: "HR & Administration",
    job: "HR Director",
    phone: "+1 (555) 011-8899",
    address: "742 Evergreen Terrace, Springfield",
    salary: 145000,
    avatar: "AO",
    leaveBalance: 24,
    status: "Checked Out"
  },
  {
    empid: "EMP-1024",
    name: "Jane Doe",
    email: "employee@company.com",
    password: "password123",
    role: "Employee",
    dept: "Engineering",
    job: "Senior Frontend Developer",
    phone: "+1 (555) 019-2834",
    address: "124 Silicon Hills Blvd, Austin, TX",
    salary: 115000,
    avatar: "JD",
    leaveBalance: 18,
    status: "Checked Out"
  }
];

const DEFAULT_ATTENDANCE = [
  { empid: "EMP-1024", date: "2026-07-01", checkIn: "08:55", checkOut: "17:35", duration: "8.67", status: "Present" },
  { empid: "EMP-1024", date: "2026-07-02", checkIn: "09:02", checkOut: "17:40", duration: "8.63", status: "Present" }
];

const DEFAULT_LEAVES = [
  {
    id: "LV-3920",
    empid: "EMP-1024",
    empname: "Jane Doe",
    type: "Sick Leave",
    startDate: "2026-06-25",
    endDate: "2026-06-26",
    days: 2,
    remarks: "Medical checkup recovery",
    status: "Approved",
    adminComment: "Approved"
  }
];

// App Cache
let users = JSON.parse(localStorage.getItem("hrms_users")) || DEFAULT_USERS;
let attendance = JSON.parse(localStorage.getItem("hrms_attendance")) || DEFAULT_ATTENDANCE;
let leaves = JSON.parse(localStorage.getItem("hrms_leaves")) || DEFAULT_LEAVES;
let currentUser = JSON.parse(localStorage.getItem("hrms_current_user")) || null;

let clockTimer = null;
let currentSessionStart = localStorage.getItem("hrms_session_start") || null;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("hrms_users")) saveDb();

  lucide.createIcons();

  // Load saved theme
  const savedTheme = localStorage.getItem("hrms_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleIcon(savedTheme);

  // Authentication Triggers
  document.getElementById("to-signup").addEventListener("click", () => toggleAuthForms("signup"));
  document.getElementById("to-signin").addEventListener("click", () => toggleAuthForms("signin"));
  document.getElementById("signin-form").addEventListener("submit", handleSignIn);
  document.getElementById("signup-form").addEventListener("submit", handleSignUp);
  document.getElementById("logout-btn").addEventListener("click", handleLogOut);

  // Navigation Panel Links
  document.querySelectorAll(".sidebar-item").forEach(item => {
    item.addEventListener("click", () => {
      const targetView = item.getAttribute("data-view");
      if (targetView) {
        switchView(targetView);
        if (window.innerWidth <= 768) closeMobileSidebar();
      }
    });
  });

  // Mobile navigation trigger controls
  document.getElementById("sidebar-toggle-btn").addEventListener("click", openMobileSidebar);
  document.getElementById("sidebar-close-btn").addEventListener("click", closeMobileSidebar);
  document.getElementById("sidebar-overlay").addEventListener("click", closeMobileSidebar);
  document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);

  // Check In/Out system hooks
  document.getElementById("checkin-btn").addEventListener("click", handleCheckIn);
  document.getElementById("checkout-btn").addEventListener("click", handleCheckOut);

  // Modal forms handlers
  document.getElementById("apply-leave-form").addEventListener("submit", handleApplyLeave);
  document.getElementById("edit-profile-form").addEventListener("submit", handleEditProfile);
  document.getElementById("add-employee-form").addEventListener("submit", handleAddEmployee);

  if (currentUser) {
    initializeSession();
  } else {
    showAuthScreen();
  }
});

function saveDb() {
  localStorage.setItem("hrms_users", JSON.stringify(users));
  localStorage.setItem("hrms_attendance", JSON.stringify(attendance));
  localStorage.setItem("hrms_leaves", JSON.stringify(leaves));
}

function toggleAuthForms(mode) {
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  const title = document.getElementById("auth-title");

  if (mode === "signup") {
    signinForm.style.display = "none";
    signupForm.style.display = "block";
    title.innerText = "Register Account";
  } else {
    signinForm.style.display = "block";
    signupForm.style.display = "none";
    title.innerText = "Welcome Back";
  }
  lucide.createIcons();
}

function handleSignIn(e) {
  e.preventDefault();
  const email = document.getElementById("signin-email").value.trim().toLowerCase();
  const password = document.getElementById("signin-password").value;

  const foundUser = users.find(u => u.email.toLowerCase() === email && u.password === password);
  if (foundUser) {
    currentUser = foundUser;
    localStorage.setItem("hrms_current_user", JSON.stringify(currentUser));
    initializeSession();
  } else {
    alert("Invalid details. Try admin@company.com or employee@company.com with password 'password123'");
  }
}

function handleSignUp(e) {
  e.preventDefault();
  const empid = document.getElementById("signup-empid").value.trim().toUpperCase();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role").value;

  if (users.some(u => u.empid === empid || u.email === email)) {
    alert("User already exists.");
    return;
  }

  const newUser = {
    empid: empid,
    name: name,
    email: email,
    password: password,
    role: role,
    dept: "Engineering",
    job: role === "Admin" ? "HR Admin" : "Software Developer",
    phone: "+1 (555) 000-0000",
    address: "Not Provided Yet",
    salary: 85000,
    avatar: name.split(" ").map(n => n[0]).join("").toUpperCase(),
    leaveBalance: 15,
    status: "Checked Out"
  };

  users.push(newUser);
  saveDb();
  
  currentUser = newUser;
  localStorage.setItem("hrms_current_user", JSON.stringify(currentUser));
  initializeSession();
}

function handleLogOut() {
  currentUser = null;
  localStorage.removeItem("hrms_current_user");
  showAuthScreen();
}

function showAuthScreen() {
  document.getElementById("auth-screen").style.display = "flex";
  document.getElementById("app-screen").style.display = "none";
  if (clockTimer) clearInterval(clockTimer);
  toggleAuthForms("signin");
}

function initializeSession() {
  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("app-screen").style.display = "flex";

  const isHr = currentUser.role === "Admin";
  document.getElementById("admin-divider").style.display = isHr ? "block" : "none";
  document.getElementById("admin-menu-item").style.display = isHr ? "block" : "none";

  updateUserProfile();
  startLiveClock();
  syncAttendanceButtonStates();
  switchView("dashboard");
}

function updateUserProfile() {
  document.getElementById("sidebar-avatar").innerText = currentUser.avatar;
  document.getElementById("sidebar-username").innerText = currentUser.name;
  document.getElementById("sidebar-userrole").innerText = currentUser.role;

  // Profile section updating
  document.getElementById("profile-avatar-large").innerText = currentUser.avatar;
  document.getElementById("profile-fullname").innerText = currentUser.name;
  document.getElementById("profile-jobtitle").innerText = currentUser.job;
  document.getElementById("profile-field-name").innerText = currentUser.name;
  document.getElementById("profile-field-email").innerText = currentUser.email;
  document.getElementById("profile-field-phone").innerText = currentUser.phone;
  document.getElementById("profile-field-address").innerText = currentUser.address;
  document.getElementById("profile-field-empid").innerText = currentUser.empid;
  document.getElementById("profile-field-dept").innerText = currentUser.dept;
}

function startLiveClock() {
  if (clockTimer) clearInterval(clockTimer);
  const clock = document.getElementById("dash-live-clock");
  const navTime = document.getElementById("nav-live-time");

  const update = () => {
    const now = new Date();
    navTime.innerText = now.toLocaleDateString() + " - " + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    if (clock) clock.innerText = now.toLocaleTimeString();
  };
  update();
  clockTimer = setInterval(update, 1000);
}

function syncAttendanceButtonStates() {
  const checkin = document.getElementById("checkin-btn");
  const checkout = document.getElementById("checkout-btn");
  const statusDot = document.getElementById("dash-status-dot");
  const statusText = document.getElementById("dash-status-text");

  currentSessionStart = localStorage.getItem("hrms_session_start");

  if (currentSessionStart) {
    checkin.disabled = true;
    checkout.disabled = false;
    statusDot.className = "status-indicator active";
    statusText.innerHTML = `Checked In at <strong>${currentSessionStart}</strong>`;
  } else {
    checkin.disabled = false;
    checkout.disabled = true;
    statusDot.className = "status-indicator";
    statusText.innerText = "Checked Out";
  }
}

function handleCheckIn() {
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  localStorage.setItem("hrms_session_start", time);
  syncAttendanceButtonStates();
}

function handleCheckOut() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const checkinTime = localStorage.getItem("hrms_session_start");
  localStorage.removeItem("hrms_session_start");

  const newLog = {
    empid: currentUser.empid,
    date: now.toISOString().split("T")[0],
    checkIn: checkinTime,
    checkOut: time,
    duration: "8.00",
    status: "Present"
  };

  attendance.push(newLog);
  saveDb();
  syncAttendanceButtonStates();
  renderAttendanceView();
}

function switchView(viewName) {
  document.querySelectorAll(".view-panel").forEach(p => p.style.display = "none");
  const panel = document.getElementById(`view-${viewName}`);
  if (panel) panel.style.display = "block";

  document.querySelectorAll(".sidebar-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-view") === viewName) item.classList.add("active");
  });

  document.getElementById("page-title").innerText = viewName.toUpperCase();

  if (viewName === "attendance") renderAttendanceView();
  if (viewName === "leave") renderLeaveView();
  if (viewName === "payroll") renderPayrollView();
  if (viewName === "admin") renderAdminPortal();
}

function openMobileSidebar() {
  document.getElementById("app-sidebar").classList.add("open");
  document.getElementById("sidebar-overlay").classList.add("open");
}

function closeMobileSidebar() {
  document.getElementById("app-sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("open");
}

function renderAttendanceView() {
  const tbody = document.getElementById("attendance-log-tbody");
  tbody.innerHTML = "";
  const logs = attendance.filter(a => a.empid === currentUser.empid);

  logs.forEach(log => {
    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${log.date}</td>
        <td><span class="badge badge-present">${log.status}</span></td>
        <td>${log.checkIn}</td>
        <td>${log.checkOut}</td>
        <td>${log.duration} hrs</td>
      </tr>
    `);
  });

  // Render calendar marker legend mock
  const grid = document.getElementById("attendance-calendar-grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 31; i++) {
    const isPresent = logs.some(l => Number(l.date.split("-")[2]) === i);
    grid.insertAdjacentHTML('beforeend', `
      <div class="calendar-day-cell ${isPresent ? 'has-attendance-present' : ''}">${i}</div>
    `);
  }
}

function renderLeaveView() {
  const tbody = document.getElementById("leave-history-tbody");
  tbody.innerHTML = "";
  const userLeaves = leaves.filter(l => l.empid === currentUser.empid);

  userLeaves.forEach(lv => {
    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${lv.type}</td>
        <td>${lv.startDate} to ${lv.endDate}</td>
        <td>${lv.days}</td>
        <td>${lv.remarks}</td>
        <td><span class="badge badge-approved">${lv.status}</span></td>
      </tr>
    `);
  });
}

function renderPayrollView() {
  const basic = currentUser.salary / 12;
  const tax = basic * 0.2;
  const net = basic - tax;

  document.getElementById("payroll-basic-salary").innerText = "$" + basic.toFixed(2);
  document.getElementById("payroll-deductions").innerText = "-$" + tax.toFixed(2);
  document.getElementById("payroll-net-pay").innerText = "$" + net.toFixed(2);
}

function renderAdminPortal() {
  const pendingTbody = document.getElementById("admin-leave-queue-tbody");
  pendingTbody.innerHTML = "";
  leaves.filter(l => l.status === "Pending").forEach(lv => {
    pendingTbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${lv.empname}</td>
        <td>${lv.type}</td>
        <td>${lv.startDate}</td>
        <td>${lv.days}</td>
        <td>${lv.remarks}</td>
        <td><button class="btn btn-primary" onclick="approveLeave('${lv.id}')">Approve</button></td>
      </tr>
    `);
  });

  const directoryTbody = document.getElementById("admin-employees-directory-tbody");
  directoryTbody.innerHTML = "";
  users.forEach(u => {
    directoryTbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${u.empid}</td>
        <td>${u.name}</td>
        <td>${u.job}</td>
        <td>$${u.salary}</td>
        <td>Checked Out</td>
        <td><button class="btn btn-secondary" onclick="impersonateUser('${u.empid}')">Inspect</button></td>
      </tr>
    `);
  });
}

window.approveLeave = function(id) {
  const lv = leaves.find(l => l.id === id);
  if (lv) {
    lv.status = "Approved";
    saveDb();
    renderAdminPortal();
  }
};

window.impersonateUser = function(empid) {
  const u = users.find(x => x.empid === empid);
  if (u) {
    currentUser = u;
    localStorage.setItem("hrms_current_user", JSON.stringify(currentUser));
    initializeSession();
  }
};

window.openLeaveModal = () => document.getElementById("leave-modal").classList.add("open");
window.closeLeaveModal = () => document.getElementById("leave-modal").classList.remove("open");

function handleApplyLeave(e) {
  e.preventDefault();
  const newLeave = {
    id: "LV-" + Math.floor(Math.random() * 9000),
    empid: currentUser.empid,
    empname: currentUser.name,
    type: document.getElementById("leave-type").value,
    startDate: document.getElementById("leave-start-date").value,
    endDate: document.getElementById("leave-end-date").value,
    days: 3,
    remarks: document.getElementById("leave-remarks").value,
    status: "Pending"
  };
  leaves.push(newLeave);
  saveDb();
  closeLeaveModal();
  renderLeaveView();
}

window.openEditProfileModal = () => document.getElementById("edit-profile-modal").classList.add("open");
window.closeEditProfileModal = () => document.getElementById("edit-profile-modal").classList.remove("open");

function handleEditProfile(e) {
  e.preventDefault();
  currentUser.phone = document.getElementById("edit-profile-phone").value;
  currentUser.address = document.getElementById("edit-profile-address").value;
  currentUser.avatar = document.getElementById("edit-profile-avatar").value;
  saveDb();
  closeEditProfileModal();
  updateUserProfile();
}

window.openAddEmployeeModal = () => document.getElementById("add-employee-modal").classList.add("open");
window.closeAddEmployeeModal = () => document.getElementById("add-employee-modal").classList.remove("open");

function handleAddEmployee(e) {
  e.preventDefault();
  // Simplified directory add
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("hrms_theme", next);
  updateThemeToggleIcon(next);
}

function updateThemeToggleIcon(theme) {
  const icon = document.getElementById("theme-icon");
  icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
  lucide.createIcons();
}
