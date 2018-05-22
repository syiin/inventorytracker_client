import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { List } from "material-ui/List";
import { ListItem } from "material-ui/List";
import { Card } from "material-ui/Card";
import TextField from "material-ui/TextField";

import { makeUpper } from "../helpers";

export const StockList = ({
  stockitems,
  filterList,
  itemClicked,
  updateItem,
  onChange,
  successMessage
}) => {
  return (
    <Card className="container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button name="Bar" onClick={filterList} className="stocklist-button">
        BAR
      </button>
      <button
        name="Hot Kitchen"
        onClick={filterList}
        className="stocklist-button"
      >
        HOT
      </button>
      <button
        name="Cold Kitchen"
        onClick={filterList}
        className="stocklist-button"
      >
        COLD
      </button>

      <form action="">
        <List>
          {stockitems.map((item, index) => {
            return (
              <ListItem key={item._id}>
                {makeUpper(item.name)}
                <br />{" "}
                <TextField
                  type="text"
                  value={item.amount}
                  name="amount"
                  tabIndex={index}
                  onChange={onChange}
                />
                x {item.unit}
                <br />
                Updated At: {moment(item.updatedAt).fromNow()}
                <br />
                <button
                  onClick={updateItem}
                  tabIndex={index}
                  className="stocklist-button"
                >
                  Update Item
                </button>
                <button
                  onClick={itemClicked.bind(this, item)}
                  className="stocklist-button"
                >
                  See More Info
                </button>
              </ListItem>
            );
          })}
        </List>
      </form>
    </Card>
  );
};

export default StockList;

StockList.propTypes = {
  stockitems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  filterList: PropTypes.func.isRequired,
  itemClicked: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  successMessage: PropTypes.string
};
