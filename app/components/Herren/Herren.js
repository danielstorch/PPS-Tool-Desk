import React from 'react';
import './Herren.module.css';
import mui from 'material-ui';
import { connect } from 'react-redux';
import { setAuftragsplanungHerrenInputXML, resetAuftragsplanungHerrenInputXML } from '../../actions/PPSToolActions';

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






class Herren extends React.Component {
  //this._handleClick = this._handleClick.bind(this);
  constructor() {
    super();
    this._getWarehousestock = this._getWarehousestock.bind(this);
    this._getWaitingslistworkstation = this._getWaitingslistworkstation.bind(this);
    this._getOrdersinwork = this._getOrdersinwork.bind(this);
    this._handleVetriebswunschChange = this._handleVetriebswunschChange.bind(this);
    this._handleLagerBestandChange = this._handleLagerBestandChange.bind(this);
    this._handleSaveButtonClick = this._handleSaveButtonClick.bind(this);
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this._updateLocalStorage = this._updateLocalStorage.bind(this);



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
      buttonDisabled: false,

      currentPeriode: "",

      VR:{P1: 0,
        E26: 0,
        E51: 0,
        E16: 0,
        E17: 0,
        E50: 0,
        E4: 0,
        E10: 0,
        E49: 0,
        E7: 0,
        E13: 0,
        E18: 0},

      BW:{P1: 0,
        E26: 0,
        E51: 0,
        E16: 0,
        E17: 0,
        E50: 0,
        E4: 0,
        E10: 0,
        E49: 0,
        E7: 0,
        E13: 0,
        E18: 0},

      GL:{P1: 0,
        E26: 0,
        E51: 0,
        E16: 0,
        E17: 0,
        E50: 0,
        E4: 0,
        E10: 0,
        E49: 0,
        E7: 0,
        E13: 0,
        E18: 0},

      AL:{P1: 0,
        E26: 0,
        E51: 0,
        E16: 0,
        E17: 0,
        E50: 0,
        E4: 0,
        E10: 0,
        E49: 0,
        E7: 0,
        E13: 0,
        E18: 0},

      WS:{P1: 0,
        E26: 0,
        E51: 0,
        E16: 0,
        E17: 0,
        E50: 0,
        E4: 0,
        E10: 0,
        E49: 0,
        E7: 0,
        E13: 0,
        E18: 0},

      BA:{P1: 0,
        E26: 0,
        E51: 0,
        E16: 0,
        E17: 0,
        E50: 0,
        E4: 0,
        E10: 0,
        E49: 0,
        E7: 0,
        E13: 0,
        E18: 0},

      AU: {P1: 0,
        E26: 0,
        E51: 0,
        E16: 0,
        E17: 0,
        E50: 0,
        E4: 0,
        E10: 0,
        E49: 0,
        E7: 0,
        E13: 0,
        E18: 0},

      errorText:{P1: '',
        E26: '',
        E51: '',
        E16: '',
        E17: '',
        E50: '',
        E4: '',
        E10: '',
        E49: '',
        E7: '',
        E13: '',
        E18: ''},

      errorTextGL:{P1: '',
        E26: '',
        E51: '',
        E16: '',
        E17: '',
        E50: '',
        E4: '',
        E10: '',
        E49: '',
        E7: '',
        E13: '',
        E18: ''}

    };

  }

  componentWillMount(){
    this._updateVariables();
  }

  shouldComponentUpdate(){
    return true;
  }

  _updateVariables(){

    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    if(currentInputXML && currentInputXML.inputDataObject.auftragsplanungHerren){
      this.state.VR.P1 = currentInputXML.inputDataObject.auftragsplanungHerren.VR.P1
      this.state.GL.P1 = currentInputXML.inputDataObject.auftragsplanungHerren.GL.P1

      this.state.resetButtonDisabled = false

    }else{
      this.state.resetButtonDisabled = true
      
    }

    //BW
      this.state.BW.E26 = this._getWaitingslistworkstation('1');
      this.state.BW.E51 = this._getWaitingslistworkstation('1');
      this.state.BW.E16 = this._getWaitingslistworkstation('51');
      this.state.BW.E17 = this._getWaitingslistworkstation('51');
      this.state.BW.E50 = this._getWaitingslistworkstation('51');
      this.state.BW.E4 = this._getWaitingslistworkstation('50');
      this.state.BW.E10 = this._getWaitingslistworkstation('50');
      this.state.BW.E49 = this._getWaitingslistworkstation('50');
      this.state.BW.E7 = this._getWaitingslistworkstation('49');
      this.state.BW.E13 = this._getWaitingslistworkstation('49');
      this.state.BW.E18 = this._getWaitingslistworkstation('49');

      //AL
      this.state.AL.P1 = this._getWarehousestock('1');
       this.state.AL.E26 = Math.ceil(this._getWarehousestock('26')/3); 
      this.state.AL.E51 = this._getWarehousestock('51'); 
      this.state.AL.E16 = Math.ceil(this._getWarehousestock('16')/3);
      this.state.AL.E17 = Math.ceil(this._getWarehousestock('17')/3);
       this.state.AL.E50 = this._getWarehousestock('50');
       this.state.AL.E4 = this._getWarehousestock('4'); 
      this.state.AL.E10 = this._getWarehousestock('10'); 
      this.state.AL.E49 = this._getWarehousestock('49'); 
      this.state.AL.E7 = this._getWarehousestock('7'); 
      this.state.AL.E13 = this._getWarehousestock('13');
       this.state.AL.E18 = this._getWarehousestock('18');


      //WS
      this.state.WS.P1 = this._getWaitingslistworkstation('1');
      this.state.WS.E26 = this._getWaitingslistworkstation('26');
      this.state.WS.E51 = this._getWaitingslistworkstation('51');
      this.state.WS.E16 = this._getWaitingslistworkstation('16');
      this.state.WS.E17 = this._getWaitingslistworkstation('17');
      this.state.WS.E50 = this._getWaitingslistworkstation('50');
      this.state.WS.E4 = this._getWaitingslistworkstation('4');
      this.state.WS.E10 = this._getWaitingslistworkstation('10');
      this.state.WS.E49 = this._getWaitingslistworkstation('49');
      this.state.WS.E7 = this._getWaitingslistworkstation('7');
      this.state.WS.E13 = this._getWaitingslistworkstation('13');
      this.state.WS.E18 = this._getWaitingslistworkstation('18');

      //BA
      this.state.BA.P1 = this._getOrdersinwork('1');
      this.state.BA.E26 = this._getOrdersinwork('26');
      this.state.BA.E51 = this._getOrdersinwork('51');
      this.state.BA.E16 = this._getOrdersinwork('16');
      this.state.BA.E17 = this._getOrdersinwork('17');
      this.state.BA.E50 = this._getOrdersinwork('50');
      this.state.BA.E4 = this._getOrdersinwork('4');
      this.state.BA.E10 = this._getOrdersinwork('10');
      this.state.BA.E49 = this._getOrdersinwork('49');
      this.state.BA.E7 = this._getOrdersinwork('7');
      this.state.BA.E13 = this._getOrdersinwork('13');
      this.state.BA.E18 = this._getOrdersinwork('18');
    

    this.state.AU.P1 = Math.max(0,(this.state.VR.P1 + this.state.GL.P1 - this.state.AL.P1 - this.state.WS.P1 - this.state.BA.P1));
    this.state.VR.E26 = this.state.AU.P1
    this.state.AU.E26 =  Math.max(0,(this.state.VR.E26 + this.state.BW.E26 + this.state.GL.E26 - this.state.AL.E26 - this.state.WS.E26 - this.state.BA.E26))
    this.state.VR.E51 = this.state.AU.E26
    this.state.AU.E51 = Math.max(0,(this.state.VR.E51 + this.state.BW.E51 + this.state.GL.E51 - this.state.AL.E51 - this.state.WS.E51 - this.state.BA.E51))
    this.state.VR.E16 = this.state.AU.E51
    this.state.AU.E16 = Math.max(0,(this.state.VR.E16 + this.state.BW.E16 + this.state.GL.E16 - this.state.AL.E16 - this.state.WS.E16 - this.state.BA.E16))
    this.state.VR.E17 = this.state.AU.E16
    this.state.AU.E17 = Math.max(0,(this.state.VR.E17 + this.state.BW.E17 + this.state.GL.E17 - this.state.AL.E17 - this.state.WS.E17 - this.state.BA.E17))
    this.state.VR.E50 = this.state.AU.E17
    this.state.AU.E50 = Math.max(0,(this.state.VR.E50 + this.state.BW.E50 + this.state.GL.E50 - this.state.AL.E50 - this.state.WS.E50 - this.state.BA.E50))
    this.state.VR.E4 = this.state.AU.E50
    this.state.AU.E4 = Math.max(0,(this.state.VR.E4 + this.state.BW.E4 + this.state.GL.E4 - this.state.AL.E4 - this.state.WS.E4 - this.state.BA.E4))
    this.state.VR.E10 = this.state.AU.E4
    this.state.AU.E10 = Math.max(0,(this.state.VR.E10 + this.state.BW.E10 + this.state.GL.E10 - this.state.AL.E10 - this.state.WS.E10 - this.state.BA.E10))
    this.state.VR.E49 = this.state.AU.E10
    this.state.AU.E49 = Math.max(0,(this.state.VR.E49 + this.state.BW.E49 + this.state.GL.E49 - this.state.AL.E49 - this.state.WS.E49 - this.state.BA.E49))
    this.state.VR.E7 = this.state.AU.E49
    this.state.AU.E7 = Math.max(0,(this.state.VR.E7 + this.state.BW.E7 + this.state.GL.E7 - this.state.AL.E7 - this.state.WS.E7 - this.state.BA.E7))
    this.state.VR.E13 = this.state.AU.E7
    this.state.AU.E13 = Math.max(0,(this.state.VR.E13 + this.state.BW.E13 + this.state.GL.E13 - this.state.AL.E13 - this.state.WS.E13 - this.state.BA.E13))
    this.state.VR.E18 = this.state.AU.E13
    this.state.AU.E18 = Math.max(0,(this.state.VR.E18 + this.state.BW.E18 + this.state.GL.E18 - this.state.AL.E18 - this.state.WS.E18 - this.state.BA.E18))


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

    return Math.round(amount);
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

    console.log("Ordersinwork: "+ articleId, currentAmount)
    return currentAmount
  }

  _handleVetriebswunschChange(e){

    let articleId = e.target.id
    let value = e.target.value;
    let VRList = this.state.VR;
    let errorTextList = this.state.errorText

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextList[articleId] = ''
    }else{
      errorTextList[articleId] = 'This field must be numeric.'
      value = 0
    }
    VRList[articleId] = parseInt(value)


    this.setState({
      errorText: errorTextList,
      VR: VRList
    });
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

  _handleLagerBestandChange(e){

    let articleId = e.target.id
    let value = e.target.value;
    let VRList = this.state.GL;
    let errorTextList = this.state.errorTextGL

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextList[articleId] = ''
    }else{
      errorTextList[articleId] = 'This field must be numeric.'
      value = 0
    }
    VRList[articleId] = parseInt(value)

    this.setState({
      errorTextGL: errorTextList,
      GL: VRList
    });
  }
