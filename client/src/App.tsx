import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import {NavRoutes} from "./utils/NavRoutes.ts";
import Appointment from "./components/Appointment.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
//👇🏻 React-Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login.tsx";
import {Layout} from "./components/Layout.tsx";
import {About} from "./components/About.tsx";
import {Home} from "./components/Home.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={NavRoutes.home}>
      <Route path={NavRoutes.login} element={<Login />} />
      <Route element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path={NavRoutes.about} element={<About/>} />
        <Route path={NavRoutes.appointment} element={<Appointment/>} />
      </Route>
      <Route path={NavRoutes.login} element={<Login />} />
      {/*<Route path={NavRoutes.register} element={<Signup />} />*/}
    </Route>
  )
)

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App
