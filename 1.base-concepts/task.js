function solveEquation(a, b, c) {
  "use strict";
  let arr = [];
  let D = Math.pow(b, 2) - 4 * a * c;
  if (D > 0) {
    arr.push((-b + Math.sqrt(D)) / (2 * a));
    arr.push((-b - Math.sqrt(D)) / (2 * a));
  } else if (D == 0) {
    arr.push(-b / (2 * a));
  }
  // код для задачи №1 писать здесь
  return arr; // array
}

function calculateTotalMortgage(percent, contribution, amount, date) {
  let totalAmount;

  // код для задачи №2 писать здесь

  return totalAmount;
}
