import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAEGf16UVO-aLX8cQDCzKuEfBAu8Xsce6Q",
    authDomain: "smart-student-planner-224db.firebaseapp.com",
    projectId: "smart-student-planner-224db",
    appId: "1:616541938822:web:dbd24313e02e96bc7a5d07"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
await signOut(auth);
export const db = getFirestore(app);
window.auth = auth;
window.db = db;
window.loginStudent = async function () {
   const username = document.getElementById("username").value.trim().toLowerCase();
const email = username + "@smartstudentplanner.app";
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        message.textContent = "Login successful!";
    } catch (error) {
        message.textContent = "Login failed. Check your email and password.";
    }
};

document.getElementById("loginBtn").addEventListener("click", window.loginStudent);
document.getElementById("registerBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (!/^[a-z0-9_]{3,20}$/.test(username)) {
        message.textContent = "Username: 3–20 letters, numbers or underscores only.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    const email = username + "@smartstudentplanner.app";

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        message.textContent = "Account created successfully!";
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            message.textContent = "This username is already taken.";
        } else {
            message.textContent = "Could not create account. Please try again.";
            console.error(error);
        }
    }
});

onAuthStateChanged(auth, (user) => {
    const loginSection = document.getElementById("loginSection");
    const dashboard = document.querySelector(".dashboard");
    const header = document.querySelector(".topbar");
    const footer = document.querySelector("footer");

    if (user) {
        loginSection.style.display = "none";
        dashboard.style.display = "block";
        header.style.display = "block";
        footer.style.display = "block";
    } else {
        loginSection.style.display = "block";
        dashboard.style.display = "none";
        header.style.display = "none";
        footer.style.display = "none";
    }
});