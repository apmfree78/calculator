import React, { useState } from 'react';
import { calcAnswer } from '../helper';
import KeyBoard from './KeyBoard';
//add new operators to below global variables
const operators = '*/+-^';
const operatorNoMinus = '*/+^';
const trigOperators = 'sincos';

const App = () => {
  // answer = result of calculation
  //input is the current user input from key pad
  //inputString is the formula user is typing out,
  //and that is showing up on screen
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
    //because it just makes the number following it a negative
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

    //PLUS check if not trig function is followed by an operation
    //such as sin*,cos+, sin/, sin+ etc .  HOWEVER, sin- or cos- is fine
    if (
      trigOperators.includes(prevInput) &&
      operatorNoMinus.includes(inputVal)
    ) {
      return;
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
      {/* main keyboard for calculator where user inputs formula */}
      <KeyBoard
        clearState={clearState}
        handleInput={handleInput}
        calculateInput={calculateInput}
      />
    </div>
  );
};
export default App;
