import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tasks from "../components/pages/home/Main/Tasks";

const startingTasks = [
  { id: "1", heading: "Sleep", checked: true },
  { id: "2", heading: "Code", checked: false },
  { id: "3", heading: "Eat", checked: false },
];

export default function Component(props: any) {
  const [tasks, setTasks] = useState(startingTasks);
  const [newTask, setNewTask] = useState<string>("");
  const [titleError, setTitleError] = useState("");

  const handleAddTask = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTask.length < 3) {
      setTitleError("Please enter more than 3 characters!");
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
      <div className="flex flex-col justify-center items-center px-4">
        <h1 className="text-xl font-semibold pt-10 pb-4">
          Here is a simple demo
        </h1>
        <span className="text-center">
          If you like it, you can register and save your tasks in{" "}
          <Link href="/home">
            <span className="font-semibold underline cursor-pointer">
              My Tasks
            </span>
          </Link>
        </span>
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
