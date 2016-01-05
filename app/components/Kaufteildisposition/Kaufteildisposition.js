import React from 'react';
import styles from './Kaufteildisposition.module.css';
import mui from 'material-ui';
import { connect } from 'react-redux';
import { setKaufteildispositionInputXML, resetKaufteildispositionInputXML  } from '../../actions/PPSToolActions';
import { Link } from 'react-router';

var TableBody = mui.TableBody
  , TableHeader = mui.TableHeader
  , TableRow = mui.TableRow
  , Table = mui.Table
  , TableHeaderColumn = mui.TableHeaderColumn
  , TableRowColumn = mui.TableRowColumn
  , Dialog = mui.Dialog
  , Snackbar = mui.Snackbar
  , TextField = mui.TextField
  , RaisedButton = mui.RaisedButton
  , DropDownMenu = mui.DropDownMenu
  , MenuItem = mui.MenuItem
  , Toggle = mui.Toggle;



var Dialog = mui.Dialog
  , Snackbar = mui.Snackbar;





class Kaufteildisposition extends React.Component {

  constructor() {
    super();
    this._getAnfangsbestand = this._getAnfangsbestand.bind(this);
    this._handleBestellungMengeChange = this._handleBestellungMengeChange.bind(this);
    this._handleBestellungArtChange = this._handleBestellungArtChange.bind(this);
    this._handleDetailModeChange = this._handleDetailModeChange.bind(this);
    this._handleDropDownChange = this._handleDropDownChange.bind(this);
    this._handleSaveButtonClick = this._handleSaveButtonClick.bind(this);

    this._handleProgrammPlan2Change = this._handleProgrammPlan2Change.bind(this);
    this._handleProgrammPlan3Change = this._handleProgrammPlan3Change.bind(this);
    this._handleProgrammPlan4Change = this._handleProgrammPlan4Change.bind(this);

    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this._updateLocalStorage = this._updateLocalStorage.bind(this);

    this._getBedarfGesamt = this._getBedarfGesamt.bind(this);
    this._calculateBedarf = this._calculateBedarf.bind(this);
    this._calcEverything = this._calcEverything.bind(this);

    this.state = {
      currentPeriode:"",
      modal: true,
      openDialogStandardActions: false,
      dialogTitle: "Dialog",
      dialogText: "DialogText",
      snackBarautoHideDuration: 3000,
      snackBarmessage: 'Save completed!',

      resetButtonDisabled: true,
      displayRowCheckbox: false,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      height: '1500px',
      heightt: '250px',
      buttonDisabled: false,

      currentPeriode: "",
      dropDownValue: 0,
      detailMode: false,

      Perioden:{
        periode1:0,
        periode2:0,
        periode3:0,
        periode4:0
      },

      Produktionsplan1:{
        P1:0,
        P2:0,
        P3:0
      },
      Produktionsplan2:{
        P1:0,
        P2:0,
        P3:0
      },
      Produktionsplan3:{
        P1:0,
        P2:0,
        P3:0
      },
      Produktionsplan4:{
        P1:0,
        P2:0,
        P3:0
      },
      errorTextProduktionsplan2:{
        P1: '',
        P2: '',
        P3: ''
      },
      errorTextProduktionsplan3:{
        P1: '',
        P2: '',
        P3: ''
      },
      errorTextProduktionsplan4:{
        P1: '',
        P2: '',
        P3: ''
      },

      Lieferzeit:{
        E21: 1.8,
        E22: 1.7,
        E23: 1.2,
        E24: 3.2,
        E25: 0.9,
        E27: 0.9,
        E28: 1.7,
        E32: 2.1,
        E33: 1.9,
        E34: 1.6,
        E35: 2.2,
        E36: 1.2,
        E37: 1.5,
        E38: 1.7,
        E39: 1.5,
        E40: 1.7,
        E41: 0.9,
        E42: 1.2,
        E43: 2,
        E44: 1,
        E45: 1.7,
        E46: 0.9,
        E47: 1.1,
        E48: 1,
        E52: 1.6,
        E53: 1.6,
        E57: 1.7,
        E58: 1.6,
        E59: 1.7,
      },

      Abweichung:{
        E21: 0.4,
        E22: 0.4,
        E23: 0.2,
        E24: 0.3,
        E25: 0.2,
        E27: 0.2,
        E28: 0.4,
        E32: 0.5,
        E33: 0.5,
        E34: 0.3,
        E35: 0.4,
        E36: 0.1,
        E37: 0.3,
        E38: 0.4,
        E39: 0.3,
        E40: 0.2,
        E41: 0.2,
        E42: 0.3,
        E43: 0.5,
        E44: 0.2,
        E45: 0.3,
        E46: 0.3,
        E47: 0.1,
        E48: 0.2,
        E52: 0.4,
        E53: 0.2,
        E57: 0.3,
        E58: 0.5,
        E59: 0.2,
      },

      BenoetigtFuerP1:{
        E21: 1,
        E22: 0,
        E23: 0,
        E24: 7,
        E25: 4,
        E27: 2,
        E28: 4,
        E32: 3,
        E33: 0,
        E34: 0,
        E35: 4,
        E36: 1,
        E37: 1,
        E38: 1,
        E39: 2,
        E40: 1,
        E41: 1,
        E42: 2,
        E43: 1,
        E44: 3,
        E45: 1,
        E46: 1,
        E47: 1,
        E48: 2,
        E52: 2,
        E53: 72,
        E57: 0,
        E58: 0,
        E59: 2,
      },

      BenoetigtFuerP2:{
        E21: 0,
        E22: 1,
        E23: 0,
        E24: 7,
        E25: 4,
        E27: 2,
        E28: 5,
        E32: 3,
        E33: 0,
        E34: 0,
        E35: 4,
        E36: 1,
        E37: 1,
        E38: 1,
        E39: 2,
        E40: 1,
        E41: 1,
        E42: 2,
        E43: 1,
        E44: 3,
        E45: 1,
        E46: 1,
        E47: 1,
        E48: 2,
        E52: 0,
        E53: 0,
        E57: 2,
        E58: 72,
        E59: 2,
      },

      BenoetigtFuerP3:{
        E21: 0,
        E22: 0,
        E23: 1,
        E24: 7,
        E25: 4,
        E27: 2,
        E28: 6,
        E32: 3,
        E33: 2,
        E34: 72,
        E35: 4,
        E36: 1,
        E37: 1,
        E38: 1,
        E39: 2,
        E40: 1,
        E41: 1,
        E42: 2,
        E43: 1,
        E44: 3,
        E45: 1,
        E46: 1,
        E47: 1,
        E48: 2,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 2,
      },

      Diskontmenge:{
        E21: 300,
        E22: 300,
        E23: 300,
        E24: 6100,
        E25: 3600,
        E27: 1800,
        E28: 4500,
        E32: 2700,
        E33: 900,
        E34: 22000,
        E35: 3600,
        E36: 900,
        E37: 900,
        E38: 300,
        E39: 1800,
        E40: 900,
        E41: 900,
        E42: 1800,
        E43: 2700,
        E44: 900,
        E45: 900,
        E46: 900,
        E47: 900,
        E48: 1800,
        E52: 600,
        E53: 22000,
        E57: 600,
        E58: 22000,
        E59: 1800,
      },

      Anfangsbestand:{
        E21: 0,
        E22: 0,
        E23: 0,
        E24: 0,
        E25: 0,
        E27: 0,
        E28: 0,
        E32: 0,
        E33: 0,
        E34: 0,
        E35: 0,
        E36: 0,
        E37: 0,
        E38: 0,
        E39: 0,
        E40: 0,
        E41: 0,
        E42: 0,
        E43: 0,
        E44: 0,
        E45: 0,
        E46: 0,
        E47: 0,
        E48: 0,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 0,
      },

      Bedarf1:{
        E21: 0,
        E22: 0,
        E23: 0,
        E24: 0,
        E25: 0,
        E27: 0,
        E28: 0,
        E32: 0,
        E33: 0,
        E34: 0,
        E35: 0,
        E36: 0,
        E37: 0,
        E38: 0,
        E39: 0,
        E40: 0,
        E41: 0,
        E42: 0,
        E43: 0,
        E44: 0,
        E45: 0,
        E46: 0,
        E47: 0,
        E48: 0,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 0,
      },

      Bedarf2:{
        E21: 0,
        E22: 0,
        E23: 0,
        E24: 0,
        E25: 0,
        E27: 0,
        E28: 0,
        E32: 0,
        E33: 0,
        E34: 0,
        E35: 0,
        E36: 0,
        E37: 0,
        E38: 0,
        E39: 0,
        E40: 0,
        E41: 0,
        E42: 0,
        E43: 0,
        E44: 0,
        E45: 0,
        E46: 0,
        E47: 0,
        E48: 0,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 0,
      },

      Bedarf3:{
        E21: 0,
        E22: 0,
        E23: 0,
        E24: 0,
        E25: 0,
        E27: 0,
        E28: 0,
        E32: 0,
        E33: 0,
        E34: 0,
        E35: 0,
        E36: 0,
        E37: 0,
        E38: 0,
        E39: 0,
        E40: 0,
        E41: 0,
        E42: 0,
        E43: 0,
        E44: 0,
        E45: 0,
        E46: 0,
        E47: 0,
        E48: 0,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 0,
      },

      Bedarf4:{
        E21: 0,
        E22: 0,
        E23: 0,
        E24: 0,
        E25: 0,
        E27: 0,
        E28: 0,
        E32: 0,
        E33: 0,
        E34: 0,
        E35: 0,
        E36: 0,
        E37: 0,
        E38: 0,
        E39: 0,
        E40: 0,
        E41: 0,
        E42: 0,
        E43: 0,
        E44: 0,
        E45: 0,
        E46: 0,
        E47: 0,
        E48: 0,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 0,
      },

      BedarfGesamt:{
        E21: 0,
        E22: 0,
        E23: 0,
        E24: 0,
        E25: 0,
        E27: 0,
        E28: 0,
        E32: 0,
        E33: 0,
        E34: 0,
        E35: 0,
        E36: 0,
        E37: 0,
        E38: 0,
        E39: 0,
        E40: 0,
        E41: 0,
        E42: 0,
        E43: 0,
        E44: 0,
        E45: 0,
        E46: 0,
        E47: 0,
        E48: 0,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 0,
      },

      BestellungMenge:{
        E21: 0,
        E22: 0,
        E23: 0,
        E24: 0,
        E25: 0,
        E27: 0,
        E28: 0,
        E32: 0,
        E33: 0,
        E34: 0,
        E35: 0,
        E36: 0,
        E37: 0,
        E38: 0,
        E39: 0,
        E40: 0,
        E41: 0,
        E42: 0,
        E43: 0,
        E44: 0,
        E45: 0,
        E46: 0,
        E47: 0,
        E48: 0,
        E52: 0,
        E53: 0,
        E57: 0,
        E58: 0,
        E59: 0,
      },

      BestellungArt:{
        E21: false,
        E22: false,
        E23: false,
        E24: false,
        E25: false,
        E27: false,
        E28: false,
        E32: false,
        E33: false,
        E34: false,
        E35: false,
        E36: false,
        E37: false,
        E38: false,
        E39: false,
        E40: false,
        E41: false,
        E42: false,
        E43: false,
        E44: false,
        E45: false,
        E46: false,
        E47: false,
        E48: false,
        E52: false,
        E53: false,
        E57: false,
        E58: false,
        E59: false,
      },

      errorTextBestellungMenge:{
        E21: '',
        E22: '',
        E23: '',
        E24: '',
        E25: '',
        E27: '',
        E28: '',
        E32: '',
        E33: '',
        E34: '',
        E35: '',
        E36: '',
        E37: '',
        E38: '',
        E39: '',
        E40: '',
        E41: '',
        E42: '',
        E43: '',
        E44: '',
        E45: '',
        E46: '',
        E47: '',
        E48: '',
        E52: '',
        E53: '',
        E57: '',
        E58: '',
        E59: '',
      }
    };

  }

   componentWillMount(){
    this._updateVariables(true)
  }

  componentDidUpdate(){

    this._updateVariables(false);

  }

  _updateVariables(initial){

    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    if(initial == true || this.state.currentPeriode != activePeriodID){



      // check wenn periode -1 ausgewählt wurde, weil es dann keine currentInputXml gibt
      if(currentInputXML){

          var hajalol = parseInt(activePeriodID.substring(1))
          this.state.Perioden.periode1 = hajalol + 1
          this.state.Perioden.periode2 = hajalol + 2
          this.state.Perioden.periode3 = hajalol + 3
          this.state.Perioden.periode4 = hajalol + 4

        //Wenn es eine richtige periode und unterschiedliche periode ist. Müssen paar werte zurücksetzen
        //es braucht auch nicht gemacht werden wenn es schon eine Kaufteildispositon eintrag gibt
        if(!currentInputXML.inputDataObject.kaufteildisposition && this.state.currentPeriode != activePeriodID){

          this.state.Produktionsplan1.P1 = 0
          this.state.Produktionsplan1.P2 = 0
          this.state.Produktionsplan1.P3 = 0
          this.state.Produktionsplan2.P1 = 0
          this.state.Produktionsplan2.P2 = 0
          this.state.Produktionsplan2.P3 = 0
          this.state.Produktionsplan3.P1 = 0
          this.state.Produktionsplan3.P2 = 0
          this.state.Produktionsplan3.P3 = 0
          this.state.Produktionsplan4.P1 = 0
          this.state.Produktionsplan4.P2 = 0
          this.state.Produktionsplan4.P3 = 0

          this.state.BestellungArt.E21 = false
          this.state.BestellungArt.E22 = false
          this.state.BestellungArt.E23 = false
          this.state.BestellungArt.E24 = false
          this.state.BestellungArt.E25 = false
          this.state.BestellungArt.E27 = false
          this.state.BestellungArt.E28 = false
          this.state.BestellungArt.E32 = false
          this.state.BestellungArt.E33 = false
          this.state.BestellungArt.E34 = false
          this.state.BestellungArt.E35 = false
          this.state.BestellungArt.E36 = false
          this.state.BestellungArt.E37 = false
          this.state.BestellungArt.E38 = false
          this.state.BestellungArt.E39 = false
          this.state.BestellungArt.E40 = false
          this.state.BestellungArt.E41 = false
          this.state.BestellungArt.E42 = false
          this.state.BestellungArt.E43 = false
          this.state.BestellungArt.E44 = false
          this.state.BestellungArt.E45 = false
          this.state.BestellungArt.E46 = false
          this.state.BestellungArt.E47 = false
          this.state.BestellungArt.E48 = false
          this.state.BestellungArt.E52 = false
          this.state.BestellungArt.E53 = false
          this.state.BestellungArt.E57 = false
          this.state.BestellungArt.E58 = false
          this.state.BestellungArt.E59 = false

          this.state.BestellungMenge.E21 = 0
          this.state.BestellungMenge.E22 = 0
          this.state.BestellungMenge.E23 = 0
          this.state.BestellungMenge.E24 = 0
          this.state.BestellungMenge.E25 = 0
          this.state.BestellungMenge.E27 = 0
          this.state.BestellungMenge.E28 = 0
          this.state.BestellungMenge.E32 = 0
          this.state.BestellungMenge.E33 = 0
          this.state.BestellungMenge.E34 = 0
          this.state.BestellungMenge.E35 = 0
          this.state.BestellungMenge.E36 = 0
          this.state.BestellungMenge.E37 = 0
          this.state.BestellungMenge.E38 = 0
          this.state.BestellungMenge.E39 = 0
          this.state.BestellungMenge.E40 = 0
          this.state.BestellungMenge.E41 = 0
          this.state.BestellungMenge.E42 = 0
          this.state.BestellungMenge.E43 = 0
          this.state.BestellungMenge.E44 = 0
          this.state.BestellungMenge.E45 = 0
          this.state.BestellungMenge.E46 = 0
          this.state.BestellungMenge.E47 = 0
          this.state.BestellungMenge.E48 = 0
          this.state.BestellungMenge.E52 = 0
          this.state.BestellungMenge.E53 = 0
          this.state.BestellungMenge.E57 = 0
          this.state.BestellungMenge.E58 = 0
          this.state.BestellungMenge.E59 = 0

          this._calcEverything()
        }

        if( currentInputXML.inputDataObject.kaufteildisposition ){

          this.state.dropDownValue = currentInputXML.inputDataObject.kaufteildisposition.DropDownValue

          this.state.Produktionsplan1.P1 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan1.P1
          this.state.Produktionsplan1.P2 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan1.P2
          this.state.Produktionsplan1.P3 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan1.P3

          this.state.Produktionsplan2.P1 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan2.P1
          this.state.Produktionsplan2.P2 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan2.P2
          this.state.Produktionsplan2.P3 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan2.P3

          this.state.Produktionsplan3.P1 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan3.P1
          this.state.Produktionsplan3.P2 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan3.P2
          this.state.Produktionsplan3.P3 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan3.P3

          this.state.Produktionsplan4.P1 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan4.P1
          this.state.Produktionsplan4.P2 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan4.P2
          this.state.Produktionsplan4.P3 = currentInputXML.inputDataObject.kaufteildisposition.Produktionsplan4.P3

          this._calcEverything()

          this.state.BestellungArt.E21 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E21
          this.state.BestellungArt.E22 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E22
          this.state.BestellungArt.E23 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E23
          this.state.BestellungArt.E24 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E24
          this.state.BestellungArt.E25 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E25
          this.state.BestellungArt.E27 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E27
          this.state.BestellungArt.E28 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E28
          this.state.BestellungArt.E32 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E32
          this.state.BestellungArt.E33 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E33
          this.state.BestellungArt.E34 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E34
          this.state.BestellungArt.E35 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E35
          this.state.BestellungArt.E36 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E36
          this.state.BestellungArt.E37 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E37
          this.state.BestellungArt.E38 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E38
          this.state.BestellungArt.E39 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E39
          this.state.BestellungArt.E40 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E40
          this.state.BestellungArt.E41 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E41
          this.state.BestellungArt.E42 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E42
          this.state.BestellungArt.E43 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E43
          this.state.BestellungArt.E44 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E44
          this.state.BestellungArt.E45 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E45
          this.state.BestellungArt.E46 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E46
          this.state.BestellungArt.E47 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E47
          this.state.BestellungArt.E48 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E48
          this.state.BestellungArt.E52 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E52
          this.state.BestellungArt.E53 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E53
          this.state.BestellungArt.E57 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E57
          this.state.BestellungArt.E58 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E58
          this.state.BestellungArt.E59 = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt.E59

          this.state.BestellungMenge.E21 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E21
          this.state.BestellungMenge.E22 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E22
          this.state.BestellungMenge.E23 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E23
          this.state.BestellungMenge.E24 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E24
          this.state.BestellungMenge.E25 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E25
          this.state.BestellungMenge.E27 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E27
          this.state.BestellungMenge.E28 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E28
          this.state.BestellungMenge.E32 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E32
          this.state.BestellungMenge.E33 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E33
          this.state.BestellungMenge.E34 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E34
          this.state.BestellungMenge.E35 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E35
          this.state.BestellungMenge.E36 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E36
          this.state.BestellungMenge.E37 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E37
          this.state.BestellungMenge.E38 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E38
          this.state.BestellungMenge.E39 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E39
          this.state.BestellungMenge.E40 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E40
          this.state.BestellungMenge.E41 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E41
          this.state.BestellungMenge.E42 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E42
          this.state.BestellungMenge.E43 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E43
          this.state.BestellungMenge.E44 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E44
          this.state.BestellungMenge.E45 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E45
          this.state.BestellungMenge.E46 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E46
          this.state.BestellungMenge.E47 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E47
          this.state.BestellungMenge.E48 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E48
          this.state.BestellungMenge.E52 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E52
          this.state.BestellungMenge.E53 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E53
          this.state.BestellungMenge.E57 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E57
          this.state.BestellungMenge.E58 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E58
          this.state.BestellungMenge.E59 = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge.E59

          this.state.resetButtonDisabled = false

        } else {

          if(currentInputXML.inputDataObject.auftragsplanungHerren){
            this.state.Produktionsplan1.P1 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.P1
          } else{
            this.state.Produktionsplan1.P1 = 0
          }

          if(currentInputXML.inputDataObject.auftragsplanungDamen){
            this.state.Produktionsplan1.P2 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.P2
          } else{
            this.state.Produktionsplan1.P2 = 0
          }

          if(currentInputXML.inputDataObject.auftragsplanungKinder){
            this.state.Produktionsplan1.P3 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.P3
          } else{
            this.state.Produktionsplan1.P3 = 0
          }

          this._calcEverything()

          this.state.resetButtonDisabled = true

        }
      }else{
          // Wenn periode -1 ausgewählt wurde, dann gibt es keine currentInputXML

          this.state.Produktionsplan1.P1 = 0
          this.state.Produktionsplan1.P2 = 0
          this.state.Produktionsplan1.P3 = 0
          this.state.Produktionsplan2.P1 = 0
          this.state.Produktionsplan2.P2 = 0
          this.state.Produktionsplan2.P3 = 0
          this.state.Produktionsplan3.P1 = 0
          this.state.Produktionsplan3.P2 = 0
          this.state.Produktionsplan3.P3 = 0
          this.state.Produktionsplan4.P1 = 0
          this.state.Produktionsplan4.P2 = 0
          this.state.Produktionsplan4.P3 = 0

          this.state.BestellungArt.E21 = false
          this.state.BestellungArt.E22 = false
          this.state.BestellungArt.E23 = false
          this.state.BestellungArt.E24 = false
          this.state.BestellungArt.E25 = false
          this.state.BestellungArt.E27 = false
          this.state.BestellungArt.E28 = false
          this.state.BestellungArt.E32 = false
          this.state.BestellungArt.E33 = false
          this.state.BestellungArt.E34 = false
          this.state.BestellungArt.E35 = false
          this.state.BestellungArt.E36 = false
          this.state.BestellungArt.E37 = false
          this.state.BestellungArt.E38 = false
          this.state.BestellungArt.E39 = false
          this.state.BestellungArt.E40 = false
          this.state.BestellungArt.E41 = false
          this.state.BestellungArt.E42 = false
          this.state.BestellungArt.E43 = false
          this.state.BestellungArt.E44 = false
          this.state.BestellungArt.E45 = false
          this.state.BestellungArt.E46 = false
          this.state.BestellungArt.E47 = false
          this.state.BestellungArt.E48 = false
          this.state.BestellungArt.E52 = false
          this.state.BestellungArt.E53 = false
          this.state.BestellungArt.E57 = false
          this.state.BestellungArt.E58 = false
          this.state.BestellungArt.E59 = false

          this.state.BestellungMenge.E21 = 0
          this.state.BestellungMenge.E22 = 0
          this.state.BestellungMenge.E23 = 0
          this.state.BestellungMenge.E24 = 0
          this.state.BestellungMenge.E25 = 0
          this.state.BestellungMenge.E27 = 0
          this.state.BestellungMenge.E28 = 0
          this.state.BestellungMenge.E32 = 0
          this.state.BestellungMenge.E33 = 0
          this.state.BestellungMenge.E34 = 0
          this.state.BestellungMenge.E35 = 0
          this.state.BestellungMenge.E36 = 0
          this.state.BestellungMenge.E37 = 0
          this.state.BestellungMenge.E38 = 0
          this.state.BestellungMenge.E39 = 0
          this.state.BestellungMenge.E40 = 0
          this.state.BestellungMenge.E41 = 0
          this.state.BestellungMenge.E42 = 0
          this.state.BestellungMenge.E43 = 0
          this.state.BestellungMenge.E44 = 0
          this.state.BestellungMenge.E45 = 0
          this.state.BestellungMenge.E46 = 0
          this.state.BestellungMenge.E47 = 0
          this.state.BestellungMenge.E48 = 0
          this.state.BestellungMenge.E52 = 0
          this.state.BestellungMenge.E53 = 0
          this.state.BestellungMenge.E57 = 0
          this.state.BestellungMenge.E58 = 0
          this.state.BestellungMenge.E59 = 0

          this._calcEverything()

          this.state.resetButtonDisabled = true
      }

      this.setState({
        currentPeriode: activePeriodID
      });

    }

  }

