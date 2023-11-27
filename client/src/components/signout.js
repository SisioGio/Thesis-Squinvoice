import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import apiService from "../services/apiService";
import { DispatchUserContexts } from "../App";
import { findAllByTestId } from "@testing-library/react";

function Signout() {
  const userAuthDispatcher = DispatchUserContexts();
  const logoutUser = (e) => {
    apiService.logout();
    userAuthDispatcher({
      authenticated: false,
    });
  };
  useEffect(() => {
    logoutUser();
  }, []);
  return <Navigate to="/" />;
}

export default Signout;
