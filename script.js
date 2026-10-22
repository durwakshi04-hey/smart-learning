const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function updateDashboard() {
    const completed = tasks.filter(task => task.done).length;

    document.getElementById("taskCount").textContent =
        tasks.length + (tasks.length === 1 ? " Task" : " Tasks");

    document.getElementById("completedCount").textContent =
        completed + (completed === 1 ? " Task" : " Tasks");

    const progress = tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    document.getElementById("progress").textContent = progress + "%";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const title = document.createElement("span");
        title.textContent = task.name + " — " + task.subject;

        if (task.done) {
            title.style.textDecoration = "line-through";
            title.style.color = "#8da2bf";
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.done ? "Undo" : "Complete";
        completeButton.style.margin = "10px 8px 0 0";

        completeButton.addEventListener("click", () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "#dc3545";
        deleteButton.style.marginTop = "10px";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(title);
        li.appendChild(document.createElement("br"));
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateDashboard();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskInput.value.trim();
    const subject = subjectInput.value;

    if (!name || !subject) {
        alert("Please enter a task and choose a subject.");
        return;
    }

    tasks.push({
        id: Date.now(),
        name: name,
        subject: subject,
        done: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    subjectInput.value = "";
});

renderTasks();
const scheduleForm = document.getElementById("scheduleForm");
const scheduleSubject = document.getElementById("scheduleSubject");
const scheduleTime = document.getElementById("scheduleTime");
const scheduleList = document.getElementById("scheduleList");

let schedules = JSON.parse(localStorage.getItem("studySchedules")) || [];

function saveSchedules() {
    localStorage.setItem("studySchedules", JSON.stringify(schedules));
}

function renderSchedules() {
    scheduleList.innerHTML = "";

    schedules.sort((a, b) => a.time.localeCompare(b.time));

    schedules.forEach((schedule, index) => {
        const li = document.createElement("li");
        li.textContent = `${schedule.time} — ${schedule.subject} `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.background = "#dc3545";

        deleteButton.addEventListener("click", () => {
            schedules.splice(index, 1);
            saveSchedules();
            renderSchedules();
        });

        li.appendChild(deleteButton);
        scheduleList.appendChild(li);
    });
}

scheduleForm.addEventListener("submit", function(event) {
    event.preventDefault();

    schedules.push({
        subject: scheduleSubject.value.trim(),
        time: scheduleTime.value
    });

    saveSchedules();
    renderSchedules();
    scheduleForm.reset();
});

renderSchedules();
const assignmentForm = document.getElementById("assignmentForm");
const assignmentName = document.getElementById("assignmentName");
const assignmentDate = document.getElementById("assignmentDate");
const assignmentList = document.getElementById("assignmentList");

let assignments = JSON.parse(
    localStorage.getItem("studentAssignments")
) || [];
assignments.forEach(assignment => {
    if (typeof assignment.completed !== "boolean") {
        assignment.completed = false;
    }
});
function saveAssignments() {
    localStorage.setItem(
        "studentAssignments",
        JSON.stringify(assignments)
    );
}

function renderAssignments() {
    assignmentList.innerHTML = "";
document.getElementById("totalAssignments").textContent =
    assignments.length;

const completedCount = assignments.filter(
    a => a.completed === true
).length;

document.getElementById("completedAssignments").textContent = completedCount;
document.getElementById("completedCount").textContent = completedCount;
console.log("BLUE BUTTON COUNT:", completedCount);
document.getElementById("pendingAssignments").textContent =
    assignments.filter(a => !a.completed).length;
document.getElementById("allCount").textContent =
    assignments.length;

document.getElementById("pendingCount").textContent =
    assignments.filter(a => !a.completed).length;
    updateLearningXP();
console.log("Completed button count:", assignments.filter(a => a.completed).length);
console.table(assignments.map(a => ({
    name: a.name,
    completed: a.completed
})));
const progress =
    assignments.length === 0
        ? 0
        : Math.round((completedCount / assignments.length) * 100);

const progressBar = document.getElementById("progressBar");

progressBar.style.width = progress + "%";
progressBar.textContent = progress + "%";
const activeFilter = document.querySelector(".active-filter")?.dataset.filter || "all";
    assignments.forEach(assignment => {
        if (activeFilter === "pending" && assignment.completed) return;
if (activeFilter === "completed" && !assignment.completed) return;
        const li = document.createElement("li");
        li.style.padding = "14px";
li.style.marginBottom = "12px";
li.style.borderRadius = "12px";
li.style.background = "#111a2e";
li.style.border = "1px solid #293650";
li.style.transition = "all 0.3s ease";
li.style.padding = "12px";
li.style.marginBottom = "10px";
li.style.borderRadius = "10px";
li.style.background = "rgba(255,255,255,0.05)";
li.style.border = "1px solid rgba(255,255,255,0.1)";
        const details = document.createElement("span");
        const completeButton = document.createElement("button");
completeButton.textContent = assignment.completed ? "Completed ✓" : "Mark Complete";
completeButton.style.background = assignment.completed ? "#198754" : "#0d6efd";
completeButton.style.marginLeft = "10px";

completeButton.addEventListener("click", () => {
    assignment.completed = !assignment.completed;
    saveAssignments();
    renderAssignments();
});
        details.textContent =
            assignment.name + " — Due: " + assignment.date + " ";
            if (!assignment.completed) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(assignment.date + "T00:00:00");

    if (dueDate < today) {
        details.textContent += " ⚠️ Overdue!";
        details.style.color = "#ff5252";
    } else if (dueDate.getTime() === today.getTime()) {
        details.textContent += " 🔔 Due Today!";
        details.style.color = "#ffc107";
    }
}
if (assignment.completed) {
    details.style.color = "#28a745";
    details.style.textDecoration = "line-through";
} else {
    details.style.color = "#ffffff";
    details.style.textDecoration = "none";
}
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "#dc3545";
        deleteButton.style.marginLeft = "10px";

        deleteButton.addEventListener("click", () => {
            assignments = assignments.filter(
                item => item.id !== assignment.id
            );

            saveAssignments();
            renderAssignments();
        });

        li.appendChild(details);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        assignmentList.appendChild(li);
    });
}

assignmentForm.addEventListener("submit", function(event) {
    event.preventDefault();
if (
        assignmentName.value.trim() === "" ||
        assignmentDate.value === ""
    ) {
        alert("Please enter assignment name and due date!");
        return;
    }
    assignments.push({
        id: Date.now(),
        name: assignmentName.value.trim(),
        date: assignmentDate.value
    });

    saveAssignments();
    renderAssignments();
    assignmentForm.reset();
});

renderAssignments();
const resourceSearch = document.getElementById("resourceSearch");
const noResources = document.getElementById("noResources");

resourceSearch.addEventListener("input", function () {
    const searchText = resourceSearch.value.toLowerCase().trim();

    const resourceCards = document.querySelectorAll(
        "#study-resources .resource-card"
    );

    let visibleCount = 0;
const resourceCount = document.getElementById("resourceCount");
    resourceCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const matches = cardText.includes(searchText);

        card.style.display = matches ? "" : "none";

        if (matches) {
            visibleCount++;
        }
    });

    noResources.style.display =
    resourceCount.textContent =
    `Showing ${visibleCount} of ${resourceCards.length} resources`;
        visibleCount === 0 ? "block" : "none";
});
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active-filter");
        });

        button.classList.add("active-filter");
        renderAssignments();
    });
});

