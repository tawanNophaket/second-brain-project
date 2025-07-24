import { useState } from "react";

const Habits = ({ habits, setHabits }) => {
  const [habitInput, setHabitInput] = useState("");

  const addHabit = () => {
    if (habitInput.trim()) {
      setHabits([...habits, habitInput.trim()]);
      setHabitInput("");
    }
  };

  const deleteHabit = (index) => {
    const newHabits = habits.filter((_, i) => i !== index);
    setHabits(newHabits);
  };

  return (
    <div className="section active">
      <h1>นิสัย</h1>
      <input
        type="text"
        value={habitInput}
        onChange={(e) => setHabitInput(e.target.value)}
        placeholder="พิมพ์นิสัยที่ต้องการติดตาม..."
      />
      <button onClick={addHabit}>เพิ่มนิสัย</button>
      <ul id="habit-list">
        {habits.map((habit, index) => (
          <li key={index}>
            <span>{habit}</span>
            <button className="delete-btn" onClick={() => deleteHabit(index)}>
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Habits;
