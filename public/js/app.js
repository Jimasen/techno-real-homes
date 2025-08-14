// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyD2Tm2E0NqlbcXdGgxuHIMMw0B9ve12CpM",
  authDomain: "techno-real-homes.firebaseapp.com",
  projectId: "techno-real-homes",
  storageBucket: "techno-real-homes.appspot.com",
  messagingSenderId: "740004455601",
  appId: "1:740004455601:web:b2ffdd2a00cc0551e7ee90",
  databaseURL: "https://techno-real-homes-default-rtdb.firebaseio.com"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Property Submit
document.getElementById("propertyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("propertyName").value;
  const location = document.getElementById("propertyLocation").value;
  const price = document.getElementById("propertyPrice").value;

  const refProps = ref(db, "properties");
  push(refProps, { name, location, price, timestamp: new Date().toISOString() });

  e.target.reset();
});

// Show Properties
onValue(ref(db, "properties"), (snapshot) => {
  const list = document.getElementById("propertyList");
  list.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    Object.values(data)
      .reverse()
      .forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.name} - ${p.location} - ${p.price}`;
        list.appendChild(li);
      });
  }
});

// Invite Submit
document.getElementById("inviteForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const method = form.method.value;
  const statusDiv = document.getElementById("status");

  if (!name || !method) {
    statusDiv.textContent = "Please fill in all required fields.";
    return;
  }

  const inviteData = {
    name,
    email,
    phone,
    method,
    timestamp: new Date().toISOString()
  };

  const invitesRef = ref(db, 'invites');
  push(invitesRef, inviteData)
    .then(() => {
      statusDiv.textContent = `✅ Invite sent via ${method}`;
      form.reset();
    })
    .catch(err => {
      console.error(err);
      statusDiv.textContent = "❌ Failed to send invite.";
    });
});

// Show Invites
onValue(ref(db, "invites"), (snapshot) => {
  const list = document.getElementById("inviteList");
  list.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    Object.values(data)
      .reverse()
      .slice(0, 10)
      .forEach((i) => {
        const li = document.createElement("li");
        li.textContent = `${i.name} invited via ${i.method} on ${new Date(i.timestamp).toLocaleString()}`;
        list.appendChild(li);
      });
  }
});
