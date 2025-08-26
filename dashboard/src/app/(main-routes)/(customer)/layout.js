"use client"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react"; 
import { useSelector } from "react-redux";

const CustomerLayout = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => { 
   
    if (!token || !user || user?.role !== "CUSTOMERS") {
      router.replace("/auth/login");
    }
  }, [token, user, router]);
 
  if (token && user && user?.role === "CUSTOMERS") {
    return <>{children}</>;
  }

  return null;  
};

export default CustomerLayout;