document.querySelector('[data-filter="all"]')?.classList.add("active-filter");
  function updateLearningXP() {
    const completedTasks = assignments.filter(
        a => a.completed === true
    ).length;
console.log("Completed assignments:", completedTasks);
    const xp = completedTasks * 20;
    const level = Math.floor(xp / 100) + 1;
    const previousLevel = Number(
    localStorage.getItem("studentPreviousLevel") || 1
);

if (level > previousLevel) {
    alert("🎉 Congratulations! You reached Level " + level + "!");
    localStorage.setItem("studentPreviousLevel", level);
}
    const progressXP = xp % 100;
    const levelNames = [
        "🌱 Beginner",
        "📘 Learner",
        "🚀 Achiever",
        "⭐ Expert",
        "🏆 Master"
    ];

    const levelName =
        levelNames[Math.min(level - 1, levelNames.length - 1)];

    document.getElementById("studentLevel").textContent =
        `Level ${level} — ${levelName}`;

    document.getElementById("studentXP").textContent =
        `⭐ ${xp} XP`;

    document.getElementById("xpProgressBar").style.width =
        `${progressXP}%`;

    document.getElementById("xpProgressText").textContent =
        `${progressXP} / 100 XP to next level`;
}
const resourceCompleteButtons = document.querySelectorAll(
    ".resource-complete-btn"
);

