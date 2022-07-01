import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useState } from "react";

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
    console.log(e.target.id);
    toggleComplete(e.target.id);
  };

  const handleClick = (e: any) => {
    removeTask(e.target.id);
  };

  return (
    <>
      <div
        className="border-2 py-4 px-6 bg-primary-700 w-96 flex items-center justify-between"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id={task.id.toString()}
                onChange={toggleCompleted}
                checked={task.checked}
              />
            }
            label={
              <div>
                {task.checked ? (
                  <span className="text-secondary-200">{task.heading}</span>
                ) : (
                  <span>{task.heading}</span>
                )}
              </div>
            }
          ></FormControlLabel>
        </FormGroup>
        {showButton && (
          <button id={task.id} onClick={handleClick}>
            Delete
          </button>
        )}
      </div>
    </>
  );
};

export default Singletask;
