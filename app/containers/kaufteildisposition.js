/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../actions/PPSToolActions';
import Kaufteildisposition from '../components/Kaufteildisposition/Kaufteildisposition'

class KaufteildispositionPage extends Component {

componentDidMount(){
    	this.props.dispatch(setCurrentPage('Kaufteildisposition'));
  	}
  	
  render() {
    return (
      <div>
        <Kaufteildisposition/>
      </div>
    );
  }

}

export default connect(null, dispatch => ({ dispatch }))(KaufteildispositionPage) 