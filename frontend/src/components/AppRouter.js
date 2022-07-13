import { Routes, Route } from "react-router-dom";
import React from "react";
import { authRoutes, publicRoutes } from "../routes";
const AppRouter = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
