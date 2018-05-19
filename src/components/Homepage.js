import React from "react";
import { Card, CardTitle } from "material-ui/Card";

class HomePage extends React.Component {
  render() {
    return (
      <Card className="container">
        <CardTitle title="HomePage" subtitle="Don't forget to login!" />
      </Card>
    );
  }
}

export default HomePage;
