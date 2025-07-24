import { useState } from "react";

const Tasks = ({ tasks, setTasks }) => {
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput.trim(), completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="section active">
      <h1>งานที่ต้องทำ</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="พิมพ์งานที่ต้องทำ..."
      />
      <button onClick={addTask}>เพิ่มงาน</button>
      <ul id="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
