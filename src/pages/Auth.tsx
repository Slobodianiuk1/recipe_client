import {Outlet} from "react-router-dom";

const Auth = () => {

  return (
    <div className="flex justify-center pt-10">
      <Outlet />
    </div>
  );
};

export default Auth;