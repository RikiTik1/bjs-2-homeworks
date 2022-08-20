function getArrayParams([...arr]) {
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  let avg;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    };
    if (arr[i] < min) {
      min = arr[i];
    };
    sum += arr[i];
  };
  avg = +((sum / arr.length).toFixed(2));
  return { min: min, max: max, avg: avg };
};
// Задание 2
function worker(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  };
  return sum;
};
console.log(worker([1, 15, 5]));

function makeWork(arrOfArr, func) {
  let max = 0;
  let result = 0;
  for (let i = 0; i < arrOfArr.length; i++) {
    result = func(arrOfArr[i]);
    if (result > max) {
      max = result;
    };
  };
  return max;
};
console.log(makeWork([[0, 0, 6], [0, 0, 10]], worker));
console.log(makeWork([[10, 20, 30], [-40, -50, -65]], worker2))

// Задание 3
function worker2(arr) {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    };
    if (arr[i] < min) {
      min = arr[i];
    };
  };
  return Math.abs(max - min);
};
console.log(worker2([0, 0, 0], [-1, -99]));
x