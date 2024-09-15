import { useState } from "react";
import AuthHeader from "../components/AuthHeader";
import InputBox from "../components/InputBox";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import useSignup from "../hooks/useSignup";
import { useRecoilState } from "recoil";
import { signupAtom } from "../store/recoil";
import useCheckAuth from "../hooks/useCheckAuth";

interface stepType {
  next: boolean;
}

const Signup = () => {
  const [next, setNext] = useState(false);
  const { error, sendReq, loading } = useSignup();
  const { } = useCheckAuth();
  return (
    <>
      <section className="text-gray-600 body-font relative">
        <Step next={next} />
        <div className="container max-w-[900px] px-5 py-24 pb-6 mx-auto">
          <AuthHeader type="signup" />
          <div className="text-red-500 font-mono text-center h-6">{error}</div>
          {!next ? <Page1 /> : <Page2 />}
        </div>
      </section>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setNext(!next)}
          className="flex justify-center items-center text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"
        >
          {!next ? (
            <GrFormNext fontSize={26} />
          ) : (
            <GrFormPrevious fontSize={26} />
          )}
        </button>
        <button
          onClick={sendReq}
          className={`${next ? "block" : "hidden"
            } flex text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg`}
        >
          {loading ? (
            <span className="w-6 h-6 border-4 border-transparent animate-spin flex items-center justify-center border-t-gray-50 rounded-full"></span>
          ) : (
            <span>Signup</span>
          )}
        </button>
      </div>
    </>
  );
};

export default Signup;

const Step = ({ next }: stepType) => {
  return (
    <>
      <div className="flex justify-center w-full">
        <a
          className={`cursor-not-allowed sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none ${next
              ? "border-gray-200 hover:text-gray-900 tracking-wider"
              : "bg-gray-100 border-green-500 text-green-500 tracking-wider rounded-t"
            }`}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5 mr-3"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          STEP 1
        </a>
        <a
          className={`cursor-not-allowed sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none ${!next
              ? "border-gray-200 hover:text-gray-900 tracking-wider"
              : "bg-gray-100 border-green-500 text-green-500 tracking-wider rounded-t"
            }`}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5 mr-3"
            viewBox="0 0 24 24"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          STEP 2
        </a>
      </div>
    </>
  );
};

const Page1 = () => {
  const [values, setValues] = useRecoilState(signupAtom);
  return (
    <>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
          <div className="p-2 w-1/2">
            <InputBox
              label="firstname"
              onChange={(e) =>
                setValues({
                  ...values,
                  firstname: e.target.value,
                })
              }
            />
          </div>
          <div className="p-2 w-1/2">
            <InputBox
              label="lastname"
              onChange={(e) =>
                setValues({
                  ...values,
                  lastname: e.target.value,
                })
              }
            />
          </div>
          <div className="p-2 w-full">
            <InputBox
              label="username"
              onChange={(e) =>
                setValues({
                  ...values,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className="p-2 w-full">
            <InputBox
              label="bio"
              onChange={(e) =>
                setValues({
                  ...values,
                  bio: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Page2 = () => {
  const [values, setValues] = useRecoilState(signupAtom);
  return (
    <>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
          <div className="p-2 w-full">
            <InputBox
              label="email"
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) =>
                setValues({
                  ...values,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="p-2 w-full">
            <InputBox
              label="password"
              type="password"
              placeholder="••••••••"
              onChange={(e) =>
                setValues({
                  ...values,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="h-[85px] w-full"></div>
        </div>
      </div>
    </>
  );
};
