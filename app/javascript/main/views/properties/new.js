import React from 'react'
import axios from 'axios'
import is_blank from 'is-empty'

export default class New extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      address: '',
      bedrooms_number: '',
      bathrooms_number: '',
      size: '',
      errors: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createProperty = this.createProperty.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createProperty(e) {
    e.preventDefault()

    axios.post(`/api/v1/properties`, {
      name: this.state.name,
      address: this.state.address,
      bedrooms_number: this.state.bedrooms_number,
      bathrooms_number: this.state.bathrooms_number,
      size: this.state.size
    })
      .then(function (response) {
        console.log(response)
        this.setState({
          name: '',
          address: '',
          bedrooms_number: '',
          bathrooms_number: '',
          size: '',
          errors: []
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error.response.status)
        this.setState({
          errors: error.response.data.errors
        })
      }.bind(this))
  }

  render() {

    return(
      <div className="row">
        <div className="col">

          { this.state.errors.map(( (error, index) => {
            return(
              <div key={index} className="alert alert-danger" role="alert">
                <strong>{error.attribute}</strong> {error.message}
              </div>
            )
          }))}

          <form>
            <div className="form-group">
              <input type="text" name="name" onChange={this.handleInputChange}
                     className="form-control" placeholder="Name" value={this.state.name}/>
            </div>
            <div className="form-group">
              <input type="text" name="address" onChange={this.handleInputChange}
                     className="form-control" placeholder="Address" value={this.state.address}/>
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