// components/App.js
 
import React, { PropTypes } from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';
import styles from './Download.module.css';
 
import update from 'react/lib/update';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import xml2js from 'xml2js';
import { Link } from 'react-router';

var RaisedButton = mui.RaisedButton
  , TextField = mui.TextField
  , Toggle = mui.Toggle
  , TableBody = mui.TableBody
  , TableHeader = mui.TableHeader
  , TableRow = mui.TableRow
  , Table = mui.Table
  , TableHeaderColumn = mui.TableHeaderColumn
  , TableRowColumn = mui.TableRowColumn;

const style = {
  textAlign: "center"
};

@DragDropContext(HTML5Backend) class Downlaod extends React.Component {

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this._downloadXML = this._downloadXML.bind(this);
    this._updateVariables = this._updateVariables.bind(this);
    this._handleAuftragMengeChange = this._handleAuftragMengeChange.bind(this);
    this._addAuftragButton = this._addAuftragButton.bind(this);
    this._handleSplitQuantityChange = this._handleSplitQuantityChange.bind(this);
    this._handleSplitArticleIDChange = this._handleSplitArticleIDChange.bind(this);

    this.state = {
          displayRowCheckbox: false,
          fixedHeader: true,
          fixedFooter: true,
          stripedRows: false,
          showRowHover: false,
          selectable: false,
          multiSelectable: false,
          enableSelectAll: false,
          deselectOnClickaway: false,
          auftraege:[],
          errorTextList:[],
          errorSplitID:"",
          errorColorSplitId:{color:'orange'},
          errorSplitQuantity:"",
          errorColorSplitQuantity:{color:'orange'},
          valueSplitID:"",
          valueSplitQuantity:"",
          buttonDisabled: true
    };
  }

  componentWillMount() {
    this._updateVariables(true)
  }

  componentDidUpdate() {
    this._updateVariables(false);

  }

  _updateVariables(initial) {
    console.log('_updateVariables Method');

    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);


    if (initial == true || this.state.currentPeriode != activePeriodID) {
      this.state.auftraege = []

      if (currentInputXML) {

          if(currentInputXML.inputDataObject.auftragsplanungHerren){
              let objHerren = currentInputXML.inputDataObject.auftragsplanungHerren.AU
              Object.keys(objHerren).forEach(function(key){
                  console.log(key, objHerren[key]);
                  if(objHerren[key] > 0){
                    var tmpidHerren = "H"+key
                    this.state.auftraege.push({id:tmpidHerren, article:key, quantity: objHerren[key], bikeType:"Herren"})
                    this.state.errorTextList[tmpidHerren] = ''
                  }
              }.bind(this));
            }

            if(currentInputXML.inputDataObject.auftragsplanungDamen){
              let objDamen = currentInputXML.inputDataObject.auftragsplanungDamen.AU
              Object.keys(objDamen).forEach(function(key){
                  console.log(key, objDamen[key]);
                  if(objDamen[key] > 0){
                    var tmpidDamen = "D"+key
                    this.state.auftraege.push({id:tmpidDamen, article:key, quantity: objDamen[key], bikeType:"Damen"})
                    this.state.errorTextList[tmpidDamen] = ''
                  }
              }.bind(this));
            }

            if(currentInputXML.inputDataObject.auftragsplanungKinder){
              let objKinder = currentInputXML.inputDataObject.auftragsplanungKinder.AU
              Object.keys(objKinder).forEach(function(key){
                  console.log(key, objKinder[key]);
                  if(objKinder[key] > 0){
                    var tmpidKinder = "K"+key
                    this.state.auftraege.push({id:tmpidKinder, article:key, quantity: objKinder[key], bikeType:"Kinder"})
                    this.state.errorTextList[tmpidKinder] = ''
                  }
              }.bind(this));
            }
            console.log(this.state.auftraege)
            console.log(this.state.errorTextList)

      } else {

      }
      this.setState({
        currentPeriode: activePeriodID
      });
    }

  }
  _handleSplitArticleIDChange(e){
    var errorSplitIDlol = "";
    var errorSplitIdDisabled = true
    if(this.state.auftraege.find(auftrag => auftrag.article == e.target.value)){

      if(e.target.value.substring(1) == "S"){
        errorSplitIDlol = "Error"
      }else{
        console.log("SPLIT ID GEFUNDEN")
        errorSplitIdDisabled = false
      }
      
    } else{
      errorSplitIDlol = this.props.internationalReducer.activeLanguage.strings.ExportSplitFalscheId
    }

    this.setState({
        buttonDisabled: errorSplitIdDisabled,
        valueSplitID: e.target.value,
        errorColorSplitId: {color:'red'},
        errorSplitID: errorSplitIDlol
    });

    // let value = e.target.value;
    // let errorSplitIDlol = this.state.errorSplitID

    // let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    // if(isNumeric){
    //   errorSplitIDlol = ''
    //   this.setState({
    //     errorColorSplitId: {color:'orange'},
    //     errorSplitID: errorSplitIDlol,
    //     valueSplitID: parseInt(value)
    //   });

    // }else{
    //   var lolvalue = this.state.valueSplitID
    //   if(value == ""){
    //     lolvalue = "";
    //   }

    //   errorSplitIDlol = this.props.internationalReducer.activeLanguage.strings.NumericError
    //   this.setState({
    //     errorColorSplitId: {color:'orange'},
    //     errorSplitID: errorSplitIDlol,
    //     valueSplitID: lolvalue
    //   });
    // }

  }

  _handleSplitQuantityChange(e){

    console.log(e.target.value)
    let value = e.target.value;
    let errorSplitQuantitylol = this.state.errorSplitQuantity

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){
      errorSplitQuantitylol = ''
      this.setState({
        errorColorSplitQuantity: {color:'orange'},
        errorSplitQuantity: errorSplitQuantitylol,
        valueSplitQuantity: parseInt(value)
      });

    }else{
      var lolvalue = this.state.valueSplitQuantity
      if(value == ""){
        lolvalue = "";
      }

      errorSplitQuantitylol = this.props.internationalReducer.activeLanguage.strings.NumericError
      this.setState({
        errorColorSplitQuantity: {color:'orange'},
        errorSplitQuantity: errorSplitQuantitylol,
        valueSplitQuantity: lolvalue
      });
    }
  }

  _addAuftragButton(e){
    console.log("ButtonClicked")

    console.log("this.refs.valueSplitIDREF.getValue()", this.refs.valueSplitIDREF.getValue())
    console.log("this.refs.valueSplitQuantityREF.getValue()",this.refs.valueSplitQuantityREF.getValue())

    var errorSplitQuantitylol = ""


    if(this.state.auftraege.find(auftrag => auftrag.article == this.refs.valueSplitIDREF.getValue())){
      console.log("SPLIT ID GEFUNDEN")

      var amountGesamt = 0;
      if(this.refs.valueSplitQuantityREF.getValue() == "" || this.refs.valueSplitQuantityREF.getValue() <= 0){
        errorSplitQuantitylol = this.props.internationalReducer.activeLanguage.strings.ExportSplitKleinerNul

        this.setState({
          errorColorSplitQuantity: {color:'red'},
          errorSplitQuantity: errorSplitQuantitylol
        });

      }else{
          this.state.auftraege.forEach(function(auftrag){
            if(auftrag.article == this.refs.valueSplitIDREF.getValue()){
              amountGesamt = amountGesamt + auftrag.quantity
            }
          }.bind(this))

          console.log("amountGesamt", amountGesamt)
          console.log(parseInt(this.refs.valueSplitQuantityREF.getValue()))

          console.log(amountGesamt < parseInt(this.refs.valueSplitQuantityREF.getValue()))

          if(amountGesamt < parseInt(this.refs.valueSplitQuantityREF.getValue())){
            errorSplitQuantitylol = this.props.internationalReducer.activeLanguage.strings.ExportSplitKleinerAlsGesamt

            this.setState({
              errorColorSplitQuantity: {color:'red'},
              errorSplitQuantity: errorSplitQuantitylol
            });
          }else{
              console.log("HAT FUNKTIONIERT")
              var tmpid = "S1" + this.refs.valueSplitIDREF.getValue()
              var error = false;

              var lolanz = 1;
              this.state.auftraege.forEach(function(auftrag){
                  console.log("auftrag.article",auftrag.article)
                  console.log("this.refs.valueSplitIDREF.getValue()",this.refs.valueSplitIDREF.getValue())
                  console.log(auftrag.article == this.refs.valueSplitIDREF.getValue())
                  if(auftrag.article == this.refs.valueSplitIDREF.getValue()){

                    console.log(auftrag.id.charAt(0))
                    if(auftrag.id.charAt(0) == "S"){

                     lolanz = lolanz + 1

                    }
                  } 
              }.bind(this))

              errorSplitQuantitylol = this.props.internationalReducer.activeLanguage.strings.ExportSplitMax
              console.log("SplitMenge", lolanz)
              if(lolanz > 9){
                this.setState({
                      errorColorSplitQuantity: {color:'red'},
                      errorSplitQuantity: errorSplitQuantitylol
                });
              }else{

                var tmpid = "S"+ lolanz + this.refs.valueSplitIDREF.getValue()

                var newListlol = this.state.auftraege
                newListlol.push({id:tmpid, article:this.refs.valueSplitIDREF.getValue(), quantity: this.refs.valueSplitQuantityREF.getValue(), bikeType: "Split"})

                var newErrorlol = this.state.errorTextList
                newErrorlol[tmpid] = ''

                this.setState({
                  errorSplitID:"",
                  errorColorSplitId:{color:'orange'},
                  errorSplitQuantity:"",
                  errorColorSplitQuantity:{color:'orange'},
                  valueSplitID:"",
                  valueSplitQuantity:"",
                  buttonDisabled: true,
                  auftraege: newListlol,
                  errorTextList: newErrorlol
                });
              }
          }
      }
      
    } 
    

  }

  _handleAuftragMengeChange(e){
    console.log("menge geändert")

    let errorTextListlol = this.state.errorTextList
    let value = e.target.value;

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if(isNumeric){

      var newList = this.state.auftraege.map(item => item.id == e.target.id ?
                                          Object.assign({}, item, { quantity: parseInt(value) })  :  item); 

      errorTextListlol[e.target.id] = ''

      this.setState({
        errorTextList: errorTextListlol,
        auftraege: newList
      });

    }else{
      errorTextListlol[e.target.id] = this.props.internationalReducer.activeLanguage.strings.NumericError

      var lolvalue = this.state.valueSplitQuantity
      if(value == ""){

        var newList2 = this.state.auftraege.map(item => item.id == e.target.id ?
                                          Object.assign({}, item, { quantity: 0 })  :  item); 

        this.setState({
          errorTextList: errorTextListlol,
          auftraege: newList2
        });
      }else{
        this.setState({
          errorTextList: errorTextListlol
        });
      }

      
      
    }

  }

  _downloadXML() {

    var obj = {
      qualitycontrol: {$: {type: "no", losequantity: "0", delay: "0"}},
      sellwish: {item: []},
      selldirect: {},
      orderlist: {order: []},
      productionlist: {production: []},
      workingtimelist: {workingtime: []}
    };

    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    //sellwish
    if (currentInputXML && currentInputXML.inputDataObject.auftragsplanungHerren) {
      obj.sellwish.item.push({$: {article: "1", quantity: currentInputXML.inputDataObject.auftragsplanungHerren.VR.P1}})
    }
    if (currentInputXML && currentInputXML.inputDataObject.auftragsplanungDamen) {
      obj.sellwish.item.push({$: {article: "2", quantity: currentInputXML.inputDataObject.auftragsplanungDamen.VR.P2}})
    }
    if (currentInputXML && currentInputXML.inputDataObject.auftragsplanungKinder) {
      obj.sellwish.item.push({$: {article: "3", quantity: currentInputXML.inputDataObject.auftragsplanungKinder.VR.P3}})
    }

    //bestellungen
    if (currentInputXML && currentInputXML.inputDataObject.kaufteildisposition) {
      let objectKaufteildispositionMenge = currentInputXML.inputDataObject.kaufteildisposition.BestellungMenge;
      let objectKaufteildispositionArt = currentInputXML.inputDataObject.kaufteildisposition.BestellungArt;

      Object.keys(objectKaufteildispositionMenge).forEach(function(key){
        console.log(key, objectKaufteildispositionMenge[key]);
        if(objectKaufteildispositionMenge[key] > 0){
          let ordermodusBool = objectKaufteildispositionArt[key]
          let ordermodus = 5;
          if(ordermodusBool == true){
            ordermodus = 4
          }

          obj.orderlist.order.push({$: {article:key.substring(1), quantity:objectKaufteildispositionMenge[key], modus: ordermodus}});
        }
      }.bind(this));
    }

    //bestellungen
    if (currentInputXML && currentInputXML.inputDataObject.kapazitaetsplanung) {
      let kapazitaetsplanung = currentInputXML.inputDataObject.kapazitaetsplanung;

      Object.keys(kapazitaetsplanung).forEach(function(key){
        console.log(key, kapazitaetsplanung[key]);
          obj.workingtimelist.workingtime.push({$: {station:key.substring(12), shift:kapazitaetsplanung[key].Schichten, overtime:kapazitaetsplanung[key].Überstunden}});
      }.bind(this));
    }

    //Aufträge
    this.state.auftraege.forEach(function (elementStation){
      if(elementStation.article.charAt(0) == "S"){
        obj.productionlist.production.push({$: {article: elementStation.article.substring(2), quantity: elementStation.quantity}})
      }else{
        obj.productionlist.production.push({$: {article: elementStation.article.substring(1), quantity: elementStation.quantity}})
      }
      

    }.bind(this))

    console.log(obj);

    var builder = new xml2js.Builder({rootName: 'input'});
    var xml = builder.buildObject(obj);


    console.log(xml); // <-- show me the XML

    var url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml);
    var link = this.refs.link;
    link.href = url;

  }

  moveCard(dragIndex, hoverIndex) {
    const dragCard = this.state.auftraege[dragIndex];


    this.setState(update(this.state, {
      auftraege: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {


    return (
      <div className={styles.wrapperdownload}>
        <h1>{this.props.internationalReducer.activeLanguage.strings.TitelExport}</h1>
        
        
        
        

        <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    selectable={this.state.selectable}
                    >

                    <TableHeader adjustForCheckbox={this.state.displayRowCheckbox}
                                 displaySelectAll={this.state.displayRowCheckbox}
                                 enableSelectAll={this.state.enableSelectAll}>
                      <TableRow selectable={this.state.selectable}>
                        <TableHeaderColumn  style={{textAlign: 'center'}}>
                          {this.props.internationalReducer.activeLanguage.strings.ExportSplitHeader}
                        </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={this.state.displayRowCheckbox}>
                      <TableRow>
                        <TableRowColumn> 

                          <TextField 
                            ref="valueSplitIDREF"
                            value={this.state.valueSplitID}
                            errorText={this.state.errorSplitID}
                            errorStyle={ this.state.errorColorSplitId }
                            onChange={this._handleSplitArticleIDChange}
                            floatingLabelText={this.props.internationalReducer.activeLanguage.strings.ExportSplitIDFloating} 
                            hintText={this.props.internationalReducer.activeLanguage.strings.ExportSplitIDHint}/>

                        </TableRowColumn>
                        <TableRowColumn>

                          <TextField 
                            ref="valueSplitQuantityREF"
                            value={this.state.valueSplitQuantity}
                            errorText={this.state.errorSplitQuantity}
                            errorStyle={ this.state.errorColorSplitQuantity }
                            onChange={this._handleSplitQuantityChange}
                            floatingLabelText= {this.props.internationalReducer.activeLanguage.strings.ExportSplitQuantityFloat}
                            hintText={this.props.internationalReducer.activeLanguage.strings.ExportSplitQuantityHint} />

                        </TableRowColumn>
                        <TableRowColumn>
                          <RaisedButton label="Split" primary={true} disabled={this.state.buttonDisabled} onTouchTap={this._addAuftragButton}/>
                        </TableRowColumn>

                      </TableRow>

                    </TableBody>
                  </Table>

                  <h1> </h1>
        <div style={style}>
          {this.state.auftraege.map((auftrag, i) => {
            return (
              <Card key={auftrag.id}
                    index={i}
                    id={auftrag.id}
                    articleId={auftrag.article}
                    menge={auftrag.quantity}
                    handleAuftragMengeChange = {this._handleAuftragMengeChange}
                    errorText={this.state.errorTextList[auftrag.id]}
                    bikeType={auftrag.bikeType}
                    moveCard={this.moveCard}/>
            );
          })}

        </div>
        <h1> </h1>
          <div className={styles.nextButtonWrapper}>
            <a ref="link" href='' className={styles.nextButton} download="input.xml" type="button" onClick={this._downloadXML}>
              {this.props.internationalReducer.activeLanguage.strings.ExportDownloadButton}
            </a>
          </div>
          <h1> </h1>
        
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

export default connect(mapStateToProps, dispatch => ({dispatch}))(Downlaod)
