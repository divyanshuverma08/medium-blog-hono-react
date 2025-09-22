import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@divyanshuverma/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      const data = response.data;
      const jwt = data["jwt"];
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
      toast.error("Error");
    }
  };

  return (
    <div className="h-screen bg-white flex justify-center items-center flex-col">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-5xl">Create an account</h1>
          <h2 className="font-normal text-2xl text-slate-400">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <Link
              className="underline pl-2"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Login" : "Sign Up"}
            </Link>
          </h2>
        </div>
        <form
          className="flex flex-col items-start gap-5"
          onSubmit={sendRequest}
        >
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="m@example.com"
            onChange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />
          <LabelledInput
            label="Password"
            placeholder=""
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
            type="password"
          />
          <button
            type="submit"
            className="text-center min-w-100 rounded-md bg-black text-white p-3.5 text-xl font-normal"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

interface labelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: labelledInputType) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xl font-semibold">{label}</label>
      <input
        className="min-w-100 h-10 border rounded-md border-slate-200 p-3.5 text-xl font-medium"
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}
