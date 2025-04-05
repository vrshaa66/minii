
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user }) {
  console.log("Navbar User:", user); // Add this line
  const isAdmin = user && user.isAdmin;
  return (
    <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer">
        <Link to="/">ACADEX</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <div className="relative group">
          <span className="hover:underline cursor-pointer">Study Materials</span>
          <div className="absolute hidden group-hover:block bg-white text-black shadow-md mt-1">
            <Link to="/scheme/2019" className="block px-4 py-2 hover:bg-gray-200">2019</Link>
            <Link to="/scheme/2024" className="block px-4 py-2 hover:bg-gray-200">2024</Link>
          </div>
        </div>
        <Link to="/exam-timetable" className="hover:underline cursor-pointer">Exam Timetable</Link>
        <Link to="/upload-notes" className="hover:underline">Upload Notes</Link>
        <Link to="#" className="hover:underline">More</Link>

        {/* Admin Panel Link (conditionally rendered) */}
        {isAdmin && (
          <Link to="/admin" className="hover:underline">Admin Panel</Link>
      
        )}
      </div>
    </nav>
  );
}

export default Navbar;