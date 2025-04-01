// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

// const EventsSection = () => {
//   return (
//     <div>
//     <Navbar/>
   
//     <div className="p-4">
//       <Link to="/events">
//         <div className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
//           <h2 className="text-xl font-bold text-center text-black">Events</h2>
//           <p className="text-center text-gray-600">View all events</p>
          
//         </div>
//       </Link>
//     </div>
// </div>
//   );
// };

// export default EventsSection;
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

// const EventsSection = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="p-4">
//         <Link to="/events">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
//             <h2 className="text-xl font-bold text-center text-black">Events</h2>
//             <p className="text-center text-gray-600">View all events</p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default EventsSection;
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const EventsSection = ({ user }) => {
  return (
    <div>
      <Navbar user={user} />
      <div className="p-4">
        <Link to="/events">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200">
            <h2 className="text-xl font-bold text-center text-black">Events</h2>
            <p className="text-center text-gray-600">View all events</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventsSection;