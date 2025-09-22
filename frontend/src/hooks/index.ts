import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const useBlog = ({id}: {id: string}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
        setLoading(false);
      });
  }, []);

  return { loading, blog };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogs(response.data["blogs"]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
