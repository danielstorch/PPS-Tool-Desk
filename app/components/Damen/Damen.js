import React from 'react';
import './Damen.module.css';
import mui from 'material-ui';
import { connect } from 'react-redux';
import { setAuftragsplanungDamenInputXML, resetAuftragsplanungDamenInputXML } from '../../actions/PPSToolActions';

const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const Snackbar = require('material-ui/lib/snackbar');


const TextField = require('material-ui/lib/text-field');



class Damen extends React.Component {
  //this._handleClick = this._handleClick.bind(this);
  constructor() {
    super();
    this._getWarehousestock = this._getWarehousestock.bind(this);
    this._handleVetriebswunschChange = this._handleVetriebswunschChange.bind(this);
    this._handleGeplanterLagerbestandChange = this._handleGeplanterLagerbestandChange.bind(this);
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
    this._updateLocalStorage = this._updateLocalStorage.bind(this)


    //VR = Vertriebswunsch + Rückstände
    //BW = Bedarf für WS
    //GL = Geplanter Lagerbestand
    //AL = aktueller Lagerbestand
    //WS = Warteschlange
    //BA = Bearbeitung
    //AU = Aufträge

    this.state = {
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
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      height: '650px',

      currentPeriode: "",

      VR:{P2: 0,
          E26: 0,
          E56: 0,
          E16: 0,
          E17: 0,
          E55: 0,
          E5: 0,
          E11: 0,
          E54: 0,
          E8: 0,
          E14: 0,
          E19: 0},

      BW:{P2: 0,
          E26: 0,
          E56: 0,
          E16: 0,
          E17: 0,
          E55: 0,
          E5: 0,
          E11: 0,
          E54: 0,
          E8: 0,
          E14: 0,
          E19: 0},


      GL:{P2: 0,
          E26: 0,
          E56: 0,
          E16: 0,
          E17: 0,
          E55: 0,
          E5: 0,
          E11: 0,
          E54: 0,
          E8: 0,
          E14: 0,
          E19: 0},

      AL:{P2: 0,
          E26: 0,
          E56: 0,
          E16: 0,
          E17: 0,
          E55: 0,
          E5: 0,
          E11: 0,
          E54: 0,
          E8: 0,
          E14: 0,
          E19: 0},

      WS:{P2: 0,
          E26: 0,
          E56: 0,
          E16: 0,
          E17: 0,
          E55: 0,
          E5: 0,
          E11: 0,
          E54: 0,
          E8: 0,
          E14: 0,
          E19: 0},

      BA:{P2: 0,
          E26: 0,
          E56: 0,
          E16: 0,
          E17: 0,
          E55: 0,
          E5: 0,
          E11: 0,
          E54: 0,
          E8: 0,
          E14: 0,
          E19: 0},

      AU: {P2: 0,
          E26: 0,
          E56: 0,
          E16: 0,
          E17: 0,
          E55: 0,
          E5: 0,
          E11: 0,
          E54: 0,
          E8: 0,
          E14: 0,
          E19: 0},

      errorTextVR:{P2: '',
          E26: '',
          E56: '',
          E16: '',
          E17: '',
          E55: '',
          E5: '',
          E11: '',
          E54: '',
          E8: '',
          E14: '',
          E19: ''
        },
        errorTextGL:{P2: '',
          E26: '',
          E56: '',
          E16: '',
          E17: '',
          E55: '',
          E5: '',
          E11: '',
          E54: '',
          E8: '',
          E14: '',
          E19: ''
        }
    };

  }
  componentWillMount(){
    this._updateVariables();
  }

  shouldComponentUpdate(){
    return true;
  }

  componentWillReceiveProps(){
    this._updateVariables();

  }


