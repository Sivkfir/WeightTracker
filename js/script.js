// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjSaUWJCXT1hLRE5RHOFP8oTkelApcF5E",
  authDomain: "weighttracker-2880a.firebaseapp.com",
  databaseURL: "https://weighttracker-2880a-default-rtdb.firebaseio.com",
  projectId: "weighttracker-2880a",
  storageBucket: "weighttracker-2880a.appspot.com",
  messagingSenderId: "343830489675",
  appId: "1:343830489675:web:b2faec8e1bc4398512fbce",
  measurementId: "G-9WK1SP7CQZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database
let db;
document.addEventListener("DOMContentLoaded", () => {
  db = firebase.database();

  // Fetch and display data on load
  fetchAndDisplayData();
});

// Function to update progress
function updateProgress() {
  if (!db) {
    alert('Database is not initialized yet.');
    return;
  }

  const nameInput = document.getElementById('name').value.trim();
  const weightLossInput = document.getElementById('weightLoss').value;
  const weekInput = document.getElementById('week').value;

  if (!nameInput || !weightLossInput || !weekInput) {
    alert('נא למלא את כל השדות');
    return;
  }

  const data = {
    name: nameInput,
    week: parseInt(weekInput, 10),
    weightLoss: parseFloat(weightLossInput),
  };

  // Push data to Firebase
  db.ref('progress').push(data);
}

// Function to fetch and display data
function fetchAndDisplayData() {
  if (!db) {
    alert('Database is not initialized yet.');
    return;
  }

  const historyList = document.getElementById('historyList');
  db.ref('progress').on('value', (snapshot) => {
    historyList.innerHTML = '';
    snapshot.forEach((child) => {
      const data = child.val();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name} - שבוע ${data.week}: ירידה של ${data.weightLoss} ק"ג`;
      historyList.appendChild(listItem);
    });
  });
}

// Function to reset progress
function resetProgress() {
  if (!db) {
    alert('Database is not initialized yet.');
    return;
  }

  db.ref('progress').remove();
  alert('האיפוס הושלם!');
}

// Expose functions to global scope
window.updateProgress = updateProgress;
window.fetchAndDisplayData = fetchAndDisplayData;
window.resetProgress = resetProgress;
