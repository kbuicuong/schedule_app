import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import {NavRoutes} from "./utils/NavRoutes.ts";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import BookUser from "./components/BookUser";
//👇🏻 React-Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={NavRoutes.home}>
      <Route index element={<Login />} />
      <Route path={NavRoutes.register} element={<Signup />} />
      <Route path={NavRoutes.dashboard} element={<Dashboard />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer />
    </>
  );
}

export default App
