<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Odoo-inspired Human Resource Management System (HRMS) - Every workday, perfectly aligned. Manage attendance, leaves, payroll, and employee profiles.">
  <title>Odoo HRMS - Every workday, perfectly aligned.</title>
  
  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="style.css">
  
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

  <!-- ================= AUTHENTICATION WRAPPER ================= -->
  <div id="auth-screen" class="auth-wrapper fade-in">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-dot"></div>
          <div class="logo-dot accent"></div>
          <span>odoo<span class="accent-text">hrms</span></span>
        </div>
        <h2 id="auth-title">Welcome Back</h2>
        <p id="auth-subtitle">Sign in to manage your workday</p>
      </div>

      <!-- Sign In Form -->
      <form id="signin-form" class="auth-form">
        <div class="form-group">
          <label for="signin-email">Email Address</label>
          <div class="input-wrapper">
            <i data-lucide="mail" class="input-icon"></i>
            <input type="email" id="signin-email" class="form-control" placeholder="name@company.com" required>
          </div>
        </div>
        <div class="form-group">
          <label for="signin-password">Password</label>
          <div class="input-wrapper">
            <i data-lucide="lock" class="input-icon"></i>
            <input type="password" id="signin-password" class="form-control" placeholder="••••••••" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          <span>Sign In</span>
          <i data-lucide="arrow-right"></i>
        </button>
        <div class="auth-toggle">
          Don't have an account? <a href="#" id="to-signup">Sign Up</a>
        </div>
      </form>

      <!-- Sign Up Form -->
      <form id="signup-form" class="auth-form" style="display: none;">
        <div class="form-group">
          <label for="signup-empid">Employee ID</label>
          <div class="input-wrapper">
            <i data-lucide="hash" class="input-icon"></i>
            <input type="text" id="signup-empid" class="form-control" placeholder="EMP-1024" required>
          </div>
        </div>
        <div class="form-group">
          <label for="signup-name">Full Name</label>
          <div class="input-wrapper">
            <i data-lucide="user" class="input-icon"></i>
            <input type="text" id="signup-name" class="form-control" placeholder="Jane Doe" required>
          </div>
        </div>
        <div class="form-group">
          <label for="signup-email">Email Address</label>
          <div class="input-wrapper">
            <i data-lucide="mail" class="input-icon"></i>
            <input type="email" id="signup-email" class="form-control" placeholder="name@company.com" required>
          </div>
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <div class="input-wrapper">
            <i data-lucide="lock" class="input-icon"></i>
            <input type="password" id="signup-password" class="form-control" placeholder="Min. 8 characters" required>
          </div>
        </div>
        <div class="form-group">
          <label for="signup-role">Account Role</label>
          <div class="input-wrapper">
            <i data-lucide="shield" class="input-icon"></i>
            <select id="signup-role" class="form-control" style="padding-left: 42px; appearance: none; -webkit-appearance: none;" required>
              <option value="Employee">Employee (Standard Access)</option>
              <option value="Admin">HR Administrator (Full Access)</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-accent" style="width: 100%; margin-top: 10px;">
          <span>Create Account</span>
          <i data-lucide="check"></i>
        </button>
        <div class="auth-toggle">
          Already have an account? <a href="#" id="to-signin">Sign In</a>
        </div>
      </form>
    </div>
  </div>

  <!-- ================= APPLICATION CONTENT ================= -->
  <div id="app-screen" class="app-container" style="display: none;">
    <div id="sidebar-overlay" class="overlay-sidebar-backdrop"></div>
    
    <aside id="app-sidebar" class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-dot"></div>
          <div class="logo-dot accent"></div>
          <span>odoo<span class="accent-text">hrms</span></span>
        </div>
        <button id="sidebar-close-btn" class="menu-btn" style="color: white;"><i data-lucide="x"></i></button>
      </div>

      <nav style="flex-grow: 1;">
        <ul class="sidebar-menu">
          <li class="sidebar-item active" data-view="dashboard">
            <a><i data-lucide="layout-dashboard"></i><span>Dashboard</span></a>
          </li>
          <li class="sidebar-item" data-view="profile">
            <a><i data-lucide="user-cog"></i><span>My Profile</span></a>
          </li>
          <li class="sidebar-item" data-view="attendance">
            <a><i data-lucide="clock"></i><span>Attendance</span></a>
          </li>
          <li class="sidebar-item" data-view="leave">
            <a><i data-lucide="calendar"></i><span>Leave & Time-Off</span></a>
          </li>
          <li class="sidebar-item" data-view="payroll">
            <a><i data-lucide="wallet"></i><span>My Payroll</span></a>
          </li>
          <li id="admin-divider" class="sidebar-item" style="border-top: 1px solid rgba(255,255,255,0.08); margin-top: 15px; padding-top: 15px; display: none;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--text-muted); padding: 0 16px; display: block; margin-bottom: 8px;">HR Administration</span>
          </li>
          <li id="admin-menu-item" class="sidebar-item" data-view="admin" style="display: none;">
            <a><i data-lucide="sliders"></i><span>HR Portal</span></a>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile-badge" id="sidebar-profile-card">
          <div class="user-avatar" id="sidebar-avatar">JD</div>
          <div class="user-info-text">
            <span class="user-name" id="sidebar-username">Jane Doe</span>
            <span class="user-role" id="sidebar-userrole">Employee</span>
          </div>
          <i data-lucide="chevron-right" style="margin-left: auto; width: 16px; height: 16px; color: var(--text-muted);"></i>
        </div>
      </div>
    </aside>

    <main class="main-wrapper">
      <header class="navbar">
        <div class="navbar-left">
          <button id="sidebar-toggle-btn" class="menu-btn"><i data-lucide="menu"></i></button>
          <h1 class="page-title" id="page-title">Dashboard</h1>
        </div>
        <div class="navbar-right">
          <div class="time-clock-nav">
            <i data-lucide="calendar-days" style="width: 16px; height: 16px;"></i>
            <span id="nav-live-time">Jul 4, 2026 - 16:40</span>
          </div>
          <button id="theme-toggle-btn" class="theme-toggle" title="Toggle Light/Dark Theme">
            <i data-lucide="moon" id="theme-icon"></i>
          </button>
          <button id="logout-btn" class="btn btn-secondary" style="padding: 8px 14px;">
            <i data-lucide="log-out" style="width: 16px; height: 16px;"></i>
            <span style="font-size: 13px;">Log Out</span>
          </button>
        </div>
      </header>

      <div class="content-area slide-up" id="main-content">
        <!-- VIEW: DASHBOARD -->
        <div id="view-dashboard" class="view-panel">
          <div class="stats-grid">
            <div class="stat-card primary">
              <div class="stat-info"><span class="stat-label">Leave Balance</span><span class="stat-value" id="dash-leave-bal">18 Days</span></div>
              <div class="stat-icon"><i data-lucide="calendar-check"></i></div>
            </div>
            <div class="stat-card accent">
              <div class="stat-info"><span class="stat-label">Hours Worked (Week)</span><span class="stat-value" id="dash-hours-worked">38.5 hrs</span></div>
              <div class="stat-icon"><i data-lucide="timer"></i></div>
            </div>
            <div class="stat-card success">
              <div class="stat-info"><span class="stat-label">Today's Status</span><span class="stat-value" id="dash-today-status">Checked Out</span></div>
              <div class="stat-icon"><i data-lucide="activity"></i></div>
            </div>
            <div class="stat-card warning">
              <div class="stat-info"><span class="stat-label">Pending Requests</span><span class="stat-value" id="dash-pending-req">0 Requests</span></div>
              <div class="stat-icon"><i data-lucide="clock-arrow-up"></i></div>
            </div>
          </div>

          <div class="dashboard-row">
            <div class="panel-card">
              <div class="panel-header">
                <h3 class="panel-title"><i data-lucide="fingerprint" class="text-primary"></i>Work Attendance Action</h3>
                <span id="attendance-today-date" style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">July 4, 2026</span>
              </div>
              <div class="attendance-widget">
                <div class="clock-display" id="dash-live-clock">16:40:27</div>
                <div class="attendance-status-text">
                  <span class="status-indicator" id="dash-status-dot"></span>
                  <span id="dash-status-text">You are currently Checked Out</span>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 10px;">
                  <button id="checkin-btn" class="btn btn-primary"><i data-lucide="play"></i><span>Check In</span></button>
                  <button id="checkout-btn" class="btn btn-secondary" disabled><i data-lucide="square"></i><span>Check Out</span></button>
                </div>
              </div>
              <div style="margin-top: 24px;">
                <h4 style="font-size: 14px; margin-bottom: 12px; font-weight: 700;">Quick Shortcuts</h4>
                <div class="quick-access-grid">
                  <div class="quick-card" onclick="switchView('profile')"><i data-lucide="user"></i><span>View Profile</span></div>
                  <div class="quick-card" onclick="openLeaveModal()"><i data-lucide="calendar-plus"></i><span>Apply Leave</span></div>
                  <div class="quick-card" onclick="switchView('payroll')"><i data-lucide="banknote"></i><span>View Payroll</span></div>
                </div>
              </div>
            </div>

            <div class="panel-card">
              <div class="panel-header">
                <h3 class="panel-title"><i data-lucide="bell" class="text-accent"></i>Recent Activities & Alerts</h3>
              </div>
              <div class="timeline" id="dashboard-timeline">
                <div class="timeline-item success">
                  <div class="timeline-icon"><i data-lucide="check"></i></div>
                  <div class="timeline-content">
                    <span class="timeline-time">Yesterday, 18:00</span>
                    <span class="timeline-desc">Successful Checkout recorded</span>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon"><i data-lucide="info"></i></div>
                  <div class="timeline-content">
                    <span class="timeline-time">2 days ago</span>
                    <span class="timeline-desc">July payroll slips published by Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VIEW: PROFILE -->
        <div id="view-profile" class="view-panel" style="display: none;">
          <div class="profile-container">
            <div class="profile-card-left">
              <div class="profile-pic-large" id="profile-avatar-large">JD</div>
              <div class="profile-meta-info">
                <h2 class="profile-name" id="profile-fullname">Jane Doe</h2>
                <p class="profile-title" id="profile-jobtitle">Senior Developer</p>
                <div class="profile-status"><span class="badge badge-present" id="profile-badge-status">Active</span></div>
              </div>
              <button class="btn btn-secondary" onclick="openEditProfileModal()" style="width: 100%; margin-top: 15px;"><i data-lucide="edit-3"></i><span>Edit Profile</span></button>
            </div>

            <div class="profile-card-right">
              <div class="profile-section-card">
                <h3 class="profile-section-title"><i data-lucide="user"></i>Personal Information</h3>
                <div class="grid-2-col">
                  <div class="info-item"><span class="info-label">Full Name</span><span class="info-value" id="profile-field-name">Jane Doe</span></div>
                  <div class="info-item"><span class="info-label">Email Address</span><span class="info-value" id="profile-field-email">jane.doe@company.com</span></div>
                  <div class="info-item"><span class="info-label">Contact Phone</span><span class="info-value" id="profile-field-phone">+1 (555) 019-2834</span></div>
                  <div class="info-item"><span class="info-label">Address</span><span class="info-value" id="profile-field-address">124 Silicon Hills Blvd, Austin, TX</span></div>
                </div>
              </div>

              <div class="profile-section-card">
                <h3 class="profile-section-title"><i data-lucide="briefcase"></i>Employment Details</h3>
                <div class="grid-2-col">
                  <div class="info-item"><span class="info-label">Employee ID</span><span class="info-value" id="profile-field-empid">EMP-1024</span></div>
                  <div class="info-item"><span class="info-label">Department</span><span class="info-value" id="profile-field-dept">Engineering</span></div>
                  <div class="info-item"><span class="info-label">Manager</span><span class="info-value" id="profile-field-mgr">HR Administration Team</span></div>
                  <div class="info-item"><span class="info-label">Joining Date</span><span class="info-value">January 15, 2024</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VIEW: ATTENDANCE -->
        <div id="view-attendance" class="view-panel" style="display: none;">
          <div class="dashboard-row">
            <div class="panel-card">
              <div class="panel-header"><h3 class="panel-title"><i data-lucide="history" class="text-primary"></i>Recent Attendance Logs</h3></div>
              <div class="table-wrapper">
                <table class="hrms-table">
                  <thead>
                    <tr><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th><th>Duration</th></tr>
                  </thead>
                  <tbody id="attendance-log-tbody"></tbody>
                </table>
              </div>
            </div>

            <div class="panel-card">
              <div class="panel-header"><h3 class="panel-title"><i data-lucide="calendar" class="text-accent"></i>Monthly Overview</h3></div>
              <div class="calendar-widget">
                <div class="calendar-header"><span class="calendar-month-year" id="calendar-header-title">July 2026</span></div>
                <div class="calendar-days-grid" id="attendance-calendar-grid"></div>
              </div>
              <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 13px;">
                  <span><span class="status-indicator active"></span> Present Days</span><span id="att-present-count">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 13px;">
                  <span><span class="status-indicator" style="background-color: var(--warning);"></span> Half-Days</span><span id="att-halfday-count">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VIEW: LEAVE -->
        <div id="view-leave" class="view-panel" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 700;">Time-Off Manager</h2>
            <button class="btn btn-primary" onclick="openLeaveModal()"><i data-lucide="plus"></i><span>Apply for Time-Off</span></button>
          </div>
          <div class="stats-grid" style="margin-bottom: 24px;">
            <div class="stat-card primary">
              <div class="stat-info"><span class="stat-label">Paid Leave Balance</span><span class="stat-value" id="leave-card-paid">15 Days</span></div>
              <div class="stat-icon"><i data-lucide="calendar"></i></div>
            </div>
            <div class="stat-card success">
              <div class="stat-info"><span class="stat-label">Approved Leaves</span><span class="stat-value" id="leave-card-approved">0 Days</span></div>
              <div class="stat-icon"><i data-lucide="thumbs-up"></i></div>
            </div>
          </div>
          <div class="panel-card">
            <div class="panel-header"><h3 class="panel-title"><i data-lucide="clipboard-list" class="text-primary"></i>Your Leave History</h3></div>
            <div class="table-wrapper">
              <table class="hrms-table">
                <thead>
                  <tr><th>Leave Type</th><th>Date Range</th><th>Days</th><th>Remarks</th><th>Status</th></tr>
                </thead>
                <tbody id="leave-history-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- VIEW: PAYROLL -->
        <div id="view-payroll" class="view-panel" style="display: none;">
          <div class="dashboard-row">
            <div class="panel-card">
              <div class="panel-header"><h3 class="panel-title"><i data-lucide="wallet" class="text-primary"></i>Earnings & Deductions</h3></div>
              <div style="display: flex; flex-direction: column; gap: 16px; padding: 10px 0;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                  <span>Basic Salary</span><span id="payroll-basic-salary">$0.00</span>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; color: var(--danger);">
                  <span>Tax Deductions</span><span id="payroll-deductions">$0.00</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 12px; font-size: 18px; color: var(--success);">
                  <span style="font-weight: 700;">Net Monthly Pay</span><span id="payroll-net-pay">$0.00</span>
                </div>
              </div>
            </div>
            <div class="panel-card">
              <div class="panel-header"><h3 class="panel-title"><i data-lucide="file-text" class="text-accent"></i>Salary Pay Slips</h3></div>
              <div style="display: flex; flex-direction: column; gap: 12px;" id="slips-archive-list"></div>
            </div>
          </div>
        </div>

        <!-- VIEW: HR PORTAL (ADMIN) -->
        <div id="view-admin" class="view-panel" style="display: none;">
          <div class="admin-toolbar">
            <input type="text" id="admin-search-employee" class="search-input" placeholder="Search employees...">
            <button class="btn btn-primary" onclick="openAddEmployeeModal()"><i data-lucide="user-plus"></i><span>Add Employee</span></button>
          </div>
          <div class="panel-card" style="margin-bottom: 32px;">
            <div class="panel-header">
              <h3 class="panel-title"><i data-lucide="inbox" class="text-warning"></i>Time-Off Requests</h3>
              <span class="badge badge-pending" id="admin-pending-approvals-count">0 Pending</span>
            </div>
            <div class="table-wrapper">
              <table class="hrms-table">
                <thead>
                  <tr><th>Employee</th><th>Type</th><th>Date Range</th><th>Days</th><th>Reason</th><th>Actions</th></tr>
                </thead>
                <tbody id="admin-leave-queue-tbody"></tbody>
              </table>
            </div>
          </div>
          <div class="panel-card">
            <div class="panel-header"><h3 class="panel-title"><i data-lucide="users" class="text-primary"></i>Global Employee Directory</h3></div>
            <div class="table-wrapper">
              <table class="hrms-table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Job Title</th><th>Salary (Yr)</th><th>Today Status</th><th>Actions</th></tr>
                </thead>
                <tbody id="admin-employees-directory-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>

  <!-- MODALS -->
  <div id="leave-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="panel-title">Apply for Time-Off</h3>
        <button class="modal-close" onclick="closeLeaveModal()"><i data-lucide="x"></i></button>
      </div>
      <form id="apply-leave-form">
        <div class="modal-body">
          <div class="form-group">
            <label for="leave-type">Type</label>
            <select id="leave-type" class="form-control" style="padding-left:14px;"><option value="Paid Annual">Paid Annual</option><option value="Sick Leave">Sick Leave</option></select>
          </div>
          <div class="grid-2-col">
            <div class="form-group"><label for="leave-start-date">Start Date</label><input type="date" id="leave-start-date" class="form-control" style="padding-left:14px;" required></div>
            <div class="form-group"><label for="leave-end-date">End Date</label><input type="date" id="leave-end-date" class="form-control" style="padding-left:14px;" required></div>
          </div>
          <div class="form-group"><label for="leave-remarks">Reason</label><textarea id="leave-remarks" class="form-control" style="padding-left:14px; height:100px; resize:none;" required></textarea></div>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-secondary" onclick="closeLeaveModal()">Cancel</button><button type="submit" class="btn btn-primary">Submit</button></div>
      </form>
    </div>
  </div>

  <div id="edit-profile-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="panel-title">Edit Personal Info</h3>
        <button class="modal-close" onclick="closeEditProfileModal()"><i data-lucide="x"></i></button>
      </div>
      <form id="edit-profile-form">
        <div class="modal-body">
          <div class="form-group"><label for="edit-profile-phone">Phone</label><input type="text" id="edit-profile-phone" class="form-control" style="padding-left:14px;" required></div>
          <div class="form-group"><label for="edit-profile-address">Address</label><input type="text" id="edit-profile-address" class="form-control" style="padding-left:14px;" required></div>
          <div class="form-group"><label for="edit-profile-avatar">Avatar Initials</label><input type="text" id="edit-profile-avatar" class="form-control" style="padding-left:14px;" required></div>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-secondary" onclick="closeEditProfileModal()">Cancel</button><button type="submit" class="btn btn-primary">Save</button></div>
      </form>
    </div>
  </div>

  <!-- JavaScript -->
  <script src="app.js"></script>
</body>
</html>
