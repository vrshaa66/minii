
import { useState } from "react";

const UploadEventPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeName: "",
    idCard: null,
    eventName: "",
    venue: "",
    deadline: "",
    applyLink: "",
    eventImage: null,
    additionalInfo: "", // Added additionalInfo to the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      collegeName: "",
      idCard: null,
      eventName: "",
      venue: "",
      deadline: "",
      applyLink: "",
      eventImage: null,
      additionalInfo: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5000/upload-event", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        resetForm(); // Reset the form fields on successful upload
      }
    } catch (error) {
      alert("Failed to submit event");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">Upload Event</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        {/* Personal Details */}
        <h3 className="text-xl font-semibold mb-3">Personal Details</h3>
        <div className="mb-3">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">College Name:</label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Upload ID Card:</label>
          <input
            type="file"
            name="idCard"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            accept="image/*"
            required
          />
          {formData.idCard && typeof formData.idCard !== 'string' && (
            <p className="text-gray-500 text-sm mt-1">Selected file: {formData.idCard.name}</p>
          )}
        </div>

        {/* Event Details */}
        <h3 className="text-xl font-semibold mt-5 mb-3">Event Details</h3>
        <div className="mb-3">
          <label className="block text-gray-700">Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Venue:</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Apply Link:</label>
          <input
            type="url"
            name="applyLink"
            value={formData.applyLink}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Event Image (Optional):</label>
          <input
            type="file"
            name="eventImage"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            accept="image/*"
          />
          {formData.eventImage && typeof formData.eventImage !== 'string' && (
            <p className="text-gray-500 text-sm mt-1">Selected file: {formData.eventImage.name}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Additional Information:</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Provide more details about the event..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
          >
            Submit Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadEventPage;