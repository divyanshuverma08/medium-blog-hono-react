import axios from "axios";
import { AppBar } from "../components/AppBar";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import React, { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

export const Publish = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    title: "",
    content: "",
  });
  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        postInputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      const id = data["id"];
      navigate(`/blogs/${id}`);
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };
  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full pt-8">
        <form className="max-w-screen-lg w-full" onSubmit={publish}>
          <input
            type="text"
            name="title"
            value={postInputs.title}
            onChange={(e) =>
              setPostInputs({ ...postInputs, title: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <TextEditor
            onChange={(e) =>
              setPostInputs({ ...postInputs, content: e.target.value })
            }
          />
          <button
            type="submit"
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      onChange={onChange}
      rows={4}
      className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Write your thoughts here..."
    ></textarea>
  );
}
