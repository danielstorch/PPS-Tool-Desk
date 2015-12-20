/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';

import Damen from '../../components/Damen'
import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../../actions/PPSToolActions';

class DamenPage extends Component {

	componentDidMount(){
    	this.props.dispatch(setCurrentPage('Damen'));
    	
  	}

  render() {
    return (
      <div>
        <Damen/>
      </div>
    );
  }

}
export default connect(null, dispatch => ({ dispatch }))(DamenPage) 