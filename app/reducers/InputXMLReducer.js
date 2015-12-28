import {SAVE_INPUT_XML,SET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML, SET_AUFTRAGSPLANUNG_HERREN_INPUT_XML, 
  SET_AUFTRAGSPLANUNG_KINDER_INPUT_XML, SET_KAPAZITAETSPLANUNG_INPUT_XML, SET_KAUFTEILDISPOSITION_INPUT_XML, 
  INIT_INPUT_XML , SET_INPUT_XML, RESET_AUFTRAGSPLANUNG_HERREN_INPUT_XML, RESET_AUFTRAGSPLANUNG_KINDER_INPUT_XML,
  RESET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML, SET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML, RESET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML,
RESET_KAPAZITAETSPLANUNG_INPUT_XML, RESET_KAUFTEILDISPOSITION_INPUT_XML}  from '../actions/PPSToolActions'

export default function InputXMLReducer(state = [], action) {
  switch (action.type) {
    case SAVE_INPUT_XML:
        return [
          ...state,
          {
            id: "input_P" + action.inputXML.results.$.period,
            inputDataObject: action.inputXML
          }
        ]
    case RESET_KAUFTEILDISPOSITION_INPUT_XML:
      return state.map(inputXML =>
          inputXML.id.substring(6) === action.id.substring(7) ?
            Object.assign({}, inputXML, delete inputXML.inputDataObject.kaufteildisposition) : inputXML)
    case RESET_KAPAZITAETSPLANUNG_INPUT_XML:
      return state.map(inputXML =>
          inputXML.id.substring(6) === action.id.substring(7) ?
            Object.assign({}, inputXML, delete inputXML.inputDataObject.kapazitaetsplanung) : inputXML)
    case RESET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML:
      return state.map(inputXML =>
          inputXML.id.substring(6) === action.id.substring(7) ?
            Object.assign({}, inputXML, delete inputXML.inputDataObject.auftragsplanungDamen) : inputXML)
    case RESET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML:
      return state.map(inputXML =>
          inputXML.id.substring(6) === action.id.substring(7) ?
            Object.assign({}, inputXML, delete inputXML.inputDataObject.auftragsplanungGesamt) : inputXML)
    case RESET_AUFTRAGSPLANUNG_HERREN_INPUT_XML:
      return state.map(inputXML =>
          inputXML.id.substring(6) === action.id.substring(7) ?
            Object.assign({}, inputXML, delete inputXML.inputDataObject.auftragsplanungHerren) : inputXML)
    case RESET_AUFTRAGSPLANUNG_KINDER_INPUT_XML:
    return state.map(inputXML =>
          inputXML.id.substring(6) === action.id.substring(7) ?
            Object.assign({}, inputXML, delete inputXML.inputDataObject.auftragsplanungKinder) : inputXML)
    case SET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML:
       let givenObjDamen = state.filter(inputXML => inputXML.id.substring(6) === action.id.substring(7))[0]

       console.log(givenObjGesamt)
        if(givenObjDamen.inputDataObject.auftragsplanungDamen){
          givenObjDamen.inputDataObject.auftragsplanungDamen = action.auftragsplanungDamen
        }else{
          givenObjDamen.inputDataObject['auftragsplanungDamen'] = action.auftragsplanungDamen
        }

        var lol = state.map(inputXML => inputXML.id.substring(6) === action.id.substring(7) ? Object.assign({}, inputXML, givenObjDamen) : inputXML)
        return lol
    case SET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML:

        let givenObjGesamt = state.filter(inputXML => inputXML.id.substring(6) === action.id.substring(7))[0]

        
        if(givenObjGesamt.inputDataObject.auftragsplanungGesamt){
          givenObjGesamt.inputDataObject.auftragsplanungGesamt = action.auftragsplanungGesamt
        }else{
          givenObjGesamt.inputDataObject['auftragsplanungGesamt'] = action.auftragsplanungGesamt
        }
        
        return state.map(inputXML => inputXML.id.substring(6) === action.id.substring(7) ? Object.assign({}, inputXML, givenObjGesamt) : inputXML)

    case SET_AUFTRAGSPLANUNG_HERREN_INPUT_XML:
      let givenObjHerren = state.filter(inputXML => inputXML.id.substring(6) === action.id.substring(7))[0]

        if(givenObjHerren.inputDataObject.auftragsplanungHerren){
          givenObjHerren.inputDataObject.auftragsplanungHerren = action.auftragsplanungHerren
        }else{
          givenObjHerren.inputDataObject['auftragsplanungHerren'] = action.auftragsplanungHerren
        }

        return state.map(inputXML => inputXML.id.substring(6) === action.id.substring(7) ? Object.assign({}, inputXML, givenObjHerren) : inputXML)
    case SET_AUFTRAGSPLANUNG_KINDER_INPUT_XML:
      let givenObjKinder = state.filter(inputXML => inputXML.id.substring(6) === action.id.substring(7))[0]

        if(givenObjKinder.inputDataObject.auftragsplanungKinder){
          givenObjKinder.inputDataObject.auftragsplanungKinder = action.auftragsplanungKinder
        }else{
          givenObjKinder.inputDataObject['auftragsplanungKinder'] = action.auftragsplanungKinder
        }

        return state.map(inputXML => inputXML.id.substring(6) === action.id.substring(7) ? Object.assign({}, inputXML, givenObjKinder) : inputXML)
    case SET_KAPAZITAETSPLANUNG_INPUT_XML:

        let givenObjKapazitaetsplanung = state.filter(inputXML => inputXML.id.substring(6) === action.id.substring(7))[0]

        if(givenObjKapazitaetsplanung.inputDataObject.kapazitaetsplanung){
          givenObjKapazitaetsplanung.inputDataObject.kapazitaetsplanung = action.kapazitaetsplanung
        }else{
          givenObjKapazitaetsplanung.inputDataObject['kapazitaetsplanung'] = action.kapazitaetsplanung
        }

        return state.map(inputXML => inputXML.id.substring(6) === action.id.substring(7) ? Object.assign({}, inputXML, givenObjKapazitaetsplanung) : inputXML)
    case SET_KAUFTEILDISPOSITION_INPUT_XML:

        let givenObjKaufteildisposition = state.filter(inputXML => inputXML.id.substring(6) === action.id.substring(7))[0]

        if(givenObjKaufteildisposition.inputDataObject.kaufteildisposition){
          givenObjKaufteildisposition.inputDataObject.kaufteildisposition = action.kaufteildisposition
        }else{
          givenObjKaufteildisposition.inputDataObject['kaufteildisposition'] = action.kaufteildisposition
        }

        return state.map(inputXML => inputXML.id.substring(6) === action.id.substring(7) ? Object.assign({}, inputXML, givenObjKaufteildisposition) : inputXML)
    default:
      return state
  }
}