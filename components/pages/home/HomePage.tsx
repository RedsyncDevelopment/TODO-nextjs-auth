import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import Tasks from "./Main/Tasks";

interface HomePageProps {
  children?: ReactNode;
  session: any;
}

const HomePage: React.FC<HomePageProps> = ({ children, session }) => {
  const [newTask, setNewTask] = useState("");
  const [titleError, setTitleError] = useState("");
  const [tasks, setTasks] = useState<[] | any>();

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
      setTitleError("Please enter more than 3 characters");
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
        <div className="bg-primary-200 min-h-screen">
          Signed in as {session.user?.name} <br />{" "}
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
      <div>
        <span>Please login or create an account to see your tasks</span>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default HomePage;
