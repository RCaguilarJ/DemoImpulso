const users = [
  {
    username: "Roberto Carlos Aguilar Jiménez",
    password: "12345",
    role: "student",
  },
  { username: "Maximiliano Garza", password: "12345", role: "teacher" },
];

document.getElementById("login-button").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    if (user.role === "student") {
      document.getElementById("login").style.display = "none";
      document.getElementById("student-view").style.display = "block";
      showStudentGrade();
    } else if (user.role === "teacher") {
      document.getElementById("login").style.display = "none";
      document.getElementById("teacher-view").style.display = "block";
      loadTeacherMessages();
    }
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});

document
  .getElementById("student-submit")
  .addEventListener("click", function () {
    const message = document.getElementById("student-input").value;
    const studentGrades =
      JSON.parse(localStorage.getItem("studentGrades")) || [];
    studentGrades.push({
      task: `Tarea ${studentGrades.length + 1}`,
      text: message,
      grade: null,
    });
    localStorage.setItem("studentGrades", JSON.stringify(studentGrades));
    document.getElementById("student-input").value = "";
    alert("Trabajo enviado exitosamente.");
    logout();
  });

document
  .getElementById("teacher-submit")
  .addEventListener("click", function () {
    const teacherMessage = document.getElementById("teacher-input").value;
    const studentGrades =
      JSON.parse(localStorage.getItem("studentGrades")) || [];
    if (studentGrades.length > 0) {
      studentGrades[studentGrades.length - 1].grade = teacherMessage;
      localStorage.setItem("studentGrades", JSON.stringify(studentGrades));
    }
    document.getElementById("teacher-input").value = "";
    alert("Calificación registrada.");
    logout();
  });

function loadTeacherMessages() {
  const studentGrades = JSON.parse(localStorage.getItem("studentGrades")) || [];
  const teacherMessages = document.getElementById("teacher-messages");
  teacherMessages.innerHTML = "";
  studentGrades.forEach((grade, index) => {
    const li = document.createElement("li");
    li.textContent = `${grade.task}: ${grade.text}`;
    teacherMessages.appendChild(li);
  });
}

function showStudentGrade() {
  const studentGrades = JSON.parse(localStorage.getItem("studentGrades")) || [];
  const gradeBody = document.getElementById("student-grade-body");
  gradeBody.innerHTML = "";
  studentGrades.forEach((grade) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${grade.task}</td><td>${grade.text}</td><td>${
      grade.grade || "Pendiente"
    }</td>`;
    gradeBody.appendChild(tr);
  });
}

function logout() {
  document.getElementById("login").style.display = "block";
  document.getElementById("student-view").style.display = "none";
  document.getElementById("teacher-view").style.display = "none";
}

window.onload = function () {
  showStudentGrade();
};
