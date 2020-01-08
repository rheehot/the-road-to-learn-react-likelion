import React from "react";

const Welcome = props => {
  return <h1>Hello, {props.name}</h1>;
};

/*
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
*/

export default Welcome;
