import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

class WeatherPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        data: null,
        loading: true,
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    fetch('https://api.climacell.co/v3/weather/realtime?lat=43.292660&lon=-81.717686&unit_system=us&fields=temp,dewpoint,wind_speed,wind_gust,baro_pressure,humidity,wind_direction', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/JSON',
        'Content-Encoding': 'gzip',
        'apikey': 'IBoiXSHtYCB6Z5lPWXS6y74W9aPjqvdD',
      },
    })
    .then((response) => {
      if(response.status === 200) {
      //example response with current fields
        // baro_pressure: {value: 30.1095, units: "inHg"}
        // dewpoint: {value: 27.73, units: "F"}
        // humidity: {value: 76.81, units: "%"}
        // lat: 43.29266
        // lon: -81.717686
        // observation_time: {value: "2020-02-10T20:11:58.267Z"}
        // temp: {value: 34.25, units: "F"}
        // wind_direction: {value: 329.38, units: "degrees"}
        // wind_gust: {value: 12.16, units: "mph"}
        // wind_speed: {value: 10.07, units: "mph"}
        response.json().then((data) => {
          this.setState({data, loading: false});
        });
      }
    });
  }

  buildWeatherTable = () => {
    var data = this.state.data;
    var table = [];

    for (var prop in data) {
      if (prop !== 'lat' && prop !== 'lon' && prop !== 'observation_time') {
        table.push(<tr key={prop}>
          <td>{prop}</td>
          <td>{data[prop].value + ' ' + data[prop].units}</td>
        </tr>);
      }
    }
    return table;
  }

  render() {

    return (
      <div>
        <h1>Grand Bend Motorplex</h1>
        {this.state.loading &&
          <>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
          </>
          ||
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Measurement</th>
              </tr>
            </thead>
            <tbody>
              {this.buildWeatherTable()}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default WeatherPage;
