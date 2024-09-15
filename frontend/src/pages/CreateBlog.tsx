import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { JoditConfig } from "../config/config";
import useCreateBlog from "../hooks/useCreateBlog";
import useCheckAuth from "../hooks/useCheckAuth";

const CreateBlog = () => {
  const editor = useRef(null);
  const config = useMemo(() => {
    JoditConfig;
  }, []);

  const { values, setValues, sendReq, loading, error } = useCreateBlog();
  const { } = useCheckAuth();

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="text-red-500 font-mono text-center h-6">{error}</div>
        <div className="container px-5 py-1 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto border h-[10dvh]">
            <input
              onChange={(e) =>
                setValues({
                  ...values,
                  title: e.target.value,
                })
              }
              type="text"
              placeholder="Title for your Blog"
              className="w-full h-full px-4 focus:outline-none text-2xl"
            />
          </div>
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto border h-[50dvh] overflow-auto">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: values.content }}
            />
          </div>
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto flex flex-col">
            <JoditEditor
              ref={editor}
              value={values.content}
              // I have tried many ways to define config's type but ts did not stop complaining hence
              // @ts-ignore
              config={config}
              onBlur={(newContent) =>
                setValues({
                  ...values,
                  content: newContent,
                })
              }
              onChange={(newContent) => {
                setValues({
                  ...values,
                  content: newContent,
                });
              }}
            />
            <button
              onClick={sendReq}
              className={`${loading ? "cursor-not-allowed" : "cursor-pointer"
                } text-white bg-green-500 order-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg mt-2 flex justify-center items-center`}
            >
              {loading ? (
                <span className="w-6 h-6 border-4 border-transparent animate-spin flex items-center justify-center border-t-gray-50 rounded-full"></span>
              ) : (
                <span>Post</span>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateBlog;
