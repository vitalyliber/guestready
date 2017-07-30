import React, {Component} from 'react'
import axios from 'axios'
import { UncontrolledAlert } from 'reactstrap'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { browserHistory } from 'react-router'
import { createProperty } from './../api'

export default class NewPropertyComponent extends Component {
  constructor(props) {
    super(props)

    this.resetPropertyParams()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.createProperty = this.createProperty.bind(this)
    this.addressOnChange = (address) => this.setState({ address })
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  resetPropertyParams = () => {
    this.state = {
      name: '',
      address: '',
      bedrooms_number: '',
      bathrooms_number: '',
      size: '',
      errors: []
    }
  }

  createProperty(e) {
    e.preventDefault()



    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then( (lat_lng) => {

        createProperty(
          {
            name: this.state.name,
            address: this.state.address,
            bedrooms_number: this.state.bedrooms_number,
            bathrooms_number: this.state.bathrooms_number,
            size: this.state.size,
            lat: lat_lng.lat,
            lng: lat_lng.lng
          },
          () => {},
          () => {
            this.resetPropertyParams()
            this.props.history.push('/properties')
          },
          () => (
            this.setState({
              errors: error.response.data.errors
            })
          )
        )

      })
      .catch( (error) => {
        console.error('Error', error);
        this.setState({errors: [{attribute: 'address', message: 'is not valid'}]})
      })
  }

  render() {
    const addressClasses = {
      input: 'form-control'
    }

    const inputProps = {
      value: this.state.address,
      onChange: this.addressOnChange,
      placeholder: 'Address',
      name: 'address'
    }

    return(
      <div className="row">
        <div className="col">

          { this.state.errors.map(( (error, index) => {
            return(
              <UncontrolledAlert key={index} color="danger">
                <strong>{error.attribute}</strong> {error.message}
              </UncontrolledAlert>
            )
          }))}

          <form>
            <div className="form-group">
              <input type="text" name="name" onChange={this.handleInputChange}
                     className="form-control" placeholder="Name" value={this.state.name}/>
            </div>
            <div className="form-group">
              <PlacesAutocomplete inputProps={inputProps} classNames={addressClasses} placeholder="Address"/>
            </div>
            <div className="form-group">
              <input type="text" name="bedrooms_number" onChange={this.handleInputChange}
                     className="form-control" placeholder="Number of bedrooms" value={this.state.bedrooms_number}/>
            </div>
            <div className="form-group">
              <input type="text" name="bathrooms_number" onChange={this.handleInputChange}
                     className="form-control" placeholder="Number of bathrooms" value={this.state.bathrooms_number}/>
            </div>
            <div className="form-group">
              <input type="text" name="size" onChange={this.handleInputChange}
                     className="form-control" placeholder="Size in square meters" value={this.state.size}/>
            </div>
            <button type="submit" onClick={this.createProperty} className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}