import React, { useState } from 'react';
import { calcAnswer } from '../helper';
import KeyPad from './KeyPad';
import KeyPadOps from './KeyPadOps';
//add new operators to below global variables
const operators = '*/+-^';
const operatorNoMinus = '*/+^';

const App = () => {
  const [answer, setAnswer] = useState('');
  const [input, setInput] = useState('0');
  const [inputString, setInputString] = useState('');

  // handling numberical \d or operator [*/+-] input by user
  const handleInput = (value) => {
    const inputVal = value;
    let inputStr = inputString;
    let ans = answer;
    const prevInput = input;

    //regex patterns
    // const endWithOperator = /(\*|\/|-|\+)$/;
    // const endWithNumber = /\d+$/;
    const beginningZero = /(^0|\*0|\/0|-0|\+0)$/;
    const endWithPeriodZero = /\.0+$/;

    //********VALIDATIONS AND ASCERTIONS ******* */
    //checking if there's an answer on the screen
    if (ans != '') {
      //resetting screen
      ans = '';
      inputStr = '';
    }

    //check if consecutive operators are input **, */ , +* , etc
    //if so, only accepting last operator
    //ALSO check if multiple zeros are added in that are not followed by period
    //SO it's NOT 1.0001 but 0001 , first is fine , second is not
    //PLUS CHECK if there are 2 decimals submitted
    if (
      (operators.includes(prevInput) && operatorNoMinus.includes(inputVal)) ||
      (inputVal == '-' && prevInput == '-') ||
      (inputVal == '0' &&
        beginningZero.test(inputStr) &&
        !endWithPeriodZero.test(inputStr)) ||
      (inputVal == '.' && prevInput == '.')
    ) {
      //in this case use only current operator and disregard prevous operator
      //OR remove extra zero or period
      inputStr = inputStr.substring(0, inputStr.length - 1);
    }

    //Finally after all the above checks and validations complete
    //adding user inputed value to main input string
    inputStr += inputVal;

    //updating state
    setAnswer(ans);
    setInput(inputVal);
    setInputString(inputStr);
  };

  // function to handle when user presses '='
  const calculateInput = () => {
    let inputStr = inputString;
    const prevInput = input;

    //VALIDATION **************
    //checking if last character is an operator,
    //if so removing it
    if (operators.includes(prevInput)) {
      //in this case operator
      inputStr = inputStr.substring(0, inputStr.length - 1);
    }

    //check to make sure there's not an answer on the screen
    //also check that inputStr is not empty
    if (answer == '' && inputStr != '') {
      //parcing equation (inputString) user submitted and
      //calculating result
      const ans = calcAnswer(inputStr);
      // console.log(answer);
      //appending result to inputString to display on screen
      inputStr = inputStr + '=' + answer;

      //setting state
      setAnswer(ans);
      setInput(ans);
      setInputString(inputStr);
    }
  };

  // function to handle when user presses 'AC'
  const clearState = () => {
    //reset state to initial conditions
    setAnswer('');
    setInput('0');
    setInputString('');
  };

  return (
    <div id='calculator' className='container row'>
      {/* top black screen showing formula and current input as it's
        submitted by user */}
      <div
        id='display'
        className='d-flex flex-column justify-content-around align-items-end'>
        <span id='inputstring'>{inputString}</span>
        <span id='input'>{input}</span>
      </div>
      {/* top row below main screen */}
      <div id='left-pad' className='col-9'>
        <div className='row'>
          <KeyPad grid='col-8' index='clear' onClickFunction={clearState}>
            AC
          </KeyPad>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            /
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}

        {/* first row of numbers  */}
        <div className='row'>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            1
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            2
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            3
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}

        {/* second row of numbers */}
        <div className='row'>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            4
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            5
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            6
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}
        {/* third row of numbers */}
        <div className='row'>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            7
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            8
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            9
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}
        {/* forth row of numbers + period */}
        <div className='row'>
          <KeyPadOps grid='col-8' onClickFunction={handleInput}>
            0
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            .
          </KeyPadOps>
        </div>
      </div>
      {/*end of left-pad, left side of key pad
        now beginning right pad that includes remaining operations
        and '=' */}
      <div id='right-pad' className='col-3'>
        <div className='row'>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            ^
          </KeyPadOps>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            *
          </KeyPadOps>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            -
          </KeyPadOps>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            +
          </KeyPadOps>
          <KeyPad grid='col-12' index='clear' onClickFunction={calculateInput}>
            =
          </KeyPad>
        </div>
      </div>
      {/* end of right pad */}
    </div>
  );
};
export default App;
