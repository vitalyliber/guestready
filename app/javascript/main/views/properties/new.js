import React from 'react'

export default class New extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      address: '',
      bedrooms_number: '',
      bathrooms_number: '',
      size: 1
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <div className="row">
        <div className="col">
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}