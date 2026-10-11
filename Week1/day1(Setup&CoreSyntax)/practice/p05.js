// Task 5: grade(score) returns A, B, C, D, F or "Invalid".

function grade(score) {
  if (score < 0 || score > 100) {
    return "Invalid";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(grade(95));  // A
console.log(grade(83));  // B
console.log(grade(75));  // C
console.log(grade(62));  // D
console.log(grade(45));  // F
console.log(grade(105)); // Invalid
console.log(grade(-5));  // Invalid
