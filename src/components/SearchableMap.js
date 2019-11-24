import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { Component } from 'react'
import MapGL, {Marker, _MapContext as MapContext, NavigationControl} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import Pin from './Pin';

const token = 'pk.eyJ1IjoidGFoaTE5OTAiLCJhIjoiY2szNzZ4eWlpMDhxdTNjbzltMGJvYzAzZSJ9.IRSxzzNjXV8Wc5sQ73i7lQ';
const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
    zIndex: 1
};

const markerStyle = {
    zIndex: 1
};

class SearchableMap extends Component {
    state = {
        viewport :{
            latitude: 0,
            longitude: 0,
            zoom: 1,
            bearing: 0,
            pitch: 0
        },
        searchResultLayer: null
    };

    mapRef = React.createRef();

    handleViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        })
    };

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        });
    };

    handleOnResult = event => {
        console.log(event.result.geometry);
        this.setState({
            coordinate: {
                longitude: event.result.geometry.coordinates[0],
                latitude: event.result.geometry.coordinates[1]
            },
            searchResultLayer: new GeoJsonLayer({
                id: "search-result",
                data: event.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10
            }),
        })
    };

    render(){
        const { viewport, searchResultLayer, coordinate} = this.state;

        let marker;
        if (coordinate) {
            marker = <Marker className="marker"
                        longitude={coordinate.longitude}
                        latitude={coordinate.latitude}
                        offsetTop={-20}
                        offsetLeft={-10}
                        draggable
                    >
                        <Pin size={20} />
                    </Marker>
        } else {

        }

        return (
            <div style={{ height: '100vh'}}>
                <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Use the search bar to find a location or click <a href="/">here</a> to find your location</h1>
                <MapGL
                    ref={this.mapRef}
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    width="100%"
                    height="90%"
                    onViewportChange={this.handleViewportChange}
                    mapboxApiAccessToken={token}
                >
                    {marker}

                    <div className="nav" style={navStyle}>
                        <NavigationControl onViewportChange={this._updateViewport} />
                    </div>

                    <Geocoder
                        mapRef={this.mapRef}
                        onResult={this.handleOnResult}
                        onViewportChange={this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={token}
                        position='top-right'
                    />
                    <DeckGL {...viewport} layers={[searchResultLayer]} ContextProvider={MapContext.Provider}/>
                </MapGL>

            </div>
        )
    }
}

export default SearchableMap;
