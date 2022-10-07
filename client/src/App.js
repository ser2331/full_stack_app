import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routs";
import { useAuth } from "./hooks/auth.hook";
import { Navbar } from "./components/Navbar";
import 'materialize-css';
import { Loader } from "./components/Loader";

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      userId,
      isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="App">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
