// components/App.js
 
import React, { PropTypes } from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';
import './Home.module.css';
import { Link } from 'react-router';

var RaisedButton = mui.RaisedButton,
    FontIcon = mui.FontIcon;
 
class Home extends React.Component {

  constructor() {
    super();
 
  }

  render() {

    return (
        <div>

        
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


// <RaisedButton className="shake-little"  linkButton={true} href="/auftragsplanung/gesamt" onTouchTap={Link.handleClick} secondary={true} label={this.props.internationalReducer.activeLanguage.strings.Auftragsplanung + " " +this.props.internationalReducer.activeLanguage.strings.Gesamt}>
         
//         </RaisedButton>
        
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button auftragsplanung" href="/auftragsplanung/gesamt" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Auftragsplanung + " " +this.props.internationalReducer.activeLanguage.strings.Gesamt}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button auftragsplanung" href="/auftragsplanung/damen" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Auftragsplanung + " " +this.props.internationalReducer.activeLanguage.strings.Damen}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button auftragsplanung" href="/auftragsplanung/herren" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Auftragsplanung + " " +this.props.internationalReducer.activeLanguage.strings.Herren}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button auftragsplanung" href="/auftragsplanung/kinder" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Auftragsplanung + " " + this.props.internationalReducer.activeLanguage.strings.Kinder}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button kaufteildisposition" href="/kaufteildisposition" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Kaufteildisposition}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button kapazitaetsplanung" href="/kapazitaetsplanung" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Kapazitaetsplanung}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button upload" href="/upload" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Upload}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button download" href="/download" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Download}</a>
//           </div>
//           <div className="shake-little button-well" style={{"display": "inline-block", "width": "50%","margin": "0 auto"}}>
//             <a className="button anleitung" href="/anleitung" onClick={Link.handleClick}>{this.props.internationalReducer.activeLanguage.strings.Anleitung}</a>
//           </div>