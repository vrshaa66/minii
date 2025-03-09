// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import EventsSection from "./components/EventSection";
// import EventsPage from "./components/EventsPage";


// function App() {
//   return (
    
//     <Router>
//       <Routes>
//         <Route path="/" element={<EventsSection />} />
//         <Route path="/events" element={<EventsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from "./components/EventsPage";
import EventsSection from "./components/EventSection";
import UploadEventPage from "./components/UploadEventPage";

const App = () => {
  const events = [
    { name: "Think Her Hack, Hackathon", venue: "Kerala", deadline: "2025-08-12", link: "#", image: "" },
    { name: "AI Innovations Conference", venue: "Bangalore", deadline: "2025-09-15", link: "#", image: "" }
  ];

  return (
    <Router>
      <Routes>
      <Route path="/" element={<EventsSection />} />
         <Route path="/events" element={<EventsPage />} />
        {/* <Route path="/events" element={<EventsPage events={events} />} /> */}
        <Route path="/upload-event" element={<UploadEventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
