import NewProperty from './views/properties/new'
import Properties from './views/properties/index'
import Dashboard from './views/dashboard/index'
import NotFound from './views/public/not_found'
import ReactDOM from 'react-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/autosuggest.sass'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Navbar from './views/common/navbar'

ReactDOM.render(
<Router>
  <div className="container">

    <Navbar/>

    <br/>

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