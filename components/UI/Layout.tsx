import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode, useContext } from "react";

import { ThemeContext } from "../../states/context/theme/ThemeContext";
import useStore from "../../states/store/useStore";
import RegistrationFrom from "../pages/home/Registration/RegistrationForm";

import { RiCheckboxBlankFill } from "react-icons/ri";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const setShowModal = useStore((state) => state.setShowModal);

  return (
    <>
      <div
        className={`w-full flex justify-between p-4  ${
          dark ? "bg-primary-dark-700" : "bg-primary-light-700"
        }`}
      >
        <Link href="/">
          <h1
            className={`border-2 py-2 px-2 sm:px-4 sm:py-2 sm:ml-12 ml-6 cursor-pointer ${
              dark ? "text-white border-slate-200" : "border-slate-700"
            }`}
          >
            TODO Users
          </h1>
        </Link>
        <div className="mr-4 flex gap-4">
          {session ? (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className={`border-2 px-4 py-2 ${
                dark ? "text-white border-slate-200" : "border-slate-700"
              }`}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className={`border-2 px-4 py-2 mr-4 ${
                  dark ? "text-white border-slate-200" : "border-slate-700"
                }`}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Login
              </button>
              <RegistrationFrom></RegistrationFrom>
            </>
          )}
          {session && (
            <Link href="/home">
              <h1
                className={`border-2 px-4 py-2 cursor-pointer ${
                  dark ? "text-white border-slate-200" : "border-slate-700"
                }`}
              >
                My Tasks
              </h1>
            </Link>
          )}
          <button onClick={toggleTheme}>
            {dark ? (
              <div className="sm:w-16 flex flex-col justify-center items-center">
                <RiCheckboxBlankFill className="w-6 h-6 text-primary-light-400" />

                <span className="hidden sm:block">Orange</span>
              </div>
            ) : (
              <div className="sm:w-16 flex flex-col justify-center items-center">
                <RiCheckboxBlankFill className="w-6 h-6 text-primary-dark-400" />

                <span className="hidden sm:block">Green</span>
              </div>
            )}
          </button>
        </div>
      </div>
      <div
        className={`min-h-screen ${
          dark ? "bg-primary-dark-200" : "bg-primary-light-200"
        } `}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