resourceCompleteButtons.forEach((button, index) => {
    const storageKey = "completedResource_" + index;

    function updateButton(completed) {
        button.dataset.completed = String(completed);

        button.textContent = completed
            ? "Completed ✓"
            : "Mark as Completed ✓";

        
        button.style.background = completed
            ? "#198754"
            : "#0d6efd";
    }
const updateResourceCount = () => {
    const buttons = document.querySelectorAll(".resource-complete-btn");

    const total = buttons.length;

    const completed = Array.from(buttons).filter(
        btn => btn.dataset.completed === "true"
    ).length;

    document.getElementById("resourceCompletionCount").textContent =
        `${completed}/${total} Resources Completed`;
};
    // Restore saved status when the page loads
    const savedStatus = localStorage.getItem(storageKey) === "true";
    updateButton(savedStatus);
updateResourceCount();
    button.addEventListener("click", () => {
        const completed = button.dataset.completed === "true";
        const newStatus = !completed;

        localStorage.setItem(storageKey, String(newStatus));
        updateButton(newStatus);
        updateResourceCount();
    });
   
});
const spinWheelBtn = document.getElementById("spinWheelBtn");
const studyWheel = document.getElementById("studyWheel");
const wheelResult = document.getElementById("wheelResult");

const studyTopics = [
    "📘 Polity — Revise 5 Articles",
    "🌍 Geography — Learn 5 Facts",
    "🏛️ History — Revise One Topic",
    "📰 Current Affairs — Read One News",
    "🧠 Quick Quiz — Test Yourself",
    "✍️ Revision — Review Your Notes"
];

let wheelRotation = 0;
let wheelSpinning = false;

if (spinWheelBtn && studyWheel && wheelResult) {
    studyWheel.style.transition = "transform 3s ease-out";

    spinWheelBtn.addEventListener("click", function () {
        if (wheelSpinning) return;

        wheelSpinning = true;
        spinWheelBtn.disabled = true;
        wheelResult.textContent = "🎡 Spinning...";

        const selectedIndex = Math.floor(
            Math.random() * studyTopics.length
        );

        const segmentAngle = 360 / studyTopics.length;
        const targetAngle = 360 - (
            selectedIndex * segmentAngle + segmentAngle / 2
        );

        wheelRotation += 360 * 5 + targetAngle;
        studyWheel.style.transform =
            `rotate(${wheelRotation}deg)`;

        setTimeout(function () {
            wheelResult.textContent =
                "🎉 Your challenge: " + studyTopics[selectedIndex];

            wheelSpinning = false;
            spinWheelBtn.disabled = false;
        }, 3000);
    });
}
/* 🗝️ Mystery Treasure Hunt */

