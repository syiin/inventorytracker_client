import React from "react";
import { apiCall, forwardToken, pathString } from "../services/api";

import AddItem from "../components/AddItem";

const categories = ["Hot Kitchen", "Cold Kitchen", "Bar"];

class StockItemPage extends React.Component {
  state = {
    item: {
      name: "",
      amount: "",
      unit: "",
      categories: []
    }
  };

  onSubmit = event => {
    event.preventDefault();
    let path = `${pathString}/api/addstockitem`;
    forwardToken();
    apiCall("POST", path, this.state.item).then(res => {
      console.log(res);
      this.props.history.push({
        pathname: "/stocklist",
        state: {
          successMessage: `Successfully added item ${res}`
        }
      });
    });
  };

  onChange = event => {
    const item = this.state.item;
    item[event.target.name] = event.target.value;
    this.setState({
      item
    });
  };

  onCheck = event => {
    const item = this.state.item;
    if (!item.categories.includes(event.target.value)) {
      item.categories.push(event.target.value);
    } else {
      var index = item.categories.indexOf(event.target.value);
      item.categories.splice(index, 1);
    }

    this.setState({ item });
  };

  render() {
    return (
      <AddItem
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onCheck={this.onCheck}
        categories={categories}
      />
    );
  }
}

export default StockItemPage;
