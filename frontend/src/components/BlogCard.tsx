import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authoreName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authoreName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blogs/${id}`}>
      <div className="p-4 border-b-4 border-solid border-b-slate-200 border-h0 w-full pb-6">
        <div className="flex items-center gap-2">
          <Avatar name={authoreName} />
          <div className="font-normal text-md flex gap-1 items-center">
            {authoreName}
            <Circle />
            <span className="text-slate-400">{publishedDate}</span>
          </div>
        </div>
        <div className="text-xl font-semibold mt-4">{title}</div>
        <div className="text-md font-thin">
          {content.slice(0, 100) + "....."}
        </div>
        <div className="text-slate-400 text-sm font-thin mt-3">
          {`${Math.ceil(content.length / 100)}`} minutes
        </div>
      </div>
    </Link>
  );
};

const Circle = () => {
  return <span className="h-0.5 w-0.5 rounded-full bg-slate-500"></span>;
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
