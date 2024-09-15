import logo from "../assets/logo.svg";
const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="ml-3 text-xl">Daily Muse</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 Daily-Muse —
          <a
            href="https://twitter.com/knyttneve"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @ronit
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="https://github.com/ronit-ghosh" target="_blank" className="text-gray-500">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.698-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.621.069-.608.069-.608 1.004.07 1.533 1.033 1.533 1.033.892 1.53 2.341 1.088 2.91.832.092-.646.35-1.088.635-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.98 1.03-2.678-.104-.253-.447-1.273.098-2.654 0 0 .84-.269 2.75 1.025a9.564 9.564 0 012.5-.336 9.563 9.563 0 012.5.336c1.91-1.294 2.75-1.025 2.75-1.025.545 1.381.202 2.401.099 2.654.64.698 1.029 1.588 1.029 2.678 0 3.842-2.337 4.687-4.565 4.936.36.31.682.923.682 1.86 0 1.344-.012 2.427-.012 2.754 0 .269.18.58.688.482C19.135 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
          <a href="https://x.com/ronit__ghosh" target="_blank" className="ml-3 text-gray-500">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ronit-ghosh-7b10972a2/" target="_blank" className="ml-3 text-gray-500">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
