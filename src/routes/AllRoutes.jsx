import { Route, Routes } from "react-router-dom";
import ChatApp from "../pages/ChatApp";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/chatApp" element={
        <PrivateRoute>
        <ChatApp /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
