import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        return <Navigate to="/" replace />;
    }

    const user = JSON.parse(authToken);
    const { role } = user;

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
