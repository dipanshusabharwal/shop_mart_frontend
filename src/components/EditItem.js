import React from "react";
import axios from "axios";
import { baseURL as URL } from "../BaseUrl";
import * as $ from "jquery";
import "bootstrap";

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.verbose = 0;

    this.state = {
      items: [],
      currentItem: "",
      item: "",
      quantity: "",
      errorMessage: ""
    };

    this.chosenItemNo = Number(this.props.match.params.item_no) - 1;
  }

  displayState = () => {
    setTimeout(() => {
      console.log("State Updated =>");
      console.log("State: Items", this.state.items);
      console.log("State: Current Item", this.state.currentItem);
      console.log("State: Item", this.state.item);
      console.log("State: Quantity", this.state.quantity);
      console.log("Error Message", this.state.errorMessage);
    }, 1);
  };

  componentDidMount() {
    if (this.verbose) {
      console.clear();
      console.log("Trying to purchase item no =>", this.chosenItemNo);
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
                currentItem: item,
                item: item.item,
                quantity: item.quantity
              });
            }
          });

          if (this.verbose) {
            this.displayState();
          }
        }
      })
      .catch(err => {
        if (this.verbose) {
          console.log("Error occured =>", err.message);
        }
      });
  }

  editItem = event => {
    event.preventDefault();
    const config = {
      baseURL: URL,
      url: "/edit/" + this.props.match.params.item_no,
      method: "post",
      timeout: 10000,
      data: { item: this.state.item, quantity: this.state.quantity }
    };

    axios(config)
      .then(res => {
        if (this.verbose) {
          console.log("Received Code =>", res.data.code);
          console.log("Received Message =>", res.data.message);
        }

        if (res.data.code === 200) {
          this.props.history.push("/home");
        } else if (res.data.code === 400) {
          this.setState({
            errorMessage: res.data.message
          });

          if (this.verbose) {
            this.displayState();
          }

          $("#duplicateUpdateModal").modal();
        }
      })
      .catch(err => {
        if (this.verbose) {
          console.log("Error occured =>", err.message);
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (this.verbose) {
      this.displayState();
    }
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
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="staticEmail"
                name="item"
                value={this.state.item}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputPassword"
              className="col-sm-6 text-right col-form-label"
            >
              Quantity :
            </label>
            <div className="col-sm-6">
              <input
                type="number"
                className="form-control"
                id="staticEmail"
                name="quantity"
                min="1"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-primary rounded-0"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Edit
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
                  Edit Item
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
              <div className="modal-body">Do you want to edit this item ?</div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success rounded-0"
                  onClick={this.editItem}
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

        <div
          className="modal fade"
          id="duplicateUpdateModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Duplicate Addition
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
              <div className="modal-body">{this.state.errorMessage}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success rounded-0"
                  data-dismiss="modal"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditItem;
