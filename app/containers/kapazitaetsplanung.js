/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../actions/PPSToolActions';
import Kapazitaetsplanung from '../components/Kapazitaetsplanung'

class KapazitaetsplanungPage extends Component {

	componentDidMount(){
    	this.props.dispatch(setCurrentPage('Kapazitaetsplanung'));
  	}

  render() {
    return (
      <div>
        <Kapazitaetsplanung/>
      </div>
    );
  }

}

export default connect(null, dispatch => ({ dispatch }))(KapazitaetsplanungPage)
