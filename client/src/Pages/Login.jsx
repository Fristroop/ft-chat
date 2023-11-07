import axios from "axios";
import "../assets/styles/Login.css";
import { API } from "../config";

export const Login = () => {
  const login = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    try {
      const res = await axios.post(API + "/users/login", data, {
        withCredentials: true,
      });
      console.log(res);
      return location.replace("/");
    } catch (error) {
      alert(
        JSON.stringify(error.response?.data) ||
          "Network Error check developer console for more details!"
      );
      console.error(error);
    }
  };

  return (
    <div
      className="login d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="col-md-6 p-4 rounded text-center">
        <h4>Welcome FT Chat Please LogIn !</h4>
        <hr />
        <form onSubmit={login}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="username"
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="mb-3 d-flex justify-content-between wrap">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me!
              </label>
            </div>
            <div className="text-end">
              <a href="/fpsw">Forgot password?</a>
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-success w-100">
              Log In
            </button>
          </div>
          <hr />
          <div className="mb-3 text-center">
            <p>
              Have not you registered yet?
              <a href="/register" className="ms-2">
                Register now!
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
