import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
export const userContext = React.createContext();
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedinUser = localStorage.getItem("user");
    if (loggedinUser) {
      setUser(JSON.parse(loggedinUser));
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          {user ? (
            <Route path="/" element={<Home handleLogout={handleLogout} />} />
          ) : (
            <Route path="/auth/login" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
