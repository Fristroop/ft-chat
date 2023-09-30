import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { App } from "./Pages/App.jsx";
import { Login } from "./Pages/Login.jsx";
import { Register } from "./Pages/Register.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App comp={"rooms"} />} />
      <Route path="/room" element={<App comp={"chat"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </Router>
);
