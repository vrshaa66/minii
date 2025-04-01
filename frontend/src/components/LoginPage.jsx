
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthPage = ({ setUser }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const navigate = useNavigate();

//   const handleAuth = (e) => {
//     e.preventDefault();
//     if (!isSignUp) {
//       // Dummy login logic
//       if (email === "user@site.com" && password === "password123") {
//         setUser("user");
//         navigate("/home");
//       } else {
//         alert("Invalid credentials!");
//       }
//     } else {
//       // Dummy signup logic
//       alert(`Registered with Name: ${fullName}, Email: ${email}`);
//       setIsSignUp(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {isSignUp ? "Sign Up" : "Sign In"}
//         </h2>
//         <form onSubmit={handleAuth}>
//           {isSignUp && (
//             <div className="mb-4">
//               <label className="block mb-1">Full Name:</label>
//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//             </div>
//           )}
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
//             {isSignUp ? "Sign Up" : "Sign In"}
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           {isSignUp ? "Already have an account? " : "Don't have an account? "}
//           <span
//             className="text-blue-500 cursor-pointer"
//             onClick={() => setIsSignUp(!isSignUp)}
//           >
//             {isSignUp ? "Sign In" : "Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setUser }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         setUser(email); 
//         navigate("/home");
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block mb-1">Email Address:</label>
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
//             Sign In
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <span
//             className="text-blue-500 cursor-pointer"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Response:", data); // Add this line
        localStorage.setItem("token", data.token);

        // Store isAdmin and email in the user state
        setUser({
          email: email,
          isAdmin: data.isAdmin,
        });

        navigate("/events"); // Or navigate to a default page after login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;