export function calcAnswer(formula) {
  let answer = formula;
  let prevAnswer = answer;

  //find * & / operations
  //loop through until all * and / operations are done
  do {
    prevAnswer = answer;
    answer = answer
      .replace(/(-?\d+\.?\d*)\*(-?\d+\.?\d*)/g, mult)
      .replace(/(-?\d+\.?\d*)\/(-?\d+\.?\d*)/g, divide);
    // console.log(answer);
  } while (answer != prevAnswer);

  //find + & - operations
  //loop through until all + and - operations are done
  do {
    prevAnswer = answer;
    answer = answer
      .replace(/(-?\d+\.?\d*)\+(-?\d+\.?\d*)/g, add)
      .replace(/(-?\d+\.?\d*)-(-?\d+\.?\d*)/g, subtract);
    // console.log(answer);
  } while (answer != prevAnswer);

  //returning final result correctly formatted
  return +parseFloat(answer).toFixed(4).toString();
}

//call back function => num1 * num2
const mult = (op, num1, num2) => {
  const first = parseFloat(num1);
  const second = parseFloat(num2);
  return first * second;
};

//call back function => num1 / num2
const divide = (op, num1, num2) => {
  const first = parseFloat(num1);
  const second = parseFloat(num2);
  return first / second;
};

//call back function => num1 + num2
const add = (op, num1, num2) => {
  const first = parseFloat(num1);
  const second = parseFloat(num2);
  return first + second;
};

//call back function => num1 - num2
const subtract = (op, num1, num2) => {
  const first = parseFloat(num1);
  const second = parseFloat(num2);
  return first - second;
};
