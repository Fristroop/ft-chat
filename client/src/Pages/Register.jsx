import axios from "axios";
import { API } from "../config";

export const Register = () => {
  const login = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (data.get("password") !== data.get("password2")) {
      return alert("Passwords does not match");
    }

    try {
      const res = await axios.post(API + "/users/register", data);
      if (res.status === 200) return location.replace("/login");
      else alert(JSON.stringify(res.data));
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
      className="register d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="col-md-6 p-4 rounded text-center">
        <h4>Welcome FT Chat Please Register !</h4>
        <hr />
        <form onSubmit={login}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              name="username"
              required
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
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

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword2"
              placeholder="Password"
              name="password2"
              required
            />
            <label htmlFor="floatingPassword2">Confirm Password</label>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </div>
          <hr />
          <div className="mb-3 text-center">
            <p>
              Have you registered before?
              <a href="/login" className="ms-2">
                LogIn now!
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
