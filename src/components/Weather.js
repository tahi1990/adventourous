import React, { PureComponent, Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { string } from 'prop-types';

const OPEN_WEATHER_URL = 'http://openweathermap.org/img/wn/'

class Weather extends PureComponent{
    getWeatherIcon(icon){
        return OPEN_WEATHER_URL + icon + '@2x.png'
    }

    render() {
        const weatherData = this.props.data;

        if(weatherData){
            var icon = this.getWeatherIcon(weatherData.weather[0].icon)
            var weatherDes = Math.round(weatherData.main.temp) + '\u00B0' + "C"
        }
        
        return (
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column textAlign='left' verticalAlign='middle'>
                        <Header as='h3'>{weatherData.name}</Header>
                    </Grid.Column>
                    <Grid.Column textAlign='right' verticalAlign='middle'>
                       <img  height={30} width={30} src={icon} />
                        {weatherDes}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Weather
