import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignIn() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/update_owner_password/${id}`, {
        password: password,
      })
      .then((res) => {
        console.log(res.data);

        // Navigate("/login");
        toast.success("Password Changed Successfully!", {
          icon: "📨",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      })
      .catch((err) => {
        toast.error("Error in updating password!", {
          icon: "📨",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
        console.log(err);
      });
  };
  return (
    <div className="bg-gray-600">
      <div style={{ paddingTop: "70px" }}>{/* Other content components */}</div>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center"></div>
            <div className="mt-5">
              {/* Form */}
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required=""
                      aria-describedby="email-error"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required=""
                      aria-describedby="email-error"
                      //   onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {/* End Form Group */}
                {/* Form Group */}

                {/* End Form Group */}
                {/* Checkbox */}

                {/* End Checkbox */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
              </div>
              {/* End Form */}
            </div>
          </div>
        </div>
        <div style={{ zIndex: 999999999999999 }}>
          <Toaster position="bottom-center" />
        </div>
      </main>
      <div style={{ paddingTop: "164px" }}>
        {/* Other content components */}
      </div>
    </div>
  );
}
