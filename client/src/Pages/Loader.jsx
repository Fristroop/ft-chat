import "../assets/styles/Loader.css"

export const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
