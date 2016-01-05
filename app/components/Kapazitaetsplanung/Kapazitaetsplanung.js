import React from 'react';
import styles from './Kapazitaetsplanung.module.css';
import mui from 'material-ui';
import { connect } from 'react-redux';
import { setKapazitaetsplanungInputXML, resetKapazitaetsplanungInputXML } from '../../actions/PPSToolActions';
import { Link } from 'react-router';

const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');


const TextField = require('material-ui/lib/text-field');


var Dialog = mui.Dialog
  , Toggle = mui.Toggle
  , RaisedButton = mui.RaisedButton
  , Snackbar = mui.Snackbar;


class Kapazitaetsplanung extends React.Component {
  //this._handleClick = this._handleClick.bind(this);
  constructor() {
    super();
    this._handleDetailModeChange = this._handleDetailModeChange.bind(this);
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
    this._handleSchichtenChange = this._handleSchichtenChange.bind(this);
    this._handleStundenChange = this._handleStundenChange.bind(this);
    this._handleSaveButtonClick = this._handleSaveButtonClick.bind(this);
    this._updateLocalStorage = this._updateLocalStorage.bind(this);
    this._getWaitingslistworkstation = this._getWaitingslistworkstation.bind(this);


    this.state = {
      modal: true,
      openDialogStandardActions: false,
      dialogTitle: "Dialog",
      dialogText: "DialogText",
      displayRowCheckbox: false,
      xmlValid: false,
      snackBarautoHideDuration: 3000,
      snackBarmessage: 'Save completed!',
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      height: '1000px',
      showExpertMode: false,
      detailMode: false,
      currentPeriode: '',


      Auftragsmenge: {
        E4: 50,
        E5: 0,
        E6: 100,
        E7: 0,
        E8: 0,
        E9: 100,
        E10: 50,
        E11: 0,
        E12: 100,
        E13: 0,
        E14: 0,
        E15: 100,
        HE16: 250,
        DE16: 250,
        KE16: 250,
        E16: 250,
        HE17: 250,
        DE17: 250,
        KE17: 250,
        E17: 250,
        E18: 0,
        E19: 0,
        E20: 100,
        HE26: 300,
        DE26: 300,
        KE26: 300,
        E26: 250,
        E49: 50,
        E54: 0,
        E29: 150,
        E50: 100,
        E55: 100,
        E30: 100,
        E51: 100,
        E56: 100,
        E31: 100,
        P1: 100,
        P2: 100,
        P3: 150
      },

      Arbeitsplatz1: {
        E49: 0,
        E54: 0,
        E29: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 60,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz2: {
        E50: 0,
        E55: 0,
        E30: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 80,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz3: {
        E51: 0,
        E56: 0,
        E31: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 60,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz4: {
        P1: 0,
        P2: 0,
        P3: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 80,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz6: {
        E16: 0,
        E18: 0,
        E19: 0,
        E20: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 60,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz7: {
        E10: 0,
        E11: 0,
        E12: 0,
        E13: 0,
        E14: 0,
        E15: 0,
        E18: 0,
        E19: 0,
        E20: 0,
        E26: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 200,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz8: {
        E10: 0,
        E11: 0,
        E12: 0,
        E13: 0,
        E14: 0,
        E15: 0,
        E18: 0,
        E19: 0,
        E20: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 135,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz9: {
        E10: 0,
        E11: 0,
        E12: 0,
        E13: 0,
        E14: 0,
        E15: 0,
        E18: 0,
        E19: 0,
        E20: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 135,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz10: {
        E4: 0,
        E5: 0,
        E6: 0,
        E7: 0,
        E8: 0,
        E9: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 120,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz11: {
        E10: 0,
        E11: 0,
        E12: 0,
        E13: 0,
        E14: 0,
        E15: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 120,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz12: {
        E10: 0,
        E11: 0,
        E12: 0,
        E13: 0,
        E14: 0,
        E15: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 0,
        RüstVorgänge: 0,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz13: {
        E10: 0,
        E11: 0,
        E12: 0,
        E13: 0,
        E14: 0,
        E15: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 0,
        RüstVorgänge: 0,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz14: {
        E16: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 0,
        RüstVorgänge: 0,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      Arbeitsplatz15: {
        E17: 0,
        E26: 0,
        Kapazitätsbedarf: 0,
        RüstzeitVorgang: 30,
        RüstVorgänge: 1,
        RüstzeitGesamt: 0,
        Warteschlange: 0,
        Gesamtkapazitätbedarf: 0,
        Schichten: 0,
        Überstunden: 0
      },

      errorTextSchicht: {
        Arbeitsplatz1: '',
        Arbeitsplatz2: '',
        Arbeitsplatz3: '',
        Arbeitsplatz4: '',
        Arbeitsplatz6: '',
        Arbeitsplatz7: '',
        Arbeitsplatz8: '',
        Arbeitsplatz9: '',
        Arbeitsplatz10: '',
        Arbeitsplatz11: '',
        Arbeitsplatz12: '',
        Arbeitsplatz13: '',
        Arbeitsplatz14: '',
        Arbeitsplatz15: ''
      },
      errorTextStunden: {
        Arbeitsplatz1: '',
        Arbeitsplatz2: '',
        Arbeitsplatz3: '',
        Arbeitsplatz4: '',
        Arbeitsplatz6: '',
        Arbeitsplatz7: '',
        Arbeitsplatz8: '',
        Arbeitsplatz9: '',
        Arbeitsplatz10: '',
        Arbeitsplatz11: '',
        Arbeitsplatz12: '',
        Arbeitsplatz13: '',
        Arbeitsplatz14: '',
        Arbeitsplatz15: ''
      }
    };

  }

  componentWillMount() {
    console.log('componentWillMount')
    this._updateVariables(true)
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    this._updateVariables(false);

  }

  _updateVariables(initial) {
    console.log('_updateVariables Method');

    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    if (initial == true || this.state.currentPeriode != activePeriodID) {

      if (currentInputXML) {
        console.log('currentInputXML')

        if (currentInputXML && currentInputXML.inputDataObject.kaufteildisposition) {
          console.log('currentInputXML && currentInputXML.inputDataObject.kaufteildisposition')

          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz1) {
            this.state.Arbeitsplatz1.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz1.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz2) {
            this.state.Arbeitsplatz2.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz2.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz3) {
            this.state.Arbeitsplatz3.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz3.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz4) {
            this.state.Arbeitsplatz4.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz4.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz6) {
            this.state.Arbeitsplatz6.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz6.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz7) {
            this.state.Arbeitsplatz7.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz7.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz8) {
            this.state.Arbeitsplatz8.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz8.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz9) {
            this.state.Arbeitsplatz9.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz9.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz10) {
            this.state.Arbeitsplatz10.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz10.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz11) {
            this.state.Arbeitsplatz11.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz11.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz12) {
            this.state.Arbeitsplatz12.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz12.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz13) {
            this.state.Arbeitsplatz13.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz13.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz14) {
            this.state.Arbeitsplatz14.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz14.Schichten;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz15) {
            this.state.Arbeitsplatz15.Schichten = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz15.Schichten;
          }

          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz1) {
            this.state.Arbeitsplatz1.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz1.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz2) {
            this.state.Arbeitsplatz2.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz2.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz3) {
            this.state.Arbeitsplatz3.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz3.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz4) {
            this.state.Arbeitsplatz4.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz4.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz6) {
            this.state.Arbeitsplatz6.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz6.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz7) {
            this.state.Arbeitsplatz7.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz7.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz8) {
            this.state.Arbeitsplatz8.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz8.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz9) {
            this.state.Arbeitsplatz9.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz9.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz10) {
            this.state.Arbeitsplatz10.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz10.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz11) {
            this.state.Arbeitsplatz11.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz11.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz12) {
            this.state.Arbeitsplatz12.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz12.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz13) {
            this.state.Arbeitsplatz13.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz13.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz14) {
            this.state.Arbeitsplatz14.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz14.Überstunden;
          }
          if (currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz15) {
            this.state.Arbeitsplatz15.Überstunden = currentInputXML.inputDataObject.kaufteildisposition.Arbeitsplatz15.Überstunden;
          }

          this.state.resetButtonDisabled = false

        } if(currentInputXML.inputDataObject) {
          console.log('schauen ob Herren Damen Kinder vorhanden')
          this.state.resetButtonDisabled = true

          if (currentInputXML.inputDataObject.auftragsplanungHerren) {
            this.state.Auftragsmenge.P1 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.P1;
            this.state.Auftragsmenge.HE26 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E26;
            this.state.Auftragsmenge.E51 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E51;
            this.state.Auftragsmenge.HE16 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E16;
            this.state.Auftragsmenge.HE17 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E17;
            this.state.Auftragsmenge.E50 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E50;
            this.state.Auftragsmenge.E4 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E4;
            this.state.Auftragsmenge.E10 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E10;
            this.state.Auftragsmenge.E49 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E49;
            this.state.Auftragsmenge.E7 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E7;
            this.state.Auftragsmenge.E13 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E13;
            this.state.Auftragsmenge.E18 = currentInputXML.inputDataObject.auftragsplanungHerren.AU.E18;
          } else {
            this.state.Auftragsmenge.P1 = 0;
            this.state.Auftragsmenge.HE26 = 0;
            this.state.Auftragsmenge.E51 = 0;
            this.state.Auftragsmenge.HE16 = 0;
            this.state.Auftragsmenge.HE17 = 0;
            this.state.Auftragsmenge.E50 = 0;
            this.state.Auftragsmenge.E4 = 0;
            this.state.Auftragsmenge.E10 = 0;
            this.state.Auftragsmenge.E49 = 0;
            this.state.Auftragsmenge.E7 = 0;
            this.state.Auftragsmenge.E13 = 0;
            this.state.Auftragsmenge.E18 = 0;

          }
          if (currentInputXML.inputDataObject.auftragsplanungDamen) {
            console.log('werden die Damen richtig abgefragt?')
            this.state.Auftragsmenge.P2 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.P2;
            this.state.Auftragsmenge.DE26 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E26;
            this.state.Auftragsmenge.E56 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E56;
            this.state.Auftragsmenge.DE16 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E16;
            this.state.Auftragsmenge.DE17 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E17;
            this.state.Auftragsmenge.E55 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E55;
            this.state.Auftragsmenge.E5 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E5;
            this.state.Auftragsmenge.E11 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E11;
            this.state.Auftragsmenge.E54 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E54;
            this.state.Auftragsmenge.E8 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E8;
            this.state.Auftragsmenge.E14 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E14;
            this.state.Auftragsmenge.E19 = currentInputXML.inputDataObject.auftragsplanungDamen.AU.E19;

          } else {
            this.state.Auftragsmenge.P2 = 0;
            this.state.Auftragsmenge.DE26 = 0;
            this.state.Auftragsmenge.E56 = 0;
            this.state.Auftragsmenge.DE16 = 0;
            this.state.Auftragsmenge.DE17 = 0;
            this.state.Auftragsmenge.E55 = 0;
            this.state.Auftragsmenge.E5 = 0;
            this.state.Auftragsmenge.E11 = 0;
            this.state.Auftragsmenge.E54 = 0;
            this.state.Auftragsmenge.E8 = 0;
            this.state.Auftragsmenge.E14 = 0;
            this.state.Auftragsmenge.E19 = 0;
          }

          if (currentInputXML.inputDataObject.auftragsplanungKinder) {

            this.state.Auftragsmenge.P3 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.P3;
            this.state.Auftragsmenge.KE26 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E26;
            this.state.Auftragsmenge.E31 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E31;
            this.state.Auftragsmenge.KE16 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E16;
            this.state.Auftragsmenge.KE17 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E17;
            this.state.Auftragsmenge.E30 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E30;
            this.state.Auftragsmenge.E6 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E6;
            this.state.Auftragsmenge.E12 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E12;
            this.state.Auftragsmenge.E29 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E29;
            this.state.Auftragsmenge.E9 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E9;
            this.state.Auftragsmenge.E15 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E15;
            this.state.Auftragsmenge.E20 = currentInputXML.inputDataObject.auftragsplanungKinder.AU.E20;

          } else {
            this.state.Auftragsmenge.P3 = 0;
            this.state.Auftragsmenge.KE26 = 0;
            this.state.Auftragsmenge.E31 = 0;
            this.state.Auftragsmenge.KE16 = 0;
            this.state.Auftragsmenge.KE17 = 0;
            this.state.Auftragsmenge.E30 = 0;
            this.state.Auftragsmenge.E6 = 0;
            this.state.Auftragsmenge.E12 = 0;
            this.state.Auftragsmenge.E29 = 0;
            this.state.Auftragsmenge.E9 = 0;
            this.state.Auftragsmenge.E15 = 0;
            this.state.Auftragsmenge.E20 = 0;
          }
          if (currentInputXML.inputDataObject.kapazitaetsplanung) {
            console.log('currentInputXML.inputDataObject.kapazitaetsplanung')
            this.state.Arbeitsplatz1.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz1.Schichten;
            this.state.Arbeitsplatz2.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz2.Schichten;
            this.state.Arbeitsplatz3.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz3.Schichten;
            this.state.Arbeitsplatz4.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz4.Schichten;
            this.state.Arbeitsplatz6.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz6.Schichten;
            this.state.Arbeitsplatz7.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz7.Schichten;
            this.state.Arbeitsplatz8.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz8.Schichten;
            this.state.Arbeitsplatz9.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz9.Schichten;
            this.state.Arbeitsplatz10.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz10.Schichten;
            this.state.Arbeitsplatz11.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz11.Schichten;
            this.state.Arbeitsplatz12.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz12.Schichten;
            this.state.Arbeitsplatz13.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz13.Schichten;
            this.state.Arbeitsplatz14.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz14.Schichten;
            this.state.Arbeitsplatz15.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz15.Schichten;


            this.state.Arbeitsplatz1.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz1.Überstunden;
            this.state.Arbeitsplatz2.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz2.Überstunden;
            this.state.Arbeitsplatz3.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz3.Überstunden;
            this.state.Arbeitsplatz4.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz4.Überstunden;
            this.state.Arbeitsplatz6.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz6.Überstunden;
            this.state.Arbeitsplatz7.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz7.Überstunden;
            this.state.Arbeitsplatz8.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz8.Überstunden;
            this.state.Arbeitsplatz9.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz9.Überstunden;
            this.state.Arbeitsplatz10.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz10.Überstunden;
            this.state.Arbeitsplatz11.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz11.Überstunden;
            this.state.Arbeitsplatz12.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz12.Überstunden;
            this.state.Arbeitsplatz13.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz13.Überstunden;
            this.state.Arbeitsplatz14.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz14.Überstunden;
            this.state.Arbeitsplatz15.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz15.Überstunden;
            this.state.resetButtonDisabled = true

          } else {
            console.log('Werte müssen berechnet werden')
            //1
            console.log('Bedarf ' + this.state.Arbeitsplatz1.Gesamtkapazitätbedarf)
            if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 2400) {
              console.log('1 Schicht')
              this.state.Arbeitsplatz1.Schichten = 1
            } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 3599) {
              console.log('1 Schicht mit ÜS')
              this.state.Arbeitsplatz1.Schichten = 1
              this.state.Arbeitsplatz1.Überstunden = (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 4800) {
              console.log('2 Schicht')
              this.state.Arbeitsplatz1.Schichten = 2
            } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 6000) {
              console.log('2 Schicht mit ÜS')
              this.state.Arbeitsplatz1.Schichten = 2
              this.state.Arbeitsplatz1.Überstunden = (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 7200) {
              console.log('3 Schicht')
              this.state.Arbeitsplatz1.Schichten = 3
            } else {
              console.log('Fehler')
              //Fehlermeldung
            }

            //2
            if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz2.Schichten = 1
            } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz2.Schichten = 1
              this.state.Arbeitsplatz2.Überstunden = (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz2.Schichten = 2
            } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz2.Schichten = 2
              this.state.Arbeitsplatz2.Überstunden = (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz2.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //3
            if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz3.Schichten = 1
            } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz3.Schichten = 1
              this.state.Arbeitsplatz3.Überstunden = (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz3.Schichten = 2
            } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz3.Schichten = 2
              this.state.Arbeitsplatz3.Überstunden = (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz3.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //4
            if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz4.Schichten = 1
            } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz4.Schichten = 1
              this.state.Arbeitsplatz4.Überstunden = (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz4.Schichten = 2
            } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz4.Schichten = 2
              this.state.Arbeitsplatz4.Überstunden = (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz4.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //6
            if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz6.Schichten = 1
            } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz6.Schichten = 1
              this.state.Arbeitsplatz6.Überstunden = (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz6.Schichten = 2
            } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz6.Schichten = 2
              this.state.Arbeitsplatz6.Überstunden = (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz6.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //7
            if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz7.Schichten = 1
            } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz7.Schichten = 1
              this.state.Arbeitsplatz7.Überstunden = (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz7.Schichten = 2
            } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz7.Schichten = 2
              this.state.Arbeitsplatz7.Überstunden = (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz7.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //8
            if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz8.Schichten = 1
            } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz8.Schichten = 1
              this.state.Arbeitsplatz8.Überstunden = (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz8.Schichten = 2
            } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz8.Schichten = 2
              this.state.Arbeitsplatz8.Überstunden = (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz8.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //9
            if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz9.Schichten = 1
            } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz9.Schichten = 1
              this.state.Arbeitsplatz9.Überstunden = (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz9.Schichten = 2
            } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz9.Schichten = 2
              this.state.Arbeitsplatz9.Überstunden = (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz9.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //10
            if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz10.Schichten = 1
            } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz10.Schichten = 1
              this.state.Arbeitsplatz10.Überstunden = (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz10.Schichten = 2
            } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz10.Schichten = 2
              this.state.Arbeitsplatz10.Überstunden = (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz10.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //11
            if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz11.Schichten = 1
            } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz11.Schichten = 1
              this.state.Arbeitsplatz11.Überstunden = (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz11.Schichten = 2
            } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz11.Schichten = 2
              this.state.Arbeitsplatz11.Überstunden = (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz11.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //12
            if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz12.Schichten = 1
            } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz12.Schichten = 1
              this.state.Arbeitsplatz12.Überstunden = (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz12.Schichten = 2
            } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz12.Schichten = 2
              this.state.Arbeitsplatz12.Überstunden = (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz12.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //13
            if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz13.Schichten = 1
            } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz13.Schichten = 1
              this.state.Arbeitsplatz13.Überstunden = (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz13.Schichten = 2
            } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz13.Schichten = 2
              this.state.Arbeitsplatz13.Überstunden = (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz13.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //14
            if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz14.Schichten = 1
            } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz14.Schichten = 1
              this.state.Arbeitsplatz14.Überstunden = (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz14.Schichten = 2
            } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz14.Schichten = 2
              this.state.Arbeitsplatz14.Überstunden = (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz14.Schichten = 3
            } else {
              //Fehlermeldung
            }

            //15
            if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 2400) {
              this.state.Arbeitsplatz15.Schichten = 1
            } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 3599) {
              this.state.Arbeitsplatz15.Schichten = 1
              this.state.Arbeitsplatz15.Überstunden = (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf - 2400) / 5;
            } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 4800) {
              this.state.Arbeitsplatz15.Schichten = 2
            } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 6000) {
              this.state.Arbeitsplatz15.Schichten = 2
              this.state.Arbeitsplatz15.Überstunden = (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf - 4800) / 5;
            } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 7200) {
              this.state.Arbeitsplatz15.Schichten = 3
            } else {
              //Fehlermeldung
            }
          }


          this.state.resetButtonDisabled = false

        }


      } else {
        console.log('alles reseten')

        //Herren
        this.state.Auftragsmenge.P1 = 0;
        this.state.Auftragsmenge.HE26 = 0;
        this.state.Auftragsmenge.E51 = 0;
        this.state.Auftragsmenge.HE16 = 0;
        this.state.Auftragsmenge.HE17 = 0;
        this.state.Auftragsmenge.E50 = 0;
        this.state.Auftragsmenge.E4 = 0;
        this.state.Auftragsmenge.E10 = 0;
        this.state.Auftragsmenge.E49 = 0;
        this.state.Auftragsmenge.E7 = 0;
        this.state.Auftragsmenge.E13 = 0;
        this.state.Auftragsmenge.E18 = 0;
        //Damen
        this.state.Auftragsmenge.P2 = 0;
        this.state.Auftragsmenge.DE26 = 0;
        this.state.Auftragsmenge.E56 = 0;
        this.state.Auftragsmenge.DE16 = 0;
        this.state.Auftragsmenge.DE17 = 0;
        this.state.Auftragsmenge.E55 = 0;
        this.state.Auftragsmenge.E5 = 0;
        this.state.Auftragsmenge.E11 = 0;
        this.state.Auftragsmenge.E54 = 0;
        this.state.Auftragsmenge.E8 = 0;
        this.state.Auftragsmenge.E14 = 0;
        this.state.Auftragsmenge.E19 = 0;
        //Kinder
        this.state.Auftragsmenge.P3 = 0;
        this.state.Auftragsmenge.KE26 = 0;
        this.state.Auftragsmenge.E31 = 0;
        this.state.Auftragsmenge.KE16 = 0;
        this.state.Auftragsmenge.KE17 = 0;
        this.state.Auftragsmenge.E30 = 0;
        this.state.Auftragsmenge.E6 = 0;
        this.state.Auftragsmenge.E12 = 0;
        this.state.Auftragsmenge.E29 = 0;
        this.state.Auftragsmenge.E9 = 0;
        this.state.Auftragsmenge.E15 = 0;
        this.state.Auftragsmenge.E20 = 0;

        this.state.resetButtonDisabled = true
      }

      this.setState({

        currentPeriode: activePeriodID
      });
      console.log('current Periode setzen')


    }

    console.log('rechnen')


    this.state.Auftragsmenge.E16 = this.state.Auftragsmenge.KE16 + this.state.Auftragsmenge.HE16 + this.state.Auftragsmenge.DE16;
    this.state.Auftragsmenge.E17 = this.state.Auftragsmenge.KE17 + this.state.Auftragsmenge.HE17 + this.state.Auftragsmenge.DE17;
    this.state.Auftragsmenge.E26 = this.state.Auftragsmenge.KE26 + this.state.Auftragsmenge.HE26 + this.state.Auftragsmenge.DE26;

    this.state.Arbeitsplatz1.E49 = 6 * this.state.Auftragsmenge.E49;
    this.state.Arbeitsplatz1.E54 = 6 * this.state.Auftragsmenge.E54;
    this.state.Arbeitsplatz1.E29 = 6 * this.state.Auftragsmenge.E29;

    this.state.Arbeitsplatz2.E50 = 5 * this.state.Auftragsmenge.E50;
    this.state.Arbeitsplatz2.E55 = 5 * this.state.Auftragsmenge.E55;
    this.state.Arbeitsplatz2.E30 = 5 * this.state.Auftragsmenge.E30;

    this.state.Arbeitsplatz3.E51 = 5 * this.state.Auftragsmenge.E51;
    this.state.Arbeitsplatz3.E56 = 6 * this.state.Auftragsmenge.E56;
    this.state.Arbeitsplatz3.E31 = 6 * this.state.Auftragsmenge.E31;

    this.state.Arbeitsplatz4.P1 = 6 * this.state.Auftragsmenge.P1;
    this.state.Arbeitsplatz4.P2 = 7 * this.state.Auftragsmenge.P2;
    this.state.Arbeitsplatz4.P3 = 7 * this.state.Auftragsmenge.P3;

    this.state.Arbeitsplatz6.E16 = 2 * this.state.Auftragsmenge.E16;
    this.state.Arbeitsplatz6.E18 = 3 * this.state.Auftragsmenge.E18;
    this.state.Arbeitsplatz6.E19 = 3 * this.state.Auftragsmenge.E19;
    this.state.Arbeitsplatz6.E20 = 3 * this.state.Auftragsmenge.E20;

    this.state.Arbeitsplatz7.E10 = 2 * this.state.Auftragsmenge.E10;
    this.state.Arbeitsplatz7.E11 = 2 * this.state.Auftragsmenge.E11;
    this.state.Arbeitsplatz7.E12 = 2 * this.state.Auftragsmenge.E12;
    this.state.Arbeitsplatz7.E13 = 2 * this.state.Auftragsmenge.E13;
    this.state.Arbeitsplatz7.E14 = 2 * this.state.Auftragsmenge.E14;
    this.state.Arbeitsplatz7.E15 = 2 * this.state.Auftragsmenge.E15;
    this.state.Arbeitsplatz7.E18 = 2 * this.state.Auftragsmenge.E18;
    this.state.Arbeitsplatz7.E19 = 2 * this.state.Auftragsmenge.E19;
    this.state.Arbeitsplatz7.E20 = 2 * this.state.Auftragsmenge.E20;
    this.state.Arbeitsplatz7.E26 = 2 * this.state.Auftragsmenge.E26;

    this.state.Arbeitsplatz8.E10 = this.state.Auftragsmenge.E10;
    this.state.Arbeitsplatz8.E11 = 2 * this.state.Auftragsmenge.E11;
    this.state.Arbeitsplatz8.E12 = 2 * this.state.Auftragsmenge.E12;
    this.state.Arbeitsplatz8.E13 = this.state.Auftragsmenge.E13;
    this.state.Arbeitsplatz8.E14 = 2 * this.state.Auftragsmenge.E14;
    this.state.Arbeitsplatz8.E15 = 2 * this.state.Auftragsmenge.E15;
    this.state.Arbeitsplatz8.E18 = 3 * this.state.Auftragsmenge.E18;
    this.state.Arbeitsplatz8.E19 = 3 * this.state.Auftragsmenge.E19;
    this.state.Arbeitsplatz8.E20 = 3 * this.state.Auftragsmenge.E20;

    this.state.Arbeitsplatz9.E10 = 3 * this.state.Auftragsmenge.E10;
    this.state.Arbeitsplatz9.E11 = 3 * this.state.Auftragsmenge.E11;
    this.state.Arbeitsplatz9.E12 = 3 * this.state.Auftragsmenge.E12;
    this.state.Arbeitsplatz9.E13 = 3 * this.state.Auftragsmenge.E13;
    this.state.Arbeitsplatz9.E14 = 3 * this.state.Auftragsmenge.E14;
    this.state.Arbeitsplatz9.E15 = 3 * this.state.Auftragsmenge.E15;
    this.state.Arbeitsplatz9.E18 = 2 * this.state.Auftragsmenge.E18;
    this.state.Arbeitsplatz9.E19 = 2 * this.state.Auftragsmenge.E19;
    this.state.Arbeitsplatz9.E20 = 2 * this.state.Auftragsmenge.E20;

    this.state.Arbeitsplatz10.E4 = 4 * this.state.Auftragsmenge.E4;
    this.state.Arbeitsplatz10.E5 = 4 * this.state.Auftragsmenge.E5;
    this.state.Arbeitsplatz10.E6 = 4 * this.state.Auftragsmenge.E6;
    this.state.Arbeitsplatz10.E7 = 4 * this.state.Auftragsmenge.E7;
    this.state.Arbeitsplatz10.E8 = 4 * this.state.Auftragsmenge.E8;
    this.state.Arbeitsplatz10.E9 = 4 * this.state.Auftragsmenge.E9;

    this.state.Arbeitsplatz11.E4 = 3 * this.state.Auftragsmenge.E4;
    this.state.Arbeitsplatz11.E5 = 3 * this.state.Auftragsmenge.E5;
    this.state.Arbeitsplatz11.E6 = 3 * this.state.Auftragsmenge.E6;
    this.state.Arbeitsplatz11.E7 = 3 * this.state.Auftragsmenge.E7;
    this.state.Arbeitsplatz11.E8 = 3 * this.state.Auftragsmenge.E8;
    this.state.Arbeitsplatz11.E9 = 3 * this.state.Auftragsmenge.E9;

    this.state.Arbeitsplatz12.E10 = 3 * this.state.Auftragsmenge.E10;
    this.state.Arbeitsplatz12.E11 = 3 * this.state.Auftragsmenge.E11;
    this.state.Arbeitsplatz12.E12 = 3 * this.state.Auftragsmenge.E12;
    this.state.Arbeitsplatz12.E13 = 3 * this.state.Auftragsmenge.E13;
    this.state.Arbeitsplatz12.E14 = 3 * this.state.Auftragsmenge.E14;
    this.state.Arbeitsplatz12.E15 = 3 * this.state.Auftragsmenge.E15;

    this.state.Arbeitsplatz13.E10 = 2 * this.state.Auftragsmenge.E10;
    this.state.Arbeitsplatz13.E11 = 2 * this.state.Auftragsmenge.E11;
    this.state.Arbeitsplatz13.E12 = 2 * this.state.Auftragsmenge.E12;
    this.state.Arbeitsplatz13.E13 = 2 * this.state.Auftragsmenge.E13;
    this.state.Arbeitsplatz13.E14 = 2 * this.state.Auftragsmenge.E14;
    this.state.Arbeitsplatz13.E15 = 2 * this.state.Auftragsmenge.E15;

    this.state.Arbeitsplatz14.E16 = 3 * this.state.Auftragsmenge.E16;

    this.state.Arbeitsplatz15.E17 = 3 * this.state.Auftragsmenge.E17;
    this.state.Arbeitsplatz15.E26 = 3 * this.state.Auftragsmenge.E26;

    this.state.Arbeitsplatz1.Kapazitätsbedarf = this.state.Arbeitsplatz1.E29 + this.state.Arbeitsplatz1.E49 + this.state.Arbeitsplatz1.E54;
    this.state.Arbeitsplatz2.Kapazitätsbedarf = this.state.Arbeitsplatz2.E30 + this.state.Arbeitsplatz2.E50 + this.state.Arbeitsplatz2.E55;
    this.state.Arbeitsplatz3.Kapazitätsbedarf = this.state.Arbeitsplatz3.E31 + this.state.Arbeitsplatz3.E51 + this.state.Arbeitsplatz3.E56;
    this.state.Arbeitsplatz4.Kapazitätsbedarf = this.state.Arbeitsplatz4.P1 + this.state.Arbeitsplatz4.P2 + this.state.Arbeitsplatz4.P3;

    this.state.Arbeitsplatz6.Kapazitätsbedarf = this.state.Arbeitsplatz6.E16 + this.state.Arbeitsplatz6.E18 + this.state.Arbeitsplatz6.E19 + this.state.Arbeitsplatz6.E20;
    this.state.Arbeitsplatz7.Kapazitätsbedarf = this.state.Arbeitsplatz7.E10 + this.state.Arbeitsplatz7.E11 + this.state.Arbeitsplatz7.E12 + this.state.Arbeitsplatz7.E13 + this.state.Arbeitsplatz7.E14 + this.state.Arbeitsplatz7.E15 + this.state.Arbeitsplatz7.E18 + this.state.Arbeitsplatz7.E19 + this.state.Arbeitsplatz7.E20 + this.state.Arbeitsplatz7.E26;
    this.state.Arbeitsplatz8.Kapazitätsbedarf = this.state.Arbeitsplatz8.E10 + this.state.Arbeitsplatz8.E11 + this.state.Arbeitsplatz8.E12 + this.state.Arbeitsplatz8.E13 + this.state.Arbeitsplatz8.E14 + this.state.Arbeitsplatz8.E15 + this.state.Arbeitsplatz8.E18 + this.state.Arbeitsplatz8.E19 + this.state.Arbeitsplatz8.E20;
    this.state.Arbeitsplatz9.Kapazitätsbedarf = this.state.Arbeitsplatz9.E10 + this.state.Arbeitsplatz9.E11 + this.state.Arbeitsplatz9.E12 + this.state.Arbeitsplatz9.E13 + this.state.Arbeitsplatz9.E14 + this.state.Arbeitsplatz9.E15 + this.state.Arbeitsplatz9.E18 + this.state.Arbeitsplatz9.E19 + this.state.Arbeitsplatz9.E20;

    this.state.Arbeitsplatz10.Kapazitätsbedarf = this.state.Arbeitsplatz10.E4 + this.state.Arbeitsplatz10.E5 + this.state.Arbeitsplatz10.E6 + this.state.Arbeitsplatz10.E7 + this.state.Arbeitsplatz10.E8 + this.state.Arbeitsplatz10.E9;
    this.state.Arbeitsplatz11.Kapazitätsbedarf = this.state.Arbeitsplatz11.E4 + this.state.Arbeitsplatz11.E5 + this.state.Arbeitsplatz11.E6 + this.state.Arbeitsplatz11.E7 + this.state.Arbeitsplatz11.E8 + this.state.Arbeitsplatz11.E9;

    this.state.Arbeitsplatz12.Kapazitätsbedarf = this.state.Arbeitsplatz12.E10 + this.state.Arbeitsplatz12.E11 + this.state.Arbeitsplatz12.E12 + this.state.Arbeitsplatz12.E13 + this.state.Arbeitsplatz12.E14 + this.state.Arbeitsplatz12.E15;
    this.state.Arbeitsplatz13.Kapazitätsbedarf = this.state.Arbeitsplatz13.E10 + this.state.Arbeitsplatz13.E11 + this.state.Arbeitsplatz13.E12 + this.state.Arbeitsplatz13.E13 + this.state.Arbeitsplatz13.E14 + this.state.Arbeitsplatz13.E15;

    this.state.Arbeitsplatz14.Kapazitätsbedarf = this.state.Arbeitsplatz14.E16;
    this.state.Arbeitsplatz15.Kapazitätsbedarf = this.state.Arbeitsplatz15.E17 + this.state.Arbeitsplatz15.E26;

    this.state.Arbeitsplatz1.RüstzeitGesamt = this.state.Arbeitsplatz1.RüstzeitVorgang * this.state.Arbeitsplatz1.RüstVorgänge;
    this.state.Arbeitsplatz2.RüstzeitGesamt = this.state.Arbeitsplatz2.RüstzeitVorgang * this.state.Arbeitsplatz2.RüstVorgänge;
    this.state.Arbeitsplatz3.RüstzeitGesamt = Math.ceil(this.state.Arbeitsplatz3.RüstzeitVorgang * this.state.Arbeitsplatz3.RüstVorgänge);
    this.state.Arbeitsplatz4.RüstzeitGesamt = this.state.Arbeitsplatz4.RüstzeitVorgang * this.state.Arbeitsplatz4.RüstVorgänge;
    this.state.Arbeitsplatz6.RüstzeitGesamt = this.state.Arbeitsplatz6.RüstzeitVorgang * this.state.Arbeitsplatz6.RüstVorgänge;
    this.state.Arbeitsplatz7.RüstzeitGesamt = this.state.Arbeitsplatz7.RüstzeitVorgang * this.state.Arbeitsplatz7.RüstVorgänge;
    this.state.Arbeitsplatz8.RüstzeitGesamt = Math.ceil(this.state.Arbeitsplatz8.RüstzeitVorgang * this.state.Arbeitsplatz8.RüstVorgänge);
    this.state.Arbeitsplatz9.RüstzeitGesamt = this.state.Arbeitsplatz9.RüstzeitVorgang * this.state.Arbeitsplatz9.RüstVorgänge;
    this.state.Arbeitsplatz10.RüstzeitGesamt = this.state.Arbeitsplatz10.RüstzeitVorgang * this.state.Arbeitsplatz10.RüstVorgänge;
    this.state.Arbeitsplatz11.RüstzeitGesamt = this.state.Arbeitsplatz11.RüstzeitVorgang * this.state.Arbeitsplatz11.RüstVorgänge;
    this.state.Arbeitsplatz12.RüstzeitGesamt = this.state.Arbeitsplatz12.RüstzeitVorgang * this.state.Arbeitsplatz12.RüstVorgänge;
    this.state.Arbeitsplatz13.RüstzeitGesamt = this.state.Arbeitsplatz13.RüstzeitVorgang * this.state.Arbeitsplatz13.RüstVorgänge;
    this.state.Arbeitsplatz14.RüstzeitGesamt = this.state.Arbeitsplatz14.RüstzeitVorgang * this.state.Arbeitsplatz14.RüstVorgänge;
    this.state.Arbeitsplatz15.RüstzeitGesamt = this.state.Arbeitsplatz15.RüstzeitVorgang * this.state.Arbeitsplatz15.RüstVorgänge;

    this._getWaitingslistworkstation('Arbeitsplatz1');
    this._getWaitingslistworkstation('Arbeitsplatz2');
    this._getWaitingslistworkstation('Arbeitsplatz3');
    this._getWaitingslistworkstation('Arbeitsplatz4');
    this._getWaitingslistworkstation('Arbeitsplatz6');
    this._getWaitingslistworkstation('Arbeitsplatz7');
    this._getWaitingslistworkstation('Arbeitsplatz8');
    this._getWaitingslistworkstation('Arbeitsplatz9');
    this._getWaitingslistworkstation('Arbeitsplatz10');
    this._getWaitingslistworkstation('Arbeitsplatz11');
    this._getWaitingslistworkstation('Arbeitsplatz12');
    this._getWaitingslistworkstation('Arbeitsplatz13');
    this._getWaitingslistworkstation('Arbeitsplatz14');
    this._getWaitingslistworkstation('Arbeitsplatz15');

    this.state.Arbeitsplatz1.Gesamtkapazitätbedarf = this.state.Arbeitsplatz1.Kapazitätsbedarf + this.state.Arbeitsplatz1.RüstzeitGesamt + this.state.Arbeitsplatz1.Warteschlange;
    this.state.Arbeitsplatz2.Gesamtkapazitätbedarf = this.state.Arbeitsplatz2.Kapazitätsbedarf + this.state.Arbeitsplatz2.RüstzeitGesamt + this.state.Arbeitsplatz2.Warteschlange;
    this.state.Arbeitsplatz3.Gesamtkapazitätbedarf = this.state.Arbeitsplatz3.Kapazitätsbedarf + this.state.Arbeitsplatz3.RüstzeitGesamt + this.state.Arbeitsplatz3.Warteschlange;
    this.state.Arbeitsplatz4.Gesamtkapazitätbedarf = this.state.Arbeitsplatz4.Kapazitätsbedarf + this.state.Arbeitsplatz4.RüstzeitGesamt + this.state.Arbeitsplatz4.Warteschlange;
    this.state.Arbeitsplatz6.Gesamtkapazitätbedarf = this.state.Arbeitsplatz6.Kapazitätsbedarf + this.state.Arbeitsplatz6.RüstzeitGesamt + this.state.Arbeitsplatz6.Warteschlange;
    this.state.Arbeitsplatz7.Gesamtkapazitätbedarf = this.state.Arbeitsplatz7.Kapazitätsbedarf + this.state.Arbeitsplatz7.RüstzeitGesamt + this.state.Arbeitsplatz7.Warteschlange;
    this.state.Arbeitsplatz8.Gesamtkapazitätbedarf = this.state.Arbeitsplatz8.Kapazitätsbedarf + this.state.Arbeitsplatz8.RüstzeitGesamt + this.state.Arbeitsplatz8.Warteschlange;
    this.state.Arbeitsplatz9.Gesamtkapazitätbedarf = this.state.Arbeitsplatz9.Kapazitätsbedarf + this.state.Arbeitsplatz9.RüstzeitGesamt + this.state.Arbeitsplatz9.Warteschlange;
    this.state.Arbeitsplatz10.Gesamtkapazitätbedarf = this.state.Arbeitsplatz10.Kapazitätsbedarf + this.state.Arbeitsplatz10.RüstzeitGesamt + this.state.Arbeitsplatz10.Warteschlange;
    this.state.Arbeitsplatz11.Gesamtkapazitätbedarf = this.state.Arbeitsplatz11.Kapazitätsbedarf + this.state.Arbeitsplatz11.RüstzeitGesamt + this.state.Arbeitsplatz11.Warteschlange;
    this.state.Arbeitsplatz12.Gesamtkapazitätbedarf = this.state.Arbeitsplatz12.Kapazitätsbedarf + this.state.Arbeitsplatz12.RüstzeitGesamt + this.state.Arbeitsplatz12.Warteschlange;
    this.state.Arbeitsplatz13.Gesamtkapazitätbedarf = this.state.Arbeitsplatz13.Kapazitätsbedarf + this.state.Arbeitsplatz13.RüstzeitGesamt + this.state.Arbeitsplatz13.Warteschlange;
    this.state.Arbeitsplatz14.Gesamtkapazitätbedarf = this.state.Arbeitsplatz14.Kapazitätsbedarf + this.state.Arbeitsplatz14.RüstzeitGesamt + this.state.Arbeitsplatz14.Warteschlange;
    this.state.Arbeitsplatz15.Gesamtkapazitätbedarf = this.state.Arbeitsplatz15.Kapazitätsbedarf + this.state.Arbeitsplatz15.RüstzeitGesamt + this.state.Arbeitsplatz15.Warteschlange;

    if(currentInputXML && !currentInputXML.inputDataObject.kapazitaetsplanung){
      console.log('schichten nochmal berechnen')
      if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 2400) {
        console.log('1 Schicht')
        this.state.Arbeitsplatz1.Schichten = 1
      } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 3599) {
        console.log('1 Schicht mit ÜS')
        this.state.Arbeitsplatz1.Schichten = 1
        this.state.Arbeitsplatz1.Überstunden = Math.ceil((this.state.Arbeitsplatz1.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 4800) {
        console.log('2 Schicht')
        this.state.Arbeitsplatz1.Schichten = 2
      } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 6000) {
        console.log('2 Schicht mit ÜS')
        this.state.Arbeitsplatz1.Schichten = 2
        this.state.Arbeitsplatz1.Überstunden = Math.ceil((this.state.Arbeitsplatz1.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 7200) {
        console.log('3 Schicht')
        this.state.Arbeitsplatz1.Schichten = 3
      } else {
        console.log('Fehler')
        this.state.Arbeitsplatz1.Schichten = 3
        this.state.Arbeitsplatz1.Überstunden = 0;

      }

      //2
      if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz2.Schichten = 1
      } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz2.Schichten = 1
        this.state.Arbeitsplatz2.Überstunden = Math.ceil((this.state.Arbeitsplatz2.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz2.Schichten = 2
      } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz2.Schichten = 2
        console.log('runden')
        this.state.Arbeitsplatz2.Überstunden = Math.ceil((this.state.Arbeitsplatz2.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz2.Schichten = 3
      } else {
        this.state.Arbeitsplatz2.Schichten = 3
        this.state.Arbeitsplatz2.Überstunden = 0;

      }

      //3
      if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz3.Schichten = 1
      } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz3.Schichten = 1
        this.state.Arbeitsplatz3.Überstunden = Math.ceil((this.state.Arbeitsplatz3.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz3.Schichten = 2
      } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz3.Schichten = 2
        this.state.Arbeitsplatz3.Überstunden = Math.ceil((this.state.Arbeitsplatz3.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz3.Schichten = 3
      } else {
        this.state.Arbeitsplatz3.Schichten = 3
        this.state.Arbeitsplatz3.Überstunden = 0;


      }

      //4
      if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz4.Schichten = 1
      } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz4.Schichten = 1
        this.state.Arbeitsplatz4.Überstunden = Math.ceil((this.state.Arbeitsplatz4.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz4.Schichten = 2
      } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz4.Schichten = 2
        this.state.Arbeitsplatz4.Überstunden = Math.ceil((this.state.Arbeitsplatz4.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz4.Schichten = 3
      } else {
        this.state.Arbeitsplatz4.Schichten = 3
        this.state.Arbeitsplatz4.Überstunden = 0;

      }

      //6
      if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz6.Schichten = 1
      } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz6.Schichten = 1
        this.state.Arbeitsplatz6.Überstunden = Math.ceil((this.state.Arbeitsplatz6.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz6.Schichten = 2
      } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz6.Schichten = 2
        this.state.Arbeitsplatz6.Überstunden = Math.ceil((this.state.Arbeitsplatz6.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz6.Schichten = 3
      } else {
        this.state.Arbeitsplatz6.Schichten = 3
        this.state.Arbeitsplatz6.Überstunden = 0;

      }

      //7
      if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz7.Schichten = 1
      } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz7.Schichten = 1
        this.state.Arbeitsplatz7.Überstunden = Math.ceil((this.state.Arbeitsplatz7.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz7.Schichten = 2
      } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz7.Schichten = 2
        this.state.Arbeitsplatz7.Überstunden = Math.ceil((this.state.Arbeitsplatz7.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz7.Schichten = 3
      } else {
        this.state.Arbeitsplatz7.Schichten = 3
        this.state.Arbeitsplatz7.Überstunden = 0;

      }

      //8
      if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz8.Schichten = 1
      } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz8.Schichten = 1
        this.state.Arbeitsplatz8.Überstunden = Math.ceil((this.state.Arbeitsplatz8.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz8.Schichten = 2
      } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz8.Schichten = 2
        this.state.Arbeitsplatz8.Überstunden = Math.ceil((this.state.Arbeitsplatz8.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz8.Schichten = 3
      } else {
        this.state.Arbeitsplatz8.Schichten = 3
        this.state.Arbeitsplatz8.Überstunden = 0;

      }

      //9
      if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz9.Schichten = 1
      } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz9.Schichten = 1
        this.state.Arbeitsplatz9.Überstunden = Math.ceil((this.state.Arbeitsplatz9.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz9.Schichten = 2
      } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz9.Schichten = 2
        this.state.Arbeitsplatz9.Überstunden = Math.ceil((this.state.Arbeitsplatz9.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz9.Schichten = 3
      } else {
        this.state.Arbeitsplatz9.Schichten = 3
        this.state.Arbeitsplatz9.Überstunden = 0;

      }

      //10
      if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz10.Schichten = 1
      } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz10.Schichten = 1
        this.state.Arbeitsplatz10.Überstunden = Math.ceil((this.state.Arbeitsplatz10.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz10.Schichten = 2
      } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz10.Schichten = 2
        this.state.Arbeitsplatz10.Überstunden = Math.ceil((this.state.Arbeitsplatz10.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz10.Schichten = 3
      } else {
        this.state.Arbeitsplatz10.Schichten = 3
        this.state.Arbeitsplatz10.Überstunden = 0;

      }

      //11
      if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz11.Schichten = 1
      } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz11.Schichten = 1
        this.state.Arbeitsplatz11.Überstunden = Math.ceil((this.state.Arbeitsplatz11.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz11.Schichten = 2
      } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz11.Schichten = 2
        this.state.Arbeitsplatz11.Überstunden = Math.ceil((this.state.Arbeitsplatz11.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz11.Schichten = 3
      } else {
        this.state.Arbeitsplatz11.Schichten = 3
        this.state.Arbeitsplatz11.Überstunden = 0;

      }

      //12
      if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz12.Schichten = 1
      } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz12.Schichten = 1
        this.state.Arbeitsplatz12.Überstunden = Math.ceil((this.state.Arbeitsplatz12.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz12.Schichten = 2
      } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz12.Schichten = 2
        this.state.Arbeitsplatz12.Überstunden = Math.ceil((this.state.Arbeitsplatz12.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz12.Schichten = 3
      } else {
        this.state.Arbeitsplatz12.Schichten = 3
        this.state.Arbeitsplatz12.Überstunden = 0;

      }

      //13
      if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz13.Schichten = 1
      } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz13.Schichten = 1
        this.state.Arbeitsplatz13.Überstunden = Math.ceil((this.state.Arbeitsplatz13.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz13.Schichten = 2
      } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz13.Schichten = 2
        this.state.Arbeitsplatz13.Überstunden = Math.ceil((this.state.Arbeitsplatz13.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz13.Schichten = 3
      } else {
        this.state.Arbeitsplatz13.Schichten = 3
        this.state.Arbeitsplatz13.Überstunden = 0;

      }

      //14
      if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz14.Schichten = 1
      } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz14.Schichten = 1
        this.state.Arbeitsplatz14.Überstunden = Math.ceil((this.state.Arbeitsplatz14.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz14.Schichten = 2
      } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz14.Schichten = 2
        this.state.Arbeitsplatz14.Überstunden = Math.ceil((this.state.Arbeitsplatz14.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz14.Schichten = 3
      } else {
        this.state.Arbeitsplatz14.Schichten = 3
        this.state.Arbeitsplatz14.Überstunden = 0;


      }

      //15
      if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 2400) {
        this.state.Arbeitsplatz15.Schichten = 1
      } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 3599) {
        this.state.Arbeitsplatz15.Schichten = 1
        this.state.Arbeitsplatz15.Überstunden = Math.ceil((this.state.Arbeitsplatz15.Gesamtkapazitätbedarf - 2400) / 5);
      } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 4800) {
        this.state.Arbeitsplatz15.Schichten = 2
      } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 6000) {
        this.state.Arbeitsplatz15.Schichten = 2
        this.state.Arbeitsplatz15.Überstunden = Math.ceil((this.state.Arbeitsplatz15.Gesamtkapazitätbedarf - 4800) / 5);
      } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 7200) {
        this.state.Arbeitsplatz15.Schichten = 3
      } else {
        this.state.Arbeitsplatz15.Schichten = 3
        this.state.Arbeitsplatz15.Überstunden = 0;

      }
    } else {
      if(currentInputXML){
        this.state.Arbeitsplatz1.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz1.Schichten;
      this.state.Arbeitsplatz1.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz1.Überstunden;

      this.state.Arbeitsplatz2.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz2.Schichten;
      this.state.Arbeitsplatz2.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz2.Überstunden;

      this.state.Arbeitsplatz3.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz3.Schichten;
      this.state.Arbeitsplatz3.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz3.Überstunden;

      this.state.Arbeitsplatz4.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz4.Schichten;
      this.state.Arbeitsplatz4.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz4.Überstunden;

      this.state.Arbeitsplatz6.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz6.Schichten;
      this.state.Arbeitsplatz6.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz6.Überstunden;

      this.state.Arbeitsplatz7.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz7.Schichten;
      this.state.Arbeitsplatz7.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz7.Überstunden;

      this.state.Arbeitsplatz8.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz8.Schichten;
      this.state.Arbeitsplatz8.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz8.Überstunden;

      this.state.Arbeitsplatz9.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz9.Schichten;
      this.state.Arbeitsplatz9.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz9.Überstunden;

      this.state.Arbeitsplatz10.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz10.Schichten;
      this.state.Arbeitsplatz10.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz10.Überstunden;

      this.state.Arbeitsplatz11.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz11.Schichten;
      this.state.Arbeitsplatz11.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz11.Überstunden;

      this.state.Arbeitsplatz12.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz12.Schichten;
      this.state.Arbeitsplatz12.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz12.Überstunden;

      this.state.Arbeitsplatz13.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz13.Schichten;
      this.state.Arbeitsplatz13.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz13.Überstunden;

      this.state.Arbeitsplatz14.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz14.Schichten;
      this.state.Arbeitsplatz14.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz14.Überstunden;

      this.state.Arbeitsplatz15.Schichten = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz15.Schichten;
      this.state.Arbeitsplatz15.Überstunden = currentInputXML.inputDataObject.kapazitaetsplanung.Arbeitsplatz15.Überstunden;


      console.log('schichten nicht nochmal berechnen')
      }
    }

  }

  _updateLocalStorage() {
    if (window.localStorage) {
      var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
      var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);
      console.log(currentInputXML)
      localStorage.removeItem(currentInputXML.id);
      localStorage.setItem(currentInputXML.id, JSON.stringify(currentInputXML.inputDataObject));

    } else {
      alert('LocalStorage is not supported in your browser');
    }
  }

  _handleSaveButtonClick(e) {

    console.log('Speichern')

    var errorlol = false;
    if (this.props.ActiveUploadXML.activeUploadXMLData.id !== 'result_P-1') {

      Object.keys(this.state.errorTextSchicht).forEach(function (key) {
        if (this.state.errorTextSchicht[key] !== '') {
          errorlol = true;
        }
      }.bind(this));

//      Object.keys(this.state.errorTextGL).forEach(function(key) {
//        if(this.state.errorTextGL[key] !== ''){
//          errorlol = true;
//        }
//      }.bind(this));


      if (!errorlol) {
        var kapazitätsplanung = {
          Arbeitsplatz1: this.state.Arbeitsplatz1,
          Arbeitsplatz2: this.state.Arbeitsplatz2,
          Arbeitsplatz3: this.state.Arbeitsplatz3,
          Arbeitsplatz4: this.state.Arbeitsplatz4,
          Arbeitsplatz6: this.state.Arbeitsplatz6,
          Arbeitsplatz7: this.state.Arbeitsplatz7,
          Arbeitsplatz8: this.state.Arbeitsplatz8,
          Arbeitsplatz9: this.state.Arbeitsplatz9,
          Arbeitsplatz10: this.state.Arbeitsplatz10,
          Arbeitsplatz11: this.state.Arbeitsplatz11,
          Arbeitsplatz12: this.state.Arbeitsplatz12,
          Arbeitsplatz13: this.state.Arbeitsplatz13,
          Arbeitsplatz14: this.state.Arbeitsplatz14,
          Arbeitsplatz15: this.state.Arbeitsplatz15

        }
        this.props.dispatch(setKapazitaetsplanungInputXML(kapazitätsplanung, this.props.ActiveUploadXML.activeUploadXMLData.id));
        this._updateLocalStorage();
        this.refs.snackbar.show();

        this.setState({
          resetButtonDisabled: false
        });
      } else {
        console.log('error');
        this.setState({
          openDialogStandardActions: true,
          dialogTitle: "Error",
          dialogText: this.props.internationalReducer.activeLanguage.strings.ErrorSaveNumeric
        });
      }

    } else {
      this.setState({
        openDialogStandardActions: true,
        dialogTitle: "Error",
        dialogText: this.props.internationalReducer.activeLanguage.strings.ErrorSavePeriod
      });
    }
  }

  _handleDetailModeChange(e) {
    this.setState({
      detailMode: !this.state.detailMode
    });
  }

  _getWaitingslistworkstation(workstationId) {
    var workplaceNumber = workstationId.substring(12);
    var activePeriodID = this.props.ActiveUploadXML.activeUploadXMLData.id.substring(7);
    var currentInputXML = this.props.InputXMLs.find(xml => xml.id.substring(6) === activePeriodID);

    var currentAmount = 0;
    if (currentInputXML) {
      currentInputXML.inputDataObject.results.waitinglistworkstations[0].workplace.forEach(function (elementStation) {
        if (workplaceNumber == elementStation.$.id) {
          this.state[workstationId].Warteschlange = parseInt(elementStation.$.timeneed);
        }
      }.bind(this))

    }

    //console.log("Waitingslistworkstation: "+ articleId, currentAmount)
    return currentAmount
  }

  _handleResetButtonClick(e) {
    this.props.dispatch(resetKapazitaetsplanungInputXML(this.props.ActiveUploadXML.activeUploadXMLData.id))

    console.log('MINUTE DAVOR' + this.state.Arbeitsplatz1.Überstunden);

    console.log('Minuten' + this.state.Arbeitsplatz1.Überstunden);
    this._updateLocalStorage();


    //1
    if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz1.Schichten = 1
      this.state.Arbeitsplatz1.Überstunden = 0;
    } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz1.Schichten = 1
      this.state.Arbeitsplatz1.Überstunden = (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz1.Schichten = 2
    } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz1.Schichten = 2
      this.state.Arbeitsplatz1.Überstunden = (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz1.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz1.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz1.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //2
    if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz2.Schichten = 1
      this.state.Arbeitsplatz2.Überstunden = 0;
    } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz2.Schichten = 1
      this.state.Arbeitsplatz2.Überstunden = (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz2.Schichten = 2
    } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz2.Schichten = 2
      this.state.Arbeitsplatz2.Überstunden = (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz2.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz2.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz2.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //3
    if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz3.Schichten = 1
      this.state.Arbeitsplatz3.Überstunden = 0;
    } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz3.Schichten = 1
      this.state.Arbeitsplatz3.Überstunden = (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz3.Schichten = 2
    } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz3.Schichten = 2
      this.state.Arbeitsplatz3.Überstunden = (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz3.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz3.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz3.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //4
    if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz4.Schichten = 1
      this.state.Arbeitsplatz4.Überstunden = 0;
    } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz4.Schichten = 1
      this.state.Arbeitsplatz4.Überstunden = (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz4.Schichten = 2
    } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz4.Schichten = 2
      this.state.Arbeitsplatz4.Überstunden = (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz4.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz4.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz4.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //6
    if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz6.Schichten = 1
      this.state.Arbeitsplatz6.Überstunden = 0;
    } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz6.Schichten = 1
      this.state.Arbeitsplatz6.Überstunden = (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz6.Schichten = 2
    } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz6.Schichten = 2
      this.state.Arbeitsplatz6.Überstunden = (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz6.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz6.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz6.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //7
    if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz7.Schichten = 1
      this.state.Arbeitsplatz7.Überstunden = 0;
    } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz7.Schichten = 1
      this.state.Arbeitsplatz7.Überstunden = (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz7.Schichten = 2
    } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz7.Schichten = 2
      this.state.Arbeitsplatz7.Überstunden = (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz7.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz7.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz7.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //8
    if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz8.Schichten = 1
      this.state.Arbeitsplatz8.Überstunden = 0;
    } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz8.Schichten = 1
      this.state.Arbeitsplatz8.Überstunden = (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz8.Schichten = 2
    } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz8.Schichten = 2
      this.state.Arbeitsplatz8.Überstunden = (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz8.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz8.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz8.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //9
    if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz9.Schichten = 1
      this.state.Arbeitsplatz9.Überstunden = 0;
    } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz9.Schichten = 1
      this.state.Arbeitsplatz9.Überstunden = (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz9.Schichten = 2
    } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz9.Schichten = 2
      this.state.Arbeitsplatz9.Überstunden = (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz9.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz9.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz9.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //10
    if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz10.Schichten = 1
      this.state.Arbeitsplatz10.Überstunden = 0;
    } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz10.Schichten = 1
      this.state.Arbeitsplatz10.Überstunden = (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz10.Schichten = 2
    } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz10.Schichten = 2
      this.state.Arbeitsplatz10.Überstunden = (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz10.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz10.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz10.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //11
    if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz11.Schichten = 1
      this.state.Arbeitsplatz11.Überstunden = 0;
    } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz11.Schichten = 1
      this.state.Arbeitsplatz11.Überstunden = (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz11.Schichten = 2
    } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz11.Schichten = 2
      this.state.Arbeitsplatz11.Überstunden = (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz11.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz11.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz11.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //12
    if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz12.Schichten = 1
      this.state.Arbeitsplatz12.Überstunden = 0;
    } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz12.Schichten = 1
      this.state.Arbeitsplatz12.Überstunden = (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz12.Schichten = 2
    } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz12.Schichten = 2
      this.state.Arbeitsplatz12.Überstunden = (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz12.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz12.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz12.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //13
    if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz13.Schichten = 1
      this.state.Arbeitsplatz13.Überstunden = 0;
    } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz13.Schichten = 1
      this.state.Arbeitsplatz13.Überstunden = (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz13.Schichten = 2
    } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz13.Schichten = 2
      this.state.Arbeitsplatz13.Überstunden = (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz13.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz13.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz13.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //14
    if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz14.Schichten = 1
      this.state.Arbeitsplatz14.Überstunden = 0;
    } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz14.Schichten = 1
      this.state.Arbeitsplatz14.Überstunden = (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz14.Schichten = 2
    } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz14.Schichten = 2
      this.state.Arbeitsplatz14.Überstunden = (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz14.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz14.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz14.Schichten = 3
    } else {
      //Fehlermeldung
    }

    //15
    if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 2400) {
      this.state.Arbeitsplatz15.Schichten = 1
      this.state.Arbeitsplatz15.Überstunden = 0;
    } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 2401 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 3599) {
      this.state.Arbeitsplatz15.Schichten = 1
      this.state.Arbeitsplatz15.Überstunden = (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf - 2400) / 5;
    } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 3600 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 4800) {
      this.state.Arbeitsplatz15.Schichten = 2
    } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 4801 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 6000) {
      this.state.Arbeitsplatz15.Schichten = 2
      this.state.Arbeitsplatz15.Überstunden = (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf - 4800) / 5;
    } else if (this.state.Arbeitsplatz15.Gesamtkapazitätbedarf > 6001 && this.state.Arbeitsplatz15.Gesamtkapazitätbedarf < 7200) {
      this.state.Arbeitsplatz15.Schichten = 3
    } else {
      //Fehlermeldung
    }


  }

  _handleSchichtenChange(e) {

    console.log('Schichten Change');

    let arbeitsplatzId = e.target.id
    let value = e.target.value;
    let arbeitsplatzList = this.state[arbeitsplatzId];
    let errorTextList = this.state.errorTextSchicht


    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if (isNumeric) {
      if (value > 3) {
        console.log('bigger than 3 ');
        errorTextList[arbeitsplatzId] = this.props.internationalReducer.activeLanguage.strings.ErrorKleinerDrei
      } else {
        console.log('isNumeric ');
        errorTextList[arbeitsplatzId] = ''
      }
    } else {
      errorTextList[arbeitsplatzId] = this.props.internationalReducer.activeLanguage.strings.NumericError
      value = 0
    }
    arbeitsplatzList.Schichten = parseInt(value)

    this.setState({
      errorTextSchicht: errorTextList,
      [arbeitsplatzId]: arbeitsplatzList
    });
  }

  _handleStundenChange(e) {
    console.log('Stunden Change');

    let arbeitsplatzId = e.target.id;
    let value = e.target.value;
    let arbeitsplatzList = this.state[arbeitsplatzId];
    let errorTextList = this.state.errorTextStunden;

    console.log('value ' + value);

    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    if (isNumeric) {
      console.log('isNumeric ');
      errorTextList[arbeitsplatzId] = ''
    } else {
      console.log('is not Numeric ');
      errorTextList[arbeitsplatzId] = this.props.internationalReducer.activeLanguage.strings.NumericError
      value = 0
    }
    arbeitsplatzList.Überstunden = parseInt(value);

    this.setState({
      errorTextStunden: errorTextList,
      [arbeitsplatzId]: arbeitsplatzList
    });

  }

  _onDialogOk() {
    this.setState({
      openDialogStandardActions: false
    });
  }

  render() {

    let standardActions = [
      {text: 'Ok', onTouchTap: this._onDialogOk.bind(this), ref: 'ok'}
    ];

    return (
      <div>
        <div>
          <h1>{this.props.internationalReducer.activeLanguage.strings.Kapazitaetsplanung}</h1>

          <RaisedButton label={this.props.internationalReducer.activeLanguage.strings.Speichern} primary={true}
                        onTouchTap={this._handleSaveButtonClick}/>
          <RaisedButton label={this.props.internationalReducer.activeLanguage.strings.Reset} secondary={true}
                        disabled={this.state.resetButtonDisabled}
                        onTouchTap={this._handleResetButtonClick}/>
          <Toggle
            style={{"display": "inline-block", "width":"10%", "marginLeft":"10px", "paddingTop":"5px"}}
            name="Detail mode"
            value="Detail mode"
            onToggle={this._handleDetailModeChange}
            defaultToggled={this.state.detailMode}/>

          <div className={styles.navigationButtons}>
            <div className={styles.beforeButtonWrapper} >
              <Link className={styles.beforeButton}to="/auftragsplanung/kinder">
                    {this.props.internationalReducer.activeLanguage.strings.Back}
              </Link>
            </div>
            <div className={styles.nextButtonWrapper}>
              <Link className={styles.nextButton} to="/kaufteildisposition">
                      {this.props.internationalReducer.activeLanguage.strings.Next}
              </Link>
            </div>
          </div>
        </div>

        { this.state.detailMode ?
          (
            <Table
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              >
              <TableHeader adjustForCheckbox={this.state.displayRowCheckbox}
                           displaySelectAll={this.state.displayRowCheckbox}
                           enableSelectAll={this.state.enableSelectAll}>
                <TableRow selectable={this.state.selectable}>
                  <TableHeaderColumn colSpan="19" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Kapazitaetsplanung}
                  </TableHeaderColumn>
                </TableRow>

                <TableRow selectable={this.state.selectable}>
                  <TableHeaderColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Bezeichnung}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {this.props.internationalReducer.activeLanguage.strings.TeileArt}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {this.props.internationalReducer.activeLanguage.strings.SachNR}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Auftragsmenge}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    1
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    2
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    3
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    4
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    5
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    6
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    7
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    8
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    9
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    10
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    11
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    12
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    13
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    14
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    15
                  </TableHeaderColumn>

                </TableRow>

              </TableHeader>

              <TableBody displayRowCheckbox={this.state.displayRowCheckbox}
                         stripedRows={this.state.stripedRows}
                         showRowHover={this.state.showRowHover}
                >

                //Hinterrad
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E4
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E4}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.E4}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.E4}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Hinterrad}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E5
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E5}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.E5}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.E5}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow iconClassName="TableRow-bottom-border">
                  <TableRowColumn iconClassName="TableRow-bottom-border">

