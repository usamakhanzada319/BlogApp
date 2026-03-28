import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "../store/authSlice";
{
  // yaha hm conditinal render laray gay k hmny nu is k children ko render krna h k nahi karna
}

export default function Protected({ children, authentication = true }) {
  const [Loader, Setloader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    Setloader(false);
  }, [, authentication, authStatus, navigate]);

  return Loader ? <h1>Loading....</h1> : <>{children}</>;
}
