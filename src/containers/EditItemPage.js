import React from "react";
import { apiCall, forwardToken, pathString } from "../services/api";
import EditItem from "../components/EditItem";

const categories = ["Hot Kitchen", "Cold Kitchen", "Bar"];

class EditItemPage extends React.Component {
  state = {
    item: {
      name: "",
      amount: "",
      unit: "",
      history: []
    }
  };

  componentDidMount() {
    const loadedItem = { ...this.props.history.location.state.item };
    loadedItem.history = loadedItem.history.reverse();
    this.setState({
      item: loadedItem
    });
  }

  onSubmit = event => {
    event.preventDefault();

    const path = `${pathString}/api/${this.state.item._id}/updatestockitem`;
    forwardToken();

    apiCall("POST", path, this.state.item).then(res => {
      this.props.history.push({
        pathname: "/stocklist"
      });
    });
  };

  onDelete = event => {
    event.preventDefault();

    const path = `${pathString}/api/${this.state.item._id}/deleteitem`;

    forwardToken();

    apiCall("DELETE", path, { username: localStorage.username }).then(res => {
      if (res.status === 401) {
        alert("You are not authorised to do that");
      }
      this.props.history.push({
        pathname: "/stocklist"
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
      <EditItem
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onDelete={this.onDelete}
        isAdmin={this.props.isAdmin}
        loadedItem={this.state.item}
        categories={categories}
        onCheck={this.onCheck}
      />
    );
  }
}

export default EditItemPage;
