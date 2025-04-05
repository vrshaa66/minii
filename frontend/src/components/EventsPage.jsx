

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const EventsPage = () => {
//     const navigate = useNavigate();
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/approved-events");
//                 const data = await response.json();
//                 setEvents(data);
//             } catch (error) {
//                 console.error("Error fetching events:", error);
//             }
//         };

//         fetchEvents();
//     }, []);

//     const upcomingEvents = events.filter((event) => {
//         const deadline = new Date(event.deadline);
//         const today = new Date();
//         return deadline > today;
//     });

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-center text-2xl font-bold mb-4">Upcoming Events</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {upcomingEvents.map((event, index) => (
//                     <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
//                         <img
//                             src={`http://localhost:5000/uploads/${event.event_image}`} // Corrected URL
//                             alt={event.event_name}
//                             className="w-full h-40 object-cover rounded-lg"
//                         />
//                         <h3 className="text-lg font-bold mt-2">{event.event_name}</h3>
//                         <p>
//                             <strong>Venue:</strong> {event.venue}
//                         </p>
//                         <p>
//                             <strong>Deadline:</strong> {event.deadline}
//                         </p>
//                         <a href={event.apply_link} className="text-blue-500">
//                             Apply Here
//                         </a>
//                     </div>
//                 ))}
//             </div>
//             {/* Upload Event Button */}
//             <div className="text-center mt-6">
//                 <button
//                     onClick={() => navigate("/upload-event")}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
//                 >
//                     Upload Event
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default EventsPage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:5000/approved-events");
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const upcomingEvents = events.filter((event) => {
        const deadline = new Date(event.deadline);
        const today = new Date();
        return deadline > today;
    });

    const handleEventClick = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-center text-2xl font-bold mb-4">Upcoming Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map((event, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div
                            onClick={() => handleEventClick(event.id)}
                            className="cursor-pointer"
                        >
                            <img
                                src={`http://localhost:5000/uploads/${event.event_image}`} // Corrected URL
                                alt={event.event_name}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                        </div>
                        <h3 className="text-lg font-bold mt-2">{event.event_name}</h3>
                        <p>
                            <strong>Venue:</strong> {event.venue}
                        </p>
                        <p>
                            <strong>Deadline:</strong> {new Date(event.deadline).toLocaleDateString()}
                        </p>
                        <a href={event.apply_link} className="text-blue-500">
                            Apply Here
                        </a>
                    </div>
                ))}
            </div>
            {/* Upload Event Button */}
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate("/upload-event")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                >
                    Upload Event
                </button>
            </div>
        </div>
    );
};

export default EventsPage;