import React, { Component } from "react";

class Course extends Component {
  render() {
    const params = new URLSearchParams(this.props.location.search);
    const title = params.get("title");
    return (
      <div>
        <h1>{title}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;
