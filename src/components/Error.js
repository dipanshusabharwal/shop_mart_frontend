import React from "react";
import { Link } from "react-router-dom";

class Error extends React.Component {
  render() {
    return (
      <div className="container mt-5 text-center">
        <p className="display-3">404 !</p>
        <p className="display-3">Page not found</p>
        <Link to="/dashboard">
          <button className="btn btn-primary btn-lg shadow shadow-lg mt-5">
            Dashboard
          </button>
        </Link>
      </div>
    );
  }
}
export default Error;
