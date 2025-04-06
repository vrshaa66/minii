


import React from "react";
import { useParams, Link } from "react-router-dom";

const BranchPage = () => {
    const { year, semester } = useParams(); // Get scheme year and semester from URL

    // List of branches
    const branches = [
        { name: "MECH", icon: "⚙️" },
        { name: "CIVIL", icon: "🏠" },
        { name: "IT", icon: "🖥️" },
        { name: "CSE", icon: "💻" },
        { name: "ECE", icon: "📡" },
        { name: "EEE", icon: "💡" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                KTU {semester}  | {year} Scheme
            </h1>
            <p className="text-blue-600 mb-6">Select Your Branch</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {branches.map(({ name, icon }) => (
                    <Link
                        key={name}
                        to={`/scheme/${year}/${semester}/${name.toLowerCase()}`}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition"
                    >
                        <div className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
                            {icon}
                        </div>
                        <p className="mt-3 text-lg font-semibold">{name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BranchPage;