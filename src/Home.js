// @flow

import * as React from 'react'
import { Grid, Container, Card, Feed, Header, Divider } from 'semantic-ui-react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import WeatherDashboard from './components/WeatherDashboard'
import DashboardActivities from './components/DashboardActivities'
import Wishlist from './components/Wishlist'

import {
    Page,
} from 'tabler-react'

import SiteWrapper from './SiteWrapper';

const OPEN_WEATHER_API_KEY = '8df63dbda6463515fcd2bcd1b81c2f14';
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class Home extends React.Component{
    state = {
        mounted:false
    };

    componentDidMount () {
        this.setState({ mounted: true });

        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                point: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }, this.loadWeatherDataByCurLatLong)
        })
    }
    
    handleSearch = (place_id, city) => {
        this.setState({
            place_id: place_id
        });

        this.loadWeatherData(city)
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
                console.log(data)
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

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url).then(res => res.json());
    };

    render() {
        return (
            <SiteWrapper>
                <Page.Content title="Dashboard">

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
                                {this.state.place_id &&(
                                    <div>
                                        <Card fluid>
                                            <Card.Content>
                                                <Card.Header>Tourist attraction</Card.Header>
                                                <Card.Description>
                                                    <Container>
                                                    <Grid columns={4}>
                                                        <DashboardActivities data={{place_id: this.state.place_id, keyword: 'tourist_attraction'}}/>
                                                    </Grid>
                                                    </Container>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                        <Card fluid>
                                            <Card.Content>
                                                <Card.Header>Restaurant</Card.Header>
                                                <Card.Description>
                                                    <Container>
                                                        <Grid columns={4}>
                                                            <DashboardActivities data={{place_id: this.state.place_id, keyword: 'restaurant'}}/>
                                                        </Grid>
                                                    </Container>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                        <Card fluid>
                                            <Card.Content>
                                                <Card.Header>Hotel</Card.Header>
                                                <Card.Description>
                                                    <Container>
                                                        <Grid columns={4}>
                                                            <DashboardActivities data={{place_id: this.state.place_id, keyword: 'hotel'}}/>
                                                        </Grid>
                                                    </Container>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </div>
                                )}
                                {(!this.state.place_id && this.state.point) && (
                                    <div>
                                    <Card fluid>
                                        <Card.Content>
                                            <Card.Header>Tourist attraction</Card.Header>
                                            <Card.Description>
                                                <Container>
                                                <Grid columns={4}>
                                                    <DashboardActivities data={{lat: this.state.point.lat,
                                                                                lng: this.state.point.lng, 
                                                                                keyword: 'tourist_attraction'}}/>
                                                </Grid>
                                                </Container>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                    <Card fluid>
                                        <Card.Content>
                                            <Card.Header>Restaurant</Card.Header>
                                            <Card.Description>
                                                <Container>
                                                    <Grid columns={4}>
                                                        <DashboardActivities data={{lat: this.state.point.lat,
                                                                                    lng: this.state.point.lng,
                                                                                    keyword: 'restaurant'}}/>
                                                    </Grid>
                                                </Container>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                    <Card fluid>
                                        <Card.Content>
                                            <Card.Header>Hotel</Card.Header>
                                            <Card.Description>
                                                <Container>
                                                    <Grid columns={4}>
                                                        <DashboardActivities data={{lat: this.state.point.lat,
                                                                                    lng: this.state.point.lng, 
                                                                                    keyword: 'hotel'}}/>
                                                    </Grid>
                                                </Container>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </div>
                                )}
                            </Grid.Column>
                        </Grid>
                    </div>
                </Page.Content>
            </SiteWrapper>
        )
}
}

export default Home
