import { useEffect } from "react";
import "./../style/header.css";
import { Link } from "react-router-dom";
import { ShowUserContexts } from "../App";
import apiService from "../services/apiService";

function Header() {
  const UserContext = ShowUserContexts();
  useEffect(() => {}, []);
  return (
    <nav className="p-3 navbar-expand-md navbar-dark  d-flex justify-content-center">
      <div className="col-12 col-md-10 col-lg-8 col-xl-6 d-flex justify-content-between">
        <a className="navbar-brand text-white" href="#">
          <h3>Squinvoice</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse flex-grow-0 navbar-links justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav text-white">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="home">
                Home
              </Link>
            </li>

            {UserContext.authenticated && (
              <li className="nav-item text-white">
                <Link className="nav-link text-white" to="account">
                  Account
                </Link>
              </li>
            )}
            {!UserContext.authenticated && (
              <li className="nav-item text-white ">
                <Link className="nav-link text-white" to="signin">
                  Sign In
                </Link>
              </li>
            )}
            {UserContext.authenticated && (
              <li className="nav-item text-white ">
                <Link
                  className="nav-link text-white"
                  to="signout"
                  onClick={() => apiService.logout()}
                >
                  Sign Out
                </Link>
              </li>
            )}

            {!UserContext.authenticated && (
              <li className="nav-item text-white">
                <Link className="nav-link text-white" to="signup ">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
