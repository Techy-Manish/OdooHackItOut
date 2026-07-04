import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCalendarCheck,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h2 className="text-3xl font-bold mb-10">
        HRMS
      </h2>

      <nav className="flex flex-col gap-4">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded"
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded"
        >
          <FaUser />
          Profile
        </NavLink>

        <NavLink
          to="/attendance"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded"
        >
          <FaCalendarCheck />
          Attendance
        </NavLink>

        <NavLink
          to="/payroll"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded"
        >
          <FaMoneyBill />
          Payroll
        </NavLink>

        <NavLink
          to="/login"
          className="flex items-center gap-3 hover:bg-red-600 p-3 rounded mt-10"
        >
          <FaSignOutAlt />
          Logout
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;