// import { Link, useParams } from "react-router-dom";
// import "../SchemePage.css";

// const SchemePage = () => {
//   const { year } = useParams(); // Get scheme year from URL

//   return (
//     <div className="scheme-container">
//       <h1>KTU SYLLABUS | {year} SCHEME</h1>
//       <h2>Select Your Semester</h2>
//       <div className="semester-grid">
//         {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//           <Link key={sem} to={`/scheme/${year}/semester/${sem}`} className="semester-card">
//             <img src="/icons/file-icon.png" alt={`S${sem}`} />
//             <p>S{sem}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SchemePage;


import React from "react";
import { useParams, Link } from "react-router-dom";

const SchemePage = () => {
  const { year } = useParams(); // Get scheme year from URL

  const semesters = Array.from({ length: 8 }, (_, i) => `S${i + 1}`); // ['S1', 'S2', ..., 'S8']

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">KTU | {year} Scheme</h1>
      <p className="text-blue-600 mb-6">Select Your Semester</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {semesters.map((semester) => (
          <Link 
            key={semester} 
            to={`/scheme/${year}/${semester}`} 
            
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition"
            
          >
            <div className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
              📄
            </div>
            <p className="mt-3 text-lg font-semibold">{semester}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SchemePage;