  _calcEverything(){

    this.state.Bedarf1.E21 = this._calculateBedarf("E21", 1)
      this.state.Bedarf1.E22 = this._calculateBedarf("E22", 1)
      this.state.Bedarf1.E23 = this._calculateBedarf("E23", 1)
      this.state.Bedarf1.E24 = this._calculateBedarf("E24", 1)
      this.state.Bedarf1.E25 = this._calculateBedarf("E25", 1)
      this.state.Bedarf1.E27 = this._calculateBedarf("E27", 1)
      this.state.Bedarf1.E28 = this._calculateBedarf("E28", 1)
      this.state.Bedarf1.E32 = this._calculateBedarf("E32", 1)
      this.state.Bedarf1.E33 = this._calculateBedarf("E33", 1)
      this.state.Bedarf1.E34 = this._calculateBedarf("E34", 1)
      this.state.Bedarf1.E35 = this._calculateBedarf("E35", 1)
      this.state.Bedarf1.E36 = this._calculateBedarf("E36", 1)
      this.state.Bedarf1.E37 = this._calculateBedarf("E37", 1)
      this.state.Bedarf1.E38 = this._calculateBedarf("E38", 1)
      this.state.Bedarf1.E39 = this._calculateBedarf("E39", 1)
      this.state.Bedarf1.E40 = this._calculateBedarf("E40", 1)
      this.state.Bedarf1.E41 = this._calculateBedarf("E41", 1)
      this.state.Bedarf1.E42 = this._calculateBedarf("E42", 1)
      this.state.Bedarf1.E43 = this._calculateBedarf("E43", 1)
      this.state.Bedarf1.E44 = this._calculateBedarf("E44", 1)
      this.state.Bedarf1.E45 = this._calculateBedarf("E45", 1)
      this.state.Bedarf1.E46 = this._calculateBedarf("E46", 1)
      this.state.Bedarf1.E47 = this._calculateBedarf("E47", 1)
      this.state.Bedarf1.E48 = this._calculateBedarf("E48", 1)
      this.state.Bedarf1.E52 = this._calculateBedarf("E52", 1)
      this.state.Bedarf1.E53 = this._calculateBedarf("E53", 1)
      this.state.Bedarf1.E57 = this._calculateBedarf("E57", 1)
      this.state.Bedarf1.E58 = this._calculateBedarf("E58", 1)
      this.state.Bedarf1.E59 = this._calculateBedarf("E59", 1)

      this.state.Bedarf2.E21 = this._calculateBedarf("E21", 2)
      this.state.Bedarf2.E22 = this._calculateBedarf("E22", 2)
      this.state.Bedarf2.E23 = this._calculateBedarf("E23", 2)
      this.state.Bedarf2.E24 = this._calculateBedarf("E24", 2)
      this.state.Bedarf2.E25 = this._calculateBedarf("E25", 2)
      this.state.Bedarf2.E27 = this._calculateBedarf("E27", 2)
      this.state.Bedarf2.E28 = this._calculateBedarf("E28", 2)
      this.state.Bedarf2.E32 = this._calculateBedarf("E32", 2)
      this.state.Bedarf2.E33 = this._calculateBedarf("E33", 2)
      this.state.Bedarf2.E34 = this._calculateBedarf("E34", 2)
      this.state.Bedarf2.E35 = this._calculateBedarf("E35", 2)
      this.state.Bedarf2.E36 = this._calculateBedarf("E36", 2)
      this.state.Bedarf2.E37 = this._calculateBedarf("E37", 2)
      this.state.Bedarf2.E38 = this._calculateBedarf("E38", 2)
      this.state.Bedarf2.E39 = this._calculateBedarf("E39", 2)
      this.state.Bedarf2.E40 = this._calculateBedarf("E40", 2)
      this.state.Bedarf2.E41 = this._calculateBedarf("E41", 2)
      this.state.Bedarf2.E42 = this._calculateBedarf("E42", 2)
      this.state.Bedarf2.E43 = this._calculateBedarf("E43", 2)
      this.state.Bedarf2.E44 = this._calculateBedarf("E44", 2)
      this.state.Bedarf2.E45 = this._calculateBedarf("E45", 2)
      this.state.Bedarf2.E46 = this._calculateBedarf("E46", 2)
      this.state.Bedarf2.E47 = this._calculateBedarf("E47", 2)
      this.state.Bedarf2.E48 = this._calculateBedarf("E48", 2)
      this.state.Bedarf2.E52 = this._calculateBedarf("E52", 2)
      this.state.Bedarf2.E53 = this._calculateBedarf("E53", 2)
      this.state.Bedarf2.E57 = this._calculateBedarf("E57", 2)
      this.state.Bedarf2.E58 = this._calculateBedarf("E58", 2)
      this.state.Bedarf2.E59 = this._calculateBedarf("E59", 2)

      this.state.Bedarf3.E21 = this._calculateBedarf("E21", 3)
      this.state.Bedarf3.E22 = this._calculateBedarf("E22", 3)
      this.state.Bedarf3.E23 = this._calculateBedarf("E23", 3)
      this.state.Bedarf3.E24 = this._calculateBedarf("E24", 3)
      this.state.Bedarf3.E25 = this._calculateBedarf("E25", 3)
      this.state.Bedarf3.E27 = this._calculateBedarf("E27", 3)
      this.state.Bedarf3.E28 = this._calculateBedarf("E28", 3)
      this.state.Bedarf3.E32 = this._calculateBedarf("E32", 3)
      this.state.Bedarf3.E33 = this._calculateBedarf("E33", 3)
      this.state.Bedarf3.E34 = this._calculateBedarf("E34", 3)
      this.state.Bedarf3.E35 = this._calculateBedarf("E35", 3)
      this.state.Bedarf3.E36 = this._calculateBedarf("E36", 3)
      this.state.Bedarf3.E37 = this._calculateBedarf("E37", 3)
      this.state.Bedarf3.E38 = this._calculateBedarf("E38", 3)
      this.state.Bedarf3.E39 = this._calculateBedarf("E39", 3)
      this.state.Bedarf3.E40 = this._calculateBedarf("E40", 3)
      this.state.Bedarf3.E41 = this._calculateBedarf("E41", 3)
      this.state.Bedarf3.E42 = this._calculateBedarf("E42", 3)
      this.state.Bedarf3.E43 = this._calculateBedarf("E43", 3)
      this.state.Bedarf3.E44 = this._calculateBedarf("E44", 3)
      this.state.Bedarf3.E45 = this._calculateBedarf("E45", 3)
      this.state.Bedarf3.E46 = this._calculateBedarf("E46", 3)
      this.state.Bedarf3.E47 = this._calculateBedarf("E47", 3)
      this.state.Bedarf3.E48 = this._calculateBedarf("E48", 3)
      this.state.Bedarf3.E52 = this._calculateBedarf("E52", 3)
      this.state.Bedarf3.E53 = this._calculateBedarf("E53", 3)
      this.state.Bedarf3.E57 = this._calculateBedarf("E57", 3)
      this.state.Bedarf3.E58 = this._calculateBedarf("E58", 3)
      this.state.Bedarf3.E59 = this._calculateBedarf("E59", 3)

      this.state.Bedarf4.E21 = this._calculateBedarf("E21", 4)
      this.state.Bedarf4.E22 = this._calculateBedarf("E22", 4)
      this.state.Bedarf4.E23 = this._calculateBedarf("E23", 4)
      this.state.Bedarf4.E24 = this._calculateBedarf("E24", 4)
      this.state.Bedarf4.E25 = this._calculateBedarf("E25", 4)
      this.state.Bedarf4.E27 = this._calculateBedarf("E27", 4)
      this.state.Bedarf4.E28 = this._calculateBedarf("E28", 4)
      this.state.Bedarf4.E32 = this._calculateBedarf("E32", 4)
      this.state.Bedarf4.E33 = this._calculateBedarf("E33", 4)
      this.state.Bedarf4.E34 = this._calculateBedarf("E34", 4)
      this.state.Bedarf4.E35 = this._calculateBedarf("E35", 4)
      this.state.Bedarf4.E36 = this._calculateBedarf("E36", 4)
      this.state.Bedarf4.E37 = this._calculateBedarf("E37", 4)
      this.state.Bedarf4.E38 = this._calculateBedarf("E38", 4)
      this.state.Bedarf4.E39 = this._calculateBedarf("E39", 4)
      this.state.Bedarf4.E40 = this._calculateBedarf("E40", 4)
      this.state.Bedarf4.E41 = this._calculateBedarf("E41", 4)
      this.state.Bedarf4.E42 = this._calculateBedarf("E42", 4)
      this.state.Bedarf4.E43 = this._calculateBedarf("E43", 4)
      this.state.Bedarf4.E44 = this._calculateBedarf("E44", 4)
      this.state.Bedarf4.E45 = this._calculateBedarf("E45", 4)
      this.state.Bedarf4.E46 = this._calculateBedarf("E46", 4)
      this.state.Bedarf4.E47 = this._calculateBedarf("E47", 4)
      this.state.Bedarf4.E48 = this._calculateBedarf("E48", 4)
      this.state.Bedarf4.E52 = this._calculateBedarf("E52", 4)
      this.state.Bedarf4.E53 = this._calculateBedarf("E53", 4)
      this.state.Bedarf4.E57 = this._calculateBedarf("E57", 4)
      this.state.Bedarf4.E58 = this._calculateBedarf("E58", 4)
      this.state.Bedarf4.E59 = this._calculateBedarf("E59", 4)

      this.state.BedarfGesamt.E21 = this._getBedarfGesamt("E21")
      this.state.BedarfGesamt.E22 = this._getBedarfGesamt("E22")
      this.state.BedarfGesamt.E23 = this._getBedarfGesamt("E23")
      this.state.BedarfGesamt.E24 = this._getBedarfGesamt("E24")
      this.state.BedarfGesamt.E25 = this._getBedarfGesamt("E25")
      this.state.BedarfGesamt.E27 = this._getBedarfGesamt("E27")
      this.state.BedarfGesamt.E28 = this._getBedarfGesamt("E28")
      this.state.BedarfGesamt.E32 = this._getBedarfGesamt("E32")
      this.state.BedarfGesamt.E33 = this._getBedarfGesamt("E33")
      this.state.BedarfGesamt.E34 = this._getBedarfGesamt("E34")
      this.state.BedarfGesamt.E35 = this._getBedarfGesamt("E35")
      this.state.BedarfGesamt.E36 = this._getBedarfGesamt("E36")
      this.state.BedarfGesamt.E37 = this._getBedarfGesamt("E37")
      this.state.BedarfGesamt.E38 = this._getBedarfGesamt("E38")
      this.state.BedarfGesamt.E39 = this._getBedarfGesamt("E39")
      this.state.BedarfGesamt.E40 = this._getBedarfGesamt("E40")
      this.state.BedarfGesamt.E41 = this._getBedarfGesamt("E41")
      this.state.BedarfGesamt.E42 = this._getBedarfGesamt("E42")
      this.state.BedarfGesamt.E43 = this._getBedarfGesamt("E43")
      this.state.BedarfGesamt.E44 = this._getBedarfGesamt("E44")
      this.state.BedarfGesamt.E45 = this._getBedarfGesamt("E45")
      this.state.BedarfGesamt.E46 = this._getBedarfGesamt("E46")
      this.state.BedarfGesamt.E47 = this._getBedarfGesamt("E47")
      this.state.BedarfGesamt.E48 = this._getBedarfGesamt("E48")
      this.state.BedarfGesamt.E52 = this._getBedarfGesamt("E52")
      this.state.BedarfGesamt.E53 = this._getBedarfGesamt("E53")
      this.state.BedarfGesamt.E57 = this._getBedarfGesamt("E57")
      this.state.BedarfGesamt.E58 = this._getBedarfGesamt("E58")
      this.state.BedarfGesamt.E59 = this._getBedarfGesamt("E59")


      this.state.Anfangsbestand.E21 = this._getAnfangsbestand("21") + this._getZukunftbestand("21")
      this.state.Anfangsbestand.E22 = this._getAnfangsbestand("22") + this._getZukunftbestand("22")
      this.state.Anfangsbestand.E23 = this._getAnfangsbestand("23") + this._getZukunftbestand("23")
      this.state.Anfangsbestand.E24 = this._getAnfangsbestand("24") + this._getZukunftbestand("24")
      this.state.Anfangsbestand.E25 = this._getAnfangsbestand("25") + this._getZukunftbestand("25")
      this.state.Anfangsbestand.E27 = this._getAnfangsbestand("27") + this._getZukunftbestand("27")
      this.state.Anfangsbestand.E28 = this._getAnfangsbestand("28") + this._getZukunftbestand("28")
      this.state.Anfangsbestand.E32 = this._getAnfangsbestand("32") + this._getZukunftbestand("32")
      this.state.Anfangsbestand.E33 = this._getAnfangsbestand("33") + this._getZukunftbestand("33")
      this.state.Anfangsbestand.E34 = this._getAnfangsbestand("34") + this._getZukunftbestand("34")
      this.state.Anfangsbestand.E35 = this._getAnfangsbestand("35") + this._getZukunftbestand("35")
      this.state.Anfangsbestand.E36 = this._getAnfangsbestand("36") + this._getZukunftbestand("36")
      this.state.Anfangsbestand.E37 = this._getAnfangsbestand("37") + this._getZukunftbestand("37")
      this.state.Anfangsbestand.E38 = this._getAnfangsbestand("38") + this._getZukunftbestand("38")
      this.state.Anfangsbestand.E39 = this._getAnfangsbestand("39") + this._getZukunftbestand("39")
      this.state.Anfangsbestand.E40 = this._getAnfangsbestand("40") + this._getZukunftbestand("40")
      this.state.Anfangsbestand.E41 = this._getAnfangsbestand("41") + this._getZukunftbestand("41")
      this.state.Anfangsbestand.E42 = this._getAnfangsbestand("42") + this._getZukunftbestand("42")
      this.state.Anfangsbestand.E43 = this._getAnfangsbestand("43") + this._getZukunftbestand("43")
      this.state.Anfangsbestand.E44 = this._getAnfangsbestand("44") + this._getZukunftbestand("44")
      this.state.Anfangsbestand.E45 = this._getAnfangsbestand("45") + this._getZukunftbestand("45")
      this.state.Anfangsbestand.E46 = this._getAnfangsbestand("46") + this._getZukunftbestand("46")
      this.state.Anfangsbestand.E47 = this._getAnfangsbestand("47") + this._getZukunftbestand("47")
      this.state.Anfangsbestand.E48 = this._getAnfangsbestand("48") + this._getZukunftbestand("48")
      this.state.Anfangsbestand.E52 = this._getAnfangsbestand("52") + this._getZukunftbestand("52")
      this.state.Anfangsbestand.E53 = this._getAnfangsbestand("53") + this._getZukunftbestand("53")
      this.state.Anfangsbestand.E57 = this._getAnfangsbestand("57") + this._getZukunftbestand("57")
      this.state.Anfangsbestand.E58 = this._getAnfangsbestand("58") + this._getZukunftbestand("58")
      this.state.Anfangsbestand.E59 = this._getAnfangsbestand("59") + this._getZukunftbestand("59")


      this.state.BestellungMenge.E21 = this._calculateBestellungMenge("E21")
      this.state.BestellungMenge.E22 = this._calculateBestellungMenge("E22")
      this.state.BestellungMenge.E23 = this._calculateBestellungMenge("E23")
      this.state.BestellungMenge.E24 = this._calculateBestellungMenge("E24")
      this.state.BestellungMenge.E25 = this._calculateBestellungMenge("E25")
      this.state.BestellungMenge.E27 = this._calculateBestellungMenge("E27")
      this.state.BestellungMenge.E28 = this._calculateBestellungMenge("E28")
      this.state.BestellungMenge.E32 = this._calculateBestellungMenge("E32")
      this.state.BestellungMenge.E33 = this._calculateBestellungMenge("E33")
      this.state.BestellungMenge.E34 = this._calculateBestellungMenge("E34")
      this.state.BestellungMenge.E35 = this._calculateBestellungMenge("E35")
      this.state.BestellungMenge.E36 = this._calculateBestellungMenge("E36")
      this.state.BestellungMenge.E37 = this._calculateBestellungMenge("E37")
      this.state.BestellungMenge.E38 = this._calculateBestellungMenge("E38")
      this.state.BestellungMenge.E39 = this._calculateBestellungMenge("E39")
      this.state.BestellungMenge.E40 = this._calculateBestellungMenge("E40")
      this.state.BestellungMenge.E41 = this._calculateBestellungMenge("E41")
      this.state.BestellungMenge.E42 = this._calculateBestellungMenge("E42")
      this.state.BestellungMenge.E43 = this._calculateBestellungMenge("E43")
      this.state.BestellungMenge.E44 = this._calculateBestellungMenge("E44")
      this.state.BestellungMenge.E45 = this._calculateBestellungMenge("E45")
      this.state.BestellungMenge.E46 = this._calculateBestellungMenge("E46")
      this.state.BestellungMenge.E47 = this._calculateBestellungMenge("E47")
      this.state.BestellungMenge.E48 = this._calculateBestellungMenge("E48")
      this.state.BestellungMenge.E52 = this._calculateBestellungMenge("E52")
      this.state.BestellungMenge.E53 = this._calculateBestellungMenge("E53")
      this.state.BestellungMenge.E57 = this._calculateBestellungMenge("E57")
      this.state.BestellungMenge.E58 = this._calculateBestellungMenge("E58")
      this.state.BestellungMenge.E59 = this._calculateBestellungMenge("E59")

      console.log("EVERYTHING CALCULATED")
  }