  _updateVariables(){
    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    if(currentInputXML && currentInputXML.inputDataObject.auftragsplanungDamen){
      this.state.VR.P2 = currentInputXML.inputDataObject.auftragsplanungDamen.VR.P2
      this.state.GL.P2 = currentInputXML.inputDataObject.auftragsplanungDamen.GL.P2

      this.state.resetButtonDisabled = false

    }else{
      this.state.resetButtonDisabled = true
      
    }

    this.state.BW.E26 = this._getWaitingslistworkstation("2")
    this.state.BW.E56 = this._getWaitingslistworkstation("2")
    this.state.BW.E16 = this._getWaitingslistworkstation("56")
    this.state.BW.E17 = this._getWaitingslistworkstation("56")
    this.state.BW.E55 = this._getWaitingslistworkstation("56")
    this.state.BW.E5 = this._getWaitingslistworkstation("55")
    this.state.BW.E11 = this._getWaitingslistworkstation("55")
    this.state.BW.E54 = this._getWaitingslistworkstation("55")
    this.state.BW.E8 = this._getWaitingslistworkstation("54")
    this.state.BW.E14 = this._getWaitingslistworkstation("54")
    this.state.BW.E19 = this._getWaitingslistworkstation("54")

    this.state.AL.P2 = this._getWarehousestock("2")
    this.state.AL.E26 = Math.ceil(this._getWarehousestock("26")/3)
    this.state.AL.E56 = this._getWarehousestock("56")
    this.state.AL.E16 = Math.ceil(this._getWarehousestock("16")/3)
    this.state.AL.E17 = Math.ceil(this._getWarehousestock("17")/3)
    this.state.AL.E55 = this._getWarehousestock("55")
    this.state.AL.E5 = this._getWarehousestock("5")
    this.state.AL.E11 = this._getWarehousestock("11")
    this.state.AL.E54 = this._getWarehousestock("54")
    this.state.AL.E8 = this._getWarehousestock("8")
    this.state.AL.E14 = this._getWarehousestock("14")
    this.state.AL.E19 = this._getWarehousestock("19")

    this.state.WS.P2 = this._getWaitingslistworkstation("2")
    this.state.WS.E26 = this._getWaitingslistworkstation("26")
    this.state.WS.E56 = this._getWaitingslistworkstation("56")
    this.state.WS.E16 = this._getWaitingslistworkstation("16")
    this.state.WS.E17 = this._getWaitingslistworkstation("17")
    this.state.WS.E55 = this._getWaitingslistworkstation("55")
    this.state.WS.E5 = this._getWaitingslistworkstation("5")
    this.state.WS.E11 = this._getWaitingslistworkstation("11")
    this.state.WS.E54 = this._getWaitingslistworkstation("54")
    this.state.WS.E8 = this._getWaitingslistworkstation("8")
    this.state.WS.E14 = this._getWaitingslistworkstation("14")
    this.state.WS.E19 = this._getWaitingslistworkstation("19")

    this.state.BA.P2 = this._getOrdersinwork("2")
    this.state.BA.E26 = this._getOrdersinwork("26")
    this.state.BA.E56 = this._getOrdersinwork("56")
    this.state.BA.E16 = this._getOrdersinwork("16")
    this.state.BA.E17 = this._getOrdersinwork("17")
    this.state.BA.E55 = this._getOrdersinwork("55")
    this.state.BA.E5 = this._getOrdersinwork("5")
    this.state.BA.E11 = this._getOrdersinwork("11")
    this.state.BA.E54 = this._getOrdersinwork("54")
    this.state.BA.E8 = this._getOrdersinwork("8")
    this.state.BA.E14 = this._getOrdersinwork("14")
    this.state.BA.E19 = this._getOrdersinwork("19")

    this.state.AU.P2 = Math.max(0,(this.state.VR.P2 + this.state.GL.P2 - this.state.AL.P2 - this.state.WS.P2 - this.state.BA.P2))
    this.state.VR.E26 = this.state.AU.P2
    this.state.AU.E26 =  Math.max(0,(this.state.VR.E26 + this.state.BW.E26 + this.state.GL.E26 - this.state.AL.E26 - this.state.WS.E26 - this.state.BA.E26))
    this.state.VR.E56 = this.state.AU.E26
    this.state.AU.E56 = Math.max(0,(this.state.VR.E56 + this.state.BW.E56 + this.state.GL.E56 - this.state.AL.E56 - this.state.WS.E56 - this.state.BA.E56))
    this.state.VR.E16 = this.state.AU.E56
    this.state.AU.E16 = Math.max(0,(this.state.VR.E16 + this.state.BW.E16 + this.state.GL.E16 - this.state.AL.E16 - this.state.WS.E16 - this.state.BA.E16))
    this.state.VR.E17 = this.state.AU.E16
    this.state.AU.E17 = Math.max(0,(this.state.VR.E17 + this.state.BW.E17 + this.state.GL.E17 - this.state.AL.E17 - this.state.WS.E17 - this.state.BA.E17))
    this.state.VR.E55 = this.state.AU.E17
    this.state.AU.E55 = Math.max(0,(this.state.VR.E55 + this.state.BW.E55 + this.state.GL.E55 - this.state.AL.E55 - this.state.WS.E55 - this.state.BA.E55))
    this.state.VR.E5 = this.state.AU.E55
    this.state.AU.E5 = Math.max(0,(this.state.VR.E5 + this.state.BW.E5 + this.state.GL.E5 - this.state.AL.E5 - this.state.WS.E5 - this.state.BA.E5))
    this.state.VR.E11 = this.state.AU.E5
    this.state.AU.E11 = Math.max(0,(this.state.VR.E11 + this.state.BW.E11 + this.state.GL.E11 - this.state.AL.E11 - this.state.WS.E11 - this.state.BA.E11))
    this.state.VR.E54 = this.state.AU.E11
    this.state.AU.E54 = Math.max(0,(this.state.VR.E54 + this.state.BW.E54 + this.state.GL.E54 - this.state.AL.E54 - this.state.WS.E54 - this.state.BA.E54))
    this.state.VR.E8 = this.state.AU.E54
    this.state.AU.E8 = Math.max(0,(this.state.VR.E8 + this.state.BW.E8 + this.state.GL.E8 - this.state.AL.E8 - this.state.WS.E8 - this.state.BA.E8))
    this.state.VR.E14 = this.state.AU.E8
    this.state.AU.E14 = Math.max(0,(this.state.VR.E14 + this.state.BW.E14 + this.state.GL.E14 - this.state.AL.E14 - this.state.WS.E14 - this.state.BA.E14))
    this.state.VR.E19 = this.state.AU.E14
    this.state.AU.E19 = Math.max(0,(this.state.VR.E19 + this.state.BW.E19 + this.state.GL.E19 - this.state.AL.E19 - this.state.WS.E19 - this.state.BA.E19))

  }

