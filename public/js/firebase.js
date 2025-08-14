import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2Tm2E0NqlbcXdGgxuHIMMw0B9ve12CpM",
  authDomain: "techno-real-homes.firebaseapp.com",
  projectId: "techno-real-homes",
  storageBucket: "techno-real-homes.appspot.com",
  messagingSenderId: "740004455601",
  appId: "1:740004455601:web:b2ffdd2a00cc0551e7ee90"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function saveProperty(name, location, price) {
  const propertiesRef = ref(db, 'properties');
  const newPropertyRef = push(propertiesRef);
  set(newPropertyRef, { name, location, price });
}

document.getElementById("saveBtn").addEventListener("click", () => {
  const name = document.getElementById("propertyName").value;
  const location = document.getElementById("propertyLocation").value;
  const price = document.getElementById("propertyPrice").value;
  saveProperty(name, location, price);
});
