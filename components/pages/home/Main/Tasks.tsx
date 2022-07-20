import React, { ReactNode, useContext } from "react";
import { ThemeContext } from "../../../../states/context/theme/ThemeContext";
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
  const { dark } = useContext(ThemeContext);

  return (
    <>
      <div className="flex gap-2 justify-center items-center py-6">
        <form
          onSubmit={handleAddTask}
          className="flex flex-col justify-center items-center gap-2"
        >
          <div className="flex gap-2 flex-col justify-center items-center">
            <label
              htmlFor="task"
              className="flex flex-col justify-center items-center gap-2"
            >
              Create Task:
              <input
                id="task"
                typeof="text"
                value={newTask}
                onChange={(e: any) => {
                  setNewTask(e.target.value);
                }}
                className={`${
                  dark ? "inputField" : "inputFieldLight"
                } sm:w-96 w-64 h-14 text-lg`}
              ></input>
            </label>
            <button type="submit" className="border-2 w-32">
              Add
            </button>
          </div>
          <div>{titleError}</div>
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
