// components/App.js
 
import React, { PropTypes } from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';
import './Download.module.css';
 
import update from 'react/lib/update';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import xml2js from 'xml2js';
import { Link } from 'react-router';

var RaisedButton = mui.RaisedButton;

const style = {
  textAlign: "center"
};

@DragDropContext(HTML5Backend) class Downlaod extends React.Component {

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this._downloadXML = this._downloadXML.bind(this);
    this._updateVariables = this._updateVariables.bind(this);
    this.state = {
          auftraege:[]
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
                    this.state.auftraege.push({id:"Herren"+key, article:key.substring(1), quantity: objHerren[key]})
                  }
              }.bind(this));
            }

            if(currentInputXML.inputDataObject.auftragsplanungDamen){
              let objDamen = currentInputXML.inputDataObject.auftragsplanungDamen.AU
              Object.keys(objDamen).forEach(function(key){
                  console.log(key, objDamen[key]);
                  if(objDamen[key] > 0){
                    this.state.auftraege.push({id:"Damen"+key, article:key.substring(1), quantity: objDamen[key]})
                  }
              }.bind(this));
            }

            if(currentInputXML.inputDataObject.auftragsplanungKinder){
              let objKinder = currentInputXML.inputDataObject.auftragsplanungKinder.AU
              Object.keys(objKinder).forEach(function(key){
                  console.log(key, objKinder[key]);
                  if(objKinder[key] > 0){
                    this.state.auftraege.push({id:"Kinder"+key, article:key.substring(1), quantity: objKinder[key]})
                  }
              }.bind(this));
            }

      } else {

      }
      this.setState({
        currentPeriode: activePeriodID
      });
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

          obj.orderlist.order.push({$: {article:key, quantity:objectKaufteildispositionMenge[key], modus: ordermodus}});
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
      obj.productionlist.production.push({$: {article: elementStation.article, quantity: elementStation.quantity}})

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
      <div className="wrapperdownload">

        <h1>Export Xml</h1>

        <div style={style}>
          {this.state.auftraege.map((auftrag, i) => {
            return (
              <Card key={auftrag.id}
                    index={i}
                    articleId={auftrag.article}
                    menge={auftrag.quantity}
                    moveCard={this.moveCard}/>
            );
          })}

        </div>

        <a ref="link" href='' download="input.xml" type="button" onClick={this._downloadXML}>
          Download
        </a>
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
