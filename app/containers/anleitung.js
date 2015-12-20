/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../actions/PPSToolActions';

class AnleitungPage extends Component {

componentDidMount(){
    	this.props.dispatch(setCurrentPage('Anleitung'));
    	
  	}
  	
  render() {
    return (
      <div>
        <h1>Manual Page</h1>
        <p>Coming soon.</p>
      </div>
    );
  }

}

export default connect(null, dispatch => ({ dispatch }))(AnleitungPage) 
