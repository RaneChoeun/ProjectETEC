// // Wrap routes that should be admin-only.
// // Usage (react-router v6):
// // <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user, isAdmin } = useAuth();

//   // Not logged in -> redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Logged in but not admin -> redirect to home with access denied
//   if (!isAdmin) {
//     // Optionally add a message or state
//     return <Navigate to="/" replace state={{ accessDenied: true }} />;
//   }

//   // Admin -> render children
//   return children;
// }
