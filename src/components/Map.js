import React,{ Component } from 'react'
import MapGL, { GeolocateControl, Marker } from 'react-map-gl'
import SiteWrapper from '../SiteWrapper';
import Drawer from 'rc-drawer';
import { Container, Header, Grid, Button, Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import "rc-drawer/assets/index.css";
import Places from './Places';
import _ from 'lodash';

import restaurant from '../assets/images/restaurants.png';

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
        markers: [],
        mounted: false
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
                    zoom: 10,
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
        return (
            <Container style={{ padding: '1em' }}>
                <Header as='h3'>Search this area</Header>
                <Grid.Column key={1}>
                    <Button icon color='teal' onClick={this.searchRestaurant}>
                        <Icon circular inverted color='teal' name='food'/>
                    </Button>
                </Grid.Column>
            </Container>
        );
    };

    searchRestaurant = () => {
        const params = {
            location: this.currentLocation.latitude + ',' + this.currentLocation.longitude,
            radius: 1000,
            type: 'restaurant',
            key: GOOGLE_API_KEY
        };

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(res => res.json())
            .then((data)=>{
                const markers = _.map(data.results, i => _.pick(i, ['geometry.location', 'place_id']));

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
                    }
                })
            });
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
                    <img style={{transform: `translate(${-20 / 2}px,${-27}px)`}} height={27} width={20} src={restaurant} alt="" />
                </Marker>
            );
        });
    };

    render() {
        const { viewport } = this.state;

        return(
            <SiteWrapper>
                <div style={{
                    position: "relative",
                    overflow: "hidden",
                    transform: "translate(0)"
                }}>

                    <Drawer
                        width="20vw"
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

                        {/*    <Places data={this.state.data}/>*/}
                        {/*</div>*/}
                    </Drawer>

                    <MapGL
                        ref={this.mapRef}
                        {...viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        onViewportChange={this.handleViewportChange}
                        mapboxApiAccessToken={TOKEN}
                    >

                        {this.loadMarkers()}

                        <GeolocateControl
                            style={style}
                            positionOptions={{enableHighAccuracy: true}}
                            trackUserLocation={true}
                        />

                    </MapGL>
                </div>

            </SiteWrapper>
        )
    }

}

export default Map;