  _getWarehousestock(articleId){

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

    //console.log("Warehousestock: "+ articleId, amount)

    return amount
  }

  _getWaitingslistworkstation(articleId){
    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    var currentAmount = 0;
    if(currentInputXML){
      currentInputXML.inputDataObject.results.waitinglistworkstations[0].workplace.forEach(function (elementStation){
        if(elementStation.waitinglist){
            elementStation.waitinglist.forEach(function (elementWaitinglist){
              if(elementWaitinglist.$.item === articleId){
                currentAmount = parseInt(elementWaitinglist.$.amount) + currentAmount
              }
            }.bind(this))
          }
      }.bind(this))

    }

    //console.log("Waitingslistworkstation: "+ articleId, currentAmount)
    return currentAmount
  }

  _getOrdersinwork(articleId){
    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    var currentAmount = 0;
    if(currentInputXML){
      currentInputXML.inputDataObject.results.ordersinwork[0].workplace.forEach(function (elementWorkplace){
        if(elementWorkplace.$.item === articleId){
          currentAmount = parseInt(elementWorkplace.$.amount) + currentAmount
        }
      }.bind(this))

    }

    //console.log("Ordersinwork: "+ articleId, currentAmount)
    return currentAmount
  }

  _handleGeplanterLagerbestandChange(e){

    let articleId = e.target.id
    let value = e.target.value;
    let GLList = this.state.GL;
    let errorTextGLList = this.state.errorTextGL

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    let buttonDis;
    if(isNumeric){
      errorTextGLList[articleId] = ''
    }else{
      errorTextGLList[articleId] = 'This field must be numeric.'
      value = 0
    }
    GLList[articleId] = parseInt(value)

    this.setState({
      errorTextGL: errorTextGLList,
      GL: GLList
    });
  }

  _handleVetriebswunschChange(e){

    let articleId = e.target.id
    let value = e.target.value;
    let VRList = this.state.VR;
    let errorTextVRList = this.state.errorTextVR

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextVRList[articleId] = ''
    }else{
      errorTextVRList[articleId] = 'This field must be numeric.'
      value = 0
    }
    VRList[articleId] = parseInt(value)

