interface BlogType {
  title: string;
  content: string;
  timestamp: string;
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
}

const Blog = (props: BlogType) => {
  const { title, content, timestamp, firstname, lastname, username, bio } =
    props;
  const date = timestamp.split("T")[0].split("-").reverse().join("-");
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pb-24 pt-10 mx-auto">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto">
          <div className="text-4xl font-extrabold mb-4 text-center">
            {title}
          </div>
          <p className="text-sm text-right">
            Posted on: {date} by @{username}
          </p>
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase text-center">
            {firstname + " " + lastname}
          </h2>
          <p className="text-gray-500 capitalize text-center">{bio}</p>
          <span className="inline-block h-1 w-full rounded bg-green-500 my-6"></span>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </section>
  );
};

export default Blog;
