import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class ViewTimeSlips extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeslips: [],
      checked: [],
      checkAll: false,
      loading: true,
      update: false,
    }
  }

  async componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    this.setState({update: false});
  }

  getData = async() => {
    var results = await this.props.firebase.getTimeslips();
    this.setState({
      timeslips: results.timeslips,
      checked: results.checked,
      loading: false
    });
  }

  handleCheck = (id) => {
    let checked = this.state.checked;
    checked[id] = !checked[id];
    this.setState({checked, checkAll: false, update: true});
  }

  handleCheckAll = () => {
    let checked = this.state.checked;
    this.state.timeslips.forEach(slip => {
      checked[slip.id] = !this.state.checkAll;
    });
    this.setState({checkAll: !this.state.checkAll, checked, update: true});
  }

  handleDelete = () => {
    this.setState({loading: true});
    var recordsToDelete = 0;
    var recordsDeleted = 0;
    this.state.timeslips.forEach((slip, i) => {
      if (this.state.checked[slip.id]) {
        recordsToDelete++;
      }
    });
    this.state.timeslips.forEach((slip, i) => {
      if (this.state.checked[slip.id]) {
        this.props.firebase.deleteTimeslip(slip.id)
        .then(() => {
          recordsDeleted++;
          if (recordsDeleted === recordsToDelete) {
            this.getData();
          }
        });
      }
    });
  }

  render() {
    return (
      <>
        <h1>View Time Slips</h1>
        <DropdownButton varient="danger" title="Delete Selected Time Slips">
          <Dropdown.Item disabled>Are you sure?</Dropdown.Item>
          <Dropdown.Item onClick={this.handleDelete}>Yes</Dropdown.Item>
          <Dropdown.Item>No</Dropdown.Item>
        </DropdownButton>
        {(!this.state.loading && 
          <Table size="sm"  responsive='sm' bordered striped>
            <thead>
              <tr>
                <th>Select All<Form.Check type="checkbox" checked={this.state.checkAll} onChange={this.handleCheckAll}/></th>
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
              {this.state.timeslips.map((timeslip, i) => {
                return (
                  <tr key={timeslip.id}>
                    <td><center><Form.Check checked={this.state.checked[timeslip.id]} onChange={() => {this.handleCheck(timeslip.id)}}/></center></td>
                    <td>{timeslip.data.date}</td>
                    <td>{timeslip.data.time}</td>
                    <td>{timeslip.data.track}</td>
                    <td>{timeslip.data.lane}</td>
                    <td>{timeslip.data.dial}</td>
                    <td>{timeslip.data.win}</td>
                    <td>{timeslip.data.rt}</td>
                    <td>{timeslip.data._60}</td>
                    <td>{timeslip.data._330}</td>
                    <td>{timeslip.data.eightET}</td>
                    <td>{timeslip.data.eightMPH}</td>
                    <td>{timeslip.data._1000}</td>
                    <td>{timeslip.data.quarterET}</td>
                    <td>{timeslip.data.quarterMPH}</td>
                    <td>{timeslip.data.windSpeed}</td>
                    <td>{timeslip.data.windDirection}</td>
                    <td>{timeslip.data.airTemp}</td>
                    <td>{timeslip.data.humidity}</td>
                    <td>{timeslip.data.bPressure}</td>
                    <td>{timeslip.data.da}</td>
                    <td>{timeslip.data.vp}</td>
                    <td>{timeslip.data.note1}</td>
                    <td>{timeslip.data.note2}</td>
                    <td>{timeslip.data.note3}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>)
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
