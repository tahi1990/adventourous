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
    }

    searchNearBy = (lat, long, keyword) => {
        const params = {
            location: lat + ',' + long,
            radius: 2000,
            type: keyword,
            key: GOOGLE_API_KEY
        };

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url).then(res => res.json())
            return(
                <div></div>
            )
    }

    handleSearch = (place_id, city) => {
        console.log(place_id)
        console.log(city)
        this.setState({
            place_id: place_id
        })

        this.loadWeatherData(city)
    }

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

    isLogin = () =>{
        this.setState({
            isLogin: true
        })
    }

    render() {
        return (
            <SiteWrapper>
                <Page.Content title="Dashboard">

                    <Container>
                        <GooglePlacesAutocomplete
                            //onSelect = {console.log}
                            onSelect = {({ place_id, structured_formatting }) => (
                                this.handleSearch(place_id, structured_formatting.main_text)
                            )}
                            autocompletionRequest = {{
                                types: ['(cities)']
                            }}
                            placeholder='City'
                        />
                    </Container>

                    <Divider />

                    <Container>
                        <Grid>  
                            <Grid.Column width={4}>
                                {this.state.weatherData && (
                                    <WeatherDashboard data={this.state.weatherData}/>
                                )}
                            </Grid.Column>
                            <Grid.Column width={12}>
                                {localStorage.getItem('user') && (
                                    <Wishlist />
                                )}
                                {this.state.place_id &&(
                                    <div>
                                        <Grid.Row>
                                            <label>Tourist attraction</label>
                                            <Grid columns={4} divided>
                                                <DashboardActivities data={{place_id: this.state.place_id, keyword: 'tourist_attraction'}}/>
                                            </Grid>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <label>Restaurant</label>
                                            <Grid columns={4} divided>
                                                <DashboardActivities data={{place_id: this.state.place_id, keyword: 'restaurant'}}/>
                                            </Grid>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <label>Hotel</label>
                                            <Grid columns={4} divided>
                                                <DashboardActivities data={{place_id: this.state.place_id, keyword: 'hotel'}}/>
                                            </Grid>
                                        </Grid.Row>
                                    </div>
                                )}
                                
                            </Grid.Column>
                        </Grid>
                    </Container>
                </Page.Content>
            </SiteWrapper>
        )
}
}

export default Home
