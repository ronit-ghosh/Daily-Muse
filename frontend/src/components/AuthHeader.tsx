import { useNavigate } from "react-router-dom";

interface Auth {
  type: "signup" | "signin";
}
const AuthHeader = ({ type }: Auth) => {
  const navigate = useNavigate();
  const handleNavigate = () =>
    type == "signin" ? navigate("/signup") : navigate("/signin");
  return (
    <>
      <div className="flex flex-col text-center w-full mb-6">
        <h1 className="text-4xl font-bold title-font mb-4 text-gray-900">
          {type === "signup" ? "Create an Account" : "Log into Your Account"}
        </h1>
        <div className="flex justify-center items-center gap-1">
          <span className="">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
          </span>
          <span onClick={handleNavigate} className="underline cursor-pointer">
            {type === "signup" ? "Signin" : "Signup"}
          </span>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
