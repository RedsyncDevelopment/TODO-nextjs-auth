import React, { useState } from "react";
import Card from "../components/UI/Card";

const taskse = [
  { id: 1, heading: "Task1" },
  { id: 3, heading: "Task2" },
  { id: 2, heading: "Task3" },
];

export default function Component(props: any) {
  const [tasks, setTasks] = useState(taskse);
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newTaskObject = {
      id: Math.floor(Math.random() * 100),
      heading: newTask,
    };
    setTasks([...tasks, newTaskObject]);
    console.log(tasks);
  };

  return (
    <>
      <div className="bg-primary-200 min-h-screen">
        <form onSubmit={handleAddTask}>
          <label htmlFor="task">
            Create Task
            <input
              id="task"
              typeof="text"
              onChange={(e: any) => {
                setNewTask(e.target.value);
              }}
            ></input>
          </label>
          <button type="submit">Add</button>
        </form>
        <div className="flex flex-col gap-4 justify-center items-center">
          {tasks.map((task: any) => (
            <Card key={task.id}>{task.heading}</Card>
          ))}
        </div>
      </div>
    </>
  );
}
