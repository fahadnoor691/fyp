import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminStats() {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/stats`)
      .then((res) => {
        const data = res.data;
        setStats(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

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
        <>
          {/* Card Section */}
          <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-4 lg:py-4 mx-auto">
            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col bg-white shadow-sm rounded-xl rand:bg-slate-900 rand:border-gray-800">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs m-0 uppercase tracking-wide text-gray-500">
                      Total Users
                    </p>
                    <div className="hs-tooltip">
                      <div className="hs-tooltip-toggle">
                        <svg
                          className="flex-shrink-0 w-4 h-4 text-gray-500"
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
                          <circle cx={12} cy={12} r={10} />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                        <span
                          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm rand:bg-slate-700"
                          role="tooltip"
                        >
                          The number of daily users
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 rand:text-gray-200">
                      {stats.users}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white shadow-sm rounded-xl rand:bg-slate-900 rand:border-gray-800">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs m-0 uppercase tracking-wide text-gray-500">
                      Total Cars
                    </p>
                    <div className="hs-tooltip">
                      <div className="hs-tooltip-toggle">
                        <svg
                          className="flex-shrink-0 w-4 h-4 text-gray-500"
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
                          <circle cx={12} cy={12} r={10} />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                        <span
                          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm rand:bg-slate-700"
                          role="tooltip"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 rand:text-gray-200">
                      {stats.cars}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white shadow-sm rounded-xl rand:bg-slate-900 rand:border-gray-800">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs m-0 uppercase tracking-wide text-gray-500">
                      Total Owners
                    </p>
                    <div className="hs-tooltip">
                      <div className="hs-tooltip-toggle">
                        <svg
                          className="flex-shrink-0 w-4 h-4 text-gray-500"
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
                          <circle cx={12} cy={12} r={10} />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                        <span
                          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm rand:bg-slate-700"
                          role="tooltip"
                        >
                          The number of daily users
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 rand:text-gray-200">
                      {stats.owners}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white shadow-sm rounded-xl rand:bg-slate-900 rand:border-gray-800">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs m-0 uppercase tracking-wide text-gray-500">
                      Total Bookings
                    </p>
                    <div className="hs-tooltip">
                      <div className="hs-tooltip-toggle">
                        <svg
                          className="flex-shrink-0 w-4 h-4 text-gray-500"
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
                          <circle cx={12} cy={12} r={10} />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                        <span
                          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm rand:bg-slate-700"
                          role="tooltip"
                        >
                          The number of daily users
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 rand:text-gray-200">
                      {stats.bookings}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            {/* End Grid */}
          </div>
          {/* End Card Section */}
        </>
      )}
    </div>
  );
}

export default AdminStats;
