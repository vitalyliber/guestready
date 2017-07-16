import React from 'react'

export default class NotFound extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
    )
  }
}