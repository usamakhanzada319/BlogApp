import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true); //start m loding true q k application jasy hi mount ho loding state true h useEffect kuch kam kr rahah useEffect ma is state k under is ko false kary gaye
  const dispatch = useDispatch();
  //ek useEffect lo jasy ji application lo us useEffect m service lo usy pocho keya ap login ko k nahi
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // return is conditinol rendring
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO : <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null; //yeha loading handle karni h bad m;
}

export default App;
