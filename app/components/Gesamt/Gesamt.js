import React from 'react';
import './Gesamt.module.css';
import mui from 'material-ui';
import { connect } from 'react-redux';
import { setAuftragsplanungGesamtInputXML, resetAuftragsplanungGesamtInputXML } from '../../actions/PPSToolActions';

var TableBody = mui.TableBody
  , TableHeader = mui.TableHeader
  , TableRow = mui.TableRow
  , Table = mui.Table
  , TableHeaderColumn = mui.TableHeaderColumn
  , TableRowColumn = mui.TableRowColumn
  , Dialog = mui.Dialog
  , Snackbar = mui.Snackbar
  , TextField = mui.TextField
  , RaisedButton = mui.RaisedButton;


class Gesamt extends React.Component {
  constructor() {
    super();

    this._handleSaveButtonClick = this._handleSaveButtonClick.bind(this)
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this)
    this._handlePrognoseChange = this._handlePrognoseChange.bind(this)
    this._handleProduktionLagerChange = this._handleProduktionLagerChange.bind(this)
    this._updateLocalStorage = this._updateLocalStorage.bind(this)

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
      height: '300px',
      P1: {
          Prognose: 0,
          ProduktionLager: 0,
          ProduktionGesamt: 0,
          ProduktionAuftraege: 0,
          Lagerbestand: 0
        },
      P2: {
          Prognose: 0,
          ProduktionLager: 0,
          ProduktionGesamt: 0,
          ProduktionAuftraege: 0,
          Lagerbestand: 0
        },
      P3: {
          Prognose: 0,
          ProduktionLager: 0,
          ProduktionGesamt: 0,
          ProduktionAuftraege: 0,
          Lagerbestand: 0
        },
      Summe: {
          Prognose:0,
          ProduktionLager: 0,
          ProduktionGesamt: 0,
          ProduktionAuftraege: 0
        },

        errorTextPrognose:{
          P1: '',
          P2: '',
          P3: ''
      },
      errorTextProduktionLager:{
          P1: '',
          P2: '',
          P3: ''
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

    console.log(currentInputXML)
    if(currentInputXML && currentInputXML.inputDataObject.auftragsplanungGesamt){
      this.state.P1.ProduktionLager = currentInputXML.inputDataObject.auftragsplanungGesamt.P1.ProduktionLager
      this.state.P1.Prognose = currentInputXML.inputDataObject.auftragsplanungGesamt.P1.Prognose
      this.state.P2.ProduktionLager = currentInputXML.inputDataObject.auftragsplanungGesamt.P2.ProduktionLager
      this.state.P2.Prognose = currentInputXML.inputDataObject.auftragsplanungGesamt.P2.Prognose
      this.state.P3.ProduktionLager = currentInputXML.inputDataObject.auftragsplanungGesamt.P3.ProduktionLager
      this.state.P3.Prognose = currentInputXML.inputDataObject.auftragsplanungGesamt.P3.Prognose

      this.state.resetButtonDisabled = false

    }else{
      this.state.resetButtonDisabled = true
      
    }

    //Aktueller Lagerstand AUS DER XML
    this.state.P1.Lagerbestand = this._getLagerbestand('1');
    this.state.P2.Lagerbestand = this._getLagerbestand('2');
    this.state.P3.Lagerbestand = this._getLagerbestand('3');

    //Produktion für Auftrag
    this.state.P1.ProduktionAuftraege = this.state.P1.Prognose - this.state.P1.Lagerbestand;
    this.state.P2.ProduktionAuftraege = this.state.P2.Prognose - this.state.P2.Lagerbestand;
    this.state.P3.ProduktionAuftraege = this.state.P3.Prognose - this.state.P3.Lagerbestand;

    //Produktion Gesamt
    this.state.P1.ProduktionGesamt = this.state.P1.ProduktionAuftraege + this.state.P1.ProduktionLager;
    this.state.P2.ProduktionGesamt = this.state.P2.ProduktionAuftraege + this.state.P2.ProduktionLager;
    this.state.P3.ProduktionGesamt = this.state.P3.ProduktionAuftraege + this.state.P3.ProduktionLager;

    //Summe
    this.state.Summe.Prognose = this.state.P1.Prognose + this.state.P2.Prognose + this.state.P3.Prognose 
    this.state.Summe.ProduktionLager = this.state.P1.ProduktionLager + this.state.P2.ProduktionLager + this.state.P3.ProduktionLager
    this.state.Summe.ProduktionGesamt = this.state.P1.ProduktionGesamt + this.state.P2.ProduktionGesamt + this.state.P3.ProduktionGesamt  
    this.state.Summe.ProduktionAuftraege = this.state.P1.ProduktionAuftraege + this.state.P2.ProduktionAuftraege + this.state.P3.ProduktionAuftraege
  }


