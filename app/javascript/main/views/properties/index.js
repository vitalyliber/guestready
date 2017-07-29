import React, {Component} from 'react'
import axios from 'axios'
import { Card, CardText, CardBlock, CardTitle, CardSubtitle, CardColumns } from 'reactstrap'
import { InputGroup, InputGroupButton } from 'reactstrap'
import Autosuggest from 'react-autosuggest'
import isEmpty from 'is-empty'

export default class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      properties: [],
      value: '',
      suggestions: [],
      isLoading: false
    }

    this.properties = this.properties.bind(this)
  }

  componentWillMount() {
    this.properties(null)
  }

  properties(name) {
    let search_name = isEmpty(name) ? '' : `?name=${name}`

    axios.get(`/api/v1/properties${search_name}`)
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

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim())

    if (escapedValue === '') {
      return []
    }

    if (escapedValue.trim().length < 3) {
      return []
    }

    const regex = new RegExp('^' + escapedValue, 'i')

    axios.get(`/api/v1/properties?name=${escapedValue}`)
      .then(function (response) {
        console.log(response)
        this.setState({
          suggestions: response.data
        });
      }.bind(this))
      .catch(function (error) {
        console.log(error.response.status)
      }.bind(this))
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    )
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value)
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: "Type 'name of property'...",
      value,
      onChange: this.onChange
    }

    return(
      <div className="row">
        <div className="col">

          <InputGroup className="mb-4">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={() => this.properties(this.state.value)}/>

            <InputGroupButton onClick={() => this.properties(this.state.value)} color="success">Search</InputGroupButton>
          </InputGroup>

          <CardColumns>
            { this.state.properties.map(( (property, index) => {
              return(
                <Card key={index} className="mb-4">
                  <CardBlock>
                    <CardTitle>{property.name}</CardTitle>
                    <CardSubtitle>{property.address}</CardSubtitle>
                    <CardText>Size: {property.size}, Bedrooms: {property.bedrooms_number}, Bathrooms: {property.bathrooms_number}</CardText>
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