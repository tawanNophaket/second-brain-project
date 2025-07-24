// Load data from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let events = JSON.parse(localStorage.getItem("events")) || [];
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Calendar variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Functions to render data
function renderNotes() {
  const noteList = document.getElementById("note-list");
  noteList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${note}</span>
            <button class="delete-btn" onclick="deleteNote(${index})">ลบ</button>
        `;
    noteList.appendChild(li);
  });
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox" ${
              task.completed ? "checked" : ""
            } onclick="toggleTask(${index})">
            <span style="${
              task.completed ? "text-decoration: line-through;" : ""
            }">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">ลบ</button>
        `;
    taskList.appendChild(li);
  });
}

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("month-year");
  calendar.innerHTML = "";

  // Set month and year display
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  monthYear.textContent = `${monthNames[currentMonth]} ${currentYear + 543}`; // Thai year (BE)

  // Render day headers
  const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  days.forEach((day) => {
    const div = document.createElement("div");
    div.classList.add("header");
    div.textContent = day;
    calendar.appendChild(div);
  });

  // Get first day and days in month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Add empty cells for days before the first day
  for (let i = 0; i < firstDay; i++) {
    const div = document.createElement("div");
    calendar.appendChild(div);
  }

  // Render days
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    div.setAttribute("data-day", i);
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(i).padStart(2, "0")}`;
    const dayEvents = events.filter((e) => e.date === dateStr);
    if (dayEvents.length > 0) {
      dayEvents.forEach((e) => {
        const p = document.createElement("p");
        p.textContent = e.text;
        div.appendChild(p);
      });
    }
    // Highlight current day
    if (
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      div.classList.add("current-day");
    }
    calendar.appendChild(div);
  }
}

function renderHabits() {
  const habitList = document.getElementById("habit-list");
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${habit}</span>
            <button class="delete-btn" onclick="deleteHabit(${index})">ลบ</button>
        `;
    habitList.appendChild(li);
  });
}

// Add functions
function addNote() {
  const input = document.getElementById("note-input");
  if (input.value.trim()) {
    notes.push(input.value.trim());
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    input.value = "";
  }
}

function addTask() {
  const input = document.getElementById("task-input");
  if (input.value.trim()) {
    tasks.push({ text: input.value.trim(), completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    input.value = "";
  }
}

function addEvent() {
  const input = document.getElementById("event-input");
  const dateInput = document.getElementById("event-date");
  if (input.value.trim() && dateInput.value) {
    events.push({ text: input.value.trim(), date: dateInput.value });
    localStorage.setItem("events", JSON.stringify(events));
    // Update current month/year to match the added event
    const eventDate = new Date(dateInput.value);
    currentMonth = eventDate.getMonth();
    currentYear = eventDate.getFullYear();
    renderCalendar();
    input.value = "";
    dateInput.value = "";
  }
}

function addHabit() {
  const input = document.getElementById("habit-input");
  if (input.value.trim()) {
    habits.push(input.value.trim());
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
    input.value = "";
  }
}

// Delete functions
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

// Toggle task
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Navigate to previous month
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

// Navigate to next month
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

// Show section
function showSection(sectionId) {
  document
    .querySelectorAll(".section")
    .forEach((sec) => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

// Initial render
renderNotes();
renderTasks();
renderCalendar();
renderHabits();
