"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Spinner } from "../loader/Spinner";

const PrivateRoute = ({ children, allowedRoles }) => {
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !user || Object.keys(user).length === 0) {
      router.push("/auth/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/auth/login");
    }
  }, [token, user, router, allowedRoles]);

  if (!token || !user || Object.keys(user).length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
