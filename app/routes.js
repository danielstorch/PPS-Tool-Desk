import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/index';
import AnleitungPage from './containers/anleitung';
import DownloadPage from './containers/download';
import KapazitaetsplanungPage from './containers/kapazitaetsplanung';
import KaufteildispositionPage from './containers/kaufteildisposition';
import UploadPage from './containers/upload';
import DamenPage from './containers/auftragsplanung/damen';
import GesamtPage from './containers/auftragsplanung/gesamt';
import HerrenPage from './containers/auftragsplanung/herren';
import KinderPage from './containers/auftragsplanung/kinder';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/anleitung" component={AnleitungPage} />
    <Route path="/download" component={DownloadPage} />
    <Route path="/kapazitaetsplanung" component={KapazitaetsplanungPage} />
    <Route path="/kaufteildisposition" component={KaufteildispositionPage} />
    <Route path="/auftragsplanung/damen" component={DamenPage} />
    <Route path="/auftragsplanung/herren" component={HerrenPage} />
    <Route path="/auftragsplanung/kinder" component={KinderPage} />
    <Route path="/auftragsplanung/gesamt" component={GesamtPage} />
  </Route>
);
