import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./../style/login.css";
import apiService from "../services/apiService";
import { DispatchUserContexts } from "../App";

function SignIn() {
  const userContext = DispatchUserContexts();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [isSuccess, setIsSuccess] = useState(false);
  const requestedUrl = params.get("requestedRoute");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setData((prevNote) => ({
      ...prevNote,

      [name]: value,
    }));
  }
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      await apiService.signin(data);
      console.log("Success");
      userContext({
        authenticated: true,
      });
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup ">
      {isSuccess ? (
        requestedUrl ? (
          <Navigate to={"/" + requestedUrl} />
        ) : (
          <Navigate to="/" />
        )
      ) : null}

      <form className="center text-center col-12 col-sm-8 col-md-6 col-lg-3">
        <h5>Sign In</h5>

        <div className="d-flex flex-column gap-2 py-2">
          <label htmlFor="Email">Email Address</label>
          <input
            type="email"
            onChange={handleChange}
            value={data.email}
            name="email"
            placeholder="Email address"
          />
        </div>
        <div className="d-flex flex-column gap-2 py-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
          />
        </div>

        {/* <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            onChange={handleChange}
            value={data.email}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          ></input>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            name="password"
            onChange={handleChange}
            value={data.password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          ></input>
        </div> */}
        <div>
          <small>
            Need an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>

        <button
          type="button"
          onClick={(event) => submitForm(event)}
          className="btn w-100 btn-success my-2 py-2"
        >
          Submit
        </button>
      </form>

      <div class="custom-shape-divider-bottom-1696637079">
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
    </div>
  );
}

export default SignIn;
