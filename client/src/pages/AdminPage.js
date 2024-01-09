import React, { useContext, useEffect } from "react";

import { useState } from "react";
import Navbar from "../components/Navbar";
import AdminStats from "./AdminStats";
import Bookings from "../components/AdminBookings";
import Cars from "../components/AdminCars";
import Users from "../components/AdminUsers";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Network = () => {
  let { logoutUser } = useContext(AuthContext);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };
  const [OriginalStudentData, setOriginalStudentData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_KEY + "/api/get_all_profiles/"
      );
      setOriginalStudentData(response?.data);
      setStudentData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const filteredStudentCount = studentData.filter(
    (student) =>
      student.status === "" || student.status === 0 || student.status === null
  ).length;

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
        <div>
          <div>
            <>
              <div class="hidden md:block absolute w-full bg-lilac h-96 min-h-96 md:min-h-96"></div>

              {/* <Sidebar /> */}

              {/* {isSidebarVisible && <SideInnerSM />} */}

              {/* <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"> */}
              <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out rounded-xl">
                <>
                  {/* ========== HEADER ========== */}
                  <header className="fixed flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-black text-sm py-3 sm:py-0 px-4 sm:px-6 lg:px-8">
                    <nav
                      className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
                      aria-label="Global"
                    >
                      <div className="flex items-center justify-between">
                        <a
                          className="flex-none text-xl font-bold text-yellow-300"
                          href="#"
                          aria-label="Brand"
                        >
                          Rolling Rentals
                        </a>
                        <div className="sm:hidden">
                          <button
                            type="button"
                            className="hs-collapse-toggle w-9 h-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            data-hs-collapse="#navbar-collapse-with-animation"
                            aria-controls="navbar-collapse-with-animation"
                            aria-label="Toggle navigation"
                          >
                            <svg
                              className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1={3} x2={21} y1={6} y2={6} />
                              <line x1={3} x2={21} y1={12} y2={12} />
                              <line x1={3} x2={21} y1={18} y2={18} />
                            </svg>
                            <svg
                              className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        id="navbar-collapse-with-animation"
                        className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
                      >
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
                          <a
                            className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
                            href="#"
                            onClick={logoutUser}
                          >
                            <svg
                              className="flex-shrink-0 w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                            Log out
                          </a>
                        </div>
                      </div>
                    </nav>
                  </header>
                  {/* ========== END HEADER ========== */}
                  <div style={{ paddingTop: "64px" }}>
                    {/* Other content components */}
                  </div>
                </>

                <div className="w-full px-6 py-6 mx-auto">
                  <AdminStats />

                  <div className="max-w-[85rem]    px-4 py-4 sm:px-6 lg:px-4 lg:py-4 lg:py-14 mx-auto">
                    {/* Card */}
                    <div className="flex flex-col">
                      <div className="-m-1.5 overflow-x-auto p-2 bg-white shadow-sm rounded-xl">
                        <div className="p-1.5 min-w-full inline-block align-middle ">
                          <Tabs>
                            <TabList>
                              <Tab>
                                <button
                                  type="button"
                                  class="btn btn-sm border-0 text-gray-400 hover:bg-white"
                                >
                                  Bookings
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="flex-shrink-0 w-4 h-4"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </Tab>
                              <Tab>
                                <button
                                  type="button"
                                  class="btn btn-sm border-0 text-gray-400 hover:bg-white"
                                >
                                  Cars Info
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="flex-shrink-0 w-4 h-4"
                                  >
                                    <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                                  </svg>
                                </button>
                              </Tab>
                              <Tab>
                                <button
                                  type="button"
                                  class="btn btn-sm border-0 text-gray-400 hover:bg-white"
                                >
                                  Users Info
                                  {filteredStudentCount > 0 && (
                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">
                                      + {filteredStudentCount}
                                    </span>
                                  )}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="flex-shrink-0 w-4 h-4"
                                  >
                                    <path d="M4.214 3.227a.75.75 0 00-1.156-.956 8.97 8.97 0 00-1.856 3.826.75.75 0 001.466.316 7.47 7.47 0 011.546-3.186zM16.942 2.271a.75.75 0 00-1.157.956 7.47 7.47 0 011.547 3.186.75.75 0 001.466-.316 8.971 8.971 0 00-1.856-3.826z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.94 32.94 0 003.256.508 3.5 3.5 0 006.972 0 32.933 32.933 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zm0 14.5a2 2 0 01-1.95-1.557 33.54 33.54 0 003.9 0A2 2 0 0110 16.5z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </Tab>
                            </TabList>

                            <TabPanel>
                              <Bookings />
                            </TabPanel>
                            <TabPanel>
                              <Cars />
                            </TabPanel>
                            <TabPanel>
                              <Users />
                            </TabPanel>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </>
          </div>

          {/* <FeedbackButton/> */}
        </div>
      )}
    </div>
  );
};

export default Network;
