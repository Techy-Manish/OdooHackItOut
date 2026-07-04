import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">HRMS</h1>

      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>

        <Link to="/attendance" className="hover:text-gray-300">
          Attendance
        </Link>

        <Link to="/leave" className="hover:text-gray-300">
          Leave
        </Link>

        <Link to="/profile">
          <FaUserCircle size={28} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;