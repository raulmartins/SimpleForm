import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/home'
import Users from '../components/users/Users'

export default props =>
 <Switch>
  <Route exact path='/' component={Home}/>
  <Route path='/users' component={Users}/>
  <Redirect from='*'  to='/'/>
 </Switch>
