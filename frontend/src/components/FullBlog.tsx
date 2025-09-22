import type { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  console.log(blog.title);

  return (
    <div>
      <AppBar />
      <div className="grid grid-cols-12 px-20 pt-12 w-full max-w-screen-2xl">
        <div className="col-span-8">
          <div className="text-5xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500 pt-2">Posted on 30th January</div>
          <div className="pt-4">{blog.content}</div>
        </div>
        <div className="col-span-4">
          Author
          <div className="flex items-center gap-2 pt-4">
            <div>
              <Avatar name={blog.author.name || "Anonymous"} />
            </div>
            <div>
              <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pt-2 text-slate-500">
                Random thing about the author is here. you can read it
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
