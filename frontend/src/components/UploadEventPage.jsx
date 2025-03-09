import { useState } from "react";

const UploadEventPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    collegeName: "",
    idCard: null,
    eventName: "",
    venue: "",
    deadline: "",
    applyLink: "",
    eventImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">Upload Event</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        {/* Personal Details */}
        <h3 className="text-xl font-semibold mb-3">Personal Details</h3>
        <div className="mb-3">
          <label className="block text-gray-700">Name:</label>
          <input type="text" name="name" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Email:</label>
          <input type="email" name="email" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Password:</label>
          <input type="password" name="password" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">College Name:</label>
          <input type="text" name="collegeName" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Upload ID Card:</label>
          <input type="file" name="idCard" onChange={handleFileChange} className="w-full border p-2 rounded" accept="image/*" required />
        </div>

        {/* Event Details */}
        <h3 className="text-xl font-semibold mt-5 mb-3">Event Details</h3>
        <div className="mb-3">
          <label className="block text-gray-700">Event Name:</label>
          <input type="text" name="eventName" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Venue:</label>
          <input type="text" name="venue" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Deadline:</label>
          <input type="date" name="deadline" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Apply Link:</label>
          <input type="url" name="applyLink" onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Event Image (Optional):</label>
          <input type="file" name="eventImage" onChange={handleFileChange} className="w-full border p-2 rounded" accept="image/*" />
        </div>
        <div className="mb-3">
  <label className="block text-gray-700">Additional Information:</label>
  <textarea
    name="additionalInfo"
    onChange={handleChange}
    className="w-full border p-2 rounded"
    rows="4"
    placeholder="Provide more details about the event..."
  />
</div>


        {/* Submit Button */}
        <div className="text-center mt-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
            Submit Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadEventPage;
