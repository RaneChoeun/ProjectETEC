// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const { register } = useAuth();  // ✅ get register function from AuthContext
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();

//     const success = register(name, email, password);
//     if (!success) {
//       setError("Email already exists");
//       return;
//     }

//     navigate("/login");
//   };

//   return (
//     <div className="auth-form">
//       <h2>Create Account</h2>
//       <form onSubmit={handleRegister}>
//         {error && <p className="error">{error}</p>}
        
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
