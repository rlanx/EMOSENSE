import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../utils/func/userService";

const ProtectedRoute = ({ requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((data) => {
      if (data.error) {
        setUser(null);
      } else {
        setUser(data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>กำลังโหลด...</div>;

  if (!user) {
    return <Navigate to="/login" replace />; // ถ้าไม่ได้ล็อกอิน → ไปหน้า Login
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />; // ถ้า Role ไม่ตรง → ไปหน้าแรก
  }

  return <Outlet />;
};

export default ProtectedRoute;
