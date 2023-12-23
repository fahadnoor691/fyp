import React from "react";

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

  return (
    <div style={containerStyle}>
      <div style={leftStyle} onClick={() => redirectToPage("login")}>
        Rent In
      </div>
      <div style={rightStyle} onClick={() => redirectToPage("owner/signup")}>
        Rent Out
      </div>
    </div>
  );
};

export default RedirectPage;
