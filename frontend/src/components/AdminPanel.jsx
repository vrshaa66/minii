

import { useState, useEffect } from "react";

const AdminPanel = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:5000/all-events");
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleApprove = async (id, approved) => {
        try {
            await fetch(`http://localhost:5000/approve-event/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ approved }),
            });
            // Refresh events
            const response = await fetch("http://localhost:5000/all-events");
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error updating approval:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            await fetch(`http://localhost:5000/delete-event/${id}`, {
                method: "DELETE",
            });
            // Remove the event from the state
            setEvents(events.filter((event) => event.id !== id));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-center text-2xl font-bold mb-4">Admin Panel</h2>

            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                            Event Name
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                            Venue
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                            Deadline
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                            Approval
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td className="px-5 py-5 border-b">{event.event_name}</td>
                            <td className="px-5 py-5 border-b">{event.venue}</td>
                            <td className="px-5 py-5 border-b">{event.deadline}</td>
                            <td className="px-5 py-5 border-b">
                                {event.approved ? "Approved" : "Pending"}
                            </td>
                            <td className="px-5 py-5 border-b">
                                <button
                                    onClick={() => handleApprove(event.id, true)}
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(event.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;