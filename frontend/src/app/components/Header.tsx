import React from "react";

function Header() {
  return (
    <header style={{ borderBottom: "1px solid #ddd", padding: "10px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "18px", margin: 0 }}>
          Invoice & Expense Management System
        </h1>
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "15px",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                About
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                Features
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                style={{ textDecoration: "none", color: "black" }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
