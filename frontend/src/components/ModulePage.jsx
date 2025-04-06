import React from "react";
import { useParams } from "react-router-dom";

const ModulePage = () => {
    const { year, semester, branch, subjectCode } = useParams();

    // Replace this with your actual module and link data fetching logic
    const getModuleData = (year, semester, branch, subjectCode) => {
        // Example data - adapt this based on your data storage
        if (year === "2024" && semester === "S5" && branch === "cse" && subjectCode === "CST301") {
            return [
                { module: "Module 1", syllabus: "link-to-syllabus-module1.pdf", notes: "link-to-notes-module1.pdf", pyq: "link-to-pyq-module1.pdf", video: "link-to-video-module1" },
                { module: "Module 2", syllabus: "link-to-syllabus-module2.pdf", notes: "link-to-notes-module2.pdf", pyq: "link-to-pyq-module2.pdf", video: "link-to-video-module2" },
                { module: "Module 3", syllabus: "link-to-syllabus-module3.pdf", notes: "link-to-notes-module3.pdf", pyq: "link-to-pyq-module3.pdf", video: "link-to-video-module3" },
                { module: "Module 4", syllabus: "link-to-syllabus-module4.pdf", notes: "link-to-notes-module4.pdf", pyq: "link-to-pyq-module4.pdf", video: "link-to-video-module4" },
                { module: "Module 5", syllabus: "link-to-syllabus-module5.pdf", notes: "link-to-notes-module5.pdf", pyq: "link-to-pyq-module5.pdf", video: "link-to-video-module5" },
            ];
        }
        // Add data for other subjects
        return [];
    };

    const moduleData = getModuleData(year, semester, branch, subjectCode);

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    {/* You might want to fetch the subject name based on the subjectCode */}
                    {subjectCode.toUpperCase()} - Modules
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left">Module</th>
                                <th className="px-4 py-2 text-center">Syllabus</th>
                                <th className="px-4 py-2 text-center">Notes</th>
                                <th className="px-4 py-2 text-center">PYQ</th>
                                <th className="px-4 py-2 text-center">Video Lectures</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moduleData.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                    <td className="px-4 py-2 text-left">{item.module}</td>
                                    <td className="px-4 py-2 text-center">
                                        {item.syllabus && (
                                            <a href={item.syllabus} download className="text-blue-500 hover:underline">
                                                <span role="img" aria-label="download">🔗</span> Link
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.notes && (
                                            <a href={item.notes} download className="text-blue-500 hover:underline">
                                                <span role="img" aria-label="download">🔗</span> Link
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.pyq && (
                                            <a href={item.pyq} download className="text-blue-500 hover:underline">
                                                <span role="img" aria-label="download">🔗</span> Link
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.video && (
                                            <a href={item.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                <span role="img" aria-label="video">🔗</span> Link
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {moduleData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                                        No module data found for this subject.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ModulePage;
