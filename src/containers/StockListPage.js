import React from "react";
import { apiCall, forwardToken, pathString } from "../services/api";

import StockList from "../components/StockList";

class StockListPage extends React.Component {
  state = {
    stockitems: [],
    errorMessage: "",
    successMessage: ""
  };

  itemClicked = item => {
    this.props.history.push({
      pathname: "/edititem",
      state: { item: item }
    });
  };

  onChange = event => {
    let stockitems = this.state.stockitems;
    stockitems[event.target.tabIndex][event.target.name] = event.target.value;
    this.setState({
      stockitems
    });
  };

  updateItem = event => {
    event.preventDefault();
    let stockitems = this.state.stockitems;
    forwardToken();

    const path = `${pathString}/api/${
      stockitems[event.target.tabIndex]._id
    }/updatestockitem`;

    const updatedItem = apiCall(
      "POST",
      path,
      stockitems[event.target.tabIndex]
    ).then(res => {
      this.setState({
        ...stockitems,
        successMessage: `Updated item ${res.foundItem.name} amount to ${
          res.foundItem.amount
        } `
      });
    });
  };

  filterList = event => {
    event.preventDefault();
    let stockitems = this.state.stockitems;
    forwardToken();
    const path = `${pathString}/api/categories/${event.target.name}`;
    const itemsByCat = apiCall("GET", path).then(res => {
      this.setState({ stockitems: res.items });
    });
  };

  componentDidMount() {
    const path = `${pathString}/api/allstockitems`;
    forwardToken();
    const getItems = apiCall("GET", path).then(res => {
      const sortItems = res.sort((a, b) => {
        const nameA = a.name,
          nameB = b.name;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      const currentState = { ...this.state, stockitems: sortItems };
      this.setState(currentState);
    });
  }

  render() {
    return (
      <StockList
        stockitems={this.state.stockitems}
        itemClicked={this.itemClicked}
        updateItem={this.updateItem}
        filterList={this.filterList}
        onChange={this.onChange}
        successMessage={this.state.successMessage}
      />
    );
  }
}

export default StockListPage;
