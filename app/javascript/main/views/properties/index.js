import React, {Component} from 'react'
import { Card, CardText, CardBlock, CardTitle, CardSubtitle, CardColumns } from 'reactstrap'
import { InputGroup, InputGroupButton } from 'reactstrap'
import Autosuggest from 'react-autosuggest'
import { fetchProperties } from './../api'
import Loader from './../common/loader'

export default class PropertyComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      properties: [],
      value: '',
      suggestions: [],
      isLoading: false
    }

  }

  componentWillMount() {
    this.properties(null)
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

  setSuggestions = (suggestions) => {
    this.setState({
      suggestions: suggestions
    })
  }

  properties = (name) => {
    fetchProperties(
      name,
      this.setLoading,
      this.setProperties
    )
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

    fetchProperties(
      escapedValue,
      () => (null),
      this.setSuggestions
    )
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
    const { value, suggestions, isLoading } = this.state
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

          { isLoading ? (
            <Loader/>
          ) : (
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
          )
          }


        </div>
      </div>
    )
  }
}