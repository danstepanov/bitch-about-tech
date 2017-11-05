import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import LinkList from './LinkList'
import CreateLink from './CreateLink'

export default () => (
  <div className='center w85'>
    <Header />
    <div className='ph3 pv1 background-gray'>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/' component={LinkList}/>
        <Route exact path='/create' component={CreateLink}/>
      </Switch>
    </div>
  </div>
);