  _calculateBedarf(articleId, periode){
    var amount = 0;
    if(periode == 1){
      amount = this.state.Produktionsplan1.P1 * this.state.BenoetigtFuerP1[articleId] + this.state.Produktionsplan1.P2 * this.state.BenoetigtFuerP2[articleId] + this.state.Produktionsplan1.P3 * this.state.BenoetigtFuerP3[articleId]
    }else if(periode == 2){
      amount = this.state.Produktionsplan2.P1 * this.state.BenoetigtFuerP1[articleId] + this.state.Produktionsplan2.P2 * this.state.BenoetigtFuerP2[articleId] + this.state.Produktionsplan2.P3 * this.state.BenoetigtFuerP3[articleId]
    }else if(periode == 3){
      amount = this.state.Produktionsplan3.P1 * this.state.BenoetigtFuerP1[articleId] + this.state.Produktionsplan3.P2 * this.state.BenoetigtFuerP2[articleId] + this.state.Produktionsplan3.P3 * this.state.BenoetigtFuerP3[articleId]
    }else if(periode == 4){
      amount = this.state.Produktionsplan4.P1 * this.state.BenoetigtFuerP1[articleId] + this.state.Produktionsplan4.P2 * this.state.BenoetigtFuerP2[articleId] + this.state.Produktionsplan4.P3 * this.state.BenoetigtFuerP3[articleId]
    }
    return amount;
  }

