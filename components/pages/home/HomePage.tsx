import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";

interface HomePageProps {
  children?: ReactNode;
  session: any;
}

const HomePage: React.FC<HomePageProps> = ({ children, session }) => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<[]>();

  const sendTask = async (e: any) => {
    e.preventDefault();
    await axios.post("api/tasks", {
      data: {
        title: title,
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      await axios.get("api/tasks").then((res) => {
        console.log(res.data);
        setTasks(res.data);
      });
    };
    getData();
  }, [tasks]);

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />{" "}
        <div className="flex flex-col">
          <form onSubmit={sendTask}>
            <div>
              <label>
                Title:
                <input
                  name="title"
                  className="border"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>

          {tasks?.map((task: any) => (
            <div key={task.id}>{task.title}</div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <span>NO PERMISION</span>
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
