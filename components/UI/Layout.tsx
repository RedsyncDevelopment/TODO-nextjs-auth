import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode, useContext } from "react";

import { ThemeContext } from "../../states/context/theme/ThemeContext";
import useStore from "../../states/store/useStore";
import RegistrationFrom from "../pages/home/Registration/RegistrationForm";
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
        className={`w-full flex justify-between p-4 ${
          dark ? "bg-primary-700" : "bg-primary-200"
        }`}
      >
        <Link href="/">
          <h1
            className={`border-2 px-4 py-2 ml-12 cursor-pointer ${
              dark ? "text-white border-slate-200" : "border-slate-700"
            }`}
          >
            TODO Users
          </h1>
        </Link>
        <div className="mr-12 flex gap-4">
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
                className={`border-2 px-4 py-2 ${
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
          <button
            className={`border-2 px-4 py-2 ${
              dark ? "text-white border-slate-200" : "border-slate-700"
            }`}
            onClick={toggleTheme}
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </>
  );
};

export default Layout;
