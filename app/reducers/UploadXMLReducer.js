import { SAVE_UPLOAD_RESULTS_XML, OVERRWRITE_UPLOAD_RESULTS_XML, REMOVE_UPLOAD_RESULTS_XML, SET_ACTIVE_UPLOAD_RESULTS_XML, GET_ACTIVE_UPLOAD_RESULTS_XML } from '../actions/PPSToolActions'

export default function UploadXMLReducer(state = [], action) {
  switch (action.type) {
    case SAVE_UPLOAD_RESULTS_XML:
      return [
        ...state,
        {
          id: "result_P" + action.uploadedResultsXML.results.$.period,
          uploadedResultsDataObject: action.uploadedResultsXML
        }
      ]
    case OVERRWRITE_UPLOAD_RESULTS_XML:
        var objectid = "result_P" + action.uploadedResultsXML.results.$.period
        const uploadedResultsXMLDeleted = state.filter(uploadResultXML =>
          uploadResultXML.id !== objectid
        )

        return [
          ...uploadedResultsXMLDeleted,
          {
            id: "result_P" + action.uploadedResultsXML.results.$.period,
            uploadedResultsDataObject: action.uploadedResultsXML
          }
        ]

    case REMOVE_UPLOAD_RESULTS_XML:
        return state.filter(uploadResultXML =>
          uploadResultXML.id !== action.id
        )

    case SET_ACTIVE_UPLOAD_RESULTS_XML:
        var array = state.map(uploadXML =>
            uploadXML.active === true ? Object.assign({}, uploadXML, { active: !uploadXML.active }) : uploadXML
          )

        if(action.id === 'result_P-1'){
          return array;
        }
        
        return array.map(uploadXML =>
            uploadXML.id === action.id ? Object.assign({}, uploadXML, { active: !uploadXML.active }) : uploadXML
          )
    default:
      return state
  }
}