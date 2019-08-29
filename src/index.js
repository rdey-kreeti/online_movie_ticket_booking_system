import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import AdminDashboard from './components/AdminDashboard';
import Theatres from './components/Theatres';
import AddTheatre from './components/AddTheatre';
import Movies from './components/Movies';
import AddMovie from './components/AddMovie';

const Routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/admin-dashboard' component={AdminDashboard} />
      <Route exact path='/theatres' component={Theatres} />
      <Route exact path='/add-theatre' component={AddTheatre} />
      <Route exact path='/movies' component={Movies} />
      <Route exact path='/add-movie' component={AddMovie} />
    </Switch>
  </Router>
)

ReactDOM.render(Routing, document.getElementById('root'));
