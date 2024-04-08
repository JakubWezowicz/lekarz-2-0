import React from "react";
import ReactDOM from "react-dom";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { createBrowserRouter } from "react-router-dom";

import "./style.css";
import Home from "./views/home";
import NotFound from "./views/not-found";
import FindDoctor from "./views/FindDoctor/FindDoctor";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Contact from "./views/Contact/Contact";
import Profile from "./views/Profile/Profile";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="contact" element={<Contact />} />
      <Route path="find-doctor" element={<FindDoctor />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};

ReactDOM.render(<App />, document.getElementById("app"));
