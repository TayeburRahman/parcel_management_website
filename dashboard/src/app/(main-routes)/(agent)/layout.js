"use client"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react"; 
import { useSelector } from "react-redux";

const AgentLayout = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => { 
   
    if (!token || !user || user?.role !== "AGENT") {
      router.replace("/auth/login");
    }
  }, [token, user, router]);
 
  if (token && user && user?.role === "AGENT") {
    return <>{children}</>;
  }

  return null;  
};

export default AgentLayout;
