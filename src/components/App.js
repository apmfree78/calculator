import React from "react";
import { calcAnswer } from "../helper";
const space = " ".repeat(10);

class App extends React.Component {
  state = {
    answer: "", //the result of calculation inputed by user
    input: "0", //current input from user, either a number \d or operation [*/+-]
    inputString: "", //the full expression inputed by user
  };

  // handling numberical \d or operator [*/+-] input by user
  handleInput = (value) => {
    const input = value;
    let inputString = this.state.inputString;
    let answer = this.state.answer;
    const prevInput = this.state.input;

    //regex patterns
    // const endWithOperator = /(\*|\/|-|\+)$/;
    // const endWithNumber = /\d+$/;
    const beginningZero = /(^0|\*0|\/0|-0|\+0)$/;
    const endWithPeriodZero = /\.0+$/;
    const operators = "*/+-";

    //********VALIDATIONS AND ASCERTIONS ******* */
    //checking if there's an answer on the screen
    if (answer != "") {
      //resetting screen
      answer = "";
      inputString = "";
    }

    //check if consecutive operators are input **, */ , +* , etc
    //if so, only accepting last operator
    //ALSO check if multiple zeros are added in that are not followed by period
    //SO it's NOT 1.0001 but 0001 , first is fine , second is not
    //PLUS CHECK if there are 2 decimals submitted
    if (
      (operators.includes(input) &&
        operators.includes(prevInput) &&
        input != "-") ||
      (input == "0" &&
        beginningZero.test(inputString) &&
        !endWithPeriodZero.test(inputString)) ||
      (input == "." && prevInput == ".")
    ) {
      //in this case use only current operator and disregard prevous operator
      //OR remove extra zero
      inputString = inputString.substring(0, inputString.length - 1);
    }

    inputString += input;

    this.setState({ answer, input, inputString });
  };

  // function to handle when user presses '='
  calculateInput = () => {
    let inputString = this.state.inputString;
    const prevInput = this.state.input;
    const operators = "*/+-";

    //VALIDATION **************
    //checking if last character is an operator,
    //if so removing it
    if (operators.includes(prevInput)) {
      //in this case operator
      inputString = inputString.substring(0, inputString.length - 1);
    }

    //parcing equation user submitted and
    //calculating result
    const answer = calcAnswer(inputString);
    console.log(answer);
    //appending result to inputString to display on screen
    inputString = inputString + "=" + answer;

    //setting input to answer to show on screen
    const input = answer;

    //updating state
    this.setState({ answer, input, inputString });
  };

  // function to handle when user presses '='
  clearState = () => {
    //reset state to initial conditions
    const answer = "";
    const inputString = "";
    const input = "0";

    //updating state
    this.setState({ answer, input, inputString });
  };

  render() {
    const { answer, input, inputString } = this.state;

    return (
      <div id='calculator' className='container row'>
        <div
          id='display'
          className='d-flex flex-column justify-content-left align-items-end'>
          <span id='inputstring'>{inputString}</span>
          <span id='input'>{input}</span>
        </div>
        {/* top row below screen */}
        <div id='left-pad' className='col-9'>
          <div className='row'>
            <button
              className='col-9'
              type='submit'
              id='clear'
              index='clear'
              onClick={this.clearState}>
              AC
            </button>
            <button
              className='col-3'
              type='submit'
              id='divide'
              index='divide'
              onClick={() => this.handleInput("/")}>
              /
            </button>
          </div>
          {/* first row of numbers  */}
          <div className='row'>
            <button
              className='col-4'
              type='submit'
              id='one'
              index='1'
              onClick={() => this.handleInput("1")}>
              1
            </button>
            <button
              className='col-4'
              type='submit'
              id='two'
              index='2'
              onClick={() => this.handleInput("2")}>
              2
            </button>
            <button
              className='col-4'
              type='submit'
              id='three'
              index='3'
              onClick={() => this.handleInput("3")}>
              3
            </button>
          </div>

          {/* second row of numbers */}
          <div className='row'>
            <button
              className='col-4'
              type='submit'
              id='four'
              index='4'
              onClick={() => this.handleInput("4")}>
              4
            </button>
            <button
              className='col-4'
              type='submit'
              id='five'
              index='5'
              onClick={() => this.handleInput("5")}>
              5
            </button>
            <button
              className='col-4'
              type='submit'
              id='six'
              index='6'
              onClick={() => this.handleInput("6")}>
              6
            </button>
          </div>
          {/* third row of numbers */}
          <div className='row'>
            <button
              className='col-4'
              type='submit'
              id='seven'
              index='7'
              onClick={() => this.handleInput("7")}>
              7
            </button>
            <button
              className='col-4'
              type='submit'
              id='eight'
              index='8'
              onClick={() => this.handleInput("8")}>
              8
            </button>
            <button
              className='col-4'
              type='submit'
              id='nine'
              index='9'
              onClick={() => this.handleInput("9")}>
              9
            </button>
          </div>
          {/* forth row of numbers */}
          <div className='row'>
            <button
              className='col-8'
              type='submit'
              id='zero'
              index='0'
              onClick={() => this.handleInput("0")}>
              0
            </button>
            <button
              className='col-4'
              type='submit'
              id='period'
              index='period'
              onClick={() => this.handleInput(".")}>
              .
            </button>
          </div>
        </div>
        {/*end of left-pad */}
        <div id='right-pad' className='col-3'>
          <div className='row'>
            <button
              className='col-12'
              type='submit'
              id='times'
              index='times'
              onClick={() => this.handleInput("*")}>
              *
            </button>
            <button
              className='col-12'
              type='submit'
              id='minus'
              index='minus'
              onClick={() => this.handleInput("-")}>
              -
            </button>
            <button
              className='col-12'
              type='submit'
              id='plus'
              index='plus'
              onClick={() => this.handleInput("+")}>
              +
            </button>
            <button
              className='col-12'
              type='submit'
              id='equals'
              index='equals'
              onClick={this.calculateInput}>
              =
            </button>
          </div>
        </div>
        {/* end of right pad */}
      </div>
    );
  }
}
export default App;
