// components/App.js
 
import React, { PropTypes } from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';
import './Download.module.css';
 
class Downlaod extends React.Component {

  constructor() {
    super();
 
  }

  render() {

    return (
      <div> lol </div>
       
    );
  }
 
}

function mapStateToProps(state) {
  return {
    internationalReducer: state.internationalReducer
  }
}

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Downlaod)