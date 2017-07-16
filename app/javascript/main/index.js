import New from './properties/new'
import Dashboard from './dashboard/index'
import ReactDOM from 'react-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {
  BrowserRouter as Router,
  Route,
  Link
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

    <Route exact path="/" component={Dashboard}/>
    <Route exact path="/pages/:id" component={New}/>

  </div>
</Router>,
  document.body.appendChild(document.createElement('div')),
)