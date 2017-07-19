import NewProperty from './views/properties/new'
import Properties from './views/properties/index'
import Dashboard from './views/dashboard/index'
import NotFound from './views/public/not_found'
import ReactDOM from 'react-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


ReactDOM.render(
<Router>
  <div className="container">

    <div className="row">
      <div className="col mt-2">
        <Link to="/">GuestReady!</Link>
      </div>
    </div>

    <hr/>
    <Switch>
      <Route exact path="/" component={Dashboard}></Route>
      <Route exact path="/properties/new" component={NewProperty}/>
      <Route exact path="/properties" component={Properties}/>
      <Route path="*" component={NotFound} />
    </Switch>


  </div>
</Router>,
  document.body.appendChild(document.createElement('div')),
)