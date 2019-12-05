import React,{ Component } from 'react'
import MapGL, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import DeckGL, { PathLayer } from "deck.gl";
import SiteWrapper from '../SiteWrapper';
import Drawer from 'rc-drawer';
import { Container, Header, Grid, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import "rc-drawer/assets/index.css";
import Places from './Places';
import _ from 'lodash';
import Weather from './Weather';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import restaurant from '../assets/images/restaurants.png';
import hotels from '../assets/images/hotels.png';
import shopping from '../assets/images/shopping.png';
import coffee from '../assets/images/coffee-n-tea.png';
import place from '../assets/images/default.png';
import PlaceDetails from './PlaceDetails';

const TOKEN = 'pk.eyJ1IjoidGFoaTE5OTAiLCJhIjoiY2szNzZ4eWlpMDhxdTNjbzltMGJvYzAzZSJ9.IRSxzzNjXV8Wc5sQ73i7lQ';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';
const OPEN_WEATHER_API_KEY = '8df63dbda6463515fcd2bcd1b81c2f14'
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const style = {
    position: 'absolute',
    bottom: 115,
    right: 0,
    margin: 10
};

const fullscreenControlStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px'
};

const navStyle = {
    position: 'absolute',
    bottom: 15,
    right: 0,
    padding: '10px'
};

class Map extends Component {

    state = {
        viewport :{
            width: "100%",
            height: 600,
            latitude: 0,
            longitude: 0,
            zoom: 10,
            bearing: 0,
            pitch: 0
        },
        layer: null,
        markers: [],
        currentLocation: null,
        mounted: false,
        search: true,
        details: false,
        loading: false
    };

    mapRef = React.createRef();

    handleViewportChange = viewport => {
        if (this.state.mounted) {
            this.setState({
                viewport: { ...this.state.viewport, ...viewport }
            })
        }
    };

