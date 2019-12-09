import React,{ Component } from 'react'
import MapGL, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import DeckGL, { PathLayer } from "deck.gl";
import SiteWrapper from '../SiteWrapper';
import Drawer from 'rc-drawer';
import { Container, Header, Grid, Button, Icon, Dimmer, Loader, Divider, Modal, Image, Input } from 'semantic-ui-react'
import "rc-drawer/assets/index.css";
import Places from '../components/Places';
import Pin from '../components/Pin';
import _ from 'lodash';
import Weather from '../components/Weather';
import MarkerInfo from '../components/MarkerInfo';
import loader from '../assets/loader.svg';
import { toast } from 'react-toastify';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import restaurant from '../assets/images/restaurants.png';
import hotels from '../assets/images/hotels.png';
import shopping from '../assets/images/shopping.png';
import coffee from '../assets/images/coffee-n-tea.png';
import place from '../assets/images/default.png';
import PlaceDetails from '../components/PlaceDetails';
import building from '../assets/images/building.png';
import museums from '../assets/images/museums.png';
import fashion from '../assets/images/fashion.png';
import automotive from '../assets/images/automotive.png';
import {userService} from '../services';
import placeholder from '../assets/images/placeholder.png';

const TOKEN = 'pk.eyJ1IjoidGFoaTE5OTAiLCJhIjoiY2szNzZ4eWlpMDhxdTNjbzltMGJvYzAzZSJ9.IRSxzzNjXV8Wc5sQ73i7lQ';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';
const OPEN_WEATHER_API_KEY = '8df63dbda6463515fcd2bcd1b81c2f14';
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const SERVER_URL = 'https://adventourous.sodo.asia/server';

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
    textRef =  React.createRef();

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
            }, () => {
                const { match: { params } } = this.props;
                if(params && params.id) {
                    this.getPlace(params.id);
                }
            });

            if(this.state.viewport.latitude > 0 || this.state.viewport.longitude > 0)
            {
                this.loadWeatherData(this.state.viewport.latitude, this.state.viewport.longitude)
            }

        });
    }

    handleSearch = (place_id) => {
        const curThis = this;
        curThis.setState({
            loading: true
        });

        this.requestPlace(place_id).then((data)=>{
            curThis.setState({
                viewport: {
                    latitude: data.result.geometry.location.lat,
                    longitude: data.result.geometry.location.lng,
                    width: "100%",
                    height: 600,
                    zoom: 13,
                    bearing: 0,
                    pitch: 0
                },
                loading: false
            });
            curThis.loadWeatherData(this.state.viewport.latitude, this.state.viewport.longitude)
        });
        
        
    };

    loadPanel = () => {
        const search = this.state.search;
        const details = this.state.details;

        const { loading, place } = this.state;

        let image =  place && place.photos && place.photos.length > 0 ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference='
            + place.photos[0].photo_reference + '&key='
            + GOOGLE_API_KEY : placeholder;

        return (
            <Container style={{ padding: '1em' }}>
                <Dimmer inverted active={loading}>
                    <Loader inverted size='medium'>Loading</Loader>
                </Dimmer>

                { !search && (
                    <div>
                        <Button onClick={this.backToSearch} basic color='blue' content='Back to search' icon='left arrow' labelPosition='left' />
                        { details && localStorage.getItem('user') && !place.wish && (
                            <Button floated='right' onClick={this.addToWishlist} basic color='red' icon='bookmark outline' />
                        )}

                        { details && localStorage.getItem('user') && place.wish && (
                            <Button floated='right' onClick={this.addToWishlist} basic color='red' icon='bookmark' />
                        )}

                        { details && (
                            <Modal style={{width: '800px'}} trigger={<Button floated='right' onClick={this.share} basic color='blue' icon='share alternate' />}>
                                <Modal.Header>Share</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size='medium' src={image} />
                                    <Modal.Description>
                                        <Header>{place.name}</Header>
                                        <p>
                                            {place.formatted_address}
                                        </p>
                                        <Input
                                            ref={this.textRef}
                                            readOnly
                                            action={{
                                                labelPosition: 'right',
                                                icon: 'copy',
                                                content: 'Copy',
                                                onClick: () => this.copyToClipboard(`https://adventourous.sodo.asia/maps/${place.place_id}`)
                                            }}
                                            defaultValue={`https://adventourous.sodo.asia/maps/${place.place_id}`}
                                        />
                                    </Modal.Description>
                                </Modal.Content>

                            </Modal>
                        )}

                        <Divider />
                    </div>
                )}

                { this.state.weatherData && (
                    <Container>
                        <Weather data={this.state.weatherData} />
                    </Container>
                )}

                { search && (
                    <div>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='search' />
                                Search
                            </Header>
                        </Divider>

                        <GooglePlacesAutocomplete
                            placeholder={'Search'}
                            loader={<img alt="" src={loader} />}
                            onSelect={({ place_id }) => (
                                this.handleSearch(place_id)
                            )}
                        />

                        <Divider hidden/>

                        <Container>
                            <Grid columns={5}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button icon color='teal' onClick={() => this.searchByKeyword('restaurant')}>
                                            <Icon circular inverted color='teal' name='food'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='red' onClick={() => this.searchByKeyword('cafe')}>
                                            <Icon circular inverted color='red' name='coffee'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='blue' onClick={() => this.searchByKeyword('lodging')}>
                                            <Icon circular inverted color='blue' name='hotel'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='orange' onClick={() => this.searchByKeyword('grocery_or_supermarket')}>
                                            <Icon circular inverted color='orange' name='shopping cart'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='green' onClick={() => this.searchByKeyword('tourist_attraction')}>
                                            <Icon circular inverted color='green' name='camera retro'/>
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button icon color='violet' onClick={() => this.searchByKeyword('gas_station')}>
                                            <Icon circular inverted color='violet' name='tint'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='purple' onClick={() => this.searchByKeyword('art_gallery')}>
                                            <Icon circular inverted color='purple' name='image'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='pink' onClick={() => this.searchByKeyword('clothing_store')}>
                                            <Icon circular inverted color='pink' name='shirtsinbulk'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='brown' onClick={() => this.searchByKeyword('museum')}>
                                            <Icon circular inverted color='brown' name='university'/>
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button icon color='olive' onClick={() => this.searchByKeyword('shopping_mall')}>
                                            <Icon circular inverted color='olive' name='building'/>
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                        </Grid>
                        </Container>
                    </div>
                    )}

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

    backToSearch = () => {
        this.setState({
            search: true,
            layer: null,
            markers: [],
            details: false,
            loading: false
        });
    };

    copyToClipboard = (string) => {
        this.textRef.current.select();
        document.execCommand('copy');

        toast.info('Copied to your clipboard!');
    };

    addToWishlist = () => {
        const place = this.state.place;

        let user = JSON.parse(localStorage.getItem('user'));
        const check = _.some(user.wishlist, function(e) {
            return e.place === place.id;
        });

        if (check) {
            _.remove(user.wishlist, function(e){
                return e.place === place.id;
            })
        } else {
            const obj = {
                place: place.id,
                name: place.name,
                lat: place.geometry.lat,
                lng: place.geometry.lng,
                address: place.formatted_address,
                image: place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null
            };

            user.wishlist.push(obj);
        }

        userService.updateUser(user).then(data => {
           localStorage.setItem('user', JSON.stringify(data.user));
           if(check) {
               this.setState({
                   place: {...this.state.place, wish: false}
               });
               toast.info("Removed from your wishlist!!!");
           } else {
               this.setState({
                   place: {...this.state.place, wish: true}
               });
               toast.info("Added to your wishlist!!!");
           }
        });

    };

    loadMarkers = () => {
        const {details} = this.state;

        return this.state.markers.map(marker => {
            return (
                <Marker
                    key={marker.place_id}
                    latitude={parseFloat(marker.geometry.location.lat)}
                    longitude={parseFloat(marker.geometry.location.lng)}
                >
                    { !details && (
                        <img onClick={() => this.setState({
                            popupInfo: {
                                name: marker.name,
                                longitude: marker.geometry.location.lng,
                                latitude: marker.geometry.location.lat,
                                image: marker.photos && marker.photos.length > 0 ? marker.photos[0].photo_reference : null
                            }
                        })} style={{transform: `translate(${-20 / 2}px,${-27}px)`}} height={27} width={20} src={marker.icon} alt="" />
                    )}

                    { details && (
                        <Pin size={20} onClick={() => this.setState({
                            popupInfo: {
                                name: marker.name,
                                longitude: marker.geometry.location.lng,
                                latitude: marker.geometry.location.lat,
                                image: marker.photos && marker.photos.length > 0 ? marker.photos[0].photo_reference : null
                            }
                        })} />
                    )}

                </Marker>
            );
        });
    };

    searchByKeyword = (keyword) => {
        const params = {
            location: this.state.viewport.latitude + ',' + this.state.viewport.longitude,
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

            case 'clothing_store': {
                icon = fashion;
                break;
            }

            case 'museum': {
                icon = museums;
                break;
            }

            case 'shopping_mall': {
                icon = building;
                break;
            }
            case 'gas_station': {
                icon = automotive;
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

        const url = new URL(`${SERVER_URL}/api/nearby/place`);
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
                }, () => this.loadWeatherData(this.state.viewport.latitude, this.state.viewport.longitude))
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

        const url = new URL(`${SERVER_URL}/api/details/place`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url).then(res => res.json());
    };
    
    getPlace = (id) => {
        this.setState({
            loading: true
        });

        this.requestPlace(id).then((data)=> {


            data.result.wish = false;
            if(localStorage.getItem('user')) {
                const user = JSON.parse(localStorage.getItem('user'));
                const check = _.some(user.wishlist, function(e) {
                    return e.place === data.result.id;
                });

                if(check) {
                    data.result.wish = true;
                }
            }

            this.setState({
               place: data.result,
               markers: [data.result],
               details: true,
                search: false,
               loading: false,
                viewport :{
                    width: "100%",
                    height: 600,
                    latitude: data.result.geometry.location.lat,
                    longitude: data.result.geometry.location.lng,
                    zoom: 13,
                    bearing: 0,
                    pitch: 0
                },
            }, () => {
                const { match: { params } } = this.props;
                if(params && params.id) {
                    this.getDirections(data.result.geometry.location.lng, data.result.geometry.location.lat, 'driving');
                }
            });

           // this.getPlacePhoto()
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
                if(response.routes && response.routes.length > 0) {
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
                } else {
                    this.setState({
                        loading: false,
                        direction: null
                    })
                }
            });

    };

    onClickGeolocate = (event) => {

        this.setState({
            currentLocation: {
                longitude: event.viewState.longitude,
                latitude: event.viewState.latitude,
            }
        })
    };

    renderPopup = () => {
        const {popupInfo} = this.state;

        return (
            popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}
                    onClose={() => this.setState({popupInfo: null})}
                >
                    <MarkerInfo
                        info={popupInfo} />
                </Popup>
            )
        );
    };

    render() {
        const { viewport, layer } = this.state;

        return(
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

                        {this.renderPopup()}

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
        )
    }

}

// const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onerror = reject;
//     reader.onload = () => {
//         resolve(reader.result);
//     };
//     reader.readAsDataURL(blob);
// });

export default Map;
