import React from "react";

import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";

import { makeUpper } from "../helpers";
import moment from "moment";

const EditItem = ({
  onChange,
  onSubmit,
  onDelete,
  onCheck,
  loadedItem,
  isAdmin,
  categories
}) => {
  return (
    <Card className="container">
      <form action="">
        <br />
        {isAdmin ? (
          <div className="field-line">
            <TextField
              type="text"
              name="name"
              placeholder="Stock Item Name"
              onChange={onChange}
              value={makeUpper(loadedItem.name)}
            />
          </div>
        ) : (
          <h2 className="card-heading">{makeUpper(loadedItem.name)}</h2>
        )}

        <div className="field-line">
          <TextField
            type="text"
            name="amount"
            placeholder="Stock Item Amount"
            onChange={onChange}
            value={loadedItem.amount}
          />
        </div>
        <div className="field-line">
          <TextField
            type="text"
            name="unit"
            placeholder="Units (eg. kg/lbs)"
            onChange={onChange}
            value={loadedItem.unit}
          />
        </div>

        <h2>Categories</h2>
        {loadedItem.categories !== undefined ? (
          categories.map(category => {
            return (
              <Checkbox
                name="categories"
                key={category}
                id={category}
                label={category}
                value={category}
                onCheck={onCheck}
                checked={loadedItem.categories.some(element => {
                  return element === category;
                })}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}

        <RaisedButton onClick={onSubmit} label="Update Item" primary />
        {isAdmin && <RaisedButton onClick={onDelete} label="Delete Item" />}
      </form>
      <ul>
        {loadedItem.history.map(historyItem => {
          return (
            <li key={historyItem.updatedDate}>
              Amount: {historyItem.amount} x {historyItem.unit} updated at{" "}
              {moment(historyItem.updatedDate).fromNow()}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default EditItem;
