// import React from "react";
// import { useParams } from "react-router-dom";

// const ModulePage = () => {
//     const { year, semester, branch, subjectCode } = useParams();

//     // Replace this with your actual module and link data fetching logic
//     const getModuleData = (year, semester, branch, subjectCode) => {
//         // Example data - adapt this based on your data storage
//         if (year === "2024" && semester === "S5" && branch === "cse" && subjectCode === "CST301") {
//             return [
//                 { module: "Module 1", syllabus: "link-to-syllabus-module1.pdf", notes: "link-to-notes-module1.pdf", pyq: "link-to-pyq-module1.pdf", video: "link-to-video-module1" },
//                 { module: "Module 2", syllabus: "link-to-syllabus-module2.pdf", notes: "link-to-notes-module2.pdf", pyq: "link-to-pyq-module2.pdf", video: "link-to-video-module2" },
//                 { module: "Module 3", syllabus: "link-to-syllabus-module3.pdf", notes: "link-to-notes-module3.pdf", pyq: "link-to-pyq-module3.pdf", video: "link-to-video-module3" },
//                 { module: "Module 4", syllabus: "link-to-syllabus-module4.pdf", notes: "link-to-notes-module4.pdf", pyq: "link-to-pyq-module4.pdf", video: "link-to-video-module4" },
//                 { module: "Module 5", syllabus: "link-to-syllabus-module5.pdf", notes: "link-to-notes-module5.pdf", pyq: "link-to-pyq-module5.pdf", video: "link-to-video-module5" },
//             ];
//         }
//         // Add data for other subjects
//         return [];
//     };

//     const moduleData = getModuleData(year, semester, branch, subjectCode);

//     return (
//         <div className="min-h-screen bg-gray-100 py-6">
//             <div className="container mx-auto p-4">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-4">
//                     {/* You might want to fetch the subject name based on the subjectCode */}
//                     {subjectCode.toUpperCase()} - Modules
//                 </h1>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white shadow-md rounded-lg">
//                         <thead className="bg-gray-200">
//                             <tr>
//                                 <th className="px-4 py-2 text-left">Module</th>
//                                 <th className="px-4 py-2 text-center">Syllabus</th>
//                                 <th className="px-4 py-2 text-center">Notes</th>
//                                 <th className="px-4 py-2 text-center">PYQ</th>
//                                 <th className="px-4 py-2 text-center">Video Lectures</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {moduleData.map((item, index) => (
//                                 <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
//                                     <td className="px-4 py-2 text-left">{item.module}</td>
//                                     <td className="px-4 py-2 text-center">
//                                         {item.syllabus && (
//                                             <a href={item.syllabus} download className="text-blue-500 hover:underline">
//                                                 <span role="img" aria-label="download">🔗</span> Link
//                                             </a>
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-2 text-center">
//                                         {item.notes && (
//                                             <a href={item.notes} download className="text-blue-500 hover:underline">
//                                                 <span role="img" aria-label="download">🔗</span> Link
//                                             </a>
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-2 text-center">
//                                         {item.pyq && (
//                                             <a href={item.pyq} download className="text-blue-500 hover:underline">
//                                                 <span role="img" aria-label="download">🔗</span> Link
//                                             </a>
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-2 text-center">
//                                         {item.video && (
//                                             <a href={item.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                                                 <span role="img" aria-label="video">🔗</span> Link
//                                             </a>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                             {moduleData.length === 0 && (
//                                 <tr>
//                                     <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
//                                         No module data found for this subject.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ModulePage;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ModulePage = () => {
  const { subjectCode } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/modules/${subjectCode}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResources(data);
      } catch (e) {
        setError(e.message);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [subjectCode]);

  if (loading) {
    return <div>Loading module data...</div>;
  }

  if (error) {
    return <div>Error loading module data: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-5">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{subjectCode.toUpperCase()} - Modules</h1>
        <table className="min-w-full leading-normal shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Module</th>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Syllabus</th>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes</th>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">PYQ</th>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Video Lectures</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((moduleItem, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b text-sm">{moduleItem.module}</td>
                <td className="px-5 py-5 border-b text-sm">
                  {moduleItem.syllabus ? (
                    <a href={moduleItem.syllabus} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Link
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
                <td className="px-5 py-5 border-b text-sm">
                  {moduleItem.notes ? (
                    <a href={moduleItem.notes} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                      Link
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
                <td className="px-5 py-5 border-b text-sm">
                  {moduleItem.pyq ? (
                    <a href={moduleItem.pyq} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                      Link
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
                <td className="px-5 py-5 border-b text-sm">
                  {moduleItem.video_lecture ? (
                    <a href={moduleItem.video_lecture} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                      Link
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModulePage;