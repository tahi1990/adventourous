import React, { PureComponent, Component } from 'react'
import { Card, Grid, Header, List, Image } from 'semantic-ui-react'
import { string } from 'prop-types';

const OPEN_WEATHER_URL = 'http://openweathermap.org/img/wn/'

class WeatherDashboard extends PureComponent{
    state={}

    componentDidMount () {
      this.setState({ mounted: true });
    }

    getWeatherIcon(icon){
        return OPEN_WEATHER_URL + icon + '@2x.png'
    }

    DateTimeStr = (datetime) => {
        var str = datetime.substring(8,10) + '.' + datetime.substring(5,7) //+ '.' + datetime.substring(0,4)
        return str
    }

    getWeatherIcon(icon){
        return OPEN_WEATHER_URL + icon + '@2x.png'
    }

    createForecastDate = (data) => {
        return (
            <Grid.Column width={4}>
                {this.DateTimeStr(data.dt_txt)}
            </Grid.Column>
        )
    }

    createForeCastData = (data) => {
        console.log(data)
        return (
            <Grid.Column>
                <Image src={this.getWeatherIcon(data.weather[0].icon)} size='small' />
                {/* <img  height={30} width={30} src={this.getWeatherIcon(data.weather[0].icon)} /> */}
                <span><font size="-1">{Math.round(data.main.temp)}&deg;C</font></span>
            </Grid.Column>
        )
    }

    render() {
      // const weatherData = this.props.data;
      const weatherData = {
        "coord": {
          "lon": 106.7,
          "lat": 10.78
        },
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 29,
          "pressure": 1011,
          "humidity": 48,
          "temp_min": 29,
          "temp_max": 29
        },
        "visibility": 10000,
        "wind": {
          "speed": 2.1,
          "deg": 310
        },
        "clouds": {
          "all": 40
        },
        "dt": 1575711011,
        "sys": {
          "type": 1,
          "id": 9314,
          "country": "VN",
          "sunrise": 1575673140,
          "sunset": 1575714605
        },
        "timezone": 25200,
        "id": 1566083,
        "name": "Ho Chi Minh City",
        "cod": 200
      }
      return (
          <Card>
              <Card.Content>
                  <Grid divided='vertically'>
                      <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                          <Header as='h3'>{weatherData.name}</Header>
                        </Grid.Column>
                        
                          {/* <Grid.Column textAlign='left' verticalAlign='middle'>
                              <Header as='h3'>{weatherData.name}</Header>
                          </Grid.Column>
                          <Grid.Column textAlign='right' verticalAlign='middle'>
                              {/* {this.DateTimeStr(weatherForecastData.list[0].dt_txt)}
                          </Grid.Column> */}
                      </Grid.Row>
                      <Grid.Row columns={2}>
                          <Grid.Column textAlign='left' width={5}>
                              <img  height={60} width={60} src={this.getWeatherIcon(weatherData.weather[0].icon)} />
                          </Grid.Column>
                          <Grid.Column textAlign='left' width={9}>
                              <List>
                                  <List.Item>Temp: {Math.round(weatherData.main.temp)}&deg;C</List.Item>
                                  <List.Item>Humidity: {weatherData.main.humidity}&#37;</List.Item>
                                  <List.Item>Wind: {weatherData.wind.speed} m/s</List.Item>
                              </List>
                          </Grid.Column>
                      </Grid.Row>
                  </Grid>
              </Card.Content>
              {/* <Card.Content>
                  <Grid>
                  <Grid.Row columns={3}>
                      {foreCastData.map(this.createForecastDate)}
                  </Grid.Row>
                  <Grid.Row columns={3}>
                      {foreCastData.map(this.createForeCastData)}
                  </Grid.Row>
                  </Grid>
              </Card.Content> */}
          </Card>
      );
    }
}

export default WeatherDashboard
