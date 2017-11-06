import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { setDisplayName } from 'recompose';
import Complaint from '../pages/Complaint';
import HotComplaints from '../pages/HotComplaints';
import NewComplaints from '../pages/NewComplaints';
import SignIn from '../pages/SignIn';
import SubmitComplaint from '../pages/SubmitComplaint'
import Header from './Header';

const enhance = setDisplayName('App');

export default enhance(() => (
  <div className='center w85'>
    <Header />
    <div className='ph3 pv1 background-gray'>
      <Switch>
        <Route exact path='/' component={HotComplaints} />
        <Route exact path='/complaints/:complaintId' component={Complaint} />
        <Route exact path='/new' component={NewComplaints} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/submit' component={SubmitComplaint} />
      </Switch>
    </div>
  </div>
));
