const students = [
  { name: "Ali", class: "A", scores: [85, 90, 78] },
  { name: "Sara", class: "A", scores: [92, 95, 88] },
  { name: "Bilal", class: "A", scores: [70, 65, 80] },
  { name: "Zainab", class: "A", scores: [88, 82, 91] },
  { name: "Hamza", class: "A", scores: [60, 58, 65] },
  { name: "Ayesha", class: "B", scores: [95, 98, 92] },
  { name: "Usman", class: "B", scores: [75, 80, 72] },
  { name: "Fatima", class: "B", scores: [82, 85, 79] },
  { name: "Omar", class: "B", scores: [55, 60, 58] },
  { name: "Mariam", class: "B", scores: [90, 45, 85] }
];

function getAverage(scores) {
  const sum = scores.reduce((total, score) => total + score, 0);
  return Number((sum / scores.length).toFixed(1));
}

function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function getStudentReport(student) {
  const average = getAverage(student.scores);
  return {
    name: student.name,
    class: student.class,
    average: average,
    grade: getGrade(average)
  };
}

function getTopStudents(reports) {
  return [...reports]
    .sort((a, b) => b.average - a.average)
    .slice(0, 3);
}

function getClassAverage(reports, className) {
  const list = reports.filter((item) => item.class === className);
  const total = list.reduce((sum, item) => sum + item.average, 0);
  return Number((total / list.length).toFixed(1));
}

function getClassAverages(reports) {
  return [
    { class: "A", average: getClassAverage(reports, "A") },
    { class: "B", average: getClassAverage(reports, "B") }
  ];
}

function countByGrade(reports) {
  const grades = ["A", "B", "C", "D", "F"];
  return grades.map((grade) => ({
    grade: grade,
    count: reports.filter((item) => item.grade === grade).length
  }));
}

function getSubjectGap(student) {
  return Math.max(...student.scores) - Math.min(...student.scores);
}

function getBiggestGapStudent(list) {
  return [...list].sort((a, b) => getSubjectGap(b) - getSubjectGap(a))[0];
}

function getBiggestGapReport(list) {
  const s = getBiggestGapStudent(list);
  return [{ name: s.name, class: s.class, scores: s.scores.join(", "), gap: getSubjectGap(s) }];
}

const studentReports = students.map(getStudentReport);

console.log("Student Grades Report:");
console.table(studentReports);

console.log("Top 3 Students:");
console.table(getTopStudents(studentReports));

console.log("Class Averages:");
console.table(getClassAverages(studentReports));

console.log("Grade Counts:");
console.table(countByGrade(studentReports));

console.log("Student with Biggest Gap Between Best and Worst Subject:");
console.table(getBiggestGapReport(students));
