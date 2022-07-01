import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tasks from "../components/pages/home/Main/Tasks";

const startingTasks = [
  { id: uuidv4(), heading: "Task1", checked: true },
  { id: uuidv4(), heading: "Task2", checked: false },
  { id: uuidv4(), heading: "Task3", checked: false },
];

export default function Component(props: any) {
  const [tasks, setTasks] = useState(startingTasks);
  const [newTask, setNewTask] = useState<string>("");
  const [titleError, setTitleError] = useState("");

  const handleAddTask = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTask.length < 3) {
      setTitleError("Please enter more than 3 characters");
      return;
    } else {
      setTitleError("");
    }
    const newTaskObject = {
      id: uuidv4(),
      heading: newTask,
      checked: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  };

  const toggleComplete = (id: any) => {
    const updatedTasks = tasks.map((task: any) => {
      if (task.id === id) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (id: any) => {
    setTasks(tasks.filter((task: any) => task.id !== id));
  };

  return (
    <>
      <div className="bg-primary-200 min-h-screen">
        <div>
          <h1>Here is a simple demo</h1>
          <span>
            If you like it, you can register and save your tasks in{" "}
            <Link href="/home">My Tasks</Link>
          </span>
        </div>
        <Tasks
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          removeTask={removeTask}
          toggleComplete={toggleComplete}
          startingTasks={tasks}
          titleError={titleError}
        ></Tasks>
      </div>
    </>
  );
}
