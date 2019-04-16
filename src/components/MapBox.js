import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoic2JyaWowMDEiLCJhIjoiY2p1aW0yZHQzMWMzbjRlbzJudzB6NTF1aiJ9.8-Rua1jqswDZdsXONl3xoA'
});

const mapProps = {
  center: [-73.9875009, 40.7006959],
  zoom: [10],
  style: 'mapbox://styles/sbrij001/cjuipvp6c09vx1fnqvjvq66yj'
};


class MapBox extends Component {
  state = {
    UserLocation: {}
  }

  // getUserLocation = () => {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     let userCoordinates = (position.coords.latitude, position.coords.longitude)
  //   });
  //   this.setState({
  //     UserLocation: userCoordinates
  //   })
  // }

  // {this.getUserLocation()}

  render() {

    return (
      <div>
      <h1>SHITTTTTTTTT</h1>
      <Map
        {...mapProps}
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
      </Map>
      </div>
    );
  }
}

export default MapBox;
