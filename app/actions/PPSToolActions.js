

/*
 *
 * language action creators and types
 */
export const SET_LANGUAGE = 'SET_LANGUAGE'

export function setLanguage(languagee) {
  return { type: SET_LANGUAGE, languagee}
}

/*
 *
 * InputXMLReducer action creators and types
 */
export const SET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML = 'SET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML'
export const SET_AUFTRAGSPLANUNG_KINDER_INPUT_XML = 'SET_AUFTRAGSPLANUNG_KINDER_INPUT_XML'
export const SET_AUFTRAGSPLANUNG_HERREN_INPUT_XML = 'SET_AUFTRAGSPLANUNG_HERREN_INPUT_XML'
export const SET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML = 'SET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML'
export const RESET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML = 'RESET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML'
export const RESET_AUFTRAGSPLANUNG_HERREN_INPUT_XML = 'RESET_AUFTRAGSPLANUNG_HERREN_INPUT_XML'
export const RESET_AUFTRAGSPLANUNG_KINDER_INPUT_XML = 'RESET_AUFTRAGSPLANUNG_KINDER_INPUT_XML'
export const RESET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML = 'RESET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML'
export const SET_KAPAZITAETSPLANUNG_INPUT_XML = 'SET_KAPAZITAETSPLANUNG_INPUT_XML'
export const RESET_KAPAZITAETSPLANUNG_INPUT_XML = 'RESET_KAPAZITAETSPLANUNG_INPUT_XML'
export const SET_KAUFTEILDISPOSITION_INPUT_XML = 'SET_KAUFTEILDISPOSITION_INPUT_XML'
export const RESET_KAUFTEILDISPOSITION_INPUT_XML = 'RESET_KAUFTEILDISPOSITION_INPUT_XML'
export const SAVE_INPUT_XML = 'SAVE_INPUT_XML'

export function saveInputXML(inputXML) {
  return { type: SAVE_INPUT_XML, inputXML}
}

export function setAuftragsplanungGesamtInputXML(auftragsplanungGesamt, id) {
  return { type: SET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML, auftragsplanungGesamt, id}
}

export function resetAuftragsplanungGesamtInputXML(id) {
  return { type: RESET_AUFTRAGSPLANUNG_GESAMT_INPUT_XML, id}
}
export function setAuftragsplanungHerrenInputXML(auftragsplanungHerren, id) {
  return { type: SET_AUFTRAGSPLANUNG_HERREN_INPUT_XML, auftragsplanungHerren, id}
}

export function resetAuftragsplanungHerrenInputXML(id) {
  return { type: RESET_AUFTRAGSPLANUNG_HERREN_INPUT_XML, id}
}

export function setAuftragsplanungDamenInputXML(auftragsplanungDamen, id) {
  return { type: SET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML, auftragsplanungDamen ,id}
}

export function resetAuftragsplanungDamenInputXML(id) {
  return { type: RESET_AUFTRAGSPLANUNG_DAMEN_INPUT_XML, id}
}

export function setAuftragsplanungKinderInputXML(auftragsplanungKinder, id) {
  return { type: SET_AUFTRAGSPLANUNG_KINDER_INPUT_XML, auftragsplanungKinder, id}
}

export function resetAuftragsplanungKinderInputXML(id) {
  return { type: RESET_AUFTRAGSPLANUNG_KINDER_INPUT_XML, id}
}

export function setKapazitaetsplanungInputXML(kapazitaetsplanung, id) {
  return { type: SET_KAPAZITAETSPLANUNG_INPUT_XML, kapazitaetsplanung, id}
}

export function resetKapazitaetsplanungInputXML(id) {
  return { type: RESET_KAPAZITAETSPLANUNG_INPUT_XML, id}
}

export function setKaufteildispositionInputXML(kaufteildisposition, id) {
  return { type: SET_KAUFTEILDISPOSITION_INPUT_XML, kaufteildisposition, id}
}

export function resetKaufteildispositionInputXML(id) {
  return { type: RESET_KAUFTEILDISPOSITION_INPUT_XML, id}
}


/*
 * ActiveUploadXMLReducer action creators and types
 */
export const SET_ACTIVE_UPLOAD_RESULTS_XML_DATA = 'SET_ACTIVE_UPLOAD_RESULTS_XML_DATA'

export function setActiveUploadResultsXMLData(activeUploadResultsXML) {
  return { type: SET_ACTIVE_UPLOAD_RESULTS_XML_DATA, activeUploadResultsXML}
}
/*
 * Navigation action creators and types
 */
export const CLOSE_OPEN_NAV_LEFT = 'CLOSE_OPEN_NAV_LEFT'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export function closeOpenNavLeft(trueOrFalseValue) {
  return { type: CLOSE_OPEN_NAV_LEFT, trueOrFalseValue}
}

export function setCurrentPage(newPage) {
  return { type: SET_CURRENT_PAGE, newPage}
}

/*
 * UploadXMLReducer action creators and types
 */

export const SAVE_UPLOAD_RESULTS_XML = 'SAVE_UPLOAD_XML'
export const REMOVE_UPLOAD_RESULTS_XML = 'REMOVE_UPLOAD_RESULTS_XML'
export const OVERRWRITE_UPLOAD_RESULTS_XML = 'OVERRWRITE_UPLOAD_RESULTS_XML'


export function saveUploadResultsXML(uploadedResultsXML) {
  return { type: SAVE_UPLOAD_RESULTS_XML, uploadedResultsXML }
}

export function removeUploadResultsXML(id) {
  return { type: REMOVE_UPLOAD_RESULTS_XML, id }
}

export function overrwriteUploadResultsXML(uploadedResultsXML) {
  return { type: OVERRWRITE_UPLOAD_RESULTS_XML, uploadedResultsXML }
}