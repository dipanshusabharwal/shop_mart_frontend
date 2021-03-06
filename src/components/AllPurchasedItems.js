import React from "react";
import axios from "axios";
import { baseURL as URL } from "../BaseUrl";

class AllPurchasedItems extends React.Component {
  constructor(props) {
    super(props);

    this.verbose = 0;

    this.state = {
      items: [],
      display: false
    };
  }

  displayState = () => {
    setTimeout(() => {
      console.log("State Updated =>");
      console.log("State: Display Flag", this.state.display);
      console.log("State: Items", this.state.items);
    }, 10000);
  };

  componentDidMount() {
    if (this.verbose) {
      console.log("Making the api call to route => /listing");
    }

    let itemsReturned = false;

    const config = {
      baseURL: URL,
      url: "/purchased",
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
            console.log(res.data.items.length + " Items Received =>");
            console.table(res.data.items);
          }

          itemsReturned = true;

          this.setState({
            items: res.data.items,
            display: itemsReturned
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

  render() {
    if (this.state.display) {
      return (
        <div>
          <div className="col-5 mx-auto mt-5 shadow shadow-lg table-striped table-bordered table-responsive table-hover p-0 mb-5">
            <table className="table mb-0">
              <thead className="thead-dark text-center">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((obj, index) => {
                  return (
                    <tr key={obj.item + index} className="text-center">
                      <th className="align-middle">{obj.item}</th>
                      <td className="align-middle">{obj.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default AllPurchasedItems;
