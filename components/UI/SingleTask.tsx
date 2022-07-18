import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface SingletaskProps {
  task: any;
  toggleComplete: any;
  removeTask: any;
}

const Singletask: React.FC<SingletaskProps> = ({
  task,
  toggleComplete,
  removeTask,
}) => {
  const [showButton, setShowButton] = useState(false);

  const toggleCompleted = (e: any) => {
    toggleComplete(e.target.id);
  };

  const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    removeTask(target.id);
  };

  return (
    <>
      <div
        className="border-2 py-4 px-6 bg-primary-700 w-full sm:w-96 lg:w-[780px] flex items-center justify-between"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id={task.id}
                onChange={toggleCompleted}
                checked={task.checked}
                sx={{
                  color: green[900],
                  "&.Mui-checked": {
                    color: green[900],
                  },
                }}
              />
            }
            label={
              <div>
                {task.checked ? (
                  <span className="text-secondary-400 line-through decoration-primary-200 decoration-2">
                    {task.heading}
                  </span>
                ) : (
                  <span className="font-semibold">{task.heading}</span>
                )}
              </div>
            }
          ></FormControlLabel>
        </FormGroup>

        <button onClick={handleClick} className="z-10 relative lg:hidden block">
          <div id={task.id} className=" z-auto relative">
            <AiFillDelete
              id={task.id}
              className="-z-10 relative w-4 h-4 md:w-6 md:h-6"
            />
          </div>
        </button>

        {showButton && (
          <button
            onClick={handleClick}
            id={task.id}
            className="hidden lg:block  z-10 relative"
          >
            <div id={task.id} className="z-auto relative">
              <AiFillDelete
                id={task.id}
                className="-z-10 relative w-4 h-4 md:w-6 md:h-6"
              />
            </div>
          </button>
        )}
      </div>
    </>
  );
};

export default Singletask;
