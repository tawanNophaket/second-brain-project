import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Tasks from "./components/Tasks";
import Calendar from "./components/Calendar";
import Habits from "./components/Habits";
import Knowledge from "./components/Knowledge";

function App() {
  const [activeSection, setActiveSection] = useState("notes");

  // State for all sections
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );
  const [habits, setHabits] = useState(
    JSON.parse(localStorage.getItem("habits")) || []
  );

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="app">
      <Sidebar showSection={showSection} />
      <div id="main">
        {activeSection === "notes" && (
          <Notes notes={notes} setNotes={setNotes} />
        )}
        {activeSection === "tasks" && (
          <Tasks tasks={tasks} setTasks={setTasks} />
        )}
        {activeSection === "calendar" && (
          <Calendar events={events} setEvents={setEvents} />
        )}
        {activeSection === "habits" && (
          <Habits habits={habits} setHabits={setHabits} />
        )}
        {activeSection === "knowledge" && <Knowledge />}
      </div>
    </div>
  );
}

export default App;
