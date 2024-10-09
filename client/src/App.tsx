import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import {NavRoutes} from "./utils/NavRoutes.ts";
import Dashboard from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
//👇🏻 React-Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={NavRoutes.home}>
      {/*<Route index element={<Login />} />*/}
      {/*<Route path={NavRoutes.register} element={<Signup />} />*/}
      <Route index element={<Dashboard />} />
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
