import "../assets/styles/NotFound.css";

export const NotFound = () => {
  return (
    <div className="app container-fluid">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="col-md-6 text-center rounded p-3">
          <h1 className="text">
            It looks like you are lost. There is nothing to see!
          </h1>
          <h1 className="text big">404 </h1>
          <h4 className="text">The page you are looking for is not found!</h4>
          <div className="my-5"></div>
          <a href="/" className="btn btn-danger btn-lg fw-bold">
            Return to Home
            <i className="fa-solid fa-rocket ms-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
