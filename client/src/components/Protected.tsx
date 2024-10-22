import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {NavRoutes} from "../utils/NavRoutes.ts";

export function Protected({children}: {children: React.ReactNode}) {
  const {user} = useContext(AuthContext);
  if (!user) {
    return <Navigate to={NavRoutes.login} replace/>;
  }else if(user?.email !== "kbuicuong@gmail.com"){
    return <Navigate to={NavRoutes.login} replace/>;
  }else{
    return children;
  }

}
