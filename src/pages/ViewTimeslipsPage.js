import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Login, PrimaryCheckbox, InvertPrimaryCheckbox, BorderedTableCell, BorderedHeadTableCell, StyledTable, StyledTableContainer, TimeSlipPaper } from '../components';

class ViewTimeslips extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeslips: [],
      checked: [],
      checkAll: false,
      loading: true,
      update: false,
      initialLoad: false,
    }
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.getData();
      this.setState({initialLoad: true});
    }
  }

  componentDidUpdate() {
    if (this.props.authUser && !this.state.initialLoad) {
      this.getData();
      this.setState({initialLoad: true});
    }
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
    if (!this.props.authUser) {
      return <Login firebase={this.props.firebase} authUser={this.props.authUser} />;
    }

    return (
      <>
        <h1>View Timeslips</h1>
        <DropdownButton id="delete-timeslips-dropdown" varient="danger" title="Delete Selected Time Slips">
          <Dropdown.Item disabled>Are you sure?</Dropdown.Item>
          <Dropdown.Item onClick={this.handleDelete}>Yes</Dropdown.Item>
          <Dropdown.Item>No</Dropdown.Item>
        </DropdownButton>
        {(!this.state.loading &&
        <TimeSlipPaper>
            <StyledTableContainer>
              <StyledTable size="small">
                <TableHead>
                  <TableRow>
                    <BorderedHeadTableCell><center><InvertPrimaryCheckbox checked={this.state.checkAll} onChange={this.handleCheckAll}/></center></BorderedHeadTableCell>
                    <BorderedHeadTableCell>Date</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Time</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Track</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Lane</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Dial In</BorderedHeadTableCell>
                    <BorderedHeadTableCell>W/L</BorderedHeadTableCell>
                    <BorderedHeadTableCell>R/T</BorderedHeadTableCell>
                    <BorderedHeadTableCell>60'</BorderedHeadTableCell>
                    <BorderedHeadTableCell>330'</BorderedHeadTableCell>
                    <BorderedHeadTableCell>1/8 ET</BorderedHeadTableCell>
                    <BorderedHeadTableCell>1/8 MPH</BorderedHeadTableCell>
                    <BorderedHeadTableCell>1000'</BorderedHeadTableCell>
                    <BorderedHeadTableCell>1/4 ET</BorderedHeadTableCell>
                    <BorderedHeadTableCell>1/4 MPH</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Wind Speed</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Wind Direction</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Air Temp (&deg;F)</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Humidity (%)</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Barometric Pressure (inHg)</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Density Altitude</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Vapor Pressure</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Note 1</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Note 2</BorderedHeadTableCell>
                    <BorderedHeadTableCell>Note 3</BorderedHeadTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.timeslips.map((timeslip, i) => {
                    return (
                      <TableRow key={timeslip.id}>
                        <BorderedTableCell><center><PrimaryCheckbox checked={this.state.checked[timeslip.id]} onChange={() => {this.handleCheck(timeslip.id)}}/></center></BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.date}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.time}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.track}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.lane}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.dial}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.win}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.rt}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data._60}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data._330}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.eightET}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.eightMPH}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data._1000}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.quarterET}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.quarterMPH}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.windSpeed}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.windDirection}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.airTemp}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.humidity}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.bPressure}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.da}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.vp}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.note1}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.note2}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.note3}</BorderedTableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </TimeSlipPaper>)
          ||
          <center>
            <Spinner animation="grow" variant="primary" />
          </center>
        }
      </>
    );
  }
}

export default ViewTimeslips;
