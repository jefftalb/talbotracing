import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { db } from '.';

class ViewTimeSlips extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      loading: true,
    }
  }

  async componentDidMount() {
    this.getData();
  }

  getData = async() => {
    var table = await db.collection("time-slips").get().then((results) => {
      return (
        results.docs.map((timeslip, i) => {
          console.log(timeslip.data()._60);
          return(
            <tr>
              <td>{timeslip.data().date}</td>
              <td>{timeslip.data().time}</td>
              <td>{timeslip.data().track}</td>
              <td>{timeslip.data().lane}</td>
              <td>{timeslip.data().dial}</td>
              <td>{timeslip.data().win}</td>
              <td>{timeslip.data().rt}</td>
              <td>{timeslip.data()._60}</td>
              <td>{timeslip.data()._330}</td>
              <td>{timeslip.data().eightET}</td>
              <td>{timeslip.data().eightMPH}</td>
              <td>{timeslip.data()._1000}</td>
              <td>{timeslip.data().quarterET}</td>
              <td>{timeslip.data().quarterMPH}</td>
              <td>{timeslip.data().windSpeed}</td>
              <td>{timeslip.data().windDirection}</td>
              <td>{timeslip.data().airTemp}</td>
              <td>{timeslip.data().humidity}</td>
              <td>{timeslip.data().bPressure}</td>
              <td>{timeslip.data().da}</td>
              <td>{timeslip.data().vp}</td>
              <td>{timeslip.data().note1}</td>
              <td>{timeslip.data().note2}</td>
              <td>{timeslip.data().note3}</td>
            </tr>
          );
        })
      );
    });
    this.setState({table: table, loading: false});
  }

  render() {
    return (
      <>
        <h1>View Time Slips</h1>
        {!this.state.loading && 
          <Table size="sm"  responsive bordered striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Track</th>
                <th>Lane</th>
                <th>Dial In</th>
                <th>W/L</th>
                <th>R/T</th>
                <th>60'</th>
                <th>330'</th>
                <th>1/8 ET</th>
                <th>1/8 MPH</th>
                <th>1000'</th>
                <th>1/4 ET</th>
                <th>1/4 MPH</th>
                <th>Wind Speed</th>
                <th>Wind Direction</th>
                <th>Air Temp (&deg;F)</th>
                <th>Humidity (%)</th>
                <th>Barometric Pressure (inHg)</th>
                <th>Density Altitude</th>
                <th>Vapor Pressure</th>
                <th>Note 1</th>
                <th>Note 2</th>
                <th>Note 3</th>
              </tr>
            </thead>
            <tbody>
              {this.state.table}
            </tbody>
          </Table>
          ||
          <center>
            <Spinner animation="grow" variant="primary" />
          </center>
        }
      </>
    );
  }
}

export default ViewTimeSlips;
