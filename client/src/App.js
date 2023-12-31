import React, { createContext, useContext, useReducer } from "react";

import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Template from "./components/template";
import Home from "./components/home";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import ProtectedRoute from "./components/onlyAuthorized";
import Account from "./components/account";
import "./style/generic.css";
import Invoices from "./components/invoices";
import Signout from "./components/signout";

const showUserContext = createContext();
const dispatchUserContext = createContext();

const UserReducer = (state, action) => {
  return {
    data: action.data,
    authenticated: action.authenticated,
    companies: action.companies,
    selectedCompany: action.selectedCompany,
  };
};
const Userstates = {
  data: {},
  authenticated: false,
  companies: [],
  selectedCompany: "",
  // selectedCompany: apiService.getCompany() ? apiService.getCompany().id : "",
};

function App() {
  const [userAuth, setUserAuth] = useReducer(UserReducer, Userstates);

  return (
    <dispatchUserContext.Provider value={setUserAuth}>
      <showUserContext.Provider value={userAuth}>
        <div className="App">
          <Router>
            <Header />

            <body>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute requestedRoute="account">
                      <Account />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/template"
                  element={
                    <ProtectedRoute requestedRoute="template">
                      <Template />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/invoices"
                  element={
                    <ProtectedRoute requestedRoute="invoices">
                      <Invoices />
                    </ProtectedRoute>
                  }
                />
                <Route path="/signout" element={<Signout />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </body>

            <div className="footer d-flex">
              <div class="custom-shape-divider-top-1696624315">
                <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25"
                    class="shape-fill"
                  ></path>
                  <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    opacity=".5"
                    class="shape-fill"
                  ></path>
                  <path
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    class="shape-fill"
                  ></path>
                </svg>
              </div>

              <div className="footer-content">
                <h3 className="text-center">Squinvoice</h3>
                <div className="d-flex justify-content-between">
                  <div>
                    <ul>
                      <li>
                        <p>Alessio Giovannini</p>
                      </li>
                      <li>
                        <p>Via S. Agostino 42 Viterbo 01-100 Italy</p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <ul>
                      <li>
                        <Link to="/" className="text-white">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/account" className="text-white">
                          Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="text-white">
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="text-white">
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        </div>
      </showUserContext.Provider>
    </dispatchUserContext.Provider>
  );
}

export const DispatchUserContexts = () => useContext(dispatchUserContext);
export const ShowUserContexts = () => useContext(showUserContext);

export default App;
