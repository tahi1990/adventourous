import React, { PureComponent, Component } from 'react'
import { Card, Grid, Header } from 'semantic-ui-react'
import { string } from 'prop-types';

const OPEN_WEATHER_URL = 'http://openweathermap.org/img/wn/'

class WeatherDashboard extends PureComponent{
    getWeatherIcon(icon){
        return OPEN_WEATHER_URL + icon + '@2x.png'
    }

    DateTimeStr = (datetime) => {
        var str = datetime.substring(8,10) + '.' + datetime.substring(5,7) + '.' + datetime.substring(0,4)
        return str
    }

    render() {
        const weatherForecastData = {
            "cod": "200",
            "message": 0,
            "cnt": 40,
            "list": [
              {
                "dt": 1575644400,
                "main": {
                  "temp": 285.25,
                  "temp_min": 285.25,
                  "temp_max": 285.66,
                  "pressure": 1001,
                  "sea_level": 1001,
                  "grnd_level": 997,
                  "humidity": 70,
                  "temp_kf": -0.41
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                  }
                ],
                "clouds": {
                  "all": 88
                },
                "wind": {
                  "speed": 6.41,
                  "deg": 245
                },
                "rain": {
                  "3h": 0.44
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-06 15:00:00"
              },
              {
                "dt": 1575655200,
                "main": {
                  "temp": 283.43,
                  "temp_min": 283.43,
                  "temp_max": 283.74,
                  "pressure": 1003,
                  "sea_level": 1003,
                  "grnd_level": 1000,
                  "humidity": 67,
                  "temp_kf": -0.31
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 86
                },
                "wind": {
                  "speed": 7.5,
                  "deg": 280
                },
                "rain": {
                  "3h": 2.12
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-06 18:00:00"
              },
              {
                "dt": 1575666000,
                "main": {
                  "temp": 282.37,
                  "temp_min": 282.37,
                  "temp_max": 282.57,
                  "pressure": 1007,
                  "sea_level": 1007,
                  "grnd_level": 1003,
                  "humidity": 74,
                  "temp_kf": -0.2
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                  }
                ],
                "clouds": {
                  "all": 39
                },
                "wind": {
                  "speed": 5.44,
                  "deg": 271
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-06 21:00:00"
              },
              {
                "dt": 1575676800,
                "main": {
                  "temp": 281.43,
                  "temp_min": 281.43,
                  "temp_max": 281.53,
                  "pressure": 1010,
                  "sea_level": 1010,
                  "grnd_level": 1006,
                  "humidity": 81,
                  "temp_kf": -0.1
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                  }
                ],
                "clouds": {
                  "all": 36
                },
                "wind": {
                  "speed": 4.64,
                  "deg": 260
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-07 00:00:00"
              },
              {
                "dt": 1575687600,
                "main": {
                  "temp": 280.76,
                  "temp_min": 280.76,
                  "temp_max": 280.76,
                  "pressure": 1011,
                  "sea_level": 1011,
                  "grnd_level": 1007,
                  "humidity": 85,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                  }
                ],
                "clouds": {
                  "all": 12
                },
                "wind": {
                  "speed": 3.88,
                  "deg": 257
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-07 03:00:00"
              },
              {
                "dt": 1575698400,
                "main": {
                  "temp": 280,
                  "temp_min": 280,
                  "temp_max": 280,
                  "pressure": 1013,
                  "sea_level": 1013,
                  "grnd_level": 1009,
                  "humidity": 87,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                  }
                ],
                "clouds": {
                  "all": 6
                },
                "wind": {
                  "speed": 3.3,
                  "deg": 257
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-07 06:00:00"
              },
              {
                "dt": 1575709200,
                "main": {
                  "temp": 279.91,
                  "temp_min": 279.91,
                  "temp_max": 279.91,
                  "pressure": 1014,
                  "sea_level": 1014,
                  "grnd_level": 1010,
                  "humidity": 87,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                  }
                ],
                "clouds": {
                  "all": 1
                },
                "wind": {
                  "speed": 3.29,
                  "deg": 247
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-07 09:00:00"
              },
              {
                "dt": 1575720000,
                "main": {
                  "temp": 282.3,
                  "temp_min": 282.3,
                  "temp_max": 282.3,
                  "pressure": 1014,
                  "sea_level": 1014,
                  "grnd_level": 1010,
                  "humidity": 75,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                  }
                ],
                "clouds": {
                  "all": 28
                },
                "wind": {
                  "speed": 3.59,
                  "deg": 258
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-07 12:00:00"
              },
              {
                "dt": 1575730800,
                "main": {
                  "temp": 282.54,
                  "temp_min": 282.54,
                  "temp_max": 282.54,
                  "pressure": 1013,
                  "sea_level": 1013,
                  "grnd_level": 1009,
                  "humidity": 76,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                  }
                ],
                "clouds": {
                  "all": 0
                },
                "wind": {
                  "speed": 3.77,
                  "deg": 241
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-07 15:00:00"
              },
              {
                "dt": 1575741600,
                "main": {
                  "temp": 281.32,
                  "temp_min": 281.32,
                  "temp_max": 281.32,
                  "pressure": 1013,
                  "sea_level": 1013,
                  "grnd_level": 1009,
                  "humidity": 84,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                  }
                ],
                "clouds": {
                  "all": 31
                },
                "wind": {
                  "speed": 4.04,
                  "deg": 225
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-07 18:00:00"
              },
              {
                "dt": 1575752400,
                "main": {
                  "temp": 281.41,
                  "temp_min": 281.41,
                  "temp_max": 281.41,
                  "pressure": 1011,
                  "sea_level": 1011,
                  "grnd_level": 1007,
                  "humidity": 84,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 5.04,
                  "deg": 224
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-07 21:00:00"
              },
              {
                "dt": 1575763200,
                "main": {
                  "temp": 282.89,
                  "temp_min": 282.89,
                  "temp_max": 282.89,
                  "pressure": 1007,
                  "sea_level": 1007,
                  "grnd_level": 1003,
                  "humidity": 88,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 6.43,
                  "deg": 212
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-08 00:00:00"
              },
              {
                "dt": 1575774000,
                "main": {
                  "temp": 283.89,
                  "temp_min": 283.89,
                  "temp_max": 283.89,
                  "pressure": 1002,
                  "sea_level": 1002,
                  "grnd_level": 997,
                  "humidity": 85,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 7.84,
                  "deg": 208
                },
                "rain": {
                  "3h": 0.63
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-08 03:00:00"
              },
              {
                "dt": 1575784800,
                "main": {
                  "temp": 285.86,
                  "temp_min": 285.86,
                  "temp_max": 285.86,
                  "pressure": 1000,
                  "sea_level": 1000,
                  "grnd_level": 995,
                  "humidity": 90,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 6.9,
                  "deg": 246
                },
                "rain": {
                  "3h": 1.69
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-08 06:00:00"
              },
              {
                "dt": 1575795600,
                "main": {
                  "temp": 283.1,
                  "temp_min": 283.1,
                  "temp_max": 283.1,
                  "pressure": 1001,
                  "sea_level": 1001,
                  "grnd_level": 997,
                  "humidity": 66,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 6.69,
                  "deg": 259
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-08 09:00:00"
              },
              {
                "dt": 1575806400,
                "main": {
                  "temp": 282.92,
                  "temp_min": 282.92,
                  "temp_max": 282.92,
                  "pressure": 1002,
                  "sea_level": 1002,
                  "grnd_level": 997,
                  "humidity": 66,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                  }
                ],
                "clouds": {
                  "all": 93
                },
                "wind": {
                  "speed": 8.8,
                  "deg": 259
                },
                "rain": {
                  "3h": 0.38
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-08 12:00:00"
              },
              {
                "dt": 1575817200,
                "main": {
                  "temp": 282.11,
                  "temp_min": 282.11,
                  "temp_max": 282.11,
                  "pressure": 1000,
                  "sea_level": 1000,
                  "grnd_level": 996,
                  "humidity": 62,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 7.93,
                  "deg": 252
                },
                "rain": {
                  "3h": 0.31
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-08 15:00:00"
              },
              {
                "dt": 1575828000,
                "main": {
                  "temp": 280.95,
                  "temp_min": 280.95,
                  "temp_max": 280.95,
                  "pressure": 999,
                  "sea_level": 999,
                  "grnd_level": 995,
                  "humidity": 63,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 89
                },
                "wind": {
                  "speed": 7.89,
                  "deg": 243
                },
                "rain": {
                  "3h": 0.25
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-08 18:00:00"
              },
              {
                "dt": 1575838800,
                "main": {
                  "temp": 280.45,
                  "temp_min": 280.45,
                  "temp_max": 280.45,
                  "pressure": 996,
                  "sea_level": 996,
                  "grnd_level": 992,
                  "humidity": 66,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                  }
                ],
                "clouds": {
                  "all": 56
                },
                "wind": {
                  "speed": 9.62,
                  "deg": 238
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-08 21:00:00"
              },
              {
                "dt": 1575849600,
                "main": {
                  "temp": 281.32,
                  "temp_min": 281.32,
                  "temp_max": 281.32,
                  "pressure": 992,
                  "sea_level": 992,
                  "grnd_level": 988,
                  "humidity": 70,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 78
                },
                "wind": {
                  "speed": 9.66,
                  "deg": 245
                },
                "rain": {
                  "3h": 0.56
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-09 00:00:00"
              },
              {
                "dt": 1575860400,
                "main": {
                  "temp": 280.58,
                  "temp_min": 280.58,
                  "temp_max": 280.58,
                  "pressure": 990,
                  "sea_level": 990,
                  "grnd_level": 986,
                  "humidity": 69,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 99
                },
                "wind": {
                  "speed": 9.35,
                  "deg": 254
                },
                "rain": {
                  "3h": 0.94
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-09 03:00:00"
              },
              {
                "dt": 1575871200,
                "main": {
                  "temp": 280.62,
                  "temp_min": 280.62,
                  "temp_max": 280.62,
                  "pressure": 991,
                  "sea_level": 991,
                  "grnd_level": 988,
                  "humidity": 68,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 99
                },
                "wind": {
                  "speed": 6.45,
                  "deg": 283
                },
                "rain": {
                  "3h": 1.44
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-09 06:00:00"
              },
              {
                "dt": 1575882000,
                "main": {
                  "temp": 280.44,
                  "temp_min": 280.44,
                  "temp_max": 280.44,
                  "pressure": 997,
                  "sea_level": 997,
                  "grnd_level": 993,
                  "humidity": 69,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                  }
                ],
                "clouds": {
                  "all": 45
                },
                "wind": {
                  "speed": 7.26,
                  "deg": 296
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-09 09:00:00"
              },
              {
                "dt": 1575892800,
                "main": {
                  "temp": 282.02,
                  "temp_min": 282.02,
                  "temp_max": 282.02,
                  "pressure": 1004,
                  "sea_level": 1004,
                  "grnd_level": 1000,
                  "humidity": 58,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                  }
                ],
                "clouds": {
                  "all": 32
                },
                "wind": {
                  "speed": 7.49,
                  "deg": 320
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-09 12:00:00"
              },
              {
                "dt": 1575903600,
                "main": {
                  "temp": 281.31,
                  "temp_min": 281.31,
                  "temp_max": 281.31,
                  "pressure": 1009,
                  "sea_level": 1009,
                  "grnd_level": 1005,
                  "humidity": 52,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                  }
                ],
                "clouds": {
                  "all": 28
                },
                "wind": {
                  "speed": 7.56,
                  "deg": 326
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-09 15:00:00"
              },
              {
                "dt": 1575914400,
                "main": {
                  "temp": 279.56,
                  "temp_min": 279.56,
                  "temp_max": 279.56,
                  "pressure": 1015,
                  "sea_level": 1015,
                  "grnd_level": 1012,
                  "humidity": 57,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                  }
                ],
                "clouds": {
                  "all": 16
                },
                "wind": {
                  "speed": 5.52,
                  "deg": 325
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-09 18:00:00"
              },
              {
                "dt": 1575925200,
                "main": {
                  "temp": 278.65,
                  "temp_min": 278.65,
                  "temp_max": 278.65,
                  "pressure": 1020,
                  "sea_level": 1020,
                  "grnd_level": 1016,
                  "humidity": 59,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                  }
                ],
                "clouds": {
                  "all": 0
                },
                "wind": {
                  "speed": 3.98,
                  "deg": 316
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-09 21:00:00"
              },
              {
                "dt": 1575936000,
                "main": {
                  "temp": 277.5,
                  "temp_min": 277.5,
                  "temp_max": 277.5,
                  "pressure": 1022,
                  "sea_level": 1022,
                  "grnd_level": 1018,
                  "humidity": 65,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                  }
                ],
                "clouds": {
                  "all": 1
                },
                "wind": {
                  "speed": 2.48,
                  "deg": 283
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-10 00:00:00"
              },
              {
                "dt": 1575946800,
                "main": {
                  "temp": 276.73,
                  "temp_min": 276.73,
                  "temp_max": 276.73,
                  "pressure": 1022,
                  "sea_level": 1022,
                  "grnd_level": 1018,
                  "humidity": 68,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                  }
                ],
                "clouds": {
                  "all": 58
                },
                "wind": {
                  "speed": 2.56,
                  "deg": 245
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-10 03:00:00"
              },
              {
                "dt": 1575957600,
                "main": {
                  "temp": 276.67,
                  "temp_min": 276.67,
                  "temp_max": 276.67,
                  "pressure": 1021,
                  "sea_level": 1021,
                  "grnd_level": 1016,
                  "humidity": 64,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                  }
                ],
                "clouds": {
                  "all": 79
                },
                "wind": {
                  "speed": 2.76,
                  "deg": 186
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-10 06:00:00"
              },
              {
                "dt": 1575968400,
                "main": {
                  "temp": 278.78,
                  "temp_min": 278.78,
                  "temp_max": 278.78,
                  "pressure": 1018,
                  "sea_level": 1018,
                  "grnd_level": 1014,
                  "humidity": 67,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 4.59,
                  "deg": 183
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-10 09:00:00"
              },
              {
                "dt": 1575979200,
                "main": {
                  "temp": 281,
                  "temp_min": 281,
                  "temp_max": 281,
                  "pressure": 1013,
                  "sea_level": 1013,
                  "grnd_level": 1009,
                  "humidity": 81,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 7.31,
                  "deg": 188
                },
                "rain": {
                  "3h": 0.25
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-10 12:00:00"
              },
              {
                "dt": 1575990000,
                "main": {
                  "temp": 281.82,
                  "temp_min": 281.82,
                  "temp_max": 281.82,
                  "pressure": 1007,
                  "sea_level": 1007,
                  "grnd_level": 1003,
                  "humidity": 84,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 8.88,
                  "deg": 197
                },
                "rain": {
                  "3h": 1.63
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-10 15:00:00"
              },
              {
                "dt": 1576000800,
                "main": {
                  "temp": 283.99,
                  "temp_min": 283.99,
                  "temp_max": 283.99,
                  "pressure": 1001,
                  "sea_level": 1001,
                  "grnd_level": 998,
                  "humidity": 84,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 9.53,
                  "deg": 200
                },
                "rain": {
                  "3h": 0.63
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-10 18:00:00"
              },
              {
                "dt": 1576011600,
                "main": {
                  "temp": 281.38,
                  "temp_min": 281.38,
                  "temp_max": 281.38,
                  "pressure": 1001,
                  "sea_level": 1001,
                  "grnd_level": 998,
                  "humidity": 81,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 6.79,
                  "deg": 299
                },
                "rain": {
                  "3h": 6.06
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-10 21:00:00"
              },
              {
                "dt": 1576022400,
                "main": {
                  "temp": 280.54,
                  "temp_min": 280.54,
                  "temp_max": 280.54,
                  "pressure": 1004,
                  "sea_level": 1004,
                  "grnd_level": 1000,
                  "humidity": 65,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 5.89,
                  "deg": 277
                },
                "rain": {
                  "3h": 1.19
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-11 00:00:00"
              },
              {
                "dt": 1576033200,
                "main": {
                  "temp": 279.34,
                  "temp_min": 279.34,
                  "temp_max": 279.34,
                  "pressure": 1006,
                  "sea_level": 1006,
                  "grnd_level": 1002,
                  "humidity": 58,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                  }
                ],
                "clouds": {
                  "all": 32
                },
                "wind": {
                  "speed": 4.55,
                  "deg": 263
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-11 03:00:00"
              },
              {
                "dt": 1576044000,
                "main": {
                  "temp": 278.75,
                  "temp_min": 278.75,
                  "temp_max": 278.75,
                  "pressure": 1005,
                  "sea_level": 1005,
                  "grnd_level": 1001,
                  "humidity": 67,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                  }
                ],
                "clouds": {
                  "all": 22
                },
                "wind": {
                  "speed": 4.97,
                  "deg": 239
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2019-12-11 06:00:00"
              },
              {
                "dt": 1576054800,
                "main": {
                  "temp": 278.58,
                  "temp_min": 278.58,
                  "temp_max": 278.58,
                  "pressure": 1005,
                  "sea_level": 1005,
                  "grnd_level": 1001,
                  "humidity": 71,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                  }
                ],
                "clouds": {
                  "all": 24
                },
                "wind": {
                  "speed": 4.69,
                  "deg": 237
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-11 09:00:00"
              },
              {
                "dt": 1576065600,
                "main": {
                  "temp": 280.49,
                  "temp_min": 280.49,
                  "temp_max": 280.49,
                  "pressure": 1003,
                  "sea_level": 1003,
                  "grnd_level": 999,
                  "humidity": 59,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                  }
                ],
                "clouds": {
                  "all": 11
                },
                "wind": {
                  "speed": 3.88,
                  "deg": 232
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2019-12-11 12:00:00"
              }
            ],
            "city": {
              "id": 2643743,
              "name": "London",
              "coord": {
                "lat": 51.5085,
                "lon": -0.1258
              },
              "country": "GB",
              "population": 1000000,
              "timezone": 0,
              "sunrise": 1575618607,
              "sunset": 1575647579
            }
          };
        
        

        return (
            <Card>
                <Card.Content>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column textAlign='left' verticalAlign='middle'>
                                <Header as='h3'>{weatherForecastData.city.name}</Header>
                            </Grid.Column>
                            <Grid.Column textAlign='right' verticalAlign='middle'>
                                { this.DateTimeStr(weatherForecastData.list[0].dt_txt)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content>

                </Card.Content>
            </Card>
        );
    }
}

export default WeatherDashboard