    this.setState({
      errorTextVR: errorTextVRList,
      VR: VRList
    });
  }

  _handleButtonClick(e){

    var errorlol = false;
    if(this.props.ActiveUploadXML.activeUploadXMLData.id !=='result_P-1'){

      Object.keys(this.state.errorTextVR).forEach(function(key) {
          if(this.state.errorTextVR[key] !== ''){
            errorlol = true;
          }
      }.bind(this));

      Object.keys(this.state.errorTextGL).forEach(function(key) {
          if(this.state.errorTextGL[key] !== ''){
            errorlol = true;
          }
      }.bind(this));
      if(!errorlol){
        var auftragsplanungDamen = {VR:this.state.VR,
                                    BW:this.state.BW,
                                    GL:this.state.GL,
                                    AL:this.state.AL,
                                    WS:this.state.WS,
                                    BA:this.state.BA,
                                    AU:this.state.AU}
        this.props.dispatch(setAuftragsplanungDamenInputXML(auftragsplanungDamen, this.props.ActiveUploadXML.activeUploadXMLData.id));

        //UPDATE LOCAL STORAGE
        this._updateLocalStorage();
        
        this.refs.snackbar.show();
      }else{
              this.setState({
                openDialogStandardActions: true,
                dialogTitle: "Error",
                dialogText: "Please be sure that every field is a numeric"
              });
      }

    }else{
              this.setState({
                openDialogStandardActions: true,
                dialogTitle: "Error",
                dialogText: "Please choose a vaild periode"
              });
    }
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

  _handleRequestClose(buttonClicked) {
    if (!buttonClicked && this.state.modal) return;
    this.setState({
      openDialogStandardActions: false
    });
  }

_handleResetButtonClick(e){
    this.props.dispatch(resetAuftragsplanungDamenInputXML(this.props.ActiveUploadXML.activeUploadXMLData.id))
    this.state.VR.P2 = 0
    this.state.GL.P2 = 0

    //UpDATE LOCALSTORAGE
    this._updateLocalStorage();
  }

  _onDialogOk() {
    this.setState({
      openDialogStandardActions: false
    });
  }

  render() {
      // if(this.state.currentPeriode !== this.props.ActiveUploadXML.activeUploadXMLData.id){
      //   this._updateVariables()
      //   console.log("ALLES WIRD GEUPDATED")
      // }
      this._updateVariables()

      let standardActions = [
      { text: 'Ok', onTouchTap: this._onDialogOk.bind(this), ref: 'ok' }
    ];

    return (
      <div>
        <div>
          <h1>Auftragsplanung Damen-Fahrrad</h1>

          <RaisedButton label="Save" primary={true} onTouchTap={this._handleButtonClick} />
          <RaisedButton label="Reset" secondary={true} disabled={this.state.resetButtonDisabled} onTouchTap={this._handleResetButtonClick}/>

          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            selectable={this.state.selectable}
            >
            <TableBody>
            <TableHeader >
              <TableRow selectable={this.state.selectable}>
                <TableHeaderColumn colSpan="7" tooltip='Damen Fahrrad' style={{textAlign: 'center'}}>
                  Damen Fahrrad
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            </TableBody>

            <TableBody displayRowCheckbox={this.state.displayRowCheckbox}>
            <TableRow>
                <TableRowColumn>
                  Artikel
                </TableRowColumn>
                <TableRowColumn>
                  Vertriebswunsch
                </TableRowColumn>
                <TableRowColumn>
                  Bedarf für WS
                </TableRowColumn>
                <TableRowColumn>
                  Geplanter Lagerbestand
                </TableRowColumn>
                <TableRowColumn>
                Aktueller Lagerbestand
              </TableRowColumn>
                <TableRowColumn>
                Warteschlange
              </TableRowColumn>
                <TableRowColumn>
                  Bearbeitung
                </TableRowColumn>
                <TableRowColumn>
                  Aufträge
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>P2</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="P2"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.P2}
                    errorText={this.state.errorTextVR.P2}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}/>
                </TableRowColumn>
                <TableRowColumn>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.P2}
                    id="P2"
                    errorText={this.state.errorTextGL.P2}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}/>
                </TableRowColumn>
                <TableRowColumn>
                <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.P2}
                    disabled={true}/>
              </TableRowColumn>
                <TableRowColumn>
                <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.P2}
                    disabled={true}/>
              </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.P2}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.P2}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn><b><font color="red">E26</font></b></TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Vertriebswunsch"
                    value = {this.state.VR.E26}
                    id="E26"
                    errorText={this.state.errorTextVR.E26}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.P2}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E26}
                    id="E26"
                    errorText={this.state.errorTextGL.E26}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E26}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E26}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E26}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E26}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn displayBorder = {true}>E56</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E56}
                    id="E56"
                    errorText={this.state.errorTextVR.E56}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    value={this.state.BW.P2}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E56}
                    id="E56"
                    errorText={this.state.errorTextGL.E56}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E56}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E56}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E56}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E56}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn><b><font color="red">E16</font></b></TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E16"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E16}
                    errorText={this.state.errorTextVR.E16}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E16}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E16}
                    id="E16"
                    errorText={this.state.errorTextGL.E16}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E16}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E16}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E16}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E16}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn><b><font color="red">E17</font></b></TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E17"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E17}
                    errorText={this.state.errorTextVR.E17}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E56}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E17}
                    id="E17"
                    errorText={this.state.errorTextGL.E17}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E17}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E17}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E17}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E17}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>E55</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E55"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E55}
                    errorText={this.state.errorTextVR.E55}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E55}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E55}
                    id="E55"
                    errorText={this.state.errorTextGL.E55}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E55}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E55}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E55}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E55}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>E5</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E5"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E5}
                    errorText={this.state.errorTextVR.E5}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E5}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E5}
                    id="E5"
                    errorText={this.state.errorTextGL.E5}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E5}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E5}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E5}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E5}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>E11</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E11"
                    hintText="Vertriebswunsch"
                  value={this.state.VR.E11}
                  errorText={this.state.errorTextVR.E11}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E11}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E11}
                    id="E11"
                    errorText={this.state.errorTextGL.E11}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E11}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E11}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E11}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E11}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
              <TableRowColumn>E54</TableRowColumn>
              <TableRowColumn>
                <TextField
                  id="E54"
                  hintText="Vertriebswunsch"
                  value={this.state.VR.E54}
                  errorText={this.state.errorTextVR.E54}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
              </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E54}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E54}
                    id="E54"
                    errorText={this.state.errorTextGL.E54}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E54}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E54}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E54}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E54}
                    disabled={true}/>
                </TableRowColumn>
            </TableRow>
              <TableRow>
                <TableRowColumn>E8</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E8"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E8}
                    errorText={this.state.errorTextVR.E8}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E8}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E8}
                    id="E8"
                    errorText={this.state.errorTextGL.E8}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E8}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E8}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E8}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E8}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>E14</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E14"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E14}
                    errorText={this.state.errorTextVR.E14}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E14}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E14}
                    id="E14"
                    errorText={this.state.errorTextGL.E14}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E14}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.WS.E14}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.BA.E14}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E14}
                    disabled={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>E19</TableRowColumn>
                <TableRowColumn>
                  <TextField
                    id="E19"
                    hintText="Vertriebswunsch"
                    value={this.state.VR.E19}
                    errorText={this.state.errorTextVR.E19}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleVetriebswunschChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bedarf für WS"
                    disabled={true}
                    value={this.state.BW.E19}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Geplanter Lagerbestand"
                    value={this.state.GL.E19}
                    id="E19"
                    errorText={this.state.errorTextGL.E19}
                    errorStyle={{color:'orange'}}
                    onChange={this._handleGeplanterLagerbestandChange}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aktueller Lagerbestand"
                    value={this.state.AL.E19}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Warteschlange"
                    value={this.state.AL.E19}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Bearbeitung"
                    value = {this.state.AL.E19}
                    disabled={true}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Aufträge"
                    value = {this.state.AU.E19}
                    disabled={true}/>
                </TableRowColumn>

              </TableRow>

            </TableBody>
          </Table>
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
    InputXMLs: state.InputXMLReducer
  }
}

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Damen)
