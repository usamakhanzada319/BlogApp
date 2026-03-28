import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  function logoutHandler() {
    authService
      .logout() // logout from AuthService  ye most of the time promises return krtyn hn jis waja sy hm yaha .then use kr raye hn
      .then(() => dispatch(logout())) // logout slice from authSlice
      .catach((error) => {
        throw error;
      });
  }
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
