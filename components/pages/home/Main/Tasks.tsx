import React, { ReactNode } from "react";
import Singletask from "../../../UI/SingleTask";

interface TasksProps {
  children?: ReactNode;
  startingTasks: any;
  handleAddTask?: any;
  removeTask?: any;
  toggleComplete?: any;
  titleError?: any;
  newTask?: any;
  setNewTask?: any;
}

const Tasks: React.FC<TasksProps> = ({
  startingTasks,
  handleAddTask,
  removeTask,
  toggleComplete,
  titleError,
  newTask,
  setNewTask,
}) => {
  return (
    <>
      <div className="flex justify-center items-center py-6">
        <form onSubmit={handleAddTask}>
          <label htmlFor="task">
            Create Task
            <input
              id="task"
              typeof="text"
              value={newTask}
              onChange={(e: any) => {
                setNewTask(e.target.value);
              }}
            ></input>
          </label>
          <div>{titleError}</div>
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {startingTasks?.map((task: any) => (
          <Singletask
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
          ></Singletask>
        ))}
      </div>
    </>
  );
};

export default Tasks;
