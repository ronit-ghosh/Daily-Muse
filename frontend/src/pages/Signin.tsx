import { useRecoilState } from "recoil";
import AuthHeader from "../components/AuthHeader";
import InputBox from "../components/InputBox";
import { signinAtom } from "../store/recoil";
import useSignin from "../hooks/useSignin";
import useCheckAuth from "../hooks/useCheckAuth";

const Signin = () => {
  const [values, setValues] = useRecoilState(signinAtom);
  const { error, sendReq, loading } = useSignin();
  const { } = useCheckAuth();

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container max-w-[900px] px-5 py-24 pb-6 mx-auto">
          <AuthHeader type="signin" />
          <div className="text-red-500 font-mono text-center h-6">{error}</div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <InputBox
                  onChange={(e) => {
                    setValues({
                      ...values,
                      email: e.target.value,
                    });
                  }}
                  label="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="p-2 w-full">
                <InputBox
                  onChange={(e) => {
                    setValues({
                      ...values,
                      password: e.target.value,
                    });
                  }}
                  label="password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center gap-2">
        <button
          onClick={sendReq}
          className="flex text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
        >
          {loading ? (
            <span className="w-6 h-6 border-4 border-transparent animate-spin flex items-center justify-center border-t-gray-50 rounded-full"></span>
          ) : (
            <span>Login</span>
          )}
        </button>
      </div>
    </>
  );
};

export default Signin;
