// import React, { createContext, useContext, useEffect, useState } from "react";

// // LocalStorage keys
// const LS_USERS = "app_users";
// const LS_CURRENT = "currentUser";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(LS_CURRENT)) || null;
//     } catch {
//       return null;
//     }
//   });

//   // Ensure there's at least one seeded admin user (S-Lite)
//   useEffect(() => {
//     try {
//       const existing = JSON.parse(localStorage.getItem(LS_USERS));
//       if (!existing || !Array.isArray(existing) || existing.length === 0) {
//         const seed = [
//           { username: "admin", password: "admin123", role: "admin" }, // default admin
//           { username: "user", password: "user123", role: "user" },
//         ];
//         localStorage.setItem(LS_USERS, JSON.stringify(seed));
//       }
//     } catch (err) {
//       console.error("Auth: failed to seed users", err);
//     }
//   }, []);

//   // Helpers
//   const login = (username, password) => {
//     const users = JSON.parse(localStorage.getItem(LS_USERS)) || [];
//     const found = users.find(
//       (u) => u.username === username && u.password === password
//     );
//     if (found) {
//       localStorage.setItem(LS_CURRENT, JSON.stringify(found));
//       setUser(found);
//       return { ok: true, user: found };
//     }
//     return { ok: false, error: "Invalid credentials" };
//   };

//   const logout = () => {
//     localStorage.removeItem(LS_CURRENT);
//     setUser(null);
//   };

//   const getAllUsers = () => {
//     return JSON.parse(localStorage.getItem(LS_USERS)) || [];
//   };

//   const addUser = (newUser) => {
//     // newUser: { username, password, role }
//     const users = getAllUsers();
//     if (users.find((u) => u.username === newUser.username)) {
//       return { ok: false, error: "Username already exists" };
//     }
//     users.push(newUser);
//     localStorage.setItem(LS_USERS, JSON.stringify(users));
//     return { ok: true };
//   };

//   const promoteUser = (username) => {
//     const users = getAllUsers();
//     const idx = users.findIndex((u) => u.username === username);
//     if (idx === -1) return { ok: false, error: "User not found" };
//     users[idx].role = "admin";
//     localStorage.setItem(LS_USERS, JSON.stringify(users));

//     // If promoted user is currently logged-in, update currentUser
//     const current = JSON.parse(localStorage.getItem(LS_CURRENT));
//     if (current && current.username === username) {
//       const updated = { ...current, role: "admin" };
//       localStorage.setItem(LS_CURRENT, JSON.stringify(updated));
//       setUser(updated);
//     }

//     return { ok: true };
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         getAllUsers,
//         addUser,
//         promoteUser,
//         isAdmin: !!(user && user.role === "admin"),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
