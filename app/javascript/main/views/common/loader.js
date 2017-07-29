import React, {Component} from 'react'

export default class LoaderComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            Is loading...
          </div>
        </div>
      </div>
    )
  }
}