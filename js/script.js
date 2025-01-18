
// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjSaUWJCXT1hLRE5RHOFP8oTkelApcF5E",
  authDomain: "weighttracker-2880a.firebaseapp.com",
  databaseURL: "https://weighttracker-2880a-default-rtdb.firebaseio.com",
  projectId: "weighttracker-2880a",
  storageBucket: "weighttracker-2880a.firebasestorage.app",
  messagingSenderId: "343830489675",
  appId: "1:343830489675:web:b2faec8e1bc4398512fbce",
  measurementId: "G-9WK1SP7CQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Update data to Firebase
function updateProgress() {
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
    weightLoss: parseFloat(weightLossInput)
  };

  // Push data to Firebase
  push(ref(db, 'progress'), data);
}

// Fetch and display data
function fetchAndDisplayData() {
  const historyList = document.getElementById('historyList');
  onValue(ref(db, 'progress'), (snapshot) => {
    historyList.innerHTML = '';
    snapshot.forEach((child) => {
      const data = child.val();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name} - שבוע ${data.week}: ירידה של ${data.weightLoss} ק"ג`;
      historyList.appendChild(listItem);
    });
  });
}

// Reset data in Firebase
function resetProgress() {
  remove(ref(db, 'progress'));
  alert('האיפוס הושלם!');
}

// Initialize
fetchAndDisplayData();
