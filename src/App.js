import React, { useEffect } from "react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [orgValue, setOrgValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems([...data]);
        setOrgValue([...data]);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const addToDoFunction = () => {
    if (inputValue.trim() !== "") {
      setItems([
        ...items,
        { title: inputValue, id: Date.now(), completed: false },
      ]);
      setInputValue("");
    } else {
      alert("Please enter a valid to-do item.");
    }
  };

  const delFunction = (e, id) => {
    e.stopPropagation();
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const toggleCompleted = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const showCompleted = () => {
    const filteredArr = orgValue.filter((item) => item.completed);
    setItems([...filteredArr]);
  };

  const showInCompleted = () => {
    const filteredArr = orgValue.filter((item) => !item.completed);
    setItems([...filteredArr]);
  };

  const showAll = () => {
    setItems([...orgValue]);
  };

  return (
    <div className="container">
      <h1>React Task Tracker</h1>
      <div className="flex-container">
        <div className="task-form">
          <input
            type="text"
            className="task-input"
            value={inputValue}
            placeholder="Enter task..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addToDoFunction} className="button">
            Add
          </button>
          <button className="button" onClick={showCompleted}>
            Complete
          </button>
          <button className="button" onClick={showInCompleted}>
            Incomplete
          </button>
          <button className="button" onClick={showAll}>
            All
          </button>
        </div>
        <div className="task-list">
          {items.length === 0 ? (
            <div>No tasks added yet.</div>
          ) : (
            <Reorder.Group axis="y" values={items} onReorder={setItems}>
              <ul>
                {items.map((item) => (
                  <Reorder.Item key={item.id} value={item}>
                    <li
                      className={`task-item ${
                        item.completed ? "completed" : "incomplete"
                      }`}
                    >
                      <span>{item.title}</span>
                      <button
                        onClick={() => toggleCompleted(item.id)}
                        className="button"
                      >
                        {item.completed ? "Mark Incomplete" : "Mark Complete"}
                      </button>
                      <button
                        onClick={(e) => delFunction(e, item.id)}
                        className="button"
                      >
                        Delete
                      </button>
                    </li>
                  </Reorder.Item>
                ))}
              </ul>
            </Reorder.Group>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
