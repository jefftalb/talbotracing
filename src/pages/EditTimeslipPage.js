import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

class AddTimeslip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.data.date,
      time: this.props.data.time,
      track: this.props.data.track,
      car: this.props.data.car,
      class: this.props.data.class,
      lane: this.props.data.lane,
      dial: this.props.data.dial,
      win: this.props.data.win,
      delayBox: this.props.data.delayBox,
      rt: this.props.data.rt,
      _60: this.props.data._60,
      _330: this.props.data._330,
      eightET: this.props.data.eightET,
      eightMPH: this.props.data.eightMPH,
      _1000: this.props.data._1000,
      quarterET: this.props.data.quarterET,
      quarterMPH: this.props.data.quarterMPH,
      airTemp: this.props.data.airTemp,
      humidity: this.props.data.humidity,
      bPressure: this.props.data.bPressure,
      da: this.props.data.da,
      vp: this.props.data.vp,
      windSpeed: this.props.data.windSpeed,
      windDirection: this.props.data.windDirection,
      note1: this.props.data.note1,
      note2: this.props.data.note2,
      note3: this.props.data.note3,
      validated: false,
      loading: false,
      errorSubmitting: false,
      showErrorBanner: false,
    }
  }

  componentDidUpdate = () => {
    if (this.state.errorSubmitting) {
      this.setState({
        showErrorBanner: true,
        loading: false,
      });
      setTimeout(() => {
        this.setState({showErrorBanner: false});
      }, 3000);
    }
  }

  submitTimeSlip = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({validated: true});
      return;
    }
    this.setState({loading: true});
    e.preventDefault();
    this.props.firebase.updateTimeslip(this.state, this.props.id)
    .then(docRef => {
      this.props.onSubmit();
    })
    .catch(error => {
      this.setState({errorSubmitting: true});
      this.props.firebase.addError(error);
    });
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
  handleClass = e => {
    this.setState({
      class: e.target.value
    });
  }
  handleCar = e => {
    this.setState({
      car: e.target.value
    });
  }
  handleDelayBox = e => {
    this.setState({
      delayBox: e.target.value
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
        <h1>Edit Timeslip</h1>
        {this.state.showErrorBanner &&
          <Alert varient="danger" onClose={() => this.setState({showErrorBanner: false})} dismissible>
            Something went wrong. Please try again later.
          </Alert>
        }
        <Form noValidate validated={this.state.validated} onSubmit={this.submitTimeSlip}>
          <Form.Row>
            <Form.Group as={Col} controlId="validationCustomUsername">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={this.state.date}
                onChange={this.handleDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={this.state.time}
                onChange={this.handleTime}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid time.
              </Form.Control.Feedback>
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
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                value={this.state.class}
                onChange={this.handleClass}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Car</Form.Label>
              <Form.Control
                type="text"
                value={this.state.car}
                onChange={this.handleCar}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Lane</Form.Label>
              <Form.Control as="select" value={this.state.lane} onChange={this.handleLane}>
                <option>Right</option>
                <option>Left</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Win/Loss</Form.Label>
              <Form.Control as="select" value={this.state.win} onChange={this.handleWin}>
                <option>T/T</option>
                <option>Win</option>
                <option>Loss</option>
              </Form.Control>
            </Form.Group>
            {this.state.win !== "T/T" &&
            <Form.Group as={Col}>
              <Form.Label >Dial</Form.Label>
              <Form.Control
                type="number"
                value={this.state.dial}
                onChange={this.handleDial}
                step={0.01}
              />
            </Form.Group>}
            <Form.Group as={Col}>
              <Form.Label>Delay Box</Form.Label>
              <Form.Control
                type="number"
                value={this.state.delayBox}
                onChange={this.handleDelayBox}
                step={0.001}
              />
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

export default AddTimeslip;
