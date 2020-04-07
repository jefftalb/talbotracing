import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

class AddTimeSlip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      track: "GBM",
      lane: "Right",
      dial: "0.00",
      win: "T/T",
      rt: "0.000",
      _60: "0.000",
      _330: "0.000",
      eightET: "0.000",
      eightMPH: "0.00",
      _1000: "0.000",
      quarterET: "0.000",
      quarterMPH: "0.00",
      airTemp: "0.0",
      humidity: "0.0",
      bPressure: "0.00",
      da: "0",
      vp: "0.00",
      windSpeed: "0.0",
      windDirection: "Head",
      note1: "",
      note2: "",
      note3: "",
      submitted: false,
      errorSubmitting: false,
      showErrorBanner: false,
      showSubmittedBanner: false,
      loading: false,
    }
  }

  componentDidUpdate = () => {
    if (this.state.submitted) {
      this.setState({
        dial: "0.00",
        win: "T/T",
        rt: "0.000",
        _60: "0.000",
        _330: "0.000",
        eightET: "0.000",
        eightMPH: "0.00",
        _1000: "0.000",
        quarterET: "0.000",
        quarterMPH: "0.00",
        airTemp: "0.0",
        humidity: "0.0",
        bPressure: "0.00",
        da: "0",
        vp: "0.00",
        windSpeed: "0.0",
        windDirection: "Head",
        note1: "",
        note2: "",
        note3: "",
        submitted: false,
        errorSubmitting: false,
        showSubmittedBanner: true,
        loading: false,
      })
    }
    else if (this.state.errorSubmitting) {
      this.setState({
        showErrorBanner: true,
        loading: false,
      })
    }
  }

  submitTimeSlip = (e) => {
    this.setState({loading: true});
    e.preventDefault();
    this.props.firebase.addTimeslip(this.state)
    .then(docRef => {
      this.setState({submitted: true})
    })
    .catch(error => {
      this.setState({errorSubmitting: true});
      this.props.firebase.addError("jeff", error);
    })
  }
  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  }
  handleTime = e => {
    this.setState({
      time: e.target.value
    });
  }
  handleTrack = e => {
    this.setState({
      track: e.target.value
    });
  }
  handleLane = e => {
    this.setState({
      lane: e.target.value
    });
  }
  handleRT = e => {
    this.setState({
      rt: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleDial = e => {
    this.setState({
      dial: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleWin = e => {
    this.setState({
      win: e.target.value,
    });
  }
  handle60 = e => {
    this.setState({
      _60: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handle330 = e => {
    this.setState({
      _330: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleEightET = e => {
    this.setState({
      eightET: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleEightMPH = e => {
    this.setState({
      eightMPH: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handle1000 = e => {
    this.setState({
      _1000: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleQuarterET = e => {
    this.setState({
      quarterET: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleQuarterMPH = e => {
    this.setState({
      quarterMPH: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleNote1 = e => {
    this.setState({
      note1: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleNote2 = e => {
    this.setState({
      note2: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleNote3 = e => {
    this.setState({
      note3: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleAirTemp = e => {
    this.setState({
      airTemp: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleHumidity = e => {
    this.setState({
      humidity: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleBPressure = e => {
    this.setState({
      bPressure: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleWindSpeed = e => {
    this.setState({
      windSpeed: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleWindDirection = e => {
    this.setState({
      windDirection: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleDA = e => {
    this.setState({
      da: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }
  handleVP = e => {
    this.setState({
      vp: e.target.value,
    });
    // use parseFloat(e.target.value).toFixed(3) for submitting and displaying
  }

  render() {

    return (
      <>
        <h1>Add a Time Slip</h1>
        {this.state.showSubmittedBanner &&
          <Alert variant="success" onClose={() => this.setState({showSubmittedBanner: false})} delay={3000} dismissible>
            Time slip successfully submitted.
          </Alert>
        }
        {this.state.showErrorBanner &&
          <Alert varient="danger" onClose={() => this.setState({showErrorBanner: false})} dismissible>
            Something went wrong. Please try again later.
          </Alert>
        }
        <Form onSubmit={this.submitTimeSlip}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={this.state.date}
                onChange={this.handleDate}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={this.state.time}
                onChange={this.handleTime}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Track</Form.Label>
              <Form.Control
                type="text"
                value={this.state.track}
                onChange={this.handleTrack}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Lane</Form.Label>
              <Form.Control as="select" value={this.state.lane} onChange={this.handleLane}>
                <option>Right</option>
                <option>Left</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Dial</Form.Label>
              <Form.Control
                type="number"
                value={this.state.dial}
                onChange={this.handleDial}
                step={0.01}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Win/Loss</Form.Label>
              <Form.Control as="select" value={this.state.win} onChange={this.handleWin}>
                <option>T/T</option>
                <option>Win</option>
                <option>Loss</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>R/T</Form.Label>
              <Form.Control
                type="number"
                value={this.state.rt}
                onChange={this.handleRT}
                step={0.001}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>60'</Form.Label>
              <Form.Control
                type="number"
                value={this.state._60}
                onChange={this.handle60}
                step={0.001}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>330'</Form.Label>
              <Form.Control
                type="number"
                value={this.state._330}
                onChange={this.handle330}
                step={0.001}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>1/8 ET</Form.Label>
              <Form.Control
                type="number"
                value={this.state.eightET}
                onChange={this.handleEightET}
                step={0.001}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>1/8 MPH</Form.Label>
              <Form.Control
                type="number"
                value={this.state.eightMPH}
                onChange={this.handleEightMPH}
                step={0.01}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>1000'</Form.Label>
              <Form.Control
                type="number"
                value={this.state._1000}
                onChange={this.handle1000}
                step={0.001}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>1/4 ET</Form.Label>
              <Form.Control
                type="number"
                value={this.state.quarterET}
                onChange={this.handleQuarterET}
                step={0.001}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>1/4 MPH</Form.Label>
              <Form.Control
                type="number"
                value={this.state.quarterMPH}
                onChange={this.handleQuarterMPH}
                step={0.01}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Wind Speed (MPH)</Form.Label>
              <Form.Control
                type="number"
                value={this.state.windSpeed}
                onChange={this.handleWindSpeed}
                step={0.01}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Wind Direction</Form.Label>
              <Form.Control as="select" value={this.state.windDirection} onChange={this.handleWindDirection}>
                <option>Head</option>
                <option>Cross Head</option>
                <option>Cross</option>
                <option>Cross Tail</option>
                <option>Tail</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Air Temp (&deg;F)</Form.Label>
              <Form.Control
                type="number"
                value={this.state.airTemp}
                onChange={this.handleAirTemp}
                step={0.001}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Humidity (%)</Form.Label>
              <Form.Control
                type="number"
                value={this.state.humidity}
                onChange={this.handleHumidity}
                step={0.01}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Barometric Pressure (inHg)</Form.Label>
              <Form.Control
                type="number"
                value={this.state.bPressure}
                onChange={this.handleBPressure}
                step={0.01}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Density Altitude</Form.Label>
              <Form.Control
                type="number"
                value={this.state.da}
                onChange={this.handleDA}
                step={0.01}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Vapor Pressure</Form.Label>
              <Form.Control
                type="number"
                value={this.state.vp}
                onChange={this.handleVP}
                step={0.01}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Note 1</Form.Label>
              <Form.Control
                as="textarea"
                value={this.state.note1}
                onChange={this.handleNote1}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Note 2</Form.Label>
              <Form.Control
                as="textarea"
                value={this.state.note2}
                onChange={this.handleNote2}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Note 3</Form.Label>
              <Form.Control
                as="textarea"
                value={this.state.note3}
                onChange={this.handleNote3}
              />
            </Form.Group>
          </Form.Row>
          {(this.state.loading &&
            <Button variant="primary">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>)
            ||
            <Button variant="primary" type="submit">Submit</Button>
          }
        </Form>
      </>
    );
  }
}

export default AddTimeSlip;
