import { Link ,useNavigate} from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();
  const events = [
    {
      id: 1,
      name: "Think Her Hack, Hackathon",
      venue: "Kerala",
      deadline: "12/08/2025",
      link: "https://google.com",
      image: "",
    },{
      id: 2,
      name: "AI Innovations Conference",
      venue: "Bangalore",
      deadline: "15/09/2025",
      link: "#",
      image: "",},
    {
      id: 1,
      name: "The ultimate AI workshop",
      venue: "Kerala",
      deadline: "13/08/2025",
      link: "#",
      image: "",
},];


const upcomingEvents = events.filter((event) => {
  const deadline = new Date(event.deadline);
  const today = new Date();
  return deadline > today;
});

  return (
  
  //   <div className="container mx-auto p-4">
  // <h2 className="text-center text-2xl font-bold mb-4">Upcoming Events</h2>
  
  // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //   {events.map((event, index) => (
  //     <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
  //       <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-lg" />
  //       <h3 className="text-lg font-bold mt-2">{event.name}</h3>
  //       <p><strong>Venue:</strong> {event.venue}</p>
  //       <p><strong>Deadline:</strong> {event.deadline}</p>
  //       <a href={event.link} className="text-blue-500">Apply Here</a>
  //     </div>
  //   ))}
  <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-bold mt-2">{event.name}</h3>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Deadline:</strong> {event.deadline}</p>
            <a href={event.link} className="text-blue-500">Apply Here</a>
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
   

