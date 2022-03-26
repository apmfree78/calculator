//decimal point precision of answer
const DECIMALS = 4;

//defining object containing all math operations
const operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '^': (a, b) => a ** b,
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
};

//call back function for reg replace that will
//execute calculation and return result
//works for following operators : *,-,+,/
const calc = (full, num1, op, num2) => {
  if (op in operators) {
    //if first [*/+-] second
    const first = parseFloat(num1);
    const second = parseFloat(num2);
    return operators[op](first, second);
  }
};

//call back function for reg replace that will
//execute calculation and return result
//works for trig operators: sin, cos
const trig = (full, op, num1) => {
  if (op in operators) {
    const first = parseFloat(num1);
    return operators[op](first);
  }
};

// main function that calculates the result of the formula inputed by the user
// so if user inputs "2*3^2+5*5+10/2" , it will take this string and return "36"
// accepts negatives numbers and floating point numbers
//operations accepted currently : * / + - ^
export function calcAnswer(formula) {
  let answer = formula;
  let prevAnswer = answer;

  //recursivly parse bracket
  // for  1+2*(5+1)+4/(1+1) => 5+1 and 1+1 => 6 and 2
  do {
    prevAnswer = answer;
    answer = answer.replace(/\(([^)(]*)\)/g, (full, formula) =>
      calcAnswer(formula)
    );
    console.log(answer);
  } while (answer !== prevAnswer);

  //find trig operations
  //loop through until all ^ operations are done
  do {
    prevAnswer = answer;
    answer = answer.replace(/(sin|cos)(-?\d+\.?\d*)/g, trig);
    // console.log(answer);
  } while (answer !== prevAnswer);

  //find ^ operations
  //loop through until all ^ operations are done
  do {
    prevAnswer = answer;
    answer = answer.replace(/((?:(?<!\d)-?)\d+\.?\d*)(\^)(-?\d+\.?\d*)/g, calc);
    // console.log(answer);
  } while (answer !== prevAnswer);

  //find * & / operations
  //loop through until all * and / operations are done
  do {
    prevAnswer = answer;
    answer = answer
      .replace(/((?:(?<!\d)-?)\d+\.?\d*)(\*)(-?\d+\.?\d*)/g, calc)
      .replace(/((?:(?<!\d)-?)\d+\.?\d*)(\/)(-?\d+\.?\d*)/g, calc);
    // console.log(answer);
  } while (answer !== prevAnswer);

  //find - operations
  //loop through until all - operations are done
  do {
    prevAnswer = answer;
    answer = answer.replace(/(-?\d+\.?\d*)(-)(-?\d+\.?\d*)/g, calc);
    // console.log(answer);
  } while (answer !== prevAnswer);

  //find + operations
  //loop through until all + operations are done
  do {
    prevAnswer = answer;
    answer = answer.replace(/(-?\d+\.?\d*)(\+)(-?\d+\.?\d*)/g, calc);
    // console.log(answer);
  } while (answer !== prevAnswer);

  //returning final result correctly formatted
  return +parseFloat(answer).toFixed(DECIMALS).toString();
}
