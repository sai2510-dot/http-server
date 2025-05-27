const form = document.getElementById("registration-form");
const tableBody = document.querySelector("#entriesTable tbody");

// Load existing entries from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
  entries.forEach(entry => addRowToTable(entry));
});

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function addRowToTable(entry) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dob}</td>
    <td>${entry.acceptedTerms}</td>
  `;
  tableBody.appendChild(row);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };
  
  // Save to localStorage
  const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
  entries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(entries));

  addRowToTable(entry);
  form.reset();
});
