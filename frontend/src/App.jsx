
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from "./components/LoginPage";
// import SignUpPage from "./components/SignUpPage";
// import EventsPage from "./components/EventsPage";
// import UploadEventPage from "./components/UploadEventPage";
// import EventsSection from "./components/EventSection";
// import Navbar from "./components/Navbar";
// import SchemePage from "./components/SchemePage";
// import BranchPage from "./components/BranchPage";
// import AdminPanel from "./components/AdminPanel";
// import VerifyEmailPage from "./components/VerifyEmailPage";
// import EventDetailsPage from "./components/EventDetailsPage";
// import SubjectPage from "./components/SubjectPage";
// import ModulePage from "./components/ModulePage";
// import UploadNotesForm from "./components/UploadNotesForm";
// import MorePage from "./components/MorePage"; // Import the new MorePage component

// const App = () => {
//   const [user, setUser] = useState(null);
//   console.log("App User:", user);

//   const isAdmin = user && user.isAdmin;

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       fetch("http://localhost:5000/verify-token", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             localStorage.removeItem("token");
//             setUser(null);
//             return null;
//           }
//         })
//         .then((data) => {
//           if (data) {
//             setUser({
//               email: data.email,
//               isAdmin: data.isAdmin,
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Token verification error:", error);
//           localStorage.removeItem("token");
//           setUser(null);
//         });
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage setUser={setUser} />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/verify/:token" element={<VerifyEmailPage />} />

//         {user ? (
//           <>
//             {/* All routes that require authentication are nested here */}
//             <Route
//               path="/events"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <EventsPage />
//                 </div>
//               }
//             />
//             <Route
//               path="/upload-event"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <UploadEventPage />
//                 </div>
//               }
//             />
//             <Route
//               path="/scheme/:year"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <SchemePage />
//                 </div>
//               }
//             />
//             <Route
//               path="/scheme/:year/:semester"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <BranchPage />
//                 </div>
//               }
//             />
//             <Route
//               path="/scheme/:year/:semester/:branch"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <SubjectPage />
//                 </div>
//               }
//             />
//             <Route
//               path="/scheme/:year/:semester/:branch/:subjectCode"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <ModulePage />
//                 </div>
//               }
//             />
//             <Route
//               path="/upload-notes"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <UploadNotesForm />
//                 </div>
//               }
//             />
//             <Route
//               path="/admin"
//               element={
//                 isAdmin ? (
//                   <div>
//                     <Navbar user={user} />
//                     <AdminPanel />
//                   </div>
//                 ) : (
//                   <Navigate to="/login" replace />
//                 )
//               }
//             />
//             <Route
//               path="/event/:id"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <EventDetailsPage />
//                 </div>
//               }
//             />
//             <Route
//               path="/more"
//               element={
//                 <div>
//                   <Navbar user={user} />
//                   <MorePage user={user} /> {/* Pass the user prop */}
//                 </div>
//               }
//             />
//             {/* Add other authenticated routes here, wrapped with Navbar */}
//             <Route path="*" element={<Navigate to="/events" replace />} /> {/* Redirect any other authenticated route to /events */}
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import EventsPage from "./components/EventsPage";
import UploadEventPage from "./components/UploadEventPage";
import EventsSection from "./components/EventSection";
import Navbar from "./components/Navbar";
import SchemePage from "./components/SchemePage";
import BranchPage from "./components/BranchPage";
import AdminPanel from "./components/AdminPanel";
import VerifyEmailPage from "./components/VerifyEmailPage";
import EventDetailsPage from "./components/EventDetailsPage";
import SubjectPage from "./components/SubjectPage";
import ModulePage from "./components/ModulePage";
import UploadNotesForm from "./components/UploadNotesForm";
import MorePage from "./components/MorePage"; // Import the new MorePage component

const App = () => {
  const [user, setUser] = useState(null);
  console.log("App User:", user);

  const isAdmin = user && user.isAdmin;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            localStorage.removeItem("token");
            setUser(null);
            return null;
          }
        })
        .then((data) => {
          if (data) {
            setUser({
              email: data.email,
              isAdmin: data.isAdmin,
            });
          }
        })
        .catch((error) => {
          console.error("Token verification error:", error);
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/verify/:token" element={<VerifyEmailPage />} />

        {user ? (
          <>
            {/* All routes that require authentication are nested here */}
            <Route
              path="/events"
              element={
                <div>
                  <Navbar user={user} />
                  <EventsPage />
                </div>
              }
            />
            <Route
              path="/upload-event"
              element={
                <div>
                  <Navbar user={user} />
                  <UploadEventPage />
                </div>
              }
            />
            <Route
              path="/scheme/:year"
              element={
                <div>
                  <Navbar user={user} />
                  <SchemePage />
                </div>
              }
            />
            <Route
              path="/scheme/:year/:semester"
              element={
                <div>
                  <Navbar user={user} />
                  <BranchPage />
                </div>
              }
            />
            <Route
              path="/scheme/:year/:semester/:branch"
              element={
                <div>
                  <Navbar user={user} />
                  <SubjectPage />
                </div>
              }
            />
            <Route
              path="/scheme/:year/:semester/:branch/:subjectCode"
              element={
                <div>
                  <Navbar user={user} />
                  <ModulePage /> {/* Using the database-driven ModulePage */}
                </div>
              }
            />
            <Route
              path="/upload-notes"
              element={
                <div>
                  <Navbar user={user} />
                  <UploadNotesForm />
                </div>
              }
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <div>
                    <Navbar user={user} />
                    <AdminPanel />
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/event/:id"
              element={
                <div>
                  <Navbar user={user} />
                  <EventDetailsPage />
                </div>
              }
            />
            <Route
              path="/more"
              element={
                <div>
                  <Navbar user={user} />
                  <MorePage user={user} /> {/* Pass the user prop */}
                </div>
              }
            />
            {/* Add other authenticated routes here, wrapped with Navbar */}
            <Route path="*" element={<Navigate to="/events" replace />} /> {/* Redirect any other authenticated route to /events */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;