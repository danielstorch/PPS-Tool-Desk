// components/App.js
 
import React, { PropTypes } from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';
import styles from './Home.module.css';
import { Link } from 'react-router';

var RaisedButton = mui.RaisedButton,
    FontIcon = mui.FontIcon,
    FloatingActionButton = mui.FloatingActionButton;

class Home extends React.Component {

  constructor() {
    super();

  }

  render() {

    return (
        <div>
          <div className={styles.wrappper}>
            <h1 className={styles.headder}>{this.props.internationalReducer.activeLanguage.strings.Willkommen}</h1>

            <div className={styles.startButtonWrapper}>
                <Link className={styles.startButton} to="/auftragsplanung/gesamt">
                  {this.props.internationalReducer.activeLanguage.strings.Starten}
                </Link>
            </div>
          </div>

        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    internationalReducer: state.internationalReducer
  }
}

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Home)


