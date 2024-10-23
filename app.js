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
    localStorage.setItem("studentMessage", message);
    localStorage.setItem("studentName", "Roberto Carlos Aguilar Jiménez");
    document.getElementById("student-input").value = "";
    alert("Trabajo enviado exitosamente.");
    logout();
  });

document
  .getElementById("teacher-submit")
  .addEventListener("click", function () {
    const teacherMessage = document.getElementById("teacher-input").value;
    const studentMessage = localStorage.getItem("studentMessage");
    const studentName = localStorage.getItem("studentName");
    const li = document.createElement("li");
    li.textContent = `${studentName}: ${studentMessage} - Respuesta: ${teacherMessage}`;
    document.getElementById("teacher-messages").appendChild(li);
    document.getElementById("teacher-input").value = "";
    localStorage.setItem("studentGrade", teacherMessage);
    alert("Calificación registrada.");
    logout();
  });

function loadTeacherMessages() {
  const studentMessage = localStorage.getItem("studentMessage");
  const studentName = localStorage.getItem("studentName");
  if (studentMessage) {
    const li = document.createElement("li");
    li.textContent = `${studentName}: ${studentMessage}`;
    document.getElementById("teacher-messages").appendChild(li);
  }
}

function logout() {
  document.getElementById("login").style.display = "block";
  document.getElementById("student-view").style.display = "none";
  document.getElementById("teacher-view").style.display = "none";
}

window.onload = function () {
  const studentGrade = localStorage.getItem("studentGrade");
  if (studentGrade) {
    alert(`Tarea calificada: ${studentGrade}`);
    document.getElementById("student-view").style.display = "block";
    const studentInput = document.getElementById("student-input");
    studentInput.disabled = true;
  }
};
