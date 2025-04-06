

import React from "react";
import { useParams, Link } from "react-router-dom";

const SubjectPage = () => {
    const { year, semester, branch } = useParams();

    const getSubjects = (year, semester, branch) => {
        if (year === "2024" && semester === "S5" && branch === "cse") {
            return [
                { name: "Formal Languages & Automata Theory", code: "CST301" }, // Added a unique code
                { name: "Management of Software Systems", code: "CST303" },
                { name: "Microprocessors and Microcontrollers", code: "ECT305" },
                { name: "Computer Networks", code: "CST307" },
                { name: "System Software", code: "CST309" },
                { name: "Disaster Management", code: "MOT301" },
            ];
        }
        
        return [];
    };

    const subjects = getSubjects(year, semester, branch);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                KTU {semester} - {branch.toUpperCase()} | {year} Scheme
            </h1>
            <p className="text-blue-600 mb-6">Select a Subject</p>
            <div className="flex flex-col items-center space-y-3">
                {subjects.map((subject) => (
                    <Link
                        key={subject.code} // Use a unique identifier as key
                        to={`/scheme/${year}/${semester}/${branch}/${subject.code}`} // Link to the module page
                        className="bg-white shadow-md rounded-lg p-4 w-full md:w-96 text-left hover:shadow-xl transition"
                    >
                        <span className="font-semibold">{subject.name}</span>
                    </Link>
                ))}
                {subjects.length === 0 && (
                    <p className="text-gray-500">No subjects found for this selection.</p>
                )}
            </div>
        </div>
    );
};

export default SubjectPage;

// SubjectPage.jsx (Modified to fetch subjects from the backend)
