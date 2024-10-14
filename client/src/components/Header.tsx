import {useLocation, useResolvedPath} from "react-router-dom";
import {NavRoutes} from "../utils/NavRoutes.ts";

export function Header() {

  const location = useLocation();
  const resolvedPath = useResolvedPath(location).pathname;

  const active = 'text-gray-800 transition-colors duration-300 transform border-b-2 border-blue-500 mx-1.5 sm:mx-6';
  const inactive = 'border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform hover:border-blue-500 mx-1.5 sm:mx-6';

  return (
    <header>
      <nav className="bg-white shadow">
        <div
          className="container flex items-center justify-between p-6 mx-auto text-gray-600 capitalize p-1.5 ">
          {/*<a href="#">*/}
          {/*  <img style={{width: "100px"}} src="/logo.png" alt=""/>*/}
          {/*</a>*/}

          <a href={NavRoutes.home}>
            <h3 style={{color: "#144BC8", fontWeight: "600"}}>Nails by <br/> <span style={{fontSize: "25px"}}>Tony</span></h3>
          </a>
          <div className='capitalize text-gray-600'>
            <a href={NavRoutes.home}
               className={resolvedPath === NavRoutes.home ? active : inactive}>Home</a>

            <a href={NavRoutes.about}
               className={resolvedPath === NavRoutes.about ? active : inactive}>About</a>

            <a href={NavRoutes.appointment}
               className={resolvedPath === NavRoutes.appointment ? active : inactive}>Appointment</a>
          </div>

        </div>
      </nav>
    </header>
  );
}
