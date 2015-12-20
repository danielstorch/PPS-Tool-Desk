import {SET_LANGUAGE} from '../actions/PPSToolActions'


const initialState = {
  activeLanguage: {
      id: 'DE',
      strings : {
        Home:'Home',
        Anleitung: 'Tool Anleitung',
        Auftragsplanung: 'Auftragsplanung',
        Gesamt: 'Gesamt',
        Damen: 'Damen',
        Herren: 'Herren',
        Kinder: 'Kinder',
        Kaufteildisposition: 'Kaufteildisposition',
        Upload: 'Upload',
        Kapazitaetsplanung: 'Kapazitätsplanung',
        Download:'Download',
        Settings:'Settings',
        TippsundTricks:'Tipps und Tricks',
        Metriken:'Metriken'
      }},
      languages:[{
            id: 'DE',
            strings : {
              Home:'Home',
              Anleitung: 'Tool Anleitung',
              Auftragsplanung: 'Auftragsplanung',
              Gesamt: 'Gesamt',
              Damen: 'Damen',
              Herren: 'Herren',
              Kinder: 'Kinder',
              Kaufteildisposition: 'Kaufteildisposition',
              Upload: 'Upload',
              Kapazitaetsplanung: 'Kapazitätsplanung',
              Download:'Download',
              Settings:'Settings',
              TippsundTricks:'Tipps und Tricks',
              Metriken:'Metriken'
            }},
            {
            id: 'EN',
            strings : {
              Home:'Home',
              Anleitung: 'Tool instructions',
              Auftragsplanung: 'Order planning',
              Gesamt: 'Total',
              Damen: 'Women',
              Herren: 'Menn',
              Kinder: 'Children',
              Kaufteildisposition: 'Purchas planning',
              Upload: 'Upload',
              Kapazitaetsplanung: 'Capacity Planning',
              Download:'Download',
              Settings:'Settings',
              TippsundTricks:'Tips and Tricks',
              Metriken:'Metrics'
            }}
]}


export default function internationalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
    console.log('dssdsds')
  var statelol = state
    statelol.activeLanguage = action.languagee
        return statelol//
    default:
      return state
  }
}