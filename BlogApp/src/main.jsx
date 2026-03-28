import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Pages/Home.jsx";
import Signup from "./components/Signup.jsx";
import AllPost from "./components/Pages/AllPost.jsx";
import Addpost from "./components/Pages/Addpost.jsx";
import EditPost from "./components/Pages/EditPost.jsx";
import Post from "./components/Pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/singup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",

        element: (
          <AuthLayout authentication>
            {""}
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <Addpost />
          </AuthLayout>
        ),
      },
      {
        path: "edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