(function () {
    const chest = document.getElementById("treasureChest");
    const clueText = document.getElementById("treasureClue");
    const revealBtn = document.getElementById("revealClueBtn");
    const unlockBtn = document.getElementById("unlockTreasureBtn");
    const reward = document.getElementById("treasureReward");
    const rewardText = document.getElementById("treasureRewardText");
    const title = document.getElementById("treasureTitle");

    if (
        !chest || !clueText || !revealBtn ||
        !unlockBtn || !reward || !rewardText || !title
    ) return;

    const clues = [
        {
            question: "I have keys but no locks. I have space but no room. What am I?",
            answer: "keyboard",
            hint: "You use me to type on a computer."
        },
        {
            question: "What has pages but is not a website?",
            answer: "book",
            hint: "You can read me."
        },
        {
            question: "I show your face but I am not a person. What am I?",
            answer: "mirror",
            hint: "You look into me."
        }
    ];

    let clueIndex = 0;
    let solved = false;

    revealBtn.addEventListener("click", function () {
        if (solved) return;

        const clue = clues[clueIndex];
        const answer = prompt(
            "🕵️ Mystery Clue " + (clueIndex + 1) +
            "\n\n" + clue.question +
            "\n\nType your answer:"
        );

        if (answer === null) return;

        if (answer.trim().toLowerCase() === clue.answer) {
            clueIndex++;

            if (clueIndex < clues.length) {
                clueText.textContent =
                    "✅ Correct! Next clue: " +
                    clues[clueIndex].hint;
            } else {
                clueText.textContent =
                    "🎉 All clues solved! Now unlock your treasure!";
                revealBtn.disabled = true;
                unlockBtn.disabled = false;
            }
        } else {
            clueText.textContent =
                "🔍 Not quite! Hint: " + clue.hint;
        }
    });

    unlockBtn.addEventListener("click", function () {
        if (clueIndex !== clues.length || solved) return;

        solved = true;
        const treasureCard = chest.closest(".treasure-card");

if (treasureCard) {
    treasureCard.classList.add("celebrating");
}

chest.classList.add("opened");

for (let i = 0; i < 45; i++) {
    const confetti = document.createElement("span");

    confetti.className = "treasure-confetti";
    confetti.textContent = "✦";
    confetti.style.left = Math.random() * 95 + "%";
    confetti.style.color = [
        "#ffd700",
        "#ffb703",
        "#ffffff",
        "#c084fc",
        "#55c7ff"
    ][Math.floor(Math.random() * 5)];
    confetti.style.animationDelay = Math.random() * 0.8 + "s";

    treasureCard.appendChild(confetti);

    setTimeout(function () {
        confetti.remove();
    }, 3500);
}
        chest.textContent = "🎁";
        title.textContent = "✨ Treasure Unlocked!";
        rewardText.textContent =
            "🏆 Mystery Master! You solved all 3 clues!";
        reward.hidden = false;
        unlockBtn.disabled = true;
        revealBtn.disabled = true;
    });
})();
/* 📚 Homework Submission Tracker */
(function () {
    const form = document.getElementById("homeworkTrackerForm");
    const list = document.getElementById("homeworkTrackerList");

    if (!form || !list) return;

    const nameInput = document.getElementById("trackerHomeworkName");
    const subjectInput = document.getElementById("trackerSubject");
    const statusInput = document.getElementById("trackerStatus");
    const dateInput = document.getElementById("trackerSubmissionDate");
    const notesInput = document.getElementById("trackerNotes");

    const storageKey = "homeworkSubmissionTracker";

    let trackedHomework = [];

    try {
        const saved = localStorage.getItem(storageKey);
        const parsed = saved ? JSON.parse(saved) : [];
        trackedHomework = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Could not read homework tracker data:", error);
        list.textContent = "Saved tracker data could not be loaded.";
        return;
    }

    function saveTrackedHomework() {
        try {
            localStorage.setItem(
                storageKey,
                JSON.stringify(trackedHomework)
            );
            return true;
        } catch (error) {
            alert("Could not save homework. Please check browser storage.");
            return false;
        }
    }

    function renderTrackedHomework() {
        list.replaceChildren();

        if (trackedHomework.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No homework added yet.";
            list.appendChild(message);
            return;
        }

        trackedHomework.forEach(function (item) {
            const card = document.createElement("div");
            card.className = "homework-tracker-item";

            const heading = document.createElement("h4");
            heading.textContent = item.name;

            const subject = document.createElement("p");
            subject.textContent = "📘 Subject: " + item.subject;

            const status = document.createElement("p");
            status.textContent = "📌 Status: " + item.status;

            const date = document.createElement("p");
            date.textContent =
                "📅 Submission Date: " + (item.date || "Not set");

            const notes = document.createElement("p");
            notes.textContent = "📝 Notes: " + (item.notes || "None");

            card.append(heading, subject, status, date, notes);
            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "tracker-edit-btn";
            editButton.textContent = "✏️ Edit";

            editButton.addEventListener("click", function () {
                const newName = prompt("Homework name:", item.name);
                if (newName === null) return;

                const newSubject = prompt("Subject:", item.subject);
                if (newSubject === null) return;

                const statuses = [
                    "Not Started",
                    "In Progress",
                    "Ready to Submit",
                    "Submitted"
                ];

                const newStatus = prompt(
                    "Enter status:\n" + statuses.join("\n"),
                    item.status
                );
                if (newStatus === null) return;

                if (!statuses.includes(newStatus.trim())) {
                    alert("Please enter one of the listed statuses exactly.");
                    return;
                }

                const newDate = prompt(
                    "Submission date (YYYY-MM-DD), or leave blank:",
                    item.date || ""
                );
                if (newDate === null) return;

                const newNotes = prompt("Notes:", item.notes || "");
                if (newNotes === null) return;

                const oldItem = { ...item };

                item.name = newName.trim();
                item.subject = newSubject.trim();
                item.status = newStatus.trim();
                item.date = newDate.trim();
                item.notes = newNotes.trim();

                if (!item.name || !item.subject) {
                    Object.assign(item, oldItem);
                    alert("Homework name and subject cannot be empty.");
                    return;
                }

                if (saveTrackedHomework()) {
                    renderTrackedHomework();
                } else {
                    Object.assign(item, oldItem);
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "tracker-delete-btn";
            deleteButton.textContent = "🗑️ Delete";

            deleteButton.addEventListener("click", function () {
                if (!confirm("Delete this tracked homework?")) return;

                const previousItems = trackedHomework;
                trackedHomework = trackedHomework.filter(
                    function (savedItem) {
                        return savedItem.id !== item.id;
                    }
                );

                if (saveTrackedHomework()) {
                    renderTrackedHomework();
                } else {
                    trackedHomework = previousItems;
                }
            });

            card.append(editButton, deleteButton);
            list.appendChild(card);
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const item = {
            id: Date.now().toString() + Math.random().toString(16).slice(2),
            name: nameInput.value.trim(),
            subject: subjectInput.value.trim(),
            status: statusInput.value,
            date: dateInput.value,
            notes: notesInput.value.trim()
        };

        if (!item.name || !item.subject) {
            alert("Please enter homework name and subject.");
            return;
        }

        trackedHomework.push(item);

        if (!saveTrackedHomework()) {
            trackedHomework.pop();
            return;
        }

        renderTrackedHomework();
        form.reset();
    });

    renderTrackedHomework();
})();
/* 🔔 Homework Dashboard Alarm Setup */
(function () {
    const alarmButton = document.getElementById("enableHomeworkAlarm");
    const alarmStatus = document.getElementById("homeworkAlarmStatus");

    if (!alarmButton || !alarmStatus) return;

    let audioContext = null;
    let alarmEnabled = false;

    alarmButton.addEventListener("click", function () {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            alarmStatus.textContent =
                "Alarm sound is not supported in this browser.";
            return;
        }

        try {
            if (!audioContext) {
                audioContext = new AudioContextClass();
            }

            audioContext.resume().then(function () {
                alarmEnabled = true;
                alarmStatus.textContent = "🔊 Alarm sound enabled!";
                alarmButton.textContent = "✅ Alarm Enabled";

                // Short test tone
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();

                oscillator.type = "sine";
                oscillator.frequency.value = 880;
                gain.gain.value = 0.12;

                oscillator.connect(gain);
                gain.connect(audioContext.destination);

                oscillator.start();
                gain.gain.exponentialRampToValueAtTime(
                    0.001,
                    audioContext.currentTime + 0.45
                );
                oscillator.stop(audioContext.currentTime + 0.45);
            }).catch(function () {
                alarmStatus.textContent =
                    "Sound blocked. Please tap Enable Alarm Sound again.";
            });
        } catch (error) {
            alarmStatus.textContent = "Could not enable alarm sound.";
            console.error("Homework alarm setup failed:", error);
        }
    });

    // Keep these available for the due-date reminder step.
    window.homeworkAlarmAudio = function () {
        if (!alarmEnabled || !audioContext) return;

        try {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = 880;
            gain.gain.value = 0.12;

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start();
            gain.gain.setValueAtTime(0.12, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.8
            );
            oscillator.stop(audioContext.currentTime + 0.8);
        } catch (error) {
            console.error("Homework alarm playback failed:", error);
        }
    };
})();
/* 📅 Homework Due-Date Reminder */
(function () {
    const banner = document.getElementById("homeworkReminderBanner");
    const title = document.getElementById("homeworkReminderTitle");
    const message = document.getElementById("homeworkReminderText");
    const dismissButton = document.getElementById("dismissHomeworkReminder");

    if (!banner || !title || !message || !dismissButton) return;

    const storageKey = "homeworkSubmissionTracker";
    let dismissedReminderKey = "";

    dismissButton.addEventListener("click", function () {
        banner.hidden = true;
    });

    function checkHomeworkDeadlines() {
        let items;

        try {
            items = JSON.parse(localStorage.getItem(storageKey) || "[]");
        } catch (error) {
            console.error("Could not read tracker deadlines:", error);
            return;
        }

        if (!Array.isArray(items)) return;

        // Use local calendar dates to avoid timezone date shifts.
        const now = new Date();
        const today = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0")
        ].join("-");

        const dueItems = items.filter(function (item) {
            return item.date &&
                item.status !== "Submitted" &&
                /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
                item.date <= today;
        });

        if (dueItems.length === 0) {
            banner.hidden = true;
            dismissedReminderKey = "";
            return;
        }

        const overdueItems = dueItems.filter(function (item) {
            return item.date < today;
        });

        const reminderKey = today + ":" + dueItems
            .map(function (item) { return item.id; })
            .sort()
            .join(",");

        if (reminderKey === dismissedReminderKey) return;

        title.textContent = overdueItems.length
            ? "⚠️ Homework overdue!"
            : "🔔 Homework due today!";

        message.textContent = dueItems.length === 1
            ? '"' + dueItems[0].name + '" — ' +
              (overdueItems.length ? "past its deadline." : "is due today.")
            : dueItems.length + " homework items need your attention" +
              (overdueItems.length ? ", including overdue work." : " today.");

        banner.hidden = false;

        // Play sound only once per reminder key during this page session.
        if (reminderKey !== window.homeworkLastAlarmKey) {
            window.homeworkLastAlarmKey = reminderKey;

            if (typeof window.homeworkAlarmAudio === "function") {
                window.homeworkAlarmAudio();
            }
        }
    }

    dismissButton.addEventListener("click", function () {
        const currentTitle = title.textContent;
        dismissedReminderKey = todayKey() + ":" + getDueItemIds();
    });

    function todayKey() {
        const now = new Date();
        return [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0")
        ].join("-");
    }

    function getDueItemIds() {
        try {
            const items = JSON.parse(localStorage.getItem(storageKey) || "[]");
            return items
                .filter(function (item) {
                    return item.date && item.date <= todayKey() &&
                        item.status !== "Submitted";
                })
                .map(function (item) { return item.id; })
                .sort()
                .join(",");
        } catch (error) {
            return "";
        }
    }

    checkHomeworkDeadlines();
    setInterval(checkHomeworkDeadlines, 30000);
    window.addEventListener("focus", checkHomeworkDeadlines);
})();
/* 💜 Student Life Planner — Weekly Routine */
(function () {
    const form = document.getElementById("plannerActivityForm");
    const week = document.getElementById("plannerWeek");
    const activitiesBox = document.getElementById("plannerActivities");
    const dayTitle = document.getElementById("plannerSelectedDay");

    if (!form || !week || !activitiesBox || !dayTitle) return;

    const nameInput = document.getElementById("plannerActivityName");
    const categoryInput = document.getElementById("plannerActivityCategory");
    const startInput = document.getElementById("plannerStartTime");
    const endInput = document.getElementById("plannerEndTime");

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const storageKey = "studentLifePlannerActivities";
    let selectedDay = days[new Date().getDay()];
    let activities = [];

    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
        activities = Array.isArray(saved) ? saved : [];
    } catch (error) {
        console.error("Could not load planner activities:", error);
        activities = [];
    }

    function saveActivities() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(activities));
            return true;
        } catch (error) {
            alert("Planner could not be saved. Please check browser storage.");
            return false;
        }
    }

    function renderActivities() {
        dayTitle.textContent = "✨ " + selectedDay + " Routine";
        activitiesBox.replaceChildren();

        week.querySelectorAll("button[data-day]").forEach(function (button) {
            const isActive = button.dataset.day === selectedDay;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        const dayActivities = activities
            .filter(function (item) {
                return item.day === selectedDay;
            })
            .sort(function (a, b) {
                return a.start.localeCompare(b.start);
            });

        if (dayActivities.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "🌸 No activities yet. Add your first activity below!";
            activitiesBox.appendChild(empty);
            return;
        }

        dayActivities.forEach(function (item) {
            const card = document.createElement("article");
            card.className = "planner-activity-card";

            const heading = document.createElement("h4");
            heading.textContent = "💖 " + item.name;

            const category = document.createElement("p");
            category.textContent = "Category: " + item.category;

            const time = document.createElement("p");
            time.textContent = "🕒 " + item.start + " – " + item.end;

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "🗑️ Delete";

            deleteButton.addEventListener("click", function () {
                if (!confirm("Delete this activity from " + selectedDay + "?")) {
                    return;
                }

                const previousActivities = activities;
                activities = activities.filter(function (savedItem) {
                    return savedItem.id !== item.id;
                });

                if (saveActivities()) {
                    renderActivities();
                } else {
                    activities = previousActivities;
                }
            });

            card.append(heading, category, time, deleteButton);
            activitiesBox.appendChild(card);
        });
    }

    week.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-day]");
        if (!button || !week.contains(button)) return;

        selectedDay = button.dataset.day;
        renderActivities();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const start = startInput.value;
        const end = endInput.value;

        if (!name || !start || !end) {
            alert("Please fill in the activity name and both times.");
            return;
        }

        if (start === end) {
            alert("Start and end time cannot be the same.");
            return;
        }

        if (start > end) {
            alert("End time must be later than start time. For overnight sleep, split it across the two days.");
            return;
        }

        const newActivity = {
            id: Date.now().toString() + Math.random().toString(16).slice(2),
            day: selectedDay,
            name: name,
            category: categoryInput.value,
            start: start,
            end: end
        };

        activities.push(newActivity);

        if (!saveActivities()) {
            activities.pop();
            return;
        }

        renderActivities();
        form.reset();
    });

    renderActivities();
})();