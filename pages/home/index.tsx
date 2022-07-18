import axios from "axios";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import Tasks from "../../components/pages/home/Main/Tasks";
import useStore from "../../states/store/useStore";

interface HomePageProps {
  children?: ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ children }) => {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState<[] | any>();
  const [newTask, setNewTask] = useState("");
  const [titleError, setTitleError] = useState("");

  const setShowModal = useStore((state) => state.setShowModal);

  const getData = async () => {
    await axios.get("api/tasks").then((res) => {
      setTasks(res.data);
    });
  };

  // Get the tasks from database
  useEffect(() => {
    getData();
  }, []);

  const handleAddTask = async (e: any) => {
    e.preventDefault();
    if (newTask.length < 3) {
      setTitleError("Please enter more than 3 characters!");
      return;
    } else {
      setTitleError("");
    }
    await axios.post("api/tasks", {
      data: {
        heading: newTask,
      },
    });
    getData();
    setNewTask("");
  };

  const removeTask = async (taskId: any) => {
    await axios.delete("api/tasks", {
      data: {
        id: taskId,
      },
    });
    setTasks(tasks.filter((task: any) => task.id !== taskId));
  };

  const toggleComplete = async (taskId: any) => {
    await axios.put("api/tasks", {
      data: {
        id: taskId,
      },
    });
    const updatedTasks = tasks.map((task: any) => {
      if (task.id === taskId) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  if (session) {
    return (
      <>
        <div className="bg-primary-200 min-h-screen flex flex-col items-center px-4">
          <h2 className="text-xl pt-10 pb-4">
            Signed in as{" "}
            <span className="font-semibold">{session.user?.name}</span>
          </h2>
          <Tasks
            titleError={titleError}
            startingTasks={tasks}
            handleAddTask={handleAddTask}
            newTask={newTask}
            setNewTask={setNewTask}
            removeTask={removeTask}
            toggleComplete={toggleComplete}
          ></Tasks>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-primary-200 min-h-screen flex flex-col items-center px-4">
        <h2 className="text-xl pt-10 pb-4">
          Please{" "}
          <span
            onClick={(e) => setShowModal(true)}
            className="underline font-semibold cursor-pointer"
          >
            login
          </span>{" "}
          or{" "}
          <span
            onClick={(e) => setShowModal(true)}
            className="underline font-semibold cursor-pointer"
          >
            create an account
          </span>{" "}
          to see your tasks
        </h2>
      </div>
    </>
  );
};

export default HomePage;
