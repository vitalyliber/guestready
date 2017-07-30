import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

export class MapContainerComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    const style = {
      width: '100%',
      height: '500px'
    }

    return (
      <div className="row">
        <div className="col-12">

          <Map  google={window.google}
                style={style}
                zoom={2}
                initialCenter={{
                  lat: 51.5285582,
                  lng: -0.2416993
                }}
                onClick={this.onMapClicked}
          >

            {this.props.properties.map((property) =>
              <Marker key={property.id}
                      name={property.name}
                      onClick={this.onMarkerClick}
                      position={{lat: property.lat, lng: property.lat}}
                      optimized={false}
              />
            )}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>

        </div>
      </div>

    )
  }
}

export default MapContainerComponent