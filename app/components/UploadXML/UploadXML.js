import React from 'react';
import styles from './UploadXML.module.css';
import Dropzone from 'react-dropzone';
import mui from 'material-ui';
import xml2js from 'xml2js';

import { connect } from 'react-redux';
import { saveUploadResultsXML, overrwriteUploadResultsXML, setActiveUploadResultsXMLData, saveInputXML } from '../../actions/PPSToolActions';

var Dialog = mui.Dialog
  , Snackbar = mui.Snackbar;

var xt="",h3OK=1,xmlDoc;
var uploadedJavaObject;
var localStorageJavaResultObjectName;
var localStorageJavaInputObjectName;


class UploadXML extends React.Component {

  constructor() {
    super();

    this.state = {
      modal: true,
      openDialogStandardActions: false,
      dialogTitle: "Dialog",
      dialogText: "DialogText",
      xmlValid: false,
      snackBarautoHideDuration: 3000,
      snackBarmessage: 'Upload done!',
    };

  }

  _checkErrorXML(x) {
    xt=""
    h3OK=1
    this._checkXML(x)
  }

  _checkXML(n) {
    var l,i,nam
    nam=n.nodeName
    if (nam=="h3")
    {
      if (h3OK==0)
      {
        return;
      }
      h3OK=0
    }
    if (nam=="#text")
    {
      xt=xt + n.nodeValue + "\n"
    }
    l=n.childNodes.length
    for (i=0;i<l;i++)
    {
      this._checkXML(n.childNodes[i])
    }
  }

  _validateXML(txt) {
    // code for IE
    if (window.ActiveXObject)
    {
      var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async="false";
      xmlDoc.loadXML(txt);

      if(xmlDoc.parseError.errorCode!=0)
      {
        txt="Error Code: " + xmlDoc.parseError.errorCode + "\n";
        txt=txt+"Error Reason: " + xmlDoc.parseError.reason;
        txt=txt+"Error Line: " + xmlDoc.parseError.line;
        alert(txt);
      }
      else
      {
        //alert("No errors found");
        this.setState({
              xmlValid: true
          });
      }
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation.createDocument)
    {
      var parser=new DOMParser();
      var text=txt;
      var xmlDoc=parser.parseFromString(text,"text/xml");

      if (xmlDoc.getElementsByTagName("parsererror").length>0)
      {
        this._checkErrorXML(xmlDoc.getElementsByTagName("parsererror")[0]);
        alert(xt)
      }
      else
      {
        //alert("No errors found");
        this.setState({
              xmlValid: true
            });
      }
    }
    else
    {
      alert('Your browser cannot handle XML validation, so be sure it is!');
      this.setState({
              xmlValid: true
          });
    }
  }

  _handleDrop(files) {
    if (files.length !== 1) {
      throw new Error("Please upload a single file");
    }

    var file = files[0];

    console.log('Received files: ', file);

    var reader = new FileReader();
    reader.onload = (evt) => {
      try {

        this._validateXML(evt.target.result);

        if(this.state.xmlValid){
          var parser = new xml2js.Parser();
          parser.parseString(evt.target.result, function (err, result) {

            //so i can accsess the result in _onDialogSubmit()
            this.uploadedJavaObject = result;

            this.localStorageJavaResultObjectName = "result_P" + this.uploadedJavaObject.results.$.period;
            this.localStorageJavaInputObjectName = "input_P" + this.uploadedJavaObject.results.$.period;



            if (localStorage.getItem(this.localStorageJavaResultObjectName) === null) {
              console.log("Nothing found in the LocalStorage, so we can save the Uploaded Data");
              console.log('localStorageObjectName = ', this.localStorageJavaResultObjectName);
              console.dir(this.uploadedJavaObject);



              if (window.localStorage) {
                //Saving data after accepting to overrwrite it
                localStorage.setItem(this.localStorageJavaResultObjectName, JSON.stringify(this.uploadedJavaObject));
                localStorage.setItem(this.localStorageJavaInputObjectName, JSON.stringify(this.uploadedJavaObject));
              }


              //SAVE DATA TO REDUX OBJECT
              this.props.dispatch(saveUploadResultsXML(this.uploadedJavaObject));
              this.props.dispatch(saveInputXML(this.uploadedJavaObject));

              //show indication that upload is done
              this.refs.snackbar.show();
            }else{
              this.setState({
                openDialogStandardActions: true,
                dialogTitle: "LocalStorage",
                dialogText: "There is allready data saved from this periode, saving will overwritten it?"
              });
            }
          }.bind(this));
        }
      } catch (err) {
          alert("Unable to upload XML. Please make sure you upload a " + "XML file in the correct format.");
          console.error(err);
      }
    };

    reader.readAsText(file, "UTF-8");
  }

  _onDialogSubmit() {
    console.log("User pressed submit, so we can delte the old and save the new Data");
    console.log('localStorageObjectName = ', this.localStorageJavaResultObjectName);
    console.dir(this.uploadedJavaObject);
    this.setState({
      openDialogStandardActions: false
    });

    if (window.localStorage) {
      //Saving data after accepting to overrwrite it
      localStorage.removeItem(this.localStorageJavaResultObjectName);
      localStorage.removeItem(this.localStorageJavaInputObjectName);

      localStorage.setItem(this.localStorageJavaResultObjectName , JSON.stringify(this.uploadedJavaObject));
      localStorage.setItem(this.localStorageJavaInputObjectName, JSON.stringify(this.uploadedJavaObject));
    }

    //OVERRWRITE DATA TO REDUX OBJECT
    this.props.dispatch(overrwriteUploadResultsXML(this.uploadedJavaObject));

    //show indication that upload is done
    this.refs.snackbar.show();
  }

  _handleRequestClose(buttonClicked) {
    if (!buttonClicked && this.state.modal) return;
    this.setState({
      openDialogStandardActions: false
    });
  }

  render() {

    let standardActions = [
      { text: 'Cancle' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit.bind(this), ref: 'submit' }
    ];

    return (
      <div>
        <div className={styles.wrappper}>
              <h1 className={styles.headder}>{this.props.internationalReducer.activeLanguage.strings.Willkommen}</h1>
            </div>
            <Dialog
              ref="standardDialog"
              title={this.state.dialogTitle}
              actions={standardActions}
              actionFocus="Submit"
              open={this.state.openDialogStandardActions}
              onRequestClose={this._handleRequestClose.bind(this)}>
              {this.state.dialogText}
            </Dialog>
            <Dropzone onDrop={this._handleDrop.bind(this)} multiple={false} className={styles.dropzone}>
              <span>{this.props.internationalReducer.activeLanguage.strings.DropFile}</span>
            </Dropzone>
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
    internationalReducer: state.internationalReducer
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, dispatch => ({ dispatch }))(UploadXML)



