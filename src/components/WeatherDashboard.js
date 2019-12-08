import React, { PureComponent, Component } from 'react'
import { Card, Grid, Header, List, Image, Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const OPEN_WEATHER_URL = 'http://openweathermap.org/img/wn/';

class WeatherDashboard extends PureComponent{
    state = {

    };

    componentDidMount () {
      this.setState({ mounted: true });
    }

    getWeatherIcon(icon){
        return OPEN_WEATHER_URL + icon + '@2x.png'
    }

    DateTimeStr = (datetime) => {
        const str = datetime.substring(8,10) + '.' + datetime.substring(5,7); //+ '.' + datetime.substring(0,4)
        return str
    };

    createForecastDate = (data) => {
        return (
            <Grid.Column width={4}>
                {this.DateTimeStr(data.dt_txt)}
            </Grid.Column>
        )
    };

    createForeCastData = (data) => {
        return (
            <Grid.Column>
                <Image src={this.getWeatherIcon(data.weather[0].icon)} size='small' />
                {/* <img  height={30} width={30} src={this.getWeatherIcon(data.weather[0].icon)} /> */}
                <span><font size="-1">{Math.round(data.main.temp)}&deg;C</font></span>
            </Grid.Column>
        )
    };

    render() {
      const weatherData = this.props.data;
      // const weatherData = {
      //   "coord": {
      //     "lon": 106.7,
      //     "lat": 10.78
      //   },
      //   "weather": [
      //     {
      //       "id": 802,
      //       "main": "Clouds",
      //       "description": "scattered clouds",
      //       "icon": "03d"
      //     }
      //   ],
      //   "base": "stations",
      //   "main": {
      //     "temp": 29,
      //     "pressure": 1011,
      //     "humidity": 48,
      //     "temp_min": 29,
      //     "temp_max": 29
      //   },
      //   "visibility": 10000,
      //   "wind": {
      //     "speed": 2.1,
      //     "deg": 310
      //   },
      //   "clouds": {
      //     "all": 40
      //   },
      //   "dt": 1575711011,
      //   "sys": {
      //     "type": 1,
      //     "id": 9314,
      //     "country": "VN",
      //     "sunrise": 1575673140,
      //     "sunset": 1575714605
      //   },
      //   "timezone": 25200,
      //   "id": 1566083,
      //   "name": "Ho Chi Minh City",
      //   "cod": 200
      // }
      return (
          <Card>
              { weatherData && weatherData.weather.length > 0 && (
                  <Card.Content>
                      <Image
                          floated='right'
                          size='mini'
                          src={this.getWeatherIcon(weatherData.weather[0].icon)}
                      />
                      <Card.Header>{weatherData.name}</Card.Header>
                      <Card.Description>
                          <List>
                              <List.Item>
                                  <List.Content>
                                      <Icon name='thermometer' />
                                      Temp: {Math.round(weatherData.main.temp)}&deg;C
                                  </List.Content>
                              </List.Item>
                              <List.Item>
                                  <Icon name='tint' />
                                  <List.Content>
                                      Humidity: {weatherData.main.humidity}&#37;
                                  </List.Content>
                              </List.Item>
                              <List.Item>
                                  <Icon name='arrow up' />
                                  <List.Content>
                                      Wind: {weatherData.wind.speed} m/s
                                  </List.Content>
                              </List.Item>
                          </List>
                      </Card.Description>
                  </Card.Content>
              )}
          </Card>
      );
    }
}

export default WeatherDashboard
