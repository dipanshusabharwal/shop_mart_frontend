import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ShowItems from "../components/ShowItems";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";
import DeleteItem from "../components/DeleteItem";
import PurchaseItem from "../components/PurchaseItem";
import AllPurchasedItems from "../components/AllPurchasedItems";
import Error from "../components/Error";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={ShowItems} />
        <Route path="/add" component={AddItem} />
        <Route path="/change/:item_no" component={EditItem} />
        <Route path="/delete/:item_no" component={DeleteItem} />
        <Route path="/mark/:item_no" component={PurchaseItem} />
        <Route path="/done" component={AllPurchasedItems} />
        <Route component={Error} />
      </Switch>
    );
  }
}

export default Routes;
