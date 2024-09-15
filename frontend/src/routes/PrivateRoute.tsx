import { useRecoilValue } from "recoil";
import { checkAuthAtom } from "../store/recoil";
import { Navigate, Outlet } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

const PrivateRoute = () => {
  const isLoggedIn = useRecoilValue(checkAuthAtom);
  const { loading } = useCheckAuth();
  if (loading) {
    return <>
      <div className="h-dvh w-full flex justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce"></div>
          <div
            className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-.3s]"
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-.5s]"
          ></div>
        </div>
      </div>
    </>
  }
  return isLoggedIn ? <Navigate to={"/blogs"} replace={true} /> : <Outlet />;
};

export default PrivateRoute;
