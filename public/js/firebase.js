// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Your Firebase Config (replace with your actual keys)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save property
document.getElementById("saveBtn").addEventListener("click", () => {
  const name = document.getElementById("propertyName").value;
  const location = document.getElementById("propertyLocation").value;
  const price = document.getElementById("propertyPrice").value;

  if (!name || !location || !price) {
    alert("Please fill all fields");
    return;
  }

  push(ref(db, "properties"), {
    name,
    location,
    price
  });

  document.getElementById("propertyName").value = "";
  document.getElementById("propertyLocation").value = "";
  document.getElementById("propertyPrice").value = "";
});

// Fetch properties
function fetchProperties() {
  const propertyList = document.getElementById("propertyList");

  onValue(ref(db, "properties"), (snapshot) => {
    propertyList.innerHTML = "";
    snapshot.forEach((child) => {
      const property = child.val();
      const li = document.createElement("li");
      li.textContent = `🏠 ${property.name} - ${property.location} - ₦${property.price}`;

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.style.marginLeft = "10px";
      delBtn.addEventListener("click", () => {
        remove(ref(db, "properties/" + child.key));
      });

      li.appendChild(delBtn);
      propertyList.appendChild(li);
    });
  });
}

fetchProperties();
