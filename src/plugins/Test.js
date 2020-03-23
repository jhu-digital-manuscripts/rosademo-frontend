import React, { Component, Fragment } from 'react';

export default class Test extends Component {
  render() {
    const { TargetComponent, targetProps } = this.props;
    return (
      <Fragment>
        <div className="this-is-a-test">
          <h1>Moo!</h1>
        </div>
        <TargetComponent {...targetProps} />
      </Fragment>
    );
  }
}
