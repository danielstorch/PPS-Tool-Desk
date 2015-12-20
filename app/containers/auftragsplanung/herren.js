/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Herren from '../../components/Herren/Herren'
import { connect } from 'react-redux';
import { setCurrentPage, closeOpenNavLeft } from '../../actions/PPSToolActions';

class HerrenPage extends Component {
componentDidMount(){
    	this.props.dispatch(setCurrentPage('Herren'));
    	
  	}
  render() {
    return (
      <div>
        <Herren/>
      </div>
    );
  }

}

export default connect(null, dispatch => ({ dispatch }))(HerrenPage) 