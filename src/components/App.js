import React, { useState, useEffect } from 'react';
import { calcAnswer } from '../helper';
import EquationList from './EquationList';
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
  //formulas is an array of formula imputed by user
  //this will be display below the calculator as a list
  const [answer, setAnswer] = useState('');
  const [input, setInput] = useState('0');
  const [inputString, setInputString] = useState('');
  const [formulas, setFormulas] = useState(
    JSON.parse(localStorage.getItem('formulas')) || []
  );

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
    if (ans !== '') {
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
      (inputVal === '-' && prevInput === '-') ||
      (inputVal === '0' &&
        beginningZero.test(inputStr) &&
        !endWithPeriodZero.test(inputStr)) ||
      (inputVal === '.' && prevInput === '.')
    ) {
      //in this case use only current operator and disregard prevous operator
      //OR remove extra zero or period
      inputStr = inputStr.substring(0, inputStr.length - 1);
    }

    //if first inputVal is one of these operator [*/+], do not allow
    if (operatorNoMinus.includes(inputVal) && inputStr === '') {
      return;
    }

    //PLUS check if not trig function is followed by an operation
    //such as sin*,cos+, sin/, sin+ etc .  HOWEVER, sin- or cos- is fine
    //ALSO CHECKING if previous input is number ie 2sin or 5cos, must add *
    //so have 2*sin, 5*cos ...
    if (
      trigOperators.includes(prevInput) &&
      operatorNoMinus.includes(inputVal)
    ) {
      return;
    } else if (
      !isNaN(prevInput) &&
      trigOperators.includes(inputVal) &&
      inputStr !== ''
    ) {
      //!isNaN true => prevInput is a number, which means we need to
      //add '*' in front of trig function
      inputStr += '*';
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
    if (answer === '' && inputStr !== '') {
      //parcing equation (inputString) user submitted and
      //calculating result
      const ans = calcAnswer(inputStr);

      //appending result to inputString to display on screen
      inputStr = inputStr + '=' + ans;

      //adding formula to formula state variable
      const formulasCopy = [...formulas];
      formulasCopy.unshift(inputStr);
      setFormulas(formulasCopy);

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

  const removeFormula = (index) => {
    const formulasCopy = [...formulas];
    formulasCopy.splice(index, 1);
    setFormulas(formulasCopy);
  };

  //useEffect hook to add formulas to local storage
  useEffect(() => {
    localStorage.setItem('formulas', JSON.stringify(formulas));
  }, [formulas]);

  return (
    <div className='d-flex flex-column align-items-center'>
      <div id='calculator' className='container row'>
        {/* top black screen showing formula and current input as it's
        submitted by user */}
        <div
          id='display'
          className='d-flex flex-column justify-content-around align-items-end'>
          <span className='inputstring'>{inputString}</span>
          <span id='input'>{input}</span>
        </div>
        {/* main keyboard for calculator where user inputs formula */}
        <KeyBoard
          clearState={clearState}
          handleInput={handleInput}
          calculateInput={calculateInput}
        />
      </div>
      {/* list of equations below calculation, hit 'x' to remove
      these are saved in local storage too */}
      <EquationList formulas={formulas} removeFormula={removeFormula} />
    </div>
  );
};
export default App;
