import {useLocation, useResolvedPath} from "react-router-dom";
import {NavRoutes} from "../utils/NavRoutes.ts";
import {AuthContext} from "../context/AuthContext.tsx";
import {useContext} from "react";

export function Header() {

  const {user} = useContext(AuthContext);
  const location = useLocation();
  const resolvedPath = useResolvedPath(location).pathname;

  const active = 'text-gray-800 transition-colors duration-300 transform border-b-2 border-blue-500 mx-1.5 sm:mx-6';
  const inactive = 'border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform hover:border-blue-500 mx-1.5 sm:mx-6';

  return (
    <header>
      <nav className="bg-white shadow">
        <div
          className="flex items-center justify-between p-6 text-gray-600 capitalize ">

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

            {user?.email === 'kbuicuong@gmail.com' && <a href={NavRoutes.dashboard}
                className={resolvedPath === NavRoutes.dashboard ? active : inactive}>Dashboard</a>}
          </div>

        </div>
      </nav>
    </header>
  );
}
