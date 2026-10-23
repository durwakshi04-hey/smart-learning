import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

let plannerStarted = false;

onAuthStateChanged(auth, async (user) => {
    const message = document.getElementById("loginMessage");

    if (!user || plannerStarted) return;

    try {
        const plannerRef = doc(db, "users", user.uid, "planner", "main");
        const snapshot = await getDoc(plannerRef);

        if (snapshot.exists()) {
            const cloudData = snapshot.data();

            Object.keys(localStorage).forEach((key) => {
                if (!key.startsWith("firebase:") &&
                    !key.startsWith("firebaseLocalStorage")) {
                    localStorage.removeItem(key);
                }
            });

            Object.entries(cloudData).forEach(([key, value]) => {
                localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
            });
        } else {
            const localData = {};

            Object.keys(localStorage).forEach((key) => {
                if (!key.startsWith("firebase:") &&
                    !key.startsWith("firebaseLocalStorage")) {
                    try {
                        localData[key] = JSON.parse(localStorage.getItem(key));
                    } catch {
                        localData[key] = localStorage.getItem(key);
                    }
                }
            });

            await setDoc(plannerRef, localData);
        }
const originalSetItem = localStorage.setItem.bind(localStorage);
const originalRemoveItem = localStorage.removeItem.bind(localStorage);
let saveTimer;

function savePlannerToCloud() {
    clearTimeout(saveTimer);

    saveTimer = setTimeout(async () => {
        const latestData = {};

        Object.keys(localStorage).forEach((key) => {
            if (!key.startsWith("firebase:") &&
                !key.startsWith("firebaseLocalStorage")) {
                try {
                    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
                } catch {
                    try {
    latestData[key] = JSON.parse(localStorage.getItem(key));
} catch {
    latestData[key] = localStorage.getItem(key);
}
                }
            }
        });

        try {
            await setDoc(
                doc(db, "users", auth.currentUser.uid, "planner", "main"),
                latestData
            );
            console.log("Planner cloud save successful");
        } catch (error) {
            console.error("Planner cloud save failed:", error);
        }
    }, 1000);
}

localStorage.setItem = function (key, value) {
    originalSetItem(key, value);
    if (!String(key).startsWith("firebase:") &&
        !String(key).startsWith("firebaseLocalStorage")) {
        savePlannerToCloud();
    }
};

localStorage.removeItem = function (key) {
    originalRemoveItem(key);
    savePlannerToCloud();
};
        plannerStarted = true;
        await import("./script.js");

    } catch (error) {
        console.error("Planner sync error:", error);

        if (message) {
            message.textContent =
                "Planner load nahi hua. Internet check karke page refresh karo.";
        }
    }
});