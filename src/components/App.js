import React from "react";
import { calcAnswer } from "../helper";

class App extends React.Component {
  state = {
    answer: "", //the result of calculation inputed by user
    input: "0", //current input from user, either a number \d or operation [*/+-]
    inputString: "", //the full expression inputed by user
  };

  handleInput = (value) => {
    this.setState({ input: value });
  };

  render() {
    // const quoteKeys = Object.keys(this.state.quotes);
    // const quoteArray = quoteKeys.map((key) => <li>{this.state.quotes[key].quote}</li>);
    const results = calcAnswer("-2.16*5.2-2.13*5/2+-10");

    return (
      <div id='calculator' className='container row'>
        <div id='display'>
          <span id='inputstring' className='placeholder col-12 placeholder-lg'>
            &nbsp;
          </span>
          <span id='input' className='placeholder col-12 placeholder-lg'>
            &nbsp;
          </span>
        </div>
        {/* top row below screen */}
        <div id='left-pad' className='col-9'>
          <div className='row'>
            <button
              className='col-9'
              type='submit'
              id='clear'
              index='clear'
              onClick={() => this.handleInput("0")}>
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
              id='equal'
              index='equal'
              onClick={() => this.handleInput("=")}>
              =
            </button>
            <div>
              <span id='fillspot' className='placeholder col-12 placeholder-lg'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>
        {/* end of right pad */}
      </div>
    );
  }
}
export default App;