    componentDidMount () {
        this.setState({ mounted: true });
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                viewport: {
                    width: "100%",
                    height: 600,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    zoom: 13,
                    bearing: 0,
                    pitch: 0
                },
                currentLocation: {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                }
            });

            if(position.coords.latitude > 0 || position.coords.longitude > 0)
            {
                console.log('did mount')
                this.loadWeatherData(position.coords.latitude, position.coords.longitude)
            }

        });
    }

    handleSearch = (place_id) => {
        this.requestPlace(place_id).then((data)=>{
                this.setState({
                    viewport: {
                        latitude: data.result.geometry.location.lat,
                        longitude: data.result.geometry.location.lng
                    }
                })
            });
    }

    loadPanel = () => {
        const search = this.state.search;
        const details = this.state.details;

        const {loading} = this.state;

        return (
            <Container style={{ padding: '1em' }}>
                {/*<Header as='h3'>Search this area</Header>*/}

                <Dimmer inverted active={loading}>
                    <Loader inverted size='medium'>Loading</Loader>
                </Dimmer>

                {
                    this.state.weatherData &&
                    (<Weather data={this.state.weatherData} />
                )}
                {console.log(this.state.weatherData)}
                <GooglePlacesAutocomplete
                    onSelect={({ place_id }) => (
                        this.handleSearch(place_id)
                      )}
                />
                {
                    search && (
                    <Grid>
                        <Grid.Column>
                            <Button icon color='teal' onClick={() => this.searchByKeyword('restaurant')}>
                                <Icon circular inverted color='teal' name='food'/>
                            </Button>
                            <Button icon color='teal' onClick={() => this.searchByKeyword('cafe')}>
                                <Icon circular inverted color='teal' name='coffee'/>
                            </Button>
                            <Button icon color='teal' onClick={() => this.searchByKeyword('lodging')}>
                                <Icon circular inverted color='teal' name='hotel'/>
                            </Button>
                            <Button icon color='teal' onClick={() => this.searchByKeyword('grocery_or_supermarket')}>
                                <Icon circular inverted color='teal' name='shopping cart'/>
                            </Button>
                        </Grid.Column>
                    </Grid>)
                }

                {
                    details && (
                        <PlaceDetails data={this.state.place} image={this.state.image} direction={this.state.direction} getDirection={this.getDirections}/>
                    )
                }

                {
                    !details && !search && (
                        <Places getDirection={this.getDirections} getPlace={this.getPlace} data={this.state.data}/>
                    )
                }

            </Container>
        );
    };

    loadMarkers = () => {
        return this.state.markers.map(marker => {
            return (
                <Marker
                    key={marker.place_id}
                    latitude={parseFloat(marker.geometry.location.lat)}
                    longitude={parseFloat(marker.geometry.location.lng)}
                >
                    <img style={{transform: `translate(${-20 / 2}px,${-27}px)`}} height={27} width={20} src={marker.icon} alt="" />
                </Marker>
            );
        });
    };

    searchByKeyword = (keyword) => {
        const params = {
            location: this.state.currentLocation.latitude + ',' + this.state.currentLocation.longitude,
            radius: 2000,
            type: keyword,
            key: GOOGLE_API_KEY
        };

        let icon = '';
        switch (keyword) {
            case 'restaurant': {
                icon = restaurant;
                break;
            }

            case 'cafe': {
                icon = coffee;
                break;
            }

            case 'lodging': {
                icon = hotels;
                break;
            }

            case 'grocery_or_supermarket': {
                icon = shopping;
                break;
            }

            default: {
                icon = place;
                break;
            }
        }

        this.setState({
            loading: true
        });

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(res => res.json())
            .then((data)=>{

                data.results.forEach(result => result.icon = icon);

                this.setState({
                    data: data.results,
                    markers: data.results,
                    viewport: {
                        width: "100%",
                        height: 600,
                        longitude: this.state.viewport.longitude,
                        latitude: this.state.viewport.latitude,
                        zoom: 13,
                        bearing: 0,
                        pitch: 0
                    },
                    search: false,
                    loading: false
                })
            });
    };

    loadWeatherData = (lat,long) => {
        const params = {
            lat: lat,
            lon: long,
            units: 'metric',
            appid: OPEN_WEATHER_API_KEY
        };

        const url = new URL(OPEN_WEATHER_API_URL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(res => res.json())
            .then((data)=>{
                if(data.cod === 200)
                {
                    this.setState({
                        weatherData: data
                    })
                }
            });
    };

    requestPlace = (id) => {
        const params = {
            place_id: id,
            key: GOOGLE_API_KEY,
            language: 'en'
        };

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url).then(res => res.json());
    };
    
    getPlace = (id) => {
        this.setState({
            loading: true
        });

        this.requestPlace(id).then((data)=>{
           this.setState({
               place: data.result,
               markers: [data.result],
               details: true,
               loading: false
           });

           // this.getPlacePhoto()
        });
    };

    getPlacePhoto = (reference) => {
        const params = {
            photoreference: reference,
            maxwidth: 400,
            key: GOOGLE_API_KEY,
        };

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url).then(res => res.blob())
            .then(convertBlobToBase64)
            .then(image => {
                this.setState({
                    image: image
                });
            });
    };

    getDirections = (lng, lat, type) => {

        const params = {
            access_token: TOKEN,
            geometries: 'geojson',
            overview: 'full',
            steps: true,
            language: 'en'
        };

        const url = new URL('https://api.mapbox.com/directions/v5/mapbox/' + type + '/' + this.state.currentLocation.longitude + ',' + this.state.currentLocation.latitude + ';' + lng + ',' + lat);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        this.setState({
            loading: true
        });

        fetch(url).then(res => res.json())
            .then((response) => {
                console.log(response);
                const path = response.routes[0].geometry.coordinates;

                const start = [{
                    name: "start",
                    color: [169, 169, 169],
                    path: [
                        [this.state.currentLocation.longitude, this.state.currentLocation.latitude],
                        path[0]
                    ]
                }];

                const data = [{
                    name: "random-name",
                    color: [101, 147, 245],
                    path: path
                }];

                const end = [{
                    name: "end",
                    color: [169, 169, 169],
                    path: [
                        path[path.length - 1],
                        [lng, lat]
                    ]
                }];

                const layer = [
                    new PathLayer({
                        id: "start-layer",
                        data: start,
                        getWidth: data => 4,
                        getColor: data => data.color,
                        widthMinPixels: 4,
                        rounded: true
                    }),
                    new PathLayer({
                        id: "path-layer",
                        data,
                        getWidth: data => 4,
                        getColor: data => data.color,
                        widthMinPixels: 4,
                        rounded: true
                    }),
                    new PathLayer({
                        id: "end-layer",
                        data: end,
                        getWidth: data => 4,
                        getColor: data => data.color,
                        widthMinPixels: 4,
                        rounded: true
                    }),
                ];

                this.setState({
                    layer: layer,
                    direction: response.routes[0].legs,
                    loading: false
                });
            });

    };

    onClickGeolocate = (event) => {
        console.log('Update location');

        this.setState({
            currentLocation: {
                longitude: event.viewState.longitude,
                latitude: event.viewState.latitude,
            }
        })
    };

    render() {
        const { viewport, layer } = this.state;

        return(
            <div>
            <SiteWrapper>
                <div style={{
                    position: "relative",
                    overflow: "hidden",
                    transform: "translate(0)"
                }}>

                    <Drawer
                        width="25vw"
                        getContainer={null}
                        showMask={false}
                        defaultOpen={true}
                    >
                        {this.loadPanel()}
                        {console.log(this.state)}
                        {/*<div className="card">*/}
                        {/*    <div className="card-body">*/}
                        {/*        <CardLink onClick={this.searchRestaurant} href="#">*/}
                        {/*            <FontAwesomeIcon icon={faCoffee} />*/}
                        {/*        </CardLink>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </Drawer>

                    <MapGL
                        ref={this.mapRef}
                        {...viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        onViewportChange={this.handleViewportChange}
                        mapboxApiAccessToken={TOKEN}
                    >
                        <DeckGL
                            viewState={viewport}
                            layers={layer}
                        />

                        {this.loadMarkers()}

                        { this.state.currentLocation && (
                            <Marker
                                ref={this.mapRef}
                                className="mapboxgl-user-location-dot"
                                longitude={this.state.currentLocation.longitude}
                                latitude={this.state.currentLocation.latitude}
                            />
                        )}

                        <GeolocateControl
                            style={style}
                            onViewStateChange={this.onClickGeolocate}
                            positionOptions={{enableHighAccuracy: true}}
                            trackUserLocation={true}
                        />

                        <div className="fullscreen" style={fullscreenControlStyle}>
                            <FullscreenControl />
                        </div>
                        <div className="nav" style={navStyle}>
                            <NavigationControl />
                        </div>

                    </MapGL>
                </div>
            </SiteWrapper>
            </div>
        )
    }

}

const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

export default Map;
