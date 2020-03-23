import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <Link to="/home">
            <h1 className="navbar-brand">Shop Mart</h1>
          </Link>
          <form className="form-inline">
            <Link to="/add">
              <button
                className="btn btn-dark my-2 my-sm-0 mr-3 rounded-0"
                type="submit"
              >
                Add Item
              </button>
            </Link>
            <Link to="/done">
              <button
                className="btn btn-dark my-2 my-sm-0 rounded-0"
                type="submit"
              >
                Purchased
              </button>
            </Link>
          </form>
        </nav>
      </div>
    );
  }
}

export default Navbar;
