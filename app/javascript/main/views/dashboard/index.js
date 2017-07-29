import React, {Component} from 'react'
import Map from './../dashboard/map'
import axios from 'axios'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      properties: []
    }
  }

  componentWillMount() {
    this.properties()
  }

  properties() {
    axios.get(`/api/v1/properties`)
      .then(function (response) {
        console.log(response)
        this.setState({
          properties: response.data
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error.response.status)
      }.bind(this))
  }

  render() {
    return(
      <div className="row">
        <div className="col">
          Hello! I am a 'dashboard page'. Fill me please!
          <Map properties={this.state.properties}/>
        </div>
      </div>
    )
  }
}