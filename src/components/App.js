import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import ComplaintList from './ComplaintList'
import SubmitComplaint from '../pages/SubmitComplaint'

export default () => (
  <div className='center w85'>
    <Header />
    <div className='ph3 pv1 background-gray'>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/' component={ComplaintList}/>
        <Route exact path='/submit' component={SubmitComplaint}/>
      </Switch>
    </div>
  </div>
);