  _calculateBestellungMenge(articleId){
    console.log(articleId)
    var gesamtBedarf = this._getBedarfGesamt(articleId);
    let bestellMenge = 0;

    console.log("Anfangsbestand: ", this.state.Anfangsbestand[articleId])
    console.log("BEDARF 1 Periode ", this.state.Bedarf1[articleId])

    if(this.state.Anfangsbestand[articleId] < this.state.Bedarf1[articleId]){
      console.log("EEEEEIIIIIILLLLLL")
      console.log("!this.state.BestellungArt[articleId]", !this.state.BestellungArt[articleId])
      let refname = "toggle" + articleId
      this.state.BestellungArt[articleId] = true

    }else{
      this.state.BestellungArt[articleId] = false
    }

    if(gesamtBedarf > this.state.Anfangsbestand[articleId]){
      console.log("gesamtBedarf",gesamtBedarf)
      let fehlenderBedarf = gesamtBedarf - this.state.Anfangsbestand[articleId]
      console.log("fehlenderBedarf",fehlenderBedarf)

      let geteiltDurchDiskontmenge = fehlenderBedarf/this.state.Diskontmenge[articleId]
      console.log("geteiltDurchDiskontmenge",geteiltDurchDiskontmenge)
      console.log("geteiltDurchDiskontmenge GERUNDET auf ganze zahl: ", Math.ceil(geteiltDurchDiskontmenge))

      bestellMenge = Math.ceil(geteiltDurchDiskontmenge) * this.state.Diskontmenge[articleId]
      console.log("Was wir bestellen: ", bestellMenge)

    }

    return bestellMenge;

  }

  _getBedarfGesamt(articleId){
    console.log(this.state.dropDownValue)
    let liferzeit = 0;
    if(this.state.dropDownValue == 2){
      liferzeit = this.state.Lieferzeit[articleId] - this.state.Abweichung[articleId]

    }else if(this.state.dropDownValue == 1){
      liferzeit = this.state.Lieferzeit[articleId] + this.state.Abweichung[articleId]
    }else{
      liferzeit = this.state.Lieferzeit[articleId]
    }

    console.log("liferzeit getBearf: ", liferzeit)
    console.log("liferzeit gerundet ganze zahl: ", Math.ceil(liferzeit))

    let bedarfGesamt = 0;
    if(liferzeit <= 1){
      bedarfGesamt = this.state.Bedarf1[articleId]
    }else if(liferzeit <= 2){
      bedarfGesamt = this.state.Bedarf1[articleId] + this.state.Bedarf2[articleId]
    }else if(liferzeit <= 3){
      bedarfGesamt = this.state.Bedarf1[articleId] + this.state.Bedarf2[articleId] + this.state.Bedarf3[articleId]
    }else if(liferzeit <= 4){
      bedarfGesamt = this.state.Bedarf1[articleId] + this.state.Bedarf2[articleId] + this.state.Bedarf4[articleId]
    }

    console.log("bedarf Gesamt", bedarfGesamt)

    return bedarfGesamt
  }

  _getAnfangsbestand(articleId){

    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    var amount = 0;
    if(currentInputXML){
      currentInputXML.inputDataObject.results.warehousestock[0].article.forEach(function (element){
        if(element.$.id === articleId){
          amount = parseInt(element.$.amount) + amount
        }
      }.bind(this))

    }

    console.log("anfangsbestand", amount)

    return Math.round(amount);
  }

  _getZukunftbestand(articleId){

    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    var amount = 0;
    if(currentInputXML){
      if(currentInputXML.inputDataObject.results.futureinwardstockmovement[0].order){

      currentInputXML.inputDataObject.results.futureinwardstockmovement[0].order.forEach(function (element){
        if(element.$.article === articleId){
          amount = parseInt(element.$.amount) + amount
        }
      }.bind(this))
    }

    }

    console.log("zukunfbestand", amount)

    return Math.round(amount);
  }

  _handleDropDownChange(e, index, value){
    console.log("_handleDropDownChange", value)
    this.setState({
      dropDownValue : value.payload
    })

    this._updateVariables(true);
  }

  _handleProgrammPlan2Change(e){

    let articleId = e.target.id
    let value = e.target.value;
    let ProgrammPlan2List = this.state.Produktionsplan2;
    let errorTextProduktionsplan2List = this.state.errorTextProduktionsplan2

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextProduktionsplan2List[articleId] = ''
    }else{
      errorTextProduktionsplan2List[articleId] = this.props.internationalReducer.activeLanguage.strings.NumericError
      value = 0
    }
    ProgrammPlan2List[articleId] = parseInt(value)


    this.setState({
      Produktionsplan2: ProgrammPlan2List,
      errorTextProduktionsplan2: errorTextProduktionsplan2List
    });

