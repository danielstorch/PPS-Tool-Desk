/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

import Gesamt from '../../components/Gesamt'
import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../../actions/PPSToolActions';

class GesamtPage extends Component {

	componentDidMount(){
    	this.props.dispatch(setCurrentPage('Gesamt'));
    	
  	}

  render() {
    return (
      <div>
        <Gesamt/>   
      </div>
    );
  }

}

export default connect(null, dispatch => ({ dispatch }))(GesamtPage) 
