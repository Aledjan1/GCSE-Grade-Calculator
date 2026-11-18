// DOM ELEMENTS
const subjectsBody = document.querySelector("#subjects-body");
const subjectRow = document.querySelector(".subject-row");
const errorMessage = document.querySelector("#error-message");
const addBtn = document.querySelector(".add-btn");
const calculateBtn = document.querySelector(".calculate-btn");
const averagePercentage = document.querySelector("#average-percentage");
const averageGrade = document.querySelector("#average-grade");
const overallResult = document.querySelector("#overall-result");
const progressCircle = document.querySelector("#progress-circle");

// ADD SUBJECT
addBtn.addEventListener("click", function () {
  const newRow = subjectRow.cloneNode(true);

  newRow.querySelector(".marks-input").value = "";
  newRow.querySelector(".max-input").value = "";
  newRow.querySelector(".percentage").textContent = "";
  newRow.querySelector(".grade").textContent = "";
  newRow.querySelector(".subject-select").value = "";

  subjectsBody.append(newRow);

  newRow.querySelector(".subject-select").classList.remove("invalid");
  newRow.querySelector(".marks-input").classList.remove("invalid");
  newRow.querySelector(".max-input").classList.remove("invalid");
});

// CALCULATE RESULT
calculateBtn.addEventListener("click", function () {
  // VALIDATE USER INPUT
  const subjectRows = document.querySelectorAll(".subject-row");
  let isValid = true;
  errorMessage.textContent = "";
  let hasSubject = false;

  for (let i = 0; i < subjectRows.length; i++) {
    const row = subjectRows[i];
    const subjectSelects = row.querySelector(".subject-select");
    const marksInput = row.querySelector(".marks-input");
    const maxInput = row.querySelector(".max-input");

    marksInput.classList.remove("invalid");
    maxInput.classList.remove("invalid");

    if (
      !subjectSelects.value &&
      marksInput.value === "" &&
      maxInput.value === ""
    ) {
      continue;
    }

    hasSubject = true;

    const marks = Number(marksInput.value);
    const max = Number(maxInput.value);

    if (!subjectSelects.value) {
      subjectSelects.classList.add("invalid");
      isValid = false;

      if (errorMessage.textContent === "") {
        errorMessage.textContent = "Please choose subject.";
      }
    } else {
      subjectSelects.classList.remove("invalid");
    }

    if (marksInput.value === "") {
      marksInput.classList.add("invalid");
      isValid = false;

      if (errorMessage.textContent === "") {
        errorMessage.textContent = "Please enter mark.";
      }
    }

    if (marks < 0) {
      marksInput.classList.add("invalid");
      isValid = false;

      if (errorMessage.textContent === "") {
        errorMessage.textContent = "Mark cannot be less than 0.";
      }
    }

    if (maxInput.value === "") {
      maxInput.classList.add("invalid");
      isValid = false;

      if (errorMessage.textContent === "") {
        errorMessage.textContent = "Please enter maximum score.";
      }
    }

    if (max <= 0) {
      maxInput.classList.add("invalid");
      isValid = false;

      if (errorMessage.textContent === "") {
        errorMessage.textContent = "Max must be greater than 0.";
      }
    }

    if (marks > max) {
      marksInput.classList.add("invalid");
      isValid = false;

      if (errorMessage.textContent === "") {
        errorMessage.textContent = "Mark cannot be greater than Max.";
      }
    }
  }

  // STOP CALCULATION IF VALIDATION FAILS
  if (hasSubject === false) {
    errorMessage.textContent = "Please add at least one subject.";
    return;
  }

  if (isValid === false) {
    return;
  }

  // SUMMARY
  let sumPercent = 0;
  let amountSubjects = 0;

  // CALCULATE PERCENTAGE AND GCSE GRADES
  for (let j = 0; j < subjectRows.length; j++) {
    const row = subjectRows[j];
    const marksInput = row.querySelector(".marks-input");
    const maxInput = row.querySelector(".max-input");

    if (marksInput.value === "" && maxInput.value === "") {
      continue;
    }

    const marks = Number(marksInput.value);
    const max = Number(maxInput.value);

    const percentageInput = row.querySelector(".percentage");
    const percentage = (marks * 100) / max;

    sumPercent += percentage;
    amountSubjects += 1;

    percentageInput.textContent = `${percentage.toFixed(2)}%`;

    const gradeInput = row.querySelector(".grade");
    let grade = 0;

    if (percentage < 10) {
      grade = "U";
    } else {
      grade = Math.min(9, Math.floor(percentage / 10));
    }

    gradeInput.textContent = grade;
  }

  const average = sumPercent / amountSubjects;
  averagePercentage.textContent = `${average.toFixed(2)}%`;

  let avgGrade;

  if (average < 10) {
    avgGrade = "U";
  } else {
    avgGrade = Math.min(9, Math.floor(average / 10));
  }

  averageGrade.textContent = avgGrade;

  overallResult.textContent = `${average.toFixed(2)}%`;

  progressCircle.style.background = `conic-gradient(
    #7042d5 ${average}%,
    #e4d9ff ${average}%
  )`;
});

subjectsBody.addEventListener("input", function () {
  averagePercentage.textContent = "-";
  averageGrade.textContent = "-";
  overallResult.textContent = "0%";
  progressCircle.style.background = "conic-gradient(#7042d5 0%, #e4d9ff 0%)";
  const percentages = subjectsBody.querySelectorAll(".percentage");
  const grades = subjectsBody.querySelectorAll(".grade");

  for (let i = 0; i < percentages.length; i++) {
    percentages[i].textContent = "-";
  }
  for (let j = 0; j < grades.length; j++) {
    grades[j].textContent = "-";
  }
});
