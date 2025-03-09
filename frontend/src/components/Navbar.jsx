import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => window.location.reload()}>
        ACADEX
      </div>
      <div className="space-x-4 flex">
        <a href="#" className="hover:underline" onClick={() => window.location.reload()}>Home</a>

        {/* Syllabus Dropdown */}
        <div className="relative group">
          <a href="#" className="hover:underline">Syllabus</a>
          <div className="absolute hidden group-hover:block bg-white text-black shadow-md mt-1">
            <a href="https://www.ktunotes.in/p/syllabus-2015.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2015</a>
            <a href="https://www.ktunotes.in/p/syllabus-2019.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2019</a>
            <a href="https://www.ktunotes.in/p/syllabus-2024.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2024</a>
          </div>
        </div>

        {/* Notes Dropdown */}
        <div className="relative group">
          <a href="#" className="hover:underline">Notes</a>
          <div className="absolute hidden group-hover:block bg-white text-black shadow-md mt-1">
            <a href="https://www.ktunotes.in/p/notes-2015.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2015</a>
            <a href="https://www.ktunotes.in/p/notes-2019.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2019</a>
            <a href="https://www.ktunotes.in/p/notes-2024.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2024</a>
          </div>
        </div>

        {/* Question Papers Dropdown */}
        <div className="relative group">
          <a href="#" className="hover:underline">Question Papers</a>
          <div className="absolute hidden group-hover:block bg-white text-black shadow-md mt-1">
            <a href="https://www.ktunotes.in/p/questionpapers-2015.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2015</a>
            <a href="https://www.ktunotes.in/p/questionpapers-2019.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2019</a>
            <a href="https://www.ktunotes.in/p/questionpapers-2024.html" target="_blank" className="block px-4 py-2 hover:bg-gray-200">2024</a>
          </div>
        </div>

        <a href="#" className="hover:underline">Exam Timetable</a>
        <a href="#" className="hover:underline">Upload Notes</a>
        <a href="#" className="hover:underline">More</a>
      </div>
    </nav>
  );
}

export default Navbar;