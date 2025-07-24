import React, { useState } from "react";

const Notes = ({ notes, setNotes }) => {
  const [noteInput, setNoteInput] = useState("");

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, noteInput.trim()]);
      setNoteInput("");
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div className="section active">
      <h1>บันทึกย่อ</h1>
      <textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="พิมพ์บันทึกย่อที่นี่..."
      ></textarea>
      <button onClick={addNote}>เพิ่มบันทึก</button>
      <ul id="note-list">
        {notes.map((note, index) => (
          <li key={index}>
            <span>{note}</span>
            <button className="delete-btn" onClick={() => deleteNote(index)}>
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
