import React, {Component} from 'react'
import Map from './../dashboard/map'
import { fetchProperties } from './../api'
import Loader from './../common/loader'
import Average from 'average'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      properties: [],
      isLoading: false
    }
  }

  componentWillMount() {
    this.properties()
  }

  setLoading = () => {
    this.setState({
      isLoading: true
    })
  }

  setProperties = (properties) => {
    this.setState({
      properties: properties,
      isLoading: false
    })
  }

  properties() {
    fetchProperties(
      null,
      this.setLoading,
      this.setProperties
    )
  }

  render() {
    const {properties} = this.state

    if (this.state.isLoading) {
      return (
          <Loader/>
        )
    }

    return(
      <div className="row">
        <div className="col">
          <p>Number of properties: {properties.length}</p>
          <p>Average size of property: { Average(properties.map(el => el.size)).toFixed(2) }</p>
          <Map properties={properties}/>
        </div>
      </div>
    )
  }
}