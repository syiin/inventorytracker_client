import React from "react";

import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";

const StockItem = ({ onChange, onSubmit, onCheck, categories }) => {
  return (
    <Card className="container">
      <form action="">
        <h2 className="card-heading">Add New Item</h2>
        <div className="field-line">
          <TextField
            type="text"
            name="name"
            placeholder="Stock Item Name"
            onChange={onChange}
            // value={loadedItem.name}
          />
        </div>

        <div className="field-line">
          <TextField
            type="text"
            name="amount"
            placeholder="Stock Item Amount"
            onChange={onChange}
            // value={loadedItem.amount}
          />
        </div>

        <div className="field-line">
          <TextField
            type="text"
            name="unit"
            placeholder="Units (eg. kg/lbs)"
            onChange={onChange}
            // value={loadedItem.unit}
          />
        </div>
        <h2>Categories</h2>
        {categories.map(category => {
          return (
            <Checkbox
              name="categories"
              key={category}
              id={category}
              label={category}
              value={category}
              onCheck={onCheck}
            />
          );
        })}

        <div className="button-line">
          <RaisedButton onClick={onSubmit} label="Create Item" primary />
        </div>
      </form>
    </Card>
  );
};

export default StockItem;