                  </TableRowColumn>
                  <TableRowColumn iconClassName="TableRow-bottom-border">
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E6
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E6}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.E6}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.E6}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>

                //Vorderrad
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E7
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E7}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.E7}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.E7}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Vorderrad}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E8
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E8}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.E8}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.E8}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E9
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E9}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.E9}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.E9}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>


                //Schutzblech hinten
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E10
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E10}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E10}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E10}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E10}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.E10}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.E10}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.SchutzblechHinten}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E11
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E11}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E11}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E11}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E11}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.E11}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.E11}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E12
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E12}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E12}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E12}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E12}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.E12}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.E12}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>

                //Schutzblech vorne
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E13
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E13}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E13}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E13}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E13}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.E13}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.E13}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.SchutzblechVorne}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E14
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E14}

                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E14}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E14}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E14}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.E14}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.E14}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E15
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E15}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E15}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E15}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E15}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.E15}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.E15}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>


                //Lenker
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Lenker}
                  </TableRowColumn>
                  <TableRowColumn>
                    KDH
                  </TableRowColumn>
                  <TableRowColumn>
                    E16
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E16}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.E16}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.E16}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>

                //Sattel
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Sattel}
                  </TableRowColumn>
                  <TableRowColumn>
                    KDH
                  </TableRowColumn>
                  <TableRowColumn>
                    E17
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E17}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.E17}
                  </TableRowColumn>
                </TableRow>

                //Rahmen
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E18
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E18}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.E18}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E18}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E18}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E18}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Rahmen}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E19
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E19}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.E19}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E19}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E19}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E19}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E20
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E20}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.E20}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E20}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.E20}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.E20}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>

                //Pedale
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Pedale}
                  </TableRowColumn>
                  <TableRowColumn>
                    KDH
                  </TableRowColumn>
                  <TableRowColumn>
                    E26
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E26}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.E26}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.E26}
                  </TableRowColumn>
                </TableRow>

                //Vorderrad komplett
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E49
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E49}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.E49}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.Rahmen}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E54
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E54}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.E54}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E29
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E29}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.E29}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>


                //Rahmen und Räder
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E50
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E50}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.E50}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.RahmenUndRäder}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E55
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E55}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.E55}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E30
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E30}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.E30}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>

                //Fahrrad ohne Pedale
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    E51
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E51}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.E51}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.FahrradOhnePedale}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    E56
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E56}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.E56}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>

                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    E31
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.E31}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.E31}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>


                //Fahrrad komplett
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    H
                  </TableRowColumn>
                  <TableRowColumn>
                    P1
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.P1}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.P1}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    {this.props.internationalReducer.activeLanguage.strings.FahrradKomplett}
                  </TableRowColumn>
                  <TableRowColumn>
                    D
                  </TableRowColumn>
                  <TableRowColumn>
                    P2
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.P2}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.P2}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>

                  </TableRowColumn>
                  <TableRowColumn>
                    K
                  </TableRowColumn>
                  <TableRowColumn>
                    P3
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Auftragsmenge.P3}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.P3}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>

                //line
                <TableRow>
                  <TableRowColumn colSpan="19" style={{height: '5px', bgcolor:'#ff0000'}}>
                  </TableRowColumn>
                </TableRow>


                //Kapazitätsplanung (neu)
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.KapazitätsbedarfNeu}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.Kapazitätsbedarf}
                  </TableRowColumn>

                </TableRow>


                //Rüstzeit pro Vorgang
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.RüstzeitProVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.RüstzeitVorgang}
                  </TableRowColumn>
                </TableRow>

                //Rüstungsvorgänge
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.RüstVorgänge}
                  </TableRowColumn>
                </TableRow>

                //Rüstzeit Gesamt
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.RüstzeitGesamt}
                  </TableRowColumn>
                </TableRow>

                //Warteschlange
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.Warteschlange}
                  </TableRowColumn>
                </TableRow>

                //Gesamtkapazitätsbedarf
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Gesamtkapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                </TableRow>

                //Schichten
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Schichten}
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz1"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz1}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz1.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz2"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz2}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz2.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz3"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz3}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz3.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz4"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz4}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz4.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz6"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz6}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz6.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz7"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz7}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz7.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz8"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz8}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz8.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz9"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz9}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz9.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz10"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz10}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz10.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz11"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz11}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz11.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz12"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz12}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz12.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz13"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz13}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz13.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz14"
                      errorText={this.state.errorTextSchicht.A14}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz14.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz15"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz15}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz15.Schichten}/>
                  </TableRowColumn>
                </TableRow>

                //Überstunden
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Überstunden}
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz1"
                      errorText={this.state.errorTextStunden.Arbeitsplatz1}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz1.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz2"
                      errorText={this.state.errorTextStunden.Arbeitsplatz2}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz2.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz3"
                      errorText={this.state.errorTextStunden.Arbeitsplatz3}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz3.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz4"
                      errorText={this.state.errorTextStunden.Arbeitsplatz4}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz4.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz6"
                      errorText={this.state.errorTextStunden.Arbeitsplatz6}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz6.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz7"
                      errorText={this.state.errorTextStunden.Arbeitsplatz7}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz7.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz8"
                      errorText={this.state.errorTextStunden.Arbeitsplatz8}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz8.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz9"
                      errorText={this.state.errorTextStunden.Arbeitsplatz9}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz9.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz10"
                      errorText={this.state.errorTextStunden.Arbeitsplatz10}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz10.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz11"
                      errorText={this.state.errorTextStunden.Arbeitsplatz11}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz11.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz12"
                      errorText={this.state.errorTextStunden.Arbeitsplatz12}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz12.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz13"
                      errorText={this.state.errorTextStunden.Arbeitsplatz13}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz13.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz14"
                      errorText={this.state.errorTextStunden.Arbeitsplatz14}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz14.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz15"
                      errorText={this.state.errorTextStunden.Arbeitsplatz15}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz15.Überstunden}/>
                  </TableRowColumn>
                </TableRow>

              </TableBody>
            </Table>

          ) :
          (
            <Table
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              >
              <TableHeader adjustForCheckbox={this.state.displayRowCheckbox}
                           displaySelectAll={this.state.displayRowCheckbox}
                           enableSelectAll={this.state.enableSelectAll}>
                <TableRow selectable={this.state.selectable}>
                  <TableHeaderColumn colSpan="19" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Kapazitaetsplanung}
                  </TableHeaderColumn>
                </TableRow>

                <TableRow selectable={this.state.selectable}>
                  <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Bezeichnung}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    1
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    2
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    3
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    4
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    5
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    6
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    7
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    8
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    9
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    10
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    11
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    12
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    13
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    14
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    15
                  </TableHeaderColumn>

                </TableRow>

              </TableHeader>
              <TableBody displayRowCheckbox={this.state.displayRowCheckbox}
                         stripedRows={this.state.stripedRows}
                         showRowHover={this.state.showRowHover}
                >

                //Kapazitätsplanung (neu)
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.KapazitätsbedarfNeu}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.Kapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.Kapazitätsbedarf}
                  </TableRowColumn>

                </TableRow>


                //Rüstzeit pro Vorgang
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.RüstzeitProVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.RüstzeitVorgang}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.RüstzeitVorgang}
                  </TableRowColumn>
                </TableRow>

                //Rüstungsvorgänge
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.RüstVorgänge}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.RüstVorgänge}
                  </TableRowColumn>
                </TableRow>

                //Rüstzeit Gesamt
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.RüstzeitGesamt}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.RüstzeitGesamt}
                  </TableRowColumn>
                </TableRow>

                //Warteschlange
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.Warteschlange}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.Warteschlange}
                  </TableRowColumn>
                </TableRow>

                //Gesamtkapazitätsbedarf
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Gesamtkapazitätsbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz1.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz2.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz3.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz4.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz6.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz7.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz8.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz9.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz10.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz11.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz12.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz13.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz14.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.state.Arbeitsplatz15.Gesamtkapazitätbedarf}
                  </TableRowColumn>
                </TableRow>

                //Schichten
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Schichten}
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz1"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz1}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz1.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz2"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz2}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz2.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz3"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz3}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz3.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz4"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz4}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz4.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz6"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz6}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz6.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz7"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz7}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz7.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz8"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz8}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz8.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz9"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz9}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz9.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz10"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz10}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz10.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz11"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz11}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz11.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz12"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz12}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz12.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz13"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz13}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz13.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz14"
                      errorText={this.state.errorTextSchicht.A14}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz14.Schichten}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Schichten"
                      id="Arbeitsplatz15"
                      errorText={this.state.errorTextSchicht.Arbeitsplatz15}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleSchichtenChange}
                      value={this.state.Arbeitsplatz15.Schichten}/>
                  </TableRowColumn>
                </TableRow>

                //Überstunden
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    {this.props.internationalReducer.activeLanguage.strings.Überstunden}
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz1"
                      errorText={this.state.errorTextStunden.Arbeitsplatz1}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz1.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz2"
                      errorText={this.state.errorTextStunden.Arbeitsplatz2}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz2.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz3"
                      errorText={this.state.errorTextStunden.Arbeitsplatz3}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz3.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz4"
                      errorText={this.state.errorTextStunden.Arbeitsplatz4}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz4.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz6"
                      errorText={this.state.errorTextStunden.Arbeitsplatz6}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz6.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz7"
                      errorText={this.state.errorTextStunden.Arbeitsplatz7}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz7.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz8"
                      errorText={this.state.errorTextStunden.Arbeitsplatz8}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz8.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz9"
                      errorText={this.state.errorTextStunden.Arbeitsplatz9}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz9.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz10"
                      errorText={this.state.errorTextStunden.Arbeitsplatz10}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz10.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz11"
                      errorText={this.state.errorTextStunden.Arbeitsplatz11}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz11.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz12"
                      errorText={this.state.errorTextStunden.Arbeitsplatz12}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz12.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz13"
                      errorText={this.state.errorTextStunden.Arbeitsplatz13}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz13.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz14"
                      errorText={this.state.errorTextStunden.Arbeitsplatz14}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz14.Überstunden}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Überstunden"
                      id="Arbeitsplatz15"
                      errorText={this.state.errorTextStunden.Arbeitsplatz15}
                      errorStyle={{color:'orange'}}
                      onChange={this._handleStundenChange}
                      value={this.state.Arbeitsplatz15.Überstunden}/>
                  </TableRowColumn>
                </TableRow>

              </TableBody>
            </Table>
          )
        }

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

export default connect(mapStateToProps, dispatch => ({dispatch}))(Kapazitaetsplanung)
