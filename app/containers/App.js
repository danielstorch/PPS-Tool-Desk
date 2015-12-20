import React, { Component, PropTypes } from 'react';
import Navigation from '../components/Navigation'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="Layout">
        <Navigation />
        <div style={{"marginLeft": "60", "marginRight":"60"}}>
          {this.props.children}
          {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
        </div>
      </div>
    );
  }
}
