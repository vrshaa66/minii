import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/all-events`); // Fetch all events and filter
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const selectedEvent = data.find(e => e.id === parseInt(id));
                if (selectedEvent) {
                    setEvent(selectedEvent);
                } else {
                    setError("Event not found");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    if (loading) {
        return <div className="container mx-auto p-6 text-center">Loading event details...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-6 text-center text-red-500">Error: {error}</div>;
    }

    if (!event) {
        return <div className="container mx-auto p-6 text-center">Event not found.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <h2 className="text-2xl font-bold mb-4">{event.event_name}</h2>
                {event.event_image && (
                    <img
                        src={`http://localhost:5000/uploads/${event.event_image}`}
                        alt={event.event_name}
                        className="w-full h-60 object-cover rounded-lg mb-4"
                    />
                )}
                <p className="mb-2">
                    <strong>Venue:</strong> {event.venue}
                </p>
                <p className="mb-2">
                    <strong>Deadline:</strong> {new Date(event.deadline).toLocaleDateString()}
                </p>
                <p className="mb-4">
                    <strong>Additional Information:</strong> {event.additional_info}
                </p>
                <a href={event.apply_link} className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Apply Here
                </a>
            </div>
        </div>
    );
};

export default EventDetailsPage;