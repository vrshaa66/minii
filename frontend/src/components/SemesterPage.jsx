// import React from "react";
// import { useParams } from "react-router-dom";

// // Sample subject data (Replace this with API data later)
// const subjectsData = {
//   "2019": {
//     "S3": ["Mathematics 3", "Data Structures", "Digital Electronics", "OOP with Java"],
//     "S4": ["Algorithms", "Computer Networks", "Microprocessors", "Operating Systems"]
//   },
//   "2024": {
//     "S3": ["Advanced Calculus", "Machine Learning", "Cyber Security", "Software Engineering"],
//     "S4": ["Deep Learning", "Cloud Computing", "IoT", "Embedded Systems"]
//   }
// };

// const SemesterPage = () => {
//   const { scheme, semester } = useParams();
//   const subjects = subjectsData[scheme]?.[semester] || [];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-center mb-4">
//         {scheme} Scheme - {semester} Subjects
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {subjects.map((subject, index) => (
//           <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
//             <h2 className="text-lg font-semibold">{subject}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SemesterPage;

