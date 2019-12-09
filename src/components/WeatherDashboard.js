import React, { PureComponent } from 'react'
import { Card, List, Image, Icon } from 'semantic-ui-react'

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

    render() {
      const weatherData = this.props.data;

      return (
          <Card>
              { weatherData && weatherData.weather && weatherData.weather.length > 0 && (
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
