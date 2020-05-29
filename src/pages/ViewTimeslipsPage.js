import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { CSVLink } from "react-csv";
import { EditTimeslipPage } from '../pages';
import { Login, PrimaryCheckbox, InvertPrimaryCheckbox, BorderedTableCell, BorderedHeadTableCell, StyledTable, StyledTableContainer, TimeSlipPaper, WhiteTableSortLabel,  } from '../components';

const columnLookup = {
  date: 'Date',
  time: 'Time',
  track: 'Track',
  lane: 'Lane',
  class: 'Class',
  car: 'Car',
  dial: 'Dial In',
  win: 'W/L',
  delayBox: 'Delay Box',
  rt: 'R/T',
  _60: '60\'',
  _330: '330\'',
  eightET: '1/8 ET',
  eightMPH: '1/8 MPH',
  _1000: '1000\'',
  quarterET: '1/4 ET',
  quarterMPH: '1/4 MPH',
  windSpeed: 'Wind Speed',
  windDirection: 'Wind Direction',
  airTemp: 'Air Temp (°F)',
  humidity: 'Humidity (%)',
  bPressure: 'Barometric Pressure (inHg)',
  da: 'Density Altitude',
  vp: 'Vapor Pressure',
  note1: 'Note 1',
  note2: 'Note 2',
  note3: 'Note 3',
  editData: {},
}

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
      sortLabel: 'date',
      sortDesc: false,
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

  compare = (a, b, label, sortDesc) => {
    var desc = sortDesc ? 1 : -1;
    if (a.data[label] < b.data[label]) {
      return -desc;
    }
    if (a.data[label] > b.data[label]) {
      return desc;
    }
    return 0;
  }

  sortBy = (sortLabel) => {
    var timeslips = this.state.timeslips;
    if (sortLabel === this.state.sortLabel) {
      if (sortLabel === 'date') {
        timeslips.sort((a,b) => this.compare(a, b, 'time', !this.state.sortDesc));
        timeslips.sort((a,b) => this.compare(a, b, sortLabel, !this.state.sortDesc));
      }
      else {
        timeslips.sort((a,b) => this.compare(a, b, sortLabel, !this.state.sortDesc));
      }
      this.setState({timeslips, sortDesc: !this.state.sortDesc});
    }
    else {
      if (sortLabel === 'date') {
        timeslips.sort((a,b) => this.compare(a, b, 'time', true));
        timeslips.sort((a,b) => this.compare(a, b, sortLabel, true));
      }
      else {
        timeslips.sort((a,b) => this.compare(a, b, sortLabel, true));
      }
      this.setState({timeslips, sortLabel, sortDesc: true});
    }
  }

  buildTableHeader = (name) => {
    return (
      <BorderedHeadTableCell>
        <WhiteTableSortLabel
          active={this.state.sortLabel === name}
          direction={this.state.sortDesc ? 'desc' : 'asc'}
          onClick={() => this.sortBy(name)}
        >
          {columnLookup[name]}
        </WhiteTableSortLabel>
      </BorderedHeadTableCell>
    );
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

  handleEdit = (data) => {
    this.setState({editData: data});
  }

  editSubmit = () => {
    this.setState({editData: null});
    this.getData();
  }

  render() {
    if (!this.props.authUser) {
      return <Login firebase={this.props.firebase} authUser={this.props.authUser} />;
    }
    else if (this.state.editData) {
      return <EditTimeslipPage firebase={this.props.firebase} data={this.state.editData.data} id={this.state.editData.id} onSubmit={this.editSubmit} />;
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
                    <BorderedHeadTableCell><center>Edit</center></BorderedHeadTableCell>
                      {this.buildTableHeader('date')}
                      {this.buildTableHeader('time')}
                      {this.buildTableHeader('track')}
                      {this.buildTableHeader('class')}
                      {this.buildTableHeader('car')}
                      {this.buildTableHeader('lane')}
                      {this.buildTableHeader('dial')}
                      {this.buildTableHeader('win')}
                      {this.buildTableHeader('delayBox')}
                      {this.buildTableHeader('rt')}
                      {this.buildTableHeader('_60')}
                      {this.buildTableHeader('_330')}
                      {this.buildTableHeader('eightET')}
                      {this.buildTableHeader('eightMPH')}
                      {this.buildTableHeader('_1000')}
                      {this.buildTableHeader('quarterET')}
                      {this.buildTableHeader('quarterMPH')}
                      {this.buildTableHeader('windSpeed')}
                      {this.buildTableHeader('windDirection')}
                      {this.buildTableHeader('airTemp')}
                      {this.buildTableHeader('humidity')}
                      {this.buildTableHeader('bPressure')}
                      {this.buildTableHeader('da')}
                      {this.buildTableHeader('vp')}
                      {this.buildTableHeader('note1')}
                      {this.buildTableHeader('note2')}
                      {this.buildTableHeader('note3')}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.timeslips.map((timeslip, i) => {
                    return (
                      <TableRow key={timeslip.id}>
                      <BorderedTableCell><center><PrimaryCheckbox checked={this.state.checked[timeslip.id]} onChange={() => {this.handleCheck(timeslip.id)}}/></center></BorderedTableCell>
                        <BorderedTableCell><Button size="small" variant="contained" color="primary" style={{textTransform: 'none'}} onClick={()=>{this.handleEdit(timeslip)}}>Edit</Button></BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.date}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.time}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.track}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.class}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.car}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.lane}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.dial}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.win}</BorderedTableCell>
                        <BorderedTableCell>{timeslip.data.delayBox}</BorderedTableCell>
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
        <CSVLink
          filename={"talbot-racing-download.csv"}
          data={this.state.timeslips.map((timeslip) => {return timeslip.data})}
          headers={Object.keys(columnLookup)}
          style={{all: 'unset'}}
        >
          <Button variant="contained" color="primary" style={{textTransform: 'none'}}>Download Timeslips</Button>
        </CSVLink>
      </>
    );
  }
}

export default ViewTimeslips;
