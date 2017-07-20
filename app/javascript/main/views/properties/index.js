import React from 'react'
import axios from 'axios'
import { Card, CardText, CardBlock, CardTitle, CardSubtitle, Button, CardColumns } from 'reactstrap';

export default class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      properties: []
    };

    this.properties = this.properties.bind(this);
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
          <CardColumns>
            { this.state.properties.map(( (property, index) => {
              return(
                <Card key={index} className="mb-4">
                  <CardBlock>
                    <CardTitle>{property.name}</CardTitle>
                    <CardSubtitle>{property.address}</CardSubtitle>
                    <CardText>Size: {property.address}, Bedrooms: {property.bedrooms_number}, Bathrooms: {property.bathrooms_number}</CardText>
                  </CardBlock>
                </Card>
              )
            }))}
          </CardColumns>
        </div>
      </div>
    )
  }
}