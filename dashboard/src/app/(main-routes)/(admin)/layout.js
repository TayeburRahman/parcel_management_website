"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => { 
    if (!token || !user ) {
      router.replace("/auth/login");
    }
    if (token && user && (user?.role === "CUSTOMERS")) {
        router.replace("/parcel-booking");
    return;
  }
    if (token && user && (user?.role === "AGENT")) {
        router.replace("/assigned-parcel");
    return;
  }
     
  }, [token, user, router]);
 
  if (token && user && (user?.role === "SUPER_ADMIN" || user?.role === "ADMIN")) {
    return <>{children}</>;
  }

  return null;
};

export default AdminLayout;
