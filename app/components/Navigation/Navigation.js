// components/App.js
 
import React, { PropTypes } from 'react';
import mui from 'material-ui';
import styles from './Navigation.module.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { saveUploadResultsXML, setActiveUploadResultsXMLData, saveInputXML,  setLanguage} from '../../actions/PPSToolActions';

 
 // dont need this anymore in react 1.0
 // but now we need it to register clicks like for the left navigation
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var AppBar = mui.AppBar
  , LeftNav = mui.LeftNav
  , MenuItem = mui.MenuItem
  , IconButton = mui.IconButton
  , MenuDivider = mui.MenuDivider
  , DropDownMenu = mui.DropDownMenu
  , RaisedButton = mui.RaisedButton;
 
class Navigation extends React.Component {

  constructor() {
    super();
 
    this._handleClick = this._handleClick.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onDeleteLocalStorage = this._onDeleteLocalStorage.bind(this);
    this._getIconlol = this._getIconlol(this);
    this.state = { 
                    isDocked: false
                  , iconClassName: "AppBar-icon-open" 
                  , currentPage: "Home"
                 };
  }

  componentDidMount(){

    if (window.localStorage) {
      //Check local storage for result xmls
      for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        var key = localStorage.key( i );
        if(key.charAt(0) === 'r'){
          var localData = JSON.parse(localStorage.getItem( localStorage.key( i ) ));
          this.props.dispatch(saveUploadResultsXML(localData));
        }

        if(key.charAt(0) === 'i'){
            var localData = JSON.parse(localStorage.getItem( localStorage.key( i ) ));
            this.props.dispatch(saveInputXML(localData));
        }
      }
      
    }else{
      alert('LocalStorage is not supported in your browser');
    }
  }

  _handleClick(e) {
    e.preventDefault();
  
    //über this.state.isDocked ging es nicht, es hat beim start nicht reagiert
    var isDocked = !this.state.isDocked;

    this.refs.leftNav.toggle();
    this.setState({
      isDocked: !this.state.isDocked,
    });


    if(isDocked){
      this.setState({
        iconClassName: "ic_close_white_32dp_1x.png",
      });
    }else{
      this.setState({
        iconClassName: "ic_menu_white_48dp_1x.png",
      });
    }
  }
 
  _onLeftNavChange(e, key, payload) {
    // Do DOM Diff refresh
    this.context.router.transitionTo(payload.route);
  }

  _getIconlol(){
   
  }

  _onDropDownPeriodChange(e) {

    for(let uploadResults of this.props.UploadXMLReducer) {
      if(uploadResults.id === e.target.value){
        this.props.dispatch(setActiveUploadResultsXMLData(uploadResults));
        break;
      }else if(e.target.value === 'result_P-1'){
        this.props.dispatch(setActiveUploadResultsXMLData({id:"result_P-1"}));
      }
    }

  }

    _onDeleteLocalStorage(){
    if (window.localStorage) {
     
      localStorage.clear();
      
    }else{
      alert('LocalStorage is not supported in your browser');
    }

    var remote = require('remote');
    remote.getCurrentWindow().reload();
  }

  _onDropDownLanguageChange(e){
    this.props.dispatch(setLanguage(e.target.value));
  }

  getStyles() {
    let styles = {
      title1: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontWeight: 400,
        color: '#ffffff',
        lineHeight: '64px',
        fontSize: 24,
        display: 'inline-block',
        width: '50%'
      },

      title2: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontWeight: 400,
        color: '#ffffff',
        lineHeight: '64px',
        fontSize: 24,
        display: 'inline-block'
      }
    };

    return styles;
  }

  render() {

    //Create DropDown menuitems
        let menuItemsPeriod = [{payload: 'result_P-1', text: this.props.internationalReducer.activeLanguage.strings.PeriodeWählen}];
    for(let uploadResults of this.props.UploadXMLReducer) {
      menuItemsPeriod.push({payload: uploadResults.id, text: uploadResults.id});
    }

    //Create DropDown menuitems 
    console.log(this.props.internationalReducer.activeLanguage.id)
    let menuItemsLanguage = [{payload: 'DE', text: 'DE'}];
    for(let languages of this.props.internationalReducer.languages) {
      if(languages.id != 'DE'){
          menuItemsLanguage.push({payload: languages.id, text: languages.id});
      }
    }

console.log(menuItemsLanguage)
    return (
        <div id="menu">
          <AppBar title={
                    <div>
                      <h1 style={this.getStyles().title1} >PPSTool</h1>
                      <h1  style={this.getStyles().title2}>ZweiRad</h1>
                    </div>
                  }
                  icon={<img src={this.state.iconClassName} alt="error" />}
                  onLeftIconButtonTouchTap={this._handleClick} 
                  style={{"width":"100%" }}
                  iconStyleRight={{"marginTop": "0"}}
                  iconElementRight={
                    <div>
                      <DropDownMenu menuItems={menuItemsPeriod} onChange={this._onDropDownPeriodChange.bind(this)} style={{"display": "inline-block"}} labelStyle={{"color": "#ffffff"}}> </DropDownMenu>
                      <DropDownMenu menuItems={menuItemsLanguage} onChange={this._onDropDownLanguageChange.bind(this)} style={{"display": "inline-block"}} labelStyle={{"color": "#ffffff"}}> </DropDownMenu>
                    </div>}/>

          <LeftNav ref="leftNav" docked={this.state.isDocked} style={{"top":"100% - <AppBar.height>" }}>
              <MenuItem index={0} icon={<img src="ic_home_black_24dp_1x.png" alt="error" style={{"marginRight":"0px", "top":"10px"}}/>}>
                <Link className={styles.NavigationLink} to="/">
                  {this.props.internationalReducer.activeLanguage.strings.Home}
                </Link>
              </MenuItem>
              <MenuItem index={1} icon={<img src="ic_import_contacts_black_24dp_1x.png" alt="error"/>} iconStyle={{"marginRight":"0px", "top":"10px"}}>
                <Link className={styles.NavigationLink} to="/anleitung">
                  {this.props.internationalReducer.activeLanguage.strings.Anleitung}
                </Link>
              </MenuItem>
              <MenuItem index={2} className={styles.NavigationDivider}>
              </MenuItem>
              <MenuItem index={3} icon={<img src="ic_directions_bike_black_24dp_1x.png" alt="error"/>} iconStyle={{"marginRight":"0px", "top":"10px"}}>
                <a className={styles.NavigationTitle}>{this.props.internationalReducer.activeLanguage.strings.Auftragsplanung}</a>
              </MenuItem>
                  <MenuItem index={4} style={{"lineHeight":"30px" }}>
                    <Link className={styles.NavigationSubLink} to="/auftragsplanung/gesamt">
                      {this.props.internationalReducer.activeLanguage.strings.Gesamt}
                    </Link>
                  </MenuItem>
                  
                  <MenuItem index={5} style={{"lineHeight":"30px"}}>
                    <Link className={styles.NavigationSubLink} to="/auftragsplanung/herren">
                      {this.props.internationalReducer.activeLanguage.strings.Herren}
                    </Link>   
                  </MenuItem>
                  <MenuItem index={6} style={{"lineHeight":"30px" }}>
                    <Link className={styles.NavigationSubLink} to="/auftragsplanung/damen">
                      {this.props.internationalReducer.activeLanguage.strings.Damen}
                    </Link>                  
                  </MenuItem>
                  <MenuItem index={7} style={{"lineHeight":"30px"}}>
                    <Link className={styles.NavigationSubLink} to="/auftragsplanung/kinder">
                      {this.props.internationalReducer.activeLanguage.strings.Kinder}
                    </Link> 
                  </MenuItem>
              <MenuItem index={8} icon={<img src="ic_shopping_cart_black_24dp_1x.png" alt="error"/>} iconStyle={{"marginRight":"0px", "top":"10px"}}>
                    <Link className={styles.NavigationLink} to="/kaufteildisposition">
                      {this.props.internationalReducer.activeLanguage.strings.Kaufteildisposition}
                    </Link> 
              </MenuItem>
              <MenuItem index={9} icon={<img src="ic_watch_later_black_24dp_1x.png" alt="error"/>}  iconStyle={{"marginRight":"0px", "top":"10px"}}>
                  <Link className={styles.NavigationLink} to="/kapazitaetsplanung">
                      {this.props.internationalReducer.activeLanguage.strings.Kapazitaetsplanung}
                  </Link> 
              </MenuItem>
              <MenuItem index={10} icon={<img src="ic_file_download_black_24dp_1x.png" alt="error"/>}  iconStyle={{"marginRight":"0px", "top":"10px"}}>
                <Link className={styles.NavigationLink} to="/download">
                    {this.props.internationalReducer.activeLanguage.strings.Download}
                </Link>
              </MenuItem>
              <MenuItem index={11} icon={<img src="ic_delete_black_24dp_1x.png" alt="error"/>}  iconClassName="MenuItem-icon-delete" iconStyle={{"marginRight":"0px", "top":"10px"}}>
                <a className={styles.NavigationLink}  onClick={this._onDeleteLocalStorage}>{this.props.internationalReducer.activeLanguage.strings.localStorageDeleteButton}</a>
              </MenuItem>
          </LeftNav>
        </div>
    );
  }
 
}
 
Navigation.childContextTypes = {
  muiTheme: React.PropTypes.object
};
 
Navigation.contextTypes = {
  router: React.PropTypes.func
};

Navigation.propTypes = {
  UploadXMLReducer: PropTypes.array.isRequired,
  NavigationReducer: PropTypes.object.isRequired,
  ActiveUploadXML: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    NavigationReducer: state.NavigationReducer,
    UploadXMLReducer: state.UploadXMLReducer,
    ActiveUploadXML: state.ActiveUploadXMLReducer,
    internationalReducer: state.internationalReducer
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions, dispatch)
//   }
// }

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Navigation)