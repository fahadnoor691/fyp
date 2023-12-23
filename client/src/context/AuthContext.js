import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Axios";
import { toast, Toaster } from "react-hot-toast";
const AuthContext = createContext();

export default AuthContext;

const AuthProvider = ({ children }) => {
  // check existence of authToken in browser storage
  let authTokenInitState = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  // get the init user state by token
  let userState = localStorage.getItem("authTokens")
    ? jwt_decode(localStorage.getItem("authTokens"))
    : null;

  // set callback function to set the value once in initial load
  let [user, setUser] = useState(() => userState);
  let [authTokens, setAuthTokens] = useState(() => authTokenInitState);
  let [profile, setProfile] = useState();
  const navigate = useNavigate();

  // handle login form from login page
  let loginUser = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);

    try {
      const response = await axiosInstance.post("http://localhost:8080/login", {
        email: credentials.get("email"),
        password: credentials.get("password"),
      });

      if (response.status === 200) {
        const data = response.data;

        if (data && data.token) {
          const decodedToken = jwt_decode(data.token);

          // Example logic based on the decoded token
          if (decodedToken.status === "suspended") {
            localStorage.removeItem("authTokens");
            toast.error("Your account has been suspended", {
              icon: "😰",
              style: {
                borderRadius: "55px",
                marginBottom: "15px",
              },
            });
            return; // Return or handle further logic as needed
          }

          // Update state of auth tokens from API token
          setAuthTokens(data);
          // Update user information and decode the user information from token
          setUser(decodedToken);
          // Store auth token in local storage
          localStorage.setItem("authTokens", JSON.stringify(data));
          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + data.token;

          navigate("/home"); // Redirect to home page or desired route
        } else {
          // Handle cases where data.token is undefined or null
          toast.error("Invalid response received from the server", {
            icon: "🚨",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        }
      } else {
        // Handle other response statuses
        toast.error("Unstable internet connection", {
          icon: "🪐s",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    } catch (error) {
      // Handle network errors or other exceptions
      if (error.response && error.response.status === 401) {
        toast.error("Credentials error. Please recheck your email & password", {
          icon: "🚨",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      } else {
        toast.error("An error occurred during login", {
          icon: "🚨",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    }
  };

  let loginOwner = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/owner/login",
        {
          email: credentials.get("email"),
          password: credentials.get("password"),
        }
      );

      if (response.status === 200) {
        const data = response.data;

        if (data && data.token) {
          const decodedToken = jwt_decode(data.token);

          // Example logic based on the decoded token
          if (decodedToken.status === "suspended") {
            localStorage.removeItem("authTokens");
            toast.error("Your account has been suspended", {
              icon: "😰",
              style: {
                borderRadius: "55px",
                marginBottom: "15px",
              },
            });
            return; // Return or handle further logic as needed
          }

          // Update state of auth tokens from API token
          setAuthTokens(data);
          // Update user information and decode the user information from token
          setUser(decodedToken);
          // Store auth token in local storage
          localStorage.setItem("authTokens", JSON.stringify(data));
          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + data.token;

          navigate("/owner/home"); // Redirect to home page or desired route
        } else {
          // Handle cases where data.token is undefined or null
          toast.error("Invalid response received from the server", {
            icon: "🚨",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        }
      } else {
        // Handle other response statuses
        toast.error("Unstable internet connection", {
          icon: "🪐s",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    } catch (error) {
      // Handle network errors or other exceptions
      if (error.response && error.response.status === 401) {
        toast.error("Credentials error. Please recheck your email & password", {
          icon: "🚨",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      } else {
        toast.error("An error occurred during login", {
          icon: "🚨",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    }
  };

  // handle the registration
  let registerUser = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/signup",
        {
          email: credentials.get("email"),
          password: credentials.get("password"),
          confirmPassword: credentials.get("confirm-password"),
        }
      );

      if (response.status === 200) {
        navigate("/login");
        toast.success("Registered Successfully!", {
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Email already exists. Please use a different email.", {
            icon: "😓",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        } else if (error.response.status === 400) {
          toast.error("Passwords do not match", {
            icon: "😓",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        } else {
          toast.error("Something went wrong!", {
            icon: "🪐",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        }
      } else {
        toast.error("Something went wrong!", {
          icon: "🪐",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    }
  };

  let registerOwner = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/owner/signup",
        {
          email: credentials.get("email"),
          password: credentials.get("password"),
          confirmPassword: credentials.get("confirm-password"),
        }
      );

      if (response.status === 200) {
        navigate("/owner/login");
        toast.success("Registered Successfully!", {
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Email already exists. Please use a different email.", {
            icon: "😓",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        } else if (error.response.status === 400) {
          toast.error("Passwords do not match", {
            icon: "😓",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        } else {
          toast.error("Something went wrong!", {
            icon: "🪐",
            style: {
              borderRadius: "55px",
              marginBottom: "15px",
            },
          });
        }
      } else {
        toast.error("Something went wrong!", {
          icon: "🪐",
          style: {
            borderRadius: "55px",
            marginBottom: "15px",
          },
        });
      }
    }
  };

  // handle logout
  let logoutUser = async () => {
    setAuthTokens(null);
    setUser(null);

    // remove authToken in browser
    localStorage.removeItem("authTokens");

    // redirect the user
    navigate("/");
  };

  let logoutOwner = async () => {
    setAuthTokens(null);
    setUser(null);

    // remove authToken in browser
    localStorage.removeItem("authTokens");

    // redirect the user
    navigate("/owner/login");
  };

  // extract the decoded data
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    registerOwner: registerOwner,
    profile: profile,
    loginOwner: loginOwner,
    logoutOwner: logoutOwner,
  };

  return (
    <div>
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
      <div style={{ zIndex: 999999999999999 }}>
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

export { AuthContext, AuthProvider };
