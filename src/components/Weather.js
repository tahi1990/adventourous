import React, { PureComponent, Component } from 'react'
import { Icon, CardContent } from 'semantic-ui-react'
import { Card, Feed } from 'semantic-ui-react'
import { string } from 'prop-types';

const OPEN_WEATHER_URL = 'http://openweathermap.org/img/wn/'
class Weather extends PureComponent{
    getWeatherIcon(icon){
        return OPEN_WEATHER_URL + icon + '@2x.png'
    }

    render() {
        //const weatherData = this.props.data;

        const weatherData = {
            "coord": {
              "lon": 0,
              "lat": 0
            },
            "weather": [
              {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
              }
            ],
            "base": "model",
            "main": {
              "temp": 27.18,
              "pressure": 1012,
              "humidity": 81,
              "temp_min": 27.18,
              "temp_max": 27.18,
              "sea_level": 1012,
              "grnd_level": 1012
            },
            "wind": {
              "speed": 5.85,
              "deg": 203
            },
            "clouds": {
              "all": 34
            },
            "dt": 1575535675,
            "sys": {
              "sunrise": 1575524823,
              "sunset": 1575568454
            },
            "timezone": 0,
            "id": 6295630,
            "name": "Joensuu",
            "cod": 200
          };

          var icon = this.getWeatherIcon(weatherData.weather[0].icon)
          var weatherDes = weatherData.name + " (" + weatherData.weather[0].description + "/" + Math.round(weatherData.main.temp) + '\u00B0' + "C)"
        console.log(weatherData)
        return (
            <Card>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            {/* <Feed.Label image={icon}/> */}
                            <Feed.Content>     
                                <Feed.Date content={weatherDes}/>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        );
    }
}

export default Weather
