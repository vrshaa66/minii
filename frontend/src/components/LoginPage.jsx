// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setUser }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Dummy authentication logic
//     if (role === "admin" && email === "admin@site.com" && password === "admin123") {
//       setUser("admin");
//       navigate("/home");
//     } else if (role === "student") {
//       setUser("student");
//       navigate("/home");
//     } else {
//       alert("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block mb-1">Role:</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full border p-2 rounded"
//             >
//               <option value="student">Student</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
