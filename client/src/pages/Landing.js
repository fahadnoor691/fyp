import React, { useEffect, useState } from "react";

const RedirectPage = () => {
  const containerStyle = {
    margin: 0,
    padding: 0,
    display: "flex",
  };

  const leftStyle = {
    width: "50%",
    height: "100vh",
    backgroundColor: "#ffd700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "72px",
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
    whiteSpace: "nowrap",
  };

  const rightStyle = {
    width: "50%",
    height: "100vh",
    backgroundColor: "black",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "72px",
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
    whiteSpace: "nowrap",
    color: "#ffd700",
  };

  const redirectToPage = (pageUrl) => {
    window.location.href = pageUrl;
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
        <div style={containerStyle}>
          <div style={leftStyle} onClick={() => redirectToPage("login")}>
            Rent In
          </div>
          <div style={rightStyle} onClick={() => redirectToPage("owner/login")}>
            Rent Out
          </div>
        </div>
      )}
    </div>
  );
};

export default RedirectPage;
