import Navbar from "../components/Navbar";
import landingImg from "../assets/landing.svg";
import { useNavigate } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

const Landing = () => {
  const navigate = useNavigate();
  const navigateToSignup = () => navigate("/signup");
  const navigateToSignin = () => navigate("/signin");
  const { } = useCheckAuth();

  return (
    <>
      <Navbar isLanding />
      <section className="text-gray-600 body-font overflow-hidden max-h-[80dvh]">
        <div className="container mx-auto flex px-5 lg:px-20 py-12 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-5xl text-4xl font-bold text-gray-900 bg-gradient-to-r from-[#008059] to-[#4bae48] bg-clip-text text-transparent pb-2">
              Welcome to Daily Muse
            </h1>
            <span className="font-extralight text-lg mb-4">
              Where Inspiration Meets Expression
            </span>
            <p className="mb-8 leading-relaxed">
              Daily Muse is your hub for inspiring blogs and creative stories.
              Explore a diverse range of content that fuels curiosity and
              passion. Join our community and let your ideas take flight.
            </p>
            <div className="flex justify-center">
              <button
                onClick={navigateToSignup}
                className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Signup
              </button>
              <button
                onClick={navigateToSignin}
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Signin
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={landingImg}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
