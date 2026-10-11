// Task 4: max3(a, b, c) returns the largest, without Math.max.

function max3(a, b, c) {
  let max = a;

  if (b > max) {
    max = b;
  }
  if (c > max) {
    max = c;
  }

  return max;
}

console.log(max3(5, 12, 8)); // 12
console.log(max3(10, 2, 7)); // 10
console.log(max3(3, 4, 9));  // 9
