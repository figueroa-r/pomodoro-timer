import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/*Our pomodoro clock will have parent component which will manage state and 
house our eventHandler methods...

we also will have a child components which will have properties passed down*/

//stateless child component for session/break components
class Duration extends React.Component {
  render() {
    const compName = this.props.name;
    return (
        <div>
            <button id={compName + "-decrement"} 
                    onClick={() => this.props.decrement(compName)}>decrement</button>

            <h2 id={compName + "-label"}>{compName.toUpperCase() + '-LENGTH'}</h2>
            <button id={compName + "-increment"}
                    onClick={() => this.props.increment(compName)}>increment</button>
            <br />
            <h1 id={compName + "-length"}>{this.props.value}</h1>
        </div>
    ) 
    //<h1>This is my session / break incrementer</h1>;
  }
}

//stateless child component for timer component with play/pause and reset
class Timer extends React.Component {
//   constructor(props) {
//     super(props);
//   }

  render() {
    return (
        <div>
            <h1 id="time-left">{this.props.value}</h1>
            <br />
            <h2 id="timer-label">{this.props.name}</h2>
            <button id="start_stop" onClick={/*insert on click prop*/''}>start/stop</button>
            <button id="reset" onClick={this.props.resetClick}>reset</button>
        </div>
    )
    //<h1>This is my Timer with play/pause/reset!</h1>;
  }
}

//Finally, we have our Parent App wrapper which will house our state and methods for manipulating state

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //instantiate our state object
      break: 5,
      session: 25,
      sessionBool: true,
      runningBool: false,
      remaining: "23:00"
    };
    //insert our this bindings for methods that modify state
    this.handleReset = this.handleReset.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  //insert our methods for events...as well as lifecycle methods!
  handleReset() {
    this.setState({
        break: 5,
        session: 25,
        sessionBool: true,
        remaining: "25:00"
    })
  }

  handleDecrement(target) {
    this.setState(state => (
        state[target] = state[target] > 1 ? state[target] - 1 : 1
    ));
  }

  handleIncrement(target) {
    this.setState(state => (
        state[target] = state[target] < 60 ? state[target] + 1 : 60
    ));
  }


  //render method for our pomodoro app
  render() {
    const timerVal = this.state.sessionBool ? "Session" : "Break";
    return (
      <div>
        <Duration name="break" 
                  decrement={this.handleDecrement}
                  increment={this.handleIncrement}
                  value={this.state.break}/>
        <Duration name="session" 
                  decrement={this.handleDecrement}
                  increment={this.handleIncrement}
                  value={this.state.session} />
        <Timer name={timerVal}
               value={this.state.remaining} 
               resetClick={this.handleReset}/>
      </div>
    );
  }
}

/* ======================================== */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Pomodoro />);
