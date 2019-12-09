// @flow

import * as React from 'react'
import {Grid, Container, Card, Divider, Loader, Dimmer} from 'semantic-ui-react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import WeatherDashboard from '../components/WeatherDashboard'
import DashboardActivities from '../components/DashboardActivities'
import Wishlist from '../components/Wishlist'

import {
    Page,
} from 'tabler-react'

import SiteWrapper from '../SiteWrapper';

const OPEN_WEATHER_API_KEY = '8df63dbda6463515fcd2bcd1b81c2f14';
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';
const SERVER_URL = 'http://localhost:5000';

class Home extends React.Component{
    state = {
        mounted:false,
        loading: false
    };

    componentDidMount () {
        this.setState({ mounted: true });

        navigator.geolocation.getCurrentPosition(position => {
            this.searchNearBy(position.coords.latitude, position.coords.longitude, 'tourist_attraction');
            this.searchNearBy(position.coords.latitude, position.coords.longitude, 'restaurant');
            this.searchNearBy(position.coords.latitude, position.coords.longitude, 'hotel');
            this.setState({
                point: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }, this.loadWeatherDataByCurLatLong)
        })
    }
    
    handleSearch = (place_id, city) => {
        this.requestPlace(place_id).then(data => {
           this.searchNearBy(data.result.geometry.location.lat, data.result.geometry.location.lng, 'tourist_attraction');
           this.searchNearBy(data.result.geometry.location.lat, data.result.geometry.location.lng, 'restaurant');
           this.searchNearBy(data.result.geometry.location.lat, data.result.geometry.location.lng, 'hotel');
        });

        this.loadWeatherData(city);
    };

    loadWeatherData = (city) => {
        const params = {
            q: city,
            units: 'metric',
            appid: OPEN_WEATHER_API_KEY
        };
  
        const url = new URL(OPEN_WEATHER_API_URL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(res => res.json())
            .then((data)=>{
                console.log(data)
                this.setState({
                  weatherData: data
                })
            });
    };

    loadWeatherDataByCurLatLong = () => {
        const params = {
            lat: this.state.point.lat,
            lon: this.state.point.lng,
            units: 'metric',
            appid: OPEN_WEATHER_API_KEY
        };
  
        const url = new URL(OPEN_WEATHER_API_URL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(res => res.json())
            .then((data)=>{
                this.setState({
                  weatherData: data
                })
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

    searchNearBy = (lat, lng, keyword) => {
        const params = {
            location: lat + ',' + lng,
            radius: 2000,
            type: keyword,
            key: GOOGLE_API_KEY,
            language: 'en'
        };

        this.setState({
            loading: true
        });

        const url = new URL(`${SERVER_URL}/api/nearby/place`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(res => res.json())
            .then(data => {
                switch (keyword) {
                    case 'tourist_attraction': {
                        this.setState({
                            tourist: data.results,
                            loading: false
                        });
                        break;
                    }

                    case 'restaurant': {
                        this.setState({
                            restaurant: data.results,
                            loading: false
                        });
                        break;
                    }

                    case 'hotel': {
                        this.setState({
                            hotel: data.results,
                            loading: false
                        });
                        break;
                    }

                    default: {
                        break;
                    }
                }

            })
    };

    render() {
        const {loading} = this.state;

        return (
            <SiteWrapper>
                <Page.Content title="Dashboard">

                    <Dimmer inverted active={loading}>
                        <Loader inverted size='medium'>Loading</Loader>
                    </Dimmer>

                    <div>
                        <GooglePlacesAutocomplete
                            onSelect = {({ place_id, structured_formatting }) => (
                                this.handleSearch(place_id, structured_formatting.main_text)
                            )}
                            autocompletionRequest = {{
                                types: ['(cities)']
                            }}
                            placeholder='City'
                        />
                    </div>

                    <Divider />

                    <div>

                        <Grid>
                            <Grid.Column width={4}>
                                { this.state.weatherData && (
                                    <WeatherDashboard data={this.state.weatherData}/>
                                )}

                                { localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).wishlist.length > 0 && (
                                    <Wishlist />
                                )}
                            </Grid.Column>
                            <Grid.Column width={12}>
                                {this.state.tourist && (
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header>Tourist attraction</Card.Header>
                                        <Card.Description>
                                            <Container>
                                            <Grid columns={4}>
                                                <DashboardActivities data={this.state.tourist}/>
                                            </Grid>
                                            </Container>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>)}
                                {this.state.restaurant && (
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header>Restaurant</Card.Header>
                                        <Card.Description>
                                            <Container>
                                                <Grid columns={4}>
                                                    <DashboardActivities data={this.state.restaurant}/>
                                                </Grid>
                                            </Container>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>)}
                                {this.state.hotel && (
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header>Hotel</Card.Header>
                                        <Card.Description>
                                            <Container>
                                                <Grid columns={4}>
                                                    <DashboardActivities data={this.state.hotel}/>
                                                </Grid>
                                            </Container>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>)}
                            </Grid.Column>
                        </Grid>
                    </div>
                </Page.Content>
            </SiteWrapper>
        )
}
}

export default Home
