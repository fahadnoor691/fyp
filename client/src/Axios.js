import axios from "axios";
import jwt_decode from "jwt-decode";
// const url = "https://cc.dev.startupearly.com/api/";
const url = "/api/";
export const axiosInstance = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    Authorization: localStorage.getItem("authTokens")
      ? "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access
      : null,
  },
});

const refreshAxiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      //console.log(error);
      // alert(
      //   "A server/network error occurred. " +
      //     "Looks like CORS might be the problem. " +
      //     "Sorry about this - we will get it fixed shortly."
      // );
      return Promise.reject(error);
    }
    // if (error.response.data.detail === "User is not active") {
    //   alert("Your account has been suspended!");

    //   localStorage.removeItem("authTokens");
    //   // window.location.replace("/login");
    // }
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      //console.log("in 401 error");
      //console.log(error);
      const refreshToken = JSON.parse(
        localStorage.getItem("authTokens")
      )?.refresh;

      if (refreshToken) {
        return refreshAxiosInstance
          .post("/token/refresh/", { refresh: refreshToken })
          .then((response) => {
            //console.log(response);
            let data = response.data;
            //console.log(jwt_decode(data.access));
            if (jwt_decode(data.access).status === "suspended") {
              localStorage.removeItem("authTokens");
              //window.location.replace("/");
              alert("Your account has been suspended!");
              return;
            }
            localStorage.setItem("authTokens", JSON.stringify(response.data));

            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access;
            originalRequest.headers["Authorization"] =
              "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access;

            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              //console.log(err);
              // localStorage.removeItem("authTokens");
              // window.location.replace("/login");
            }
            //console.log("i am in here");
            //console.log("In catch block" + err);
            // localStorage.removeItem("authTokens");
            // window.location.replace("/login");
            if (err.response.status === 400 || err.response.status === 500) {
              throw err;
            }
          });
      } else {
        //console.log("Refresh token not available.");
        localStorage.removeItem("authTokens");
        //window.location.replace("/");
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