    this._updateVariables(true);

  }

 _handleProgrammPlan3Change(e){

    let articleId = e.target.id
    let value = e.target.value;
    let ProgrammPlan3List = this.state.Produktionsplan3;
    let errorTextProduktionsplan3List = this.state.errorTextProduktionsplan3

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextProduktionsplan3List[articleId] = ''
    }else{
      errorTextProduktionsplan3List[articleId] = this.props.internationalReducer.activeLanguage.strings.NumericError
      value = 0
    }
    ProgrammPlan3List[articleId] = parseInt(value)


    this.setState({
      Produktionsplan3: ProgrammPlan3List,
      errorTextProduktionsplan3: errorTextProduktionsplan3List
    });

    this._updateVariables(true);

  }

 _handleProgrammPlan4Change(e){

    let articleId = e.target.id
    let value = e.target.value;
    let ProgrammPlan4List = this.state.Produktionsplan4;
    let errorTextProduktionsplan4List = this.state.errorTextProduktionsplan4

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextProduktionsplan4List[articleId] = ''
    }else{
      errorTextProduktionsplan4List[articleId] = this.props.internationalReducer.activeLanguage.strings.NumericError
      value = 0
    }
    ProgrammPlan4List[articleId] = parseInt(value)


    this.setState({
      Produktionsplan4: ProgrammPlan4List,
      errorTextProduktionsplan4: errorTextProduktionsplan4List
    });

    this._updateVariables(true);

  }

  _handleBestellungArtChange(e){

    let articleId = e.target.id

    let BestellungArtList = this.state.BestellungArt;
    console.log(e.target.id)
    console.log("Davor BestellungArtList[articleId]: ",BestellungArtList[articleId])

    if(BestellungArtList[articleId] == true){
       BestellungArtList[articleId] = false;
    }else{
       BestellungArtList[articleId] = true
    }

    console.log("Danach BestellungArtList[articleId]: ",BestellungArtList[articleId])

    this.setState({
      BestellungArt: BestellungArtList
    });

  }

  _handleBestellungMengeChange(e){

    let articleId = e.target.id
    let value = e.target.value;
    let BestellungMengeList = this.state.BestellungMenge;
    let errorTextBestellungMengeList = this.state.errorTextBestellungMenge

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextBestellungMengeList[articleId] = ''
    }else{
      errorTextBestellungMengeList[articleId] = this.props.internationalReducer.activeLanguage.strings.NumericError
      value = 0
    }
    BestellungMengeList[articleId] = parseInt(value)


    this.setState({
      BestellungMenge: BestellungMengeList,
      errorTextBestellungMenge: errorTextBestellungMengeList
    });

    //this._updateVariables(false);
  }

  _updateLocalStorage(){
    if (window.localStorage) {
          var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
          var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);
          console.log(currentInputXML)
          localStorage.removeItem(currentInputXML.id);
          localStorage.setItem(currentInputXML.id, JSON.stringify(currentInputXML.inputDataObject));

        }else{
          alert('LocalStorage is not supported in your browser');
        }
  }

  _handleSaveButtonClick(e){

    var errorlol = false;
    if(this.props.ActiveUploadXML.activeUploadXMLData.id !=='result_P-1'){

      Object.keys(this.state.errorTextBestellungMenge).forEach(function(key) {
          if(this.state.errorTextBestellungMenge[key] !== ''){
            errorlol = true;
          }
      }.bind(this));

      if(!errorlol){
        var kaufteildisposition = {
                                    Lieferzeit: this.state.Lieferzeit,
                                    Abweichung: this.state.Abweichung,
                                    BenoetigtFuerP1: this.state.BenoetigtFuerP1,
                                    BenoetigtFuerP2: this.state.BenoetigtFuerP2,
                                    BenoetigtFuerP3: this.state.BenoetigtFuerP3,
                                    Diskontmenge: this.state.Diskontmenge,
                                    Anfangsbestand: this.state.Anfangsbestand,
                                    Bedarf1: this.state.Bedarf1,
                                    Bedarf2: this.state.Bedarf2,
                                    Bedarf3: this.state.Bedarf3,
                                    Bedarf4: this.state.Bedarf4,
                                    BestellungMenge: this.state.BestellungMenge,
                                    BestellungArt: this.state.BestellungArt,
                                    DropDownValue: this.state.dropDownValue,
                                    Produktionsplan1: this.state.Produktionsplan1,
                                    Produktionsplan2: this.state.Produktionsplan2,
                                    Produktionsplan3: this.state.Produktionsplan3,
                                    Produktionsplan4: this.state.Produktionsplan4
                                  }
        this.props.dispatch(setKaufteildispositionInputXML(kaufteildisposition, this.props.ActiveUploadXML.activeUploadXMLData.id));
        this._updateLocalStorage();
        this.refs.snackbar.show();

        this.setState({
          resetButtonDisabled: false
        });
      }else{
              this.setState({
                openDialogStandardActions: true,
                dialogTitle: "Error",
                dialogText: this.props.internationalReducer.activeLanguage.strings.NumericError
              });
      }

    }else{
              this.setState({
                openDialogStandardActions: true,
                dialogTitle: "Error",
                dialogText: this.props.internationalReducer.activeLanguage.strings.ErrorSavePeriod
              });
    }
  }

  _handleRequestClose(buttonClicked) {
    if (!buttonClicked && this.state.modal) return;
    this.setState({
      openDialogStandardActions: false
    });
  }

  _handleResetButtonClick(e){
    this.props.dispatch(resetKaufteildispositionInputXML(this.props.ActiveUploadXML.activeUploadXMLData.id))

    let BestellungArtList = this.state.BestellungArt;
    let BestellungMengeList = this.state.BestellungMenge;


          BestellungArtList.E21 = false
          BestellungArtList.E22 = false
          BestellungArtList.E23 = false
          BestellungArtList.E24 = false
          BestellungArtList.E25 = false
          BestellungArtList.E27 = false
          BestellungArtList.E28 = false
          BestellungArtList.E32 = false
          BestellungArtList.E33 = false
          BestellungArtList.E34 = false
          BestellungArtList.E35 = false
          BestellungArtList.E36 = false
          BestellungArtList.E37 = false
          BestellungArtList.E38 = false
          BestellungArtList.E39 = false
          BestellungArtList.E40 = false
          BestellungArtList.E41 = false
          BestellungArtList.E42 = false
          BestellungArtList.E43 = false
          BestellungArtList.E44 = false
          BestellungArtList.E45 = false
          BestellungArtList.E46 = false
          BestellungArtList.E47 = false
          BestellungArtList.E48 = false
          BestellungArtList.E52 = false
          BestellungArtList.E53 = false
          BestellungArtList.E57 = false
          BestellungArtList.E58 = false
          BestellungArtList.E59 = false

          BestellungMengeList.E21 = 0
          BestellungMengeList.E22 = 0
          BestellungMengeList.E23 = 0
          BestellungMengeList.E24 = 0
          BestellungMengeList.E25 = 0
          BestellungMengeList.E27 = 0
          BestellungMengeList.E28 = 0
          BestellungMengeList.E32 = 0
          BestellungMengeList.E33 = 0
          BestellungMengeList.E34 = 0
          BestellungMengeList.E35 = 0
          BestellungMengeList.E36 = 0
          BestellungMengeList.E37 = 0
          BestellungMengeList.E38 = 0
          BestellungMengeList.E39 = 0
          BestellungMengeList.E40 = 0
          BestellungMengeList.E41 = 0
          BestellungMengeList.E42 = 0
          BestellungMengeList.E43 = 0
          BestellungMengeList.E44 = 0
          BestellungMengeList.E45 = 0
          BestellungMengeList.E46 = 0
          BestellungMengeList.E47 = 0
          BestellungMengeList.E48 = 0
          BestellungMengeList.E52 = 0
          BestellungMengeList.E53 = 0
          BestellungMengeList.E57 = 0
          BestellungMengeList.E58 = 0
          BestellungMengeList.E59 = 0

    this.setState({
          resetButtonDisabled: true,
          BestellungArt: BestellungArtList,
          BestellungMenge: BestellungMengeList
        });

    this._updateVariables(false);

    this._updateLocalStorage();
  }

  _handleDetailModeChange(e){
    console.log(!this.state.detailMode)
    this.setState({
      detailMode: !this.state.detailMode
    });
  }

  _onDialogOk() {
    this.setState({
      openDialogStandardActions: false
    });
  }

  render() {

      let standardActions = [
      { text: 'Ok', onTouchTap: this._onDialogOk.bind(this), ref: 'ok' }
    ];

        var DropDownNormallol = this.props.internationalReducer.activeLanguage.strings.DropDownNormal
    var DropDownOptimistischlol = this.props.internationalReducer.activeLanguage.strings.DropDownOptimistisch
    var DropDownPesimistischlol = this.props.internationalReducer.activeLanguage.strings.DropDownPessimistisch


      //Create DropDown menuitems
        let menuItems = [{payload: '0', text: DropDownNormallol},{payload: '1', text: DropDownOptimistischlol},{payload: '2', text: DropDownPesimistischlol }];


    return (
      <div>
        <div>
          <h1>{this.props.internationalReducer.activeLanguage.strings.TitelKaufteilDisposition}</h1>
          <RaisedButton label={this.props.internationalReducer.activeLanguage.strings.Speichern} primary={true} onTouchTap={this._handleSaveButtonClick}/>
          <RaisedButton label={this.props.internationalReducer.activeLanguage.strings.Reset} secondary={true} disabled={this.state.resetButtonDisabled} onTouchTap={this._handleResetButtonClick}/>
          <Toggle
                style={{"display": "inline-block", "width":"10%", "marginLeft":"10px", "paddingTop":"5px"}}
                name="Detail mode"
                value="Detail mode"
                onToggle={this._handleDetailModeChange}
                defaultToggled={this.state.detailMode}/>


        <div className={styles.navigationButtons}>
          <div className={styles.beforeButtonWrapper} >
            <Link className={styles.beforeButton} to="/kapazitaetsplanung">
                  {this.props.internationalReducer.activeLanguage.strings.Back}
            </Link>
          </div>
          <div className={styles.nextButtonWrapper}>
          <Link className={styles.nextButton} to="/download">
                  {this.props.internationalReducer.activeLanguage.strings.Next}
          </Link>
          </div>
        </div>

        <Table
          height={this.state.heightt}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          >
          <TableHeader adjustForCheckbox={this.state.displayRowCheckbox} displaySelectAll={this.state.displayRowCheckbox} enableSelectAll={this.state.enableSelectAll}>
           <TableRow>
              <TableHeaderColumn colSpan="5"  style={{textAlign: 'center'}}>
                {this.props.internationalReducer.activeLanguage.strings.ProduktionsProgramm}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn >
                {this.props.internationalReducer.activeLanguage.strings.Periode}
              </TableHeaderColumn>
              <TableHeaderColumn >{this.state.Perioden.periode1}</TableHeaderColumn>
              <TableHeaderColumn >{this.state.Perioden.periode2}</TableHeaderColumn>
              <TableHeaderColumn >{this.state.Perioden.periode3}</TableHeaderColumn>
              <TableHeaderColumn >{this.state.Perioden.periode4}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody showRowHover={this.state.showRowHover} stripedRows={this.state.stripedRows} displayRowCheckbox={this.state.displayRowCheckbox}>
            <TableRow>
              <TableRowColumn>
                P1
              </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    disabled = {true}
                    value= {this.state.Produktionsplan1.P1}/>
                </TableRowColumn>
                <TableRowColumn>
                 <TextField
                    id="P1"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan2.P1}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan2Change}
                    value= {this.state.Produktionsplan2.P1}/>
                </TableRowColumn>
                <TableRowColumn>
                <TextField
                    id="P1"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan3.P1}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan3Change}
                    value= {this.state.Produktionsplan3.P1}/>
                </TableRowColumn>
                <TableRowColumn>
                <TextField
                    id="P1"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan4.P1}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan4Change}
                    value= {this.state.Produktionsplan4.P1}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>
                  P2
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Produktionsplan1"
                    disabled = {true}
                    value= {this.state.Produktionsplan1.P2}/>
                </TableRowColumn>
                <TableRowColumn>
                 <TextField
                    id="P2"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan2.P2}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan2Change}
                    value= {this.state.Produktionsplan2.P2}/>
                </TableRowColumn>
                <TableRowColumn>
                <TextField
                    id="P2"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan3.P2}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan3Change}
                    value= {this.state.Produktionsplan3.P2}/>
                </TableRowColumn>
                <TableRowColumn>
                <TextField
                    id="P2"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan4.P2}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan4Change}
                    value= {this.state.Produktionsplan4.P2}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>
                  P3
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Produktionsplan1"
                    disabled = {true}
                    value= {this.state.Produktionsplan1.P3}/>
                </TableRowColumn>
                <TableRowColumn>
                 <TextField
                    id="P3"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan2.P3}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan2Change}
                    value= {this.state.Produktionsplan2.P3}/>
                </TableRowColumn>
                <TableRowColumn>
                <TextField
                    id="P3"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan3.P3}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan3Change}
                    value= {this.state.Produktionsplan3.P3}/>
                </TableRowColumn>
                <TableRowColumn>
                <TextField
                    id="P3"
                    hintText="Produktionsplan1"
                    errorText={this.state.errorTextProduktionsplan4.P3}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleProgrammPlan4Change}
                    value= {this.state.Produktionsplan4.P3}/>
              </TableRowColumn>
            </TableRow>

          </TableBody>
        </Table>


        <DropDownMenu  menuItems={menuItems} onChange={this._handleDropDownChange} >
        </DropDownMenu>

        { this.state.detailMode ?
        (

              <Table
                height={this.state.height}
                fixedHeader={this.state.fixedHeader}
                selectable={this.state.selectable}
                >
                <TableHeader adjustForCheckbox={this.state.displayRowCheckbox} displaySelectAll={this.state.displayRowCheckbox} enableSelectAll={this.state.enableSelectAll}>
                <TableRow>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.SachNR}
                    </TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Lieferzeit}
                    </TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Abweichung}
                    </TableHeaderColumn>
                    <TableHeaderColumn colSpan="3"  style={{textAlign: 'center'}}>
                      {this.props.internationalReducer.activeLanguage.strings.BenötigtFür}
                    </TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Diskontmenge}
                    </TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.AnfangsBestand}
                    </TableHeaderColumn>
                    <TableHeaderColumn colSpan="5"  style={{textAlign: 'center'}}>
                      {this.props.internationalReducer.activeLanguage.strings.Bedarf}
                    </TableHeaderColumn>
                    <TableHeaderColumn colSpan="2"  style={{textAlign: 'center'}}>
                      {this.props.internationalReducer.activeLanguage.strings.Bestellung}

                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn colSpan="3"  ></TableHeaderColumn>
                    <TableHeaderColumn >P1</TableHeaderColumn>
                    <TableHeaderColumn >P2</TableHeaderColumn>
                    <TableHeaderColumn >P3</TableHeaderColumn>
                    <TableHeaderColumn colSpan="2"  ></TableHeaderColumn>
                    <TableHeaderColumn >{this.state.Perioden.periode1}</TableHeaderColumn>
                    <TableHeaderColumn >{this.state.Perioden.periode2}</TableHeaderColumn>
                    <TableHeaderColumn >{this.state.Perioden.periode3}</TableHeaderColumn>
                    <TableHeaderColumn >{this.state.Perioden.periode4}</TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Gesamt}
                    </TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Menge}
                    </TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Art}
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>

                <TableBody showRowHover={this.state.showRowHover} stripedRows={this.state.stripedRows} displayRowCheckbox={this.state.displayRowCheckbox}>
                  <TableRow>
                    <TableRowColumn>
                      E21
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E21}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E21}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E21"
                        errorText={this.state.errorTextBestellungMenge.E21}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E21"
                        name="toggleE21"
                        value="toggleE21"
                        ref="toggleE21"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E21}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E22
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E22}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E22}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E22"
                        errorText={this.state.errorTextBestellungMenge.E22}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E22"
                        name="toggleE22"
                        value="toggleE22"
                        ref="toggleE22"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E22}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E23
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E23}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E23}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E23"
                        errorText={this.state.errorTextBestellungMenge.E23}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E23}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E23"
                        name="toggleE23"
                        value="toggleE23"
                        ref="toggleE23"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E23}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E24
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E24}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E24}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E24"
                        errorText={this.state.errorTextBestellungMenge.E24}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E24"
                        name="toggleE24"
                        value="toggleE24"
                        ref="toggleE24"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E24}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E25
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E25}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E25}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E25"
                        errorText={this.state.errorTextBestellungMenge.E25}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E25"
                        name="toggleE25"
                        value="toggleE25"
                        ref="toggleE25"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E25}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E27
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E27}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E27}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E27"
                        errorText={this.state.errorTextBestellungMenge.E27}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E27"
                        name="toggleE27"
                        value="toggleE27"
                        ref="toggleE27"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E27}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E28
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E28}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E28}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E28"
                        errorText={this.state.errorTextBestellungMenge.E28}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E28"
                        name="toggleE28"
                        value="toggleE28"
                        ref="toggleE28"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E28}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E32
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E32}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E32}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E32"
                        errorText={this.state.errorTextBestellungMenge.E32}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E32"
                        name="toggleE32"
                        value="toggleE32"
                        ref="toggleE32"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E32}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E33
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E33}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E33}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E33"
                        errorText={this.state.errorTextBestellungMenge.E33}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E33"
                        name="toggleE33"
                        value="toggleE33"
                        ref="toggleE33"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E33}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E34
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E34}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E34}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E34"
                        errorText={this.state.errorTextBestellungMenge.E34}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E34"
                        name="toggleE34"
                        value="toggleE34"
                        ref="toggleE34"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E34}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E35
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E35}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E35}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E35"
                        errorText={this.state.errorTextBestellungMenge.E35}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E35"
                        name="toggleE35"
                        value="toggleE35"
                        ref="toggleE35"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E35}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E36
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E36}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E36}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E36"
                        errorText={this.state.errorTextBestellungMenge.E36}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E36"
                        name="toggleE36"
                        value="toggleE36"
                        ref="toggleE36"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E36}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E37
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E37}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E37}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E37}/>
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E37"
                        errorText={this.state.errorTextBestellungMenge.E37}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E37"
                        name="toggleE37"
                        value="toggleE37"
                        ref="toggleE37"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E37}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E38
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E38}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E38}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E38"
                        errorText={this.state.errorTextBestellungMenge.E38}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E38"
                        name="toggleE38"
                        value="toggleE38"
                        ref="toggleE38"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E38}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E39
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E39}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E39}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E39}/>
                    </TableRowColumn>


                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E39"
                        errorText={this.state.errorTextBestellungMenge.E39}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E39"
                        name="toggleE39"
                        value="toggleE39"
                        ref="toggleE39"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E39}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E40
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E40}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E40}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E40"
                        errorText={this.state.errorTextBestellungMenge.E40}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E40"
                        name="toggleE40"
                        value="toggleE40"
                        ref="toggleE40"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E40}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E41
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E41}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E41}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E41"
                        errorText={this.state.errorTextBestellungMenge.E41}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E41"
                        name="toggleE41"
                        value="toggleE41"
                        ref="toggleE41"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E41}/>
                    </TableRowColumn>
                  </TableRow>

                   <TableRow>
                    <TableRowColumn>
                      E42
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E42}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E42}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E42"
                        errorText={this.state.errorTextBestellungMenge.E42}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E42"
                        name="toggleE42"
                        value="toggleE42"
                        ref="toggleE42"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E42}/>
                    </TableRowColumn>
                  </TableRow>

                   <TableRow>
                    <TableRowColumn>
                      E43
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E43}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E43}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E43"
                        errorText={this.state.errorTextBestellungMenge.E43}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E43"
                        name="toggleE43"
                        value="toggleE43"
                        ref="toggleE43"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E43}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E44
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E44}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E44}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E44"
                        errorText={this.state.errorTextBestellungMenge.E44}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E44"
                        name="toggleE44"
                        value="toggleE44"
                        ref="toggleE44"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E44}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E45
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E45}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E45}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E45"
                        errorText={this.state.errorTextBestellungMenge.E45}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E45"
                        name="toggleE45"
                        value="toggleE45"
                        ref="toggleE45"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E45}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E46
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E46}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E46}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E46"
                        errorText={this.state.errorTextBestellungMenge.E46}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E46"
                        name="toggleE46"
                        value="toggleE46"
                        ref="toggleE46"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E46}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E47
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E47}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E47}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E47"
                        errorText={this.state.errorTextBestellungMenge.E47}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E47"
                        name="toggleE47"
                        value="toggleE47"
                        ref="toggleE47"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E47}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E48
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E48}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E48}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E48"
                        errorText={this.state.errorTextBestellungMenge.E48}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E48"
                        name="toggleE48"
                        value="toggleE48"
                        ref="toggleE48"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E48}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E52
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E52}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E52}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E52"
                        errorText={this.state.errorTextBestellungMenge.E52}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E52"
                        name="toggleE52"
                        value="toggleE52"
                        ref="toggleE52"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E52}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E53
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E53}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E53}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E53"
                        errorText={this.state.errorTextBestellungMenge.E53}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E53"
                        name="toggleE53"
                        value="toggleE53"
                        ref="toggleE53"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E53}/>
                    </TableRowColumn>
                  </TableRow>

                    <TableRow>
                    <TableRowColumn>
                      E57
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E57}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E57}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E57"
                        errorText={this.state.errorTextBestellungMenge.E57}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E57"
                        name="toggleE57"
                        value="toggleE57"
                        ref="toggleE57"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E57}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E58
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E58}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E58}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E58"
                        errorText={this.state.errorTextBestellungMenge.E58}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E58"
                        name="toggleE58"
                        value="toggleE58"
                        ref="toggleE58"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E58}/>
                    </TableRowColumn>
                  </TableRow>

                   <TableRow>
                    <TableRowColumn>
                      E59
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Lieferzeit"
                        disabled = {true}
                        value= {this.state.Lieferzeit.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Abweichung"
                        disabled = {true}
                        value= {this.state.Abweichung.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP1"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP1.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP2"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP2.E59}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="BenoetigtFuerP3"
                        disabled = {true}
                        value= {this.state.BenoetigtFuerP3.E59}/>
                  </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Diskontmenge"
                        disabled = {true}
                        value= {this.state.Diskontmenge.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Anfangsbestand"
                        disabled = {true}
                        value= {this.state.Anfangsbestand.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf1"
                        disabled = {true}
                        value= {this.state.Bedarf1.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf2"
                        disabled = {true}
                        value= {this.state.Bedarf2.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf3"
                        disabled = {true}
                        value= {this.state.Bedarf3.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Bedarf4"
                        disabled = {true}
                        value= {this.state.Bedarf4.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                    <TextField
                        hintText="Gesamt"
                        disabled = {true}
                        value= {this.state.BedarfGesamt.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E59"
                        errorText={this.state.errorTextBestellungMenge.E59}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E59"
                        name="toggleE59"
                        value="toggleE59"
                        ref="toggleE59"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E59}/>
                    </TableRowColumn>
                  </TableRow>

                </TableBody>
              </Table>

        ) :
        (
              <Table
                height={this.state.height}
                fixedHeader={this.state.fixedHeader}
                selectable={this.state.selectable}
                >
                <TableHeader adjustForCheckbox={this.state.displayRowCheckbox} displaySelectAll={this.state.displayRowCheckbox} enableSelectAll={this.state.enableSelectAll}>
                <TableRow>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.SachNR}
                    </TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign: 'center'}}>
                      {this.props.internationalReducer.activeLanguage.strings.Bestellung}
                    </TableHeaderColumn>
                    <TableHeaderColumn ></TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn ></TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Menge}
                    </TableHeaderColumn>
                    <TableHeaderColumn >
                      {this.props.internationalReducer.activeLanguage.strings.Art}
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>


                <TableBody stripedRows={this.state.stripedRows} showRowHover={this.state.showRowHover} displayRowCheckbox={this.state.displayRowCheckbox}>
                  <TableRow>
                    <TableRowColumn>
                      E21
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E21"
                        errorText={this.state.errorTextBestellungMenge.E21}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E21}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E21"
                        name="toggleE21"
                        value="toggleE21"
                        ref="toggleE21"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E21}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E22
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E22"
                        errorText={this.state.errorTextBestellungMenge.E22}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E22"
                        name="toggleE22"
                        value="toggleE22"
                        ref="toggleE22"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E22}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E23
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E23"
                        errorText={this.state.errorTextBestellungMenge.E23}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E22}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E23"
                        name="toggleE23"
                        value="toggleE23"
                        ref="toggleE23"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E23}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E24
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E24"
                        errorText={this.state.errorTextBestellungMenge.E24}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E24}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E24"
                        name="toggleE24"
                        value="toggleE24"
                        ref="toggleE24"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E24}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E25
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E25"
                        errorText={this.state.errorTextBestellungMenge.E25}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E25}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E25"
                        name="toggleE25"
                        value="toggleE25"
                        ref="toggleE25"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E25}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E27
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E27"
                        errorText={this.state.errorTextBestellungMenge.E27}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E27}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E27"
                        name="toggleE27"
                        value="toggleE27"
                        ref="toggleE27"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E27}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E28
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E28"
                        errorText={this.state.errorTextBestellungMenge.E28}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E28}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E28"
                        name="toggleE28"
                        value="toggleE28"
                        ref="toggleE28"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E28}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E32
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E32"
                        errorText={this.state.errorTextBestellungMenge.E32}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E32}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E32"
                        name="toggleE32"
                        value="toggleE32"
                        ref="toggleE32"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E32}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E33
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E33"
                        errorText={this.state.errorTextBestellungMenge.E33}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E33}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E33"
                        name="toggleE33"
                        value="toggleE33"
                        ref="toggleE33"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E33}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E34
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E34"
                        errorText={this.state.errorTextBestellungMenge.E34}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E34}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E34"
                        name="toggleE34"
                        value="toggleE34"
                        ref="toggleE34"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E34}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E35
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E35"
                        errorText={this.state.errorTextBestellungMenge.E35}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E35}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E35"
                        name="toggleE35"
                        value="toggleE35"
                        ref="toggleE35"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E35}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E36
                    </TableRowColumn>


                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E36"
                        errorText={this.state.errorTextBestellungMenge.E36}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E36}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E36"
                        name="toggleE36"
                        value="toggleE36"
                        ref="toggleE36"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E36}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E37
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E37"
                        errorText={this.state.errorTextBestellungMenge.E37}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E37}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E37"
                        name="toggleE37"
                        value="toggleE37"
                        ref="toggleE37"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E37}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E38
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E38"
                        errorText={this.state.errorTextBestellungMenge.E38}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E38}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E38"
                        name="toggleE38"
                        value="toggleE38"
                        ref="toggleE38"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E38}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E39
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E39"
                        errorText={this.state.errorTextBestellungMenge.E39}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E39}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E39"
                        name="toggleE39"
                        value="toggleE39"
                        ref="toggleE39"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E39}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E40
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E40"
                        errorText={this.state.errorTextBestellungMenge.E40}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E40}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E40"
                        name="toggleE40"
                        value="toggleE40"
                        ref="toggleE40"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E40}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E41
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E41"
                        errorText={this.state.errorTextBestellungMenge.E41}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E41}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E41"
                        name="toggleE41"
                        value="toggleE41"
                        ref="toggleE41"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E41}/>
                    </TableRowColumn>
                  </TableRow>

                   <TableRow>
                    <TableRowColumn>
                      E42
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E42"
                        errorText={this.state.errorTextBestellungMenge.E42}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E42}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E42"
                        name="toggleE42"
                        value="toggleE42"
                        ref="toggleE42"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E42}/>
                    </TableRowColumn>
                  </TableRow>

                   <TableRow>
                    <TableRowColumn>
                      E43
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E43"
                        errorText={this.state.errorTextBestellungMenge.E43}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E43}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E43"
                        name="toggleE43"
                        value="toggleE43"
                        ref="toggleE43"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E43}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E44
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E44"
                        errorText={this.state.errorTextBestellungMenge.E44}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E44}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E44"
                        name="toggleE44"
                        value="toggleE44"
                        ref="toggleE44"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E44}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E45
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E45"
                        errorText={this.state.errorTextBestellungMenge.E45}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E45}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E45"
                        name="toggleE45"
                        value="toggleE45"
                        ref="toggleE45"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E45}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E46
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E46"
                        errorText={this.state.errorTextBestellungMenge.E46}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E46}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E46"
                        name="toggleE46"
                        value="toggleE46"
                        ref="toggleE46"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E46}/>
                    </TableRowColumn>
                  </TableRow>

                  <TableRow>
                    <TableRowColumn>
                      E47
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E47"
                        errorText={this.state.errorTextBestellungMenge.E47}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E47}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E47"
                        name="toggleE47"
                        value="toggleE47"
                        ref="toggleE47"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E47}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E48
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E48"
                        errorText={this.state.errorTextBestellungMenge.E48}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E48}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E48"
                        name="toggleE48"
                        value="toggleE48"
                        ref="toggleE48"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E48}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E52
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E52"
                        errorText={this.state.errorTextBestellungMenge.E52}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E52}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E52"
                        name="toggleE52"
                        value="toggleE52"
                        ref="toggleE52"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E52}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E53
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E53"
                        errorText={this.state.errorTextBestellungMenge.E53}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E53}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E53"
                        name="toggleE53"
                        value="toggleE53"
                        ref="toggleE53"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E53}/>
                    </TableRowColumn>
                  </TableRow>

                    <TableRow>
                    <TableRowColumn>
                      E57
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E57"
                        errorText={this.state.errorTextBestellungMenge.E57}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E57}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E57"
                        name="toggleE57"
                        value="toggleE57"
                        ref="toggleE57"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E57}/>
                    </TableRowColumn>
                  </TableRow>


                  <TableRow>
                    <TableRowColumn>
                      E58
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E58"
                        errorText={this.state.errorTextBestellungMenge.E58}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E58}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E58"
                        name="toggleE58"
                        value="toggleE58"
                        ref="toggleE58"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E58}/>
                    </TableRowColumn>
                  </TableRow>

                   <TableRow>
                    <TableRowColumn>
                      E59
                    </TableRowColumn>

                    <TableRowColumn>
                      <TextField
                        hintText="BestellungMenge"
                        id="E59"
                        errorText={this.state.errorTextBestellungMenge.E59}
                        errorStyle={{color:'orange'}}
                        onChange={this._handleBestellungMengeChange}
                        value= {this.state.BestellungMenge.E59}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Toggle
                        id="E59"
                        name="toggleE59"
                        value="toggleE59"
                        ref="toggleE59"
                        onToggle={this._handleBestellungArtChange}
                        defaultToggled={this.state.BestellungArt.E59}/>
                    </TableRowColumn>
                  </TableRow>

                </TableBody>

              </Table>


        )
      }

      </div>
        <Dialog
                ref="standardDialog"
                title={this.state.dialogTitle}
                actions={standardActions}
                actionFocus="ok"
                open={this.state.openDialogStandardActions}
                onRequestClose={this._handleRequestClose}>
                {this.state.dialogText}
          </Dialog>
          <Snackbar
                ref="snackbar"
                message={this.state.snackBarmessage}
                autoHideDuration={this.state.snackBarautoHideDuration}
                style={{"textAlign":"center"}}>
              </Snackbar>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    ActiveUploadXML: state.ActiveUploadXMLReducer,
    InputXMLs: state.InputXMLReducer,
    internationalReducer: state.internationalReducer
  }
}

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Kaufteildisposition)
