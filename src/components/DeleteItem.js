import React from "react";
import axios from "axios";
import { baseURL as URL } from "../BaseUrl";

class DeleteItem extends React.Component {
  constructor(props) {
    super(props);

    this.verbose = 0;

    this.state = {
      items: [],
      currentItem: ""
    };

    this.chosenItemNo = Number(this.props.match.params.item_no) - 1;
  }

  displayState = () => {
    setTimeout(() => {
      console.log("State Updated =>");
      console.log("State: Items", this.state.items);
      console.log("State: Current Item", this.state.currentItem);
    }, 1);
  };

  componentDidMount() {
    if (this.verbose) {
      console.log("Trying to delete item no =>", this.chosenItemNo);
      console.log("Making the api call to route => /listing");
    }

    const config = {
      baseURL: URL,
      url: "/listing",
      method: "get",
      timeout: 10000
    };

    axios(config)
      .then(res => {
        if (this.verbose) {
          console.log("Received Code =>", res.data.code);
          console.log("Received Message =>", res.data.message);
        }

        if (res.data.code === 200) {
          if (this.verbose) {
            console.log("Items Received =>", res.data.items.length);
          }

          res.data.items.forEach((item, index) => {
            if (this.chosenItemNo === index) {
              this.setState({
                items: res.data.items,
                currentItem: item
              });
            }
          });

          if (this.verbose) {
            this.displayState();
          }
        }
      })
      .catch(err => {
        console.log("Error occured =>", err.message);
      });
  }

  deleteItem = event => {
    event.preventDefault();
    const config = {
      baseURL: URL,
      url: "/delete",
      method: "post",
      timeout: 10000,
      data: { item_no: this.props.match.params.item_no }
    };

    axios(config)
      .then(res => {
        if (this.verbose) {
          console.log("Received Code =>", res.data.code);
          console.log("Received Message =>", res.data.message);
        }

        if (res.data.code === 200) {
          this.props.history.push("/home");
        }
      })
      .catch(err => {
        if (this.verbose) {
          console.log("Error occured =>", err.message);
        }
      });
  };

  render() {
    return (
      <div className="col-3 mx-auto mt-5 border border-dark shadow shadow-lg">
        <form className="p-3">
          <div className="form-group row">
            <label
              htmlFor="staticEmail"
              className="col-sm-6 col-form-label text-right"
            >
              Item :
            </label>
            <div className="col-sm-6 col-form-label text-left">
              {this.state.currentItem.item}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputPassword"
              className="col-sm-6 text-right col-form-label"
            >
              Quantity :
            </label>
            <div className="col-sm-6 text-left col-form-label">
              {this.state.currentItem.quantity}
            </div>
          </div>
          <div className="form-group row d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-danger rounded-0"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Delete
            </button>
          </div>
        </form>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete Item
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Do you want to delete this item ?
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success rounded-0"
                  onClick={this.deleteItem}
                  data-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-0"
                  data-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteItem;
