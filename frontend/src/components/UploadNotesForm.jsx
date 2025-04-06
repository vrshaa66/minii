import React, { useState } from 'react';

const UploadNotesForm = () => {
    const [formData, setFormData] = useState({
        uploader_name: '',
        college: '',
        subject: '',
        scheme: '',
        branch: '',
        semester: '',
        email: '',
        whatsapp_number: '',
        copyright_name: '',
        notes_file: null,
    });
    const [uploadStatus, setUploadStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadStatus('Uploading...');

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:5000/api/upload-notes', { // Adjust the API endpoint
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setUploadStatus('Notes uploaded successfully!');
                setFormData({ // Reset the form
                    uploader_name: '',
                    college: '',
                    subject: '',
                    scheme: '',
                    branch: '',
                    semester: '',
                    email: '',
                    copyright_name: '',
                    notes_file: null,
                });
            } else {
                const errorData = await response.json();
                setUploadStatus(`Upload failed: ${errorData.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('Upload failed: Could not connect to the server.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">UPLOAD NOTES</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="uploader_name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" id="uploader_name" name="uploader_name" value={formData.uploader_name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="college" className="block text-gray-700 text-sm font-bold mb-2">College</label>
                        <input type="text" id="college" name="college" value={formData.college} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="scheme" className="block text-gray-700 text-sm font-bold mb-2">Scheme</label>
                            <select id="scheme" name="scheme" value={formData.scheme} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">Select</option>
                                <option value="2019">2019</option>
                                <option value="2024">2024</option>
                                {/* Add more schemes as needed */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="branch" className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                            <select id="branch" name="branch" value={formData.branch} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">Select</option>
                                <option value="CSE">CSE</option>
                                <option value="MECH">MECH</option>
                                <option value="ECE">ECE</option>
                                <option value="CIVIL">CIVIL</option>
                                <option value="IT">IT</option>
                                <option value="EEE">EEE</option>
                                {/* Add more branches */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="semester" className="block text-gray-700 text-sm font-bold mb-2">Semester</label>
                            <select id="semester" name="semester" value={formData.semester} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">Select</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                                <option value="S4">S4</option>
                                <option value="S5">S5</option>
                                <option value="S6">S6</option>
                                <option value="S7">S7</option>
                                <option value="S8">S8</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email*</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="E.g., john@doe.com" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="copyright_name" className="block text-gray-700 text-sm font-bold mb-2">Copyright Name (If the copy credits need to be mentioned)</label>
                        <input type="text" id="copyright_name" name="copyright_name" value={formData.copyright_name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="If the copy credits need to be mentioned" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="notes_file" className="block text-gray-700 text-sm font-bold mb-2">Upload file*</label>
                        <input type="file" id="notes_file" name="notes_file" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            SUBMIT
                        </button>
                        {uploadStatus && <p className="text-sm text-gray-600">{uploadStatus}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadNotesForm;