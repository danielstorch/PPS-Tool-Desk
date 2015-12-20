/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import UploadXML from '../components/UploadXML'

import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../actions/PPSToolActions';

class UploadPage extends Component {

	componentDidMount(){
    	this.props.dispatch(setCurrentPage('Upload'));
  	}
  	
  render() {
    return (
      <div>
        <UploadXML/>
      </div>
    );
  }

}

// Wrap the component to inject dispatch and state into it
export default connect(null, dispatch => ({ dispatch }))(UploadPage) 