  _getLagerbestand(articleId){
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
    console.log("Lagerbestand: "+ articleId, amount)
    return Math.round(amount);
  }

  _handleProduktionLagerChange(e){

    let articleId = e.target.id
    let value = e.target.value;
    let errorTextList = this.state.errorTextProduktionLager

    let periode = [];

    if(e.target.id == 'P1'){
      periode = this.state.P1
    }else if(e.target.id == 'P2'){
      periode = this.state.P2
    }else if(e.target.id == 'P3'){
      periode = this.state.P3
    }

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextList[articleId] = ''
    }else{
      errorTextList[articleId] = 'This field must be numeric.'
      value = 0
    }
    periode["ProduktionLager"] = parseInt(value)


    if(e.target.id == 'P1'){
      this.setState({
        errorText: errorTextList,
        P1: periode
      });

    } else if(e.target.id == 'P2'){
      this.setState({
        errorText: errorTextList,
        P2: periode
      });

    } else if(e.target.id == 'P3'){
      this.setState({
        errorText: errorTextList,
        P3: periode
      });
    }
  }

  _handlePrognoseChange(e){

    let articleId = e.target.id
    let value = e.target.value;
    let errorTextList = this.state.errorTextPrognose

    let periode = [];

    if(e.target.id == 'P1'){
      periode = this.state.P1
    }else if(e.target.id == 'P2'){
      periode = this.state.P2
    }else if(e.target.id == 'P3'){
      periode = this.state.P3
    }

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorTextList[articleId] = ''
    }else{
      errorTextList[articleId] = 'This field must be numeric.'
      value = 0
    }
    periode["Prognose"] = parseInt(value)


    if(e.target.id == 'P1'){
      this.setState({
        errorText: errorTextList,
        P1: periode
      });

    } else if(e.target.id == 'P2'){
      this.setState({
        errorText: errorTextList,
        P2: periode
      });

    } else if(e.target.id == 'P3'){
      this.setState({
        errorText: errorTextList,
        P3: periode
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

  _onDialogOk() {
    this.setState({
      openDialogStandardActions: false
    });
  }
  _handleSaveButtonClick(e){
    var errorlol = false;
    if(this.props.ActiveUploadXML.activeUploadXMLData.id !=='result_P-1'){

      Object.keys(this.state.errorTextPrognose).forEach(function(key) {
          if(this.state.errorTextPrognose[key] !== ''){
            errorlol = true;
          }
      }.bind(this));

      Object.keys(this.state.errorTextProduktionLager).forEach(function(key) {
          if(this.state.errorTextProduktionLager[key] !== ''){
            errorlol = true;
          }
      }.bind(this));


      if(!errorlol){
        var auftragsplanungGesamt = {
                                      P1:this.state.P1,
                                      P2:this.state.P2,
                                      P3:this.state.P3,
                                      Summe:this.state.Summe
                                    }
        this.props.dispatch(setAuftragsplanungGesamtInputXML(auftragsplanungGesamt, this.props.ActiveUploadXML.activeUploadXMLData.id));
        this._updateLocalStorage()
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

  _handleResetButtonClick(e){
    
    this.props.dispatch(resetAuftragsplanungGesamtInputXML(this.props.ActiveUploadXML.activeUploadXMLData.id))

      this.state.P1.ProduktionLager = 0
      this.state.P1.Prognose = 0
      this.state.P2.ProduktionLager = 0
      this.state.P2.Prognose = 0
      this.state.P3.ProduktionLager = 0
      this.state.P3.Prognose = 0

      this._updateLocalStorage()
  }

  render() {
    this._updateVariables()

    let standardActions = [
      { text: 'Ok', onTouchTap: this._onDialogOk.bind(this), ref: 'ok' }
    ];

    return (
     <div>
      <h1>Auftragsplanung Gesamt</h1>
        <div>
        <RaisedButton label="Save" primary={true} onTouchTap={this._handleSaveButtonClick}/>
        <RaisedButton label="Reset" secondary={true} disabled={this.state.resetButtonDisabled} onTouchTap={this._handleResetButtonClick}/>
             
              <div>
                  <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    selectable={this.state.selectable}
                    >
                    <TableBody>
                    <TableHeader >
                      <TableRow selectable={this.state.selectable}>
                        <TableHeaderColumn colSpan="6" tooltip='Gesamt' style={{textAlign: 'center'}}>
                          Gesamt
                        </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    </TableBody>

                    <TableBody displayRowCheckbox={this.state.displayRowCheckbox}>
                      <TableRow>
                        <TableRowColumn>
                        </TableRowColumn>
                        <TableRowColumn>
                          Lagerbestand
                        </TableRowColumn>
                        <TableRowColumn>
                          Prognose
                        </TableRowColumn>
                        <TableRowColumn>
                          Produktion für Aufträge
                        </TableRowColumn>
                        <TableRowColumn>
                        Produktion für Lager
                      </TableRowColumn>
                        <TableRowColumn>
                        Produktion gesamt
                      </TableRowColumn>
                      </TableRow>

                      <TableRow>
                        <TableRowColumn>
                          P1
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Lagerbestand"
                              value={this.state.P1.Lagerbestand}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Prognose"
                              id="P1"
                              errorText={this.state.errorTextPrognose.P1}
                              errorStyle={{color:'orange'}}
                              onChange={this._handlePrognoseChange}
                              value= {this.state.P1.Prognose}/>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Produktion für Aufträge"
                              value={this.state.P1.ProduktionAuftraege}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion für Lage"
                              id="P1"
                              errorText={this.state.errorTextProduktionLager.P1}
                              errorStyle={{color:'orange'}}
                              onChange={this._handleProduktionLagerChange}
                              value={this.state.P1.ProduktionLager}/>
                      </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion gesamt"
                              value={this.state.P1.ProduktionGesamt}
                              disabled = {true}/>
                      </TableRowColumn>
                      </TableRow>

                      <TableRow>
                        <TableRowColumn>
                          P2
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Lagerbestand"
                              value={this.state.P2.Lagerbestand}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Prognose"
                              id="P2"
                              errorText={this.state.errorTextPrognose.P2}
                              errorStyle={{color:'orange'}}
                              onChange={this._handlePrognoseChange}
                              value= {this.state.P2.Prognose}/>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Produktion für Aufträge"
                              value={this.state.P2.ProduktionAuftraege}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion für Lage"
                              id="P2"
                              errorText={this.state.errorTextProduktionLager.P2}
                              errorStyle={{color:'orange'}}
                              onChange={this._handleProduktionLagerChange}
                              value={this.state.P2.ProduktionLager}/>
                      </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion gesamt"
                              value={this.state.P2.ProduktionGesamt}
                              disabled = {true}/>
                      </TableRowColumn>
                      </TableRow>

                      <TableRow>
                        <TableRowColumn>
                          P3
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Lagerbestand"
                              value={this.state.P3.Lagerbestand}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Prognose"
                              id="P3"
                              errorText={this.state.errorTextPrognose.P3}
                              errorStyle={{color:'orange'}}
                              onChange={this._handlePrognoseChange}
                              value= {this.state.P3.Prognose}/>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Produktion für Aufträge"
                              value={this.state.P3.ProduktionAuftraege}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion für Lage"
                              id="P3"
                              errorText={this.state.errorTextProduktionLager.P3}
                              errorStyle={{color:'orange'}}
                              onChange={this._handleProduktionLagerChange}
                              value={this.state.P3.ProduktionLager}/>
                      </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion gesamt"
                              value={this.state.P3.ProduktionGesamt}
                              disabled = {true}/>
                      </TableRowColumn>
                      </TableRow>

                      <TableRow>
                        <TableRowColumn>
                          Summe
                        </TableRowColumn>
                        <TableRowColumn>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Prognose"
                              value={this.state.Summe.Prognose}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                          <TextField
                              hintText="Produktion für Aufträge"
                              value={this.state.Summe.ProduktionAuftraege}
                              disabled = {true}/>
                        </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion für Lage"
                              value={this.state.Summe.ProduktionLager}
                              disabled = {true}/>
                      </TableRowColumn>
                        <TableRowColumn>
                        <TextField
                              hintText="Produktion gesamt"
                              value={this.state.Summe.ProduktionGesamt}
                              disabled = {true}/>
                      </TableRowColumn>
                      </TableRow>

                    </TableBody>
                  </Table>
              </div>
        </div>
      <div>
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

export default connect(mapStateToProps, dispatch => ({ dispatch }))(Gesamt)
