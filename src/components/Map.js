import React,{ Component } from 'react'
import MapGL, {_MapContext as MapContext, GeolocateControl, Marker} from 'react-map-gl'
import DeckGL, {ArcLayer, PathLayer} from "deck.gl";
import SiteWrapper from '../SiteWrapper';
import Drawer from 'rc-drawer';
import { Container, Header, Grid, Button, Icon } from 'semantic-ui-react'
import "rc-drawer/assets/index.css";
import Places from './Places';
import _ from 'lodash';

import restaurant from '../assets/images/restaurants.png';
import hotels from '../assets/images/hotels.png';
import shopping from '../assets/images/shopping.png';
import coffee from '../assets/images/coffee-n-tea.png';
import place from '../assets/images/default.png';
import PlaceDetails from './PlaceDetails';

const TOKEN = 'pk.eyJ1IjoidGFoaTE5OTAiLCJhIjoiY2szNzZ4eWlpMDhxdTNjbzltMGJvYzAzZSJ9.IRSxzzNjXV8Wc5sQ73i7lQ';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

const style = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10
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
        mounted: false,
        search: true,
        details: false
    };

    currentLocation = {

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
            });

            this.currentLocation = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            };

        });
    }

    loadPanel = () => {
        const search = this.state.search;
        const details = this.state.details;

        return (
            <Container style={{ padding: '1em' }}>
                <Header as='h3'>Search this area</Header>
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
                        <PlaceDetails data={this.state.place} image={this.state.image}/>
                    )
                }

                {
                    !details && !search && (
                        <Places getDirection={this.getDirections} getPlace={this.getPlace} getPlacePhoto={this.getPlacePhoto} data={this.state.data}/>
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
                    anchor="bottom"
                >
                    <img style={{transform: `translate(${-20 / 2}px,${-27}px)`}} height={27} width={20} src={marker.icon} alt="" />
                </Marker>
            );
        });
    };

    searchByKeyword = (keyword) => {
        const params = {
            location: this.currentLocation.latitude + ',' + this.currentLocation.longitude,
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
                    search: false
                })
            });
    };

    getPlace = (id) => {
        const params = {
            place_id: id,
            key: GOOGLE_API_KEY,
        };

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url).then(res => res.json())
            .then((data)=>{
               this.setState({
                   place: data.result,
                   details: true
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

    getDirections = (lng, lat) => {

        const params = {
            access_token: TOKEN,
            geometries: 'geojson',
            overview: 'full'
        };

        const url = new URL('https://api.mapbox.com/directions/v5/mapbox/driving/' + this.currentLocation.longitude + ',' + this.currentLocation.latitude + ';' + lng + ',' + lat);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url).then(res => res.json())
            .then((response)=>{
                const path = response.routes[0].geometry.coordinates;

                const data = [{
                    name: "random-name",
                    color: [101, 147, 245],
                    path: path
                }];

                const layer = [
                    new PathLayer({
                        id: "path-layer",
                        data,
                        getWidth: data => 4,
                        getColor: data => data.color,
                        widthMinPixels: 4
                    })
                ];

                this.setState({
                    layer: layer
                });
            });

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

                        {/*<GeolocateControl*/}
                        {/*    style={style}*/}
                        {/*    positionOptions={{enableHighAccuracy: true}}*/}
                        {/*    trackUserLocation={true}*/}
                        {/*/>*/}

                    </MapGL>
                </div>

            </SiteWrapper>
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
