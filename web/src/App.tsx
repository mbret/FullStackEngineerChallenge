import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { SubmitFeedbackScreen } from './reviews/SubmitFeedbackScreen';
import { HomeScreen } from './home/HomeScreen';
import { ManageEmployeesScreen } from './employees/ManageEmployeesScreen';
import { ManagePerformanceReviews } from './reviews/ManagePerformanceReviews';

function App() {
  return (
    <Router>
      <div><Link to="/home">home</Link></div>
      <div><Link to="/manage-employees">manage-employees</Link></div>
      <div><Link to="/manage-performance-reviews">manage-performance-reviews</Link></div>
      <Switch>
        <Route path="/submit-feedback">
          <SubmitFeedbackScreen />
        </Route>
        <Route path="/manage-employees">
          <ManageEmployeesScreen />
        </Route>
        <Route path="/manage-performance-reviews">
          <ManagePerformanceReviews />
        </Route>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