_handleSaveButtonClick(e){

    var errorlol = false;
    if(this.props.ActiveUploadXML.activeUploadXMLData.id !=='result_P-1'){

      Object.keys(this.state.errorText).forEach(function(key) {
          if(this.state.errorText[key] !== ''){
            errorlol = true;
          }
      }.bind(this));

      Object.keys(this.state.errorTextGL).forEach(function(key) {
          if(this.state.errorTextGL[key] !== ''){
            errorlol = true;
          }
      }.bind(this));


      if(!errorlol){
        var auftragsplanungHerren = {
                                    VR:this.state.VR,
                                    BW:this.state.BW,
                                    GL:this.state.GL,
                                    AL:this.state.AL,
                                    WS:this.state.WS,
                                    BA:this.state.BA,
                                    AU:this.state.AU
                                  }
        this.props.dispatch(setAuftragsplanungHerrenInputXML(auftragsplanungHerren, this.props.ActiveUploadXML.activeUploadXMLData.id));
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

  _handleRequestClose(buttonClicked) {
    if (!buttonClicked && this.state.modal) return;
    this.setState({
      openDialogStandardActions: false
    });
  }

  _handleResetButtonClick(e){
    this.props.dispatch(resetAuftragsplanungHerrenInputXML(this.props.ActiveUploadXML.activeUploadXMLData.id))
    this.state.VR.P1 = 0
    this.state.GL.P1 = 0

    this._updateLocalStorage();
  }

  _onDialogOk() {
    this.setState({
      openDialogStandardActions: false
    });
  }

  render() {

    // if(this.state.currentPeriode !== this.props.ActiveUploadXML.activeUploadXMLData.id){
    //
    //   console.log("ALLES WIRD GEUPDATED")
    // }
this._updateVariables()

      let standardActions = [
      { text: 'Ok', onTouchTap: this._onDialogOk.bind(this), ref: 'ok' }
    ];

    return (
      <div>
        <div>
        <h1>Auftragsplanung Herren-Fahrrad</h1>

        <RaisedButton label="Save" primary={true} onTouchTap={this._handleSaveButtonClick}/>
        <RaisedButton label="Reset" secondary={true} disabled={this.state.resetButtonDisabled} onTouchTap={this._handleResetButtonClick}/>

        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          >
          <TableBody>
          <TableHeader >
            <TableRow selectable={this.state.selectable}>
              <TableHeaderColumn colSpan="7" tooltip='Herren Fahrrad' style={{textAlign: 'center'}}>
                Herren Fahrrad
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
              <TableRowColumn>P1</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="P1"
                  errorText={this.state.errorText.P1}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.P1}/>
              </TableRowColumn>
              <TableRowColumn>

              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="P1"
                  errorText={this.state.errorTextGL.P1}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.P1}/>
              </TableRowColumn>
              <TableRowColumn>
              <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.P1}
                  disabled = {true}/>
            </TableRowColumn>
              <TableRowColumn>
              <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.P1}
                  disabled = {true}/>
                />
            </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.P1}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.P1}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><b><font color="red">E26</font></b></TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E26"
                  errorText={this.state.errorText.E26}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E26}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E26}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E26"
                  errorText={this.state.errorTextGL.E26}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E26}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E26}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E26}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E26}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E26}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn displayBorder = {true}>E51</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E51"
                  errorText={this.state.errorText.E51}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E51}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E51}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E51"
                  errorText={this.state.errorTextGL.E51}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E51}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E51}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E51}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E51}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E51}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><b><font color="red">E16</font></b></TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E16"
                  errorText={this.state.errorText.E16}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E16}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E16}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E16"
                  errorText={this.state.errorTextGL.E16}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E16}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E16}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E16}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E16}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E16}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><b><font color="red">E17</font></b></TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E17"
                  errorText={this.state.errorText.E17}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E17}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E17}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E17"
                  errorText={this.state.errorTextGL.E17}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E17}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E17}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E17}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E17}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E17}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>E50</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E50"
                  errorText={this.state.errorText.E50}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E50}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E50}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E50"
                  errorText={this.state.errorTextGL.E50}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E50}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E50}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E50}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E50}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E50}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>E4</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E4"
                  errorText={this.state.errorText.E4}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E4}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E4}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E4"
                  errorText={this.state.errorTextGL.E4}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E4}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E4}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E4}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E4}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E4}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>E10</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E10"
                  errorText={this.state.errorText.E10}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E10}
                  disabled = {true}/>
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E10}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E10"
                  errorText={this.state.errorTextGL.E10}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E10}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E10}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E10}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E10}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E10}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
            <TableRowColumn>E49</TableRowColumn>
            <TableRowColumn>
              <TextField
                hintText="Vertriebswunsch"
                value= {this.state.VR.E49}
                id="E49"
                errorText={this.state.errorText.E49}
                errorStyle={{color:'orange'}}
                onChange={this._handleVetriebswunschChange}
                disabled = {true}/>
              />
            </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E49}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E49"
                  errorText={this.state.errorTextGL.E49}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E49}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E49}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E49}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E49}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E49}
                  disabled = {true}/>
              </TableRowColumn>
          </TableRow>
            <TableRow>
              <TableRowColumn>E7</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  value= {this.state.VR.E7}
                  id="E7"
                  errorText={this.state.errorText.E7}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E7}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E7"
                  errorText={this.state.errorTextGL.E7}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E7}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E7}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E7}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E7}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E7}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>E13</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E13"
                  errorText={this.state.errorText.E13}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E13}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E13}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E13"
                  errorText={this.state.errorTextGL.E13}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E13}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E13}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E13}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E13}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E13}
                  disabled = {true}/>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>E18</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Vertriebswunsch"
                  id="E18"
                  errorText={this.state.errorText.E18}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleVetriebswunschChange}
                  value= {this.state.VR.E18}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bedarf für WS"
                  value = {this.state.BW.E18}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Geplanter Lagerbestand"
                  id="E18"
                  errorText={this.state.errorTextGL.E18}
                  errorStyle={{color:'orange'}}
                  onChange={this._handleLagerBestandChange}
                  value= {this.state.GL.E18}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aktueller Lagerbestand"
                  value = {this.state.AL.E18}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Warteschlange"
                  value = {this.state.WS.E18}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Bearbeitung"
                  value = {this.state.BA.E18}
                  disabled = {true}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Aufträge"
                  value= {this.state.AU.E18}
                  disabled = {true}/>
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

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Herren)
