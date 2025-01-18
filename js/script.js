// ייבוא הפונקציות של Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// הגדרות Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// פונקציה לעדכון נתונים
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
    weightLoss: parseFloat(weightLossInput),
  };

  push(ref(db, 'progress'), data);
}

// פונקציה להצגת נתונים
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

// פונקציה לאיפוס נתונים
function resetProgress() {
  remove(ref(db, 'progress'));
  alert('האיפוס הושלם!');
}

// הפיכת הפונקציות לזמינות ל-HTML
window.updateProgress = updateProgress;
window.fetchAndDisplayData = fetchAndDisplayData;
window.resetProgress = resetProgress;

// אתחול תצוגת הנתונים
fetchAndDisplayData();
