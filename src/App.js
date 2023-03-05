import React from "react";
import { Routes, Route } from "react-router-dom";
//pages
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Translation from "./pages/Translation";
//routes
import { APP_ROUTES } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route caseSensitive path={APP_ROUTES.root} element={<Login />} />
        <Route
          caseSensitive
          element={
            <PrivateRoute>
              <Translation />
            </PrivateRoute>
          }
          path={APP_ROUTES.translate}
        />

        <Route
          caseSensitive
          path={APP_ROUTES.profile}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
