import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./services/authServices";
import "./App.css";

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  //logout the user
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid  text-default">
          <a className="navbar-brand text-default" href="#">
            <Link to={"/"} className="nav-link">
              <h3 className="navbar-element">Home</h3>
            </Link>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 float-left"></ul>
            {currentUser ? (
              <span className="d-flex">
                <a
                  class="navbar-brand nav-link nav-item active"
                  aria-current="page"
                  href="#"
                >
                  welcome: {currentUser.name.toUpperCase()}
                </a>
                <a
                  class="navbar-brand nav-link nav-item active"
                  aria-current="page"
                  href="#"
                  onClick={() => logout()}
                >
                  logout
                </a>
              </span>
            ) : (
              <span className="d-flex">
                <Link to={"/login"} className="nav-link">
                  <h4 className="navbar-brand nav-link nav-item active">
                    Login
                  </h4>
                </Link>
                <Link to={"/register"} className="nav-link">
                  <h4 className="navbar-brand nav-link nav-item active">
                    Register
                  </h4>
                </Link>
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
