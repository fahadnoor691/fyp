import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function SignUp() {
  let { registerOwner } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [csrfToken, setCSRFToken] = useState("");

  // useEffect(() => {
  //   // Fetch CSRF token when component mounts
  //   async function fetchCSRFToken() {
  //     try {
  //       const response = await axios.get("http://localhost:8080/csrf-token");
  //       setCSRFToken(response.data.csrfToken);
  //     } catch (error) {
  //       console.error("Error fetching CSRF token:", error);
  //     }
  //   }

  //   fetchCSRFToken();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/", {
        email,
        password,
        confirmPassword,
        _csrf: csrfToken, // Sending CSRF token with the request
      })
      .then((response) => {
        toast.success("Sign Up successfully:");
        console.log("Post created:", response.data);
      })
      .catch((error) => {
        toast.error("Sign Up Failed");
        console.error("Error creating account:", error.response.data.error);
      });
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center gap-4 justify-center h-screen">
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
        </div>
      ) : (
        <div class="bg-gray-500">
          <main className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Sign up
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?
                    <a
                      className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="../examples/html/signin.html"
                    >
                      <Link to={"/owner/login"}> Sign in here</Link>
                    </a>
                  </p>
                </div>
                <div className="mt-5">
                  {/* Form */}
                  <form role="form" onSubmit={registerOwner}>
                    <div className="grid gap-y-4">
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required=""
                            aria-describedby="email-error"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden text-xs text-red-600 mt-2"
                          id="email-error"
                        >
                          Please include a valid email address so we can get
                          back to you
                        </p>
                      </div>
                      {/* End Form Group */}
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="password"
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
                            aria-describedby="password-error"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden text-xs text-red-600 mt-2"
                          id="password-error"
                        >
                          8+ characters required
                        </p>
                      </div>
                      {/* End Form Group */}
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required=""
                            aria-describedby="confirm-password-error"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden text-xs text-red-600 mt-2"
                          id="confirm-password-error"
                        >
                          Password does not match the password
                        </p>
                      </div>
                      {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}

                      {/* End Form Group */}
                      {/* Checkbox */}

                      {/* End Checkbox */}
                      <button
                        type="submit"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        // onClick={loginUser}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                  {/* End Form */}
                </div>
              </div>
            </div>
          </main>
          <div style={{ zIndex: 999999999999999 }}>
            <Toaster position="bottom-center" />
          </div>
          <div style={{ paddingTop: "64px" }}>
            {/* Other content components */}
          </div>
        </div>
      )}
    </div>
  );
}
