import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { Component } from 'react'
import MapGL, {Marker, _MapContext as MapContext, NavigationControl} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import Pin from './Pin';
import ControlPanel from './ControlPanel';

const token = 'pk.eyJ1IjoidGFoaTE5OTAiLCJhIjoiY2szNzZ4eWlpMDhxdTNjbzltMGJvYzAzZSJ9.IRSxzzNjXV8Wc5sQ73i7lQ';
const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
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

        fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + event.result.geometry.coordinates[0] + ',' + event.result.geometry.coordinates[1] + '.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1574706366527&autocomplete=false')
            .then(res => res.json())
            .then((data) => {
                this._logDragEvent( 'address', data);
            });

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

    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event
            }
        });
    }

    _onMarkerDragStart = event => {
        this._logDragEvent('onDragStart', event);
    };

    _onMarkerDrag = event => {
        this._logDragEvent('onDrag', event);
    };

    _onMarkerDragEnd = event => {
        this._logDragEvent('onDragEnd', event);
        this.setState({
            coordinate: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
            }
        });

        fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + event.lngLat[0] + ',' + event.lngLat[1] + '.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1574706366527&autocomplete=false')
            .then(res => res.json())
            .then((data) => {
                this._logDragEvent( 'address', data);
            });
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
                         onDragStart={this._onMarkerDragStart}
                         onDrag={this._onMarkerDrag}
                         onDragEnd={this._onMarkerDragEnd}
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

                    <ControlPanel
                        containerComponent={this.props.containerComponent}
                        events={this.state.events}
                    />



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
