/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Kinder from '../../components/Kinder/Kinder'
import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../../actions/PPSToolActions';

class KinderPage extends Component {

	componentDidMount(){
    	this.props.dispatch(setCurrentPage('Kinder'));
    	
  	}

  render() {
    return (
      <div>
        <Kinder/>
      </div>
    );
  }

}

export default connect(null, dispatch => ({ dispatch }))(KinderPage) 