import React from "react";

class RoseDemoAnnotations extends React.Component {
  constructor(props) {
    // For use later
    super(props);
    // Set the initial state
    this.state = { responseText: "" };
    // Bind the request to this
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentDidMount() {
    // send the request on load
    this.sendRequest();
  }

  sendRequest() {
    // Bound to `this` to make sure that we don't lose class context
    fetch(
      "https://rosetest.library.jhu.edu/rosademo/wa/rose/SeldenSupra57/1r/canvas",
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({ responseText: json });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <p>
          {typeof this.state.responseText["@context"] !== "undefined" ? (
            Object.entries(this.state.responseText["@context"]).map(
              ([key, value]) => {
                return (
                  <li key={`${key}`}>
                    <p style={{ margin: `0px 10px 0px 2vw` }}>{value}</p>
                  </li>
                );
              }
            )
          ) : (
            <></>
          )}
        </p>
      </div>
    );
  }
}

export default RoseDemoAnnotations;