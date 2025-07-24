import React from "react";

const Sidebar = ({ showSection }) => {
  return (
    <div id="sidebar">
      <h2>Second Brain</h2>
      <ul>
        <li onClick={() => showSection("notes")}>บันทึกย่อ (Notes)</li>
        <li onClick={() => showSection("tasks")}>งานที่ต้องทำ (Tasks)</li>
        <li onClick={() => showSection("calendar")}>ปฏิทิน (Calendar)</li>
        <li onClick={() => showSection("habits")}>นิสัย (Habits)</li>
        <li onClick={() => showSection("knowledge")}>ฐานความรู้ (Knowledge)</li>
      </ul>
    </div>
  );
};

export default Sidebar;
