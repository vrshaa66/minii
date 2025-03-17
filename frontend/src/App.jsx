
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import EventsPage from "./components/EventsPage";
// import EventsSection from "./components/EventSection";
// import UploadEventPage from "./components/UploadEventPage";

// const App = () => {
//   const events = [
//     { name: "Think Her Hack, Hackathon", venue: "Kerala", deadline: "2025-08-12", link: "#", image: "" },
//     { name: "AI Innovations Conference", venue: "Bangalore", deadline: "2025-09-15", link: "#", image: "" }
//   ];

//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<EventsSection />} />
//          <Route path="/events" element={<EventsPage />} />
//         {/* <Route path="/events" element={<EventsPage events={events} />} /> */}
//         <Route path="/upload-event" element={<UploadEventPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import Navbar from "./components/Navbar";
// import EventsPage from "./components/EventsPage";
// import UploadEventPage from "./components/UploadEventPage";
// import EventsSection from "./components/EventSection";

// const App = () => {
//   const [user, setUser] = useState(null); // Track user login state

//   return (
//     <Router>
//       {user && <EventsSection/>} {/* Show navbar only if user is logged in */}
//       <Routes>
//         <Route path="/login" element={<LoginPage setUser={setUser} />} />
//         {user ? (
//           <>
//             <Route path="/" element={<EventsSection />} />
//             <Route path="/events" element={<EventsPage />} />
//             <Route path="/upload-event" element={<UploadEventPage />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useState } from "react";
// import LoginPage from "./components/LoginPage";
// import EventsPage from "./components/EventsPage";
// import UploadEventPage from "./components/UploadEventPage";
// import EventsSection from "./components/EventSection";
// import Navbar from "./components/Navbar";
// import SchemePage from "./components/SchemePage"; // New feature

// const App = () => {
//   const [user, setUser] = useState(null); // Track user login state

//   return (
//     <Router>
//       {user && <EventsSection />} {/* Show navbar only if user is logged in */}
//       <Routes>
//         {/* Login Route */}
//         <Route path="/login" element={<LoginPage setUser={setUser} />} />

//         {/* Protected Routes */}
//         {user ? (
//           <>
//             <Route path="/" element={<EventsSection />} />
//             <Route path="/events" element={<EventsPage />} />
//             <Route path="/upload-event" element={<UploadEventPage />} />

//             {/* New Feature: Scheme Selection & Semesters */}
//             <Route path="/scheme/:year" element={<SchemePage />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import EventsPage from "./components/EventsPage";
import UploadEventPage from "./components/UploadEventPage";
import EventsSection from "./components/EventSection";
import Navbar from "./components/Navbar";
import SchemePage from "./components/SchemePage"; // Page to select semesters
import SemesterPage from "./components/SemesterPage"; // Page to display subjects
import SignInSide from './components/sign-in-side/SignInSide';

const App = () => {
  const [user, setUser] = useState(null); // Track user login state

  return (
    
    <Router>
      {user && <EventsSection/>} {/* Show navbar only if user is logged in */}
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<SignInSide setUser={setUser} />} />
        {/* Protected Routes */}
        {user ? (
          <>
            <Route path="/" element={<EventsSection />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/upload-event" element={<UploadEventPage />} />

            {/* New Feature: Scheme Selection & Semesters */}
            <Route path="/scheme/:year" element={<SchemePage />} />
            <Route path="/scheme/:year/semester/:sem" element={<SemesterPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

