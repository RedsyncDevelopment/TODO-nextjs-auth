import MuiModal from "@mui/material/Modal";
import Credentials from "next-auth/providers/credentials";
import React, { ReactNode, useState } from "react";
import useStore from "../../../../states/store/useStore";
import Register from "./Register";
import SignIn from "./SignIn";

import { AiOutlineCloseSquare } from "react-icons/ai";

interface RegistrationFromProps {
  children?: ReactNode;
}

// TODO registration form existing user check and notification

const RegistrationFrom: React.FC<RegistrationFromProps> = ({ children }) => {
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const [openRegister, setOpenRegister] = useState(false);

  console.log(openRegister);

  const handleOpenRegister = () => {
    setOpenRegister((current) => !current);
  };

  return (
    <>
      <MuiModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <>
          <div className="pt-4 flex flex-col justify-center items-center">
            <div className="relative px-6 pt-6 pb-4 sm:px-14 sm:pt-14 sm:pb-10 border-2 bg-primary-400">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="absolute right-5 top-5 !z-40 border-none"
              >
                <AiOutlineCloseSquare className="h-6 w-6 sm:h-9 sm:w-9" />
              </button>
              <div className=" flex flex-col gap-2">
                <span className="text-md font-semibold">
                  Already have an account?{" "}
                </span>
                <SignIn providers={Credentials}></SignIn>
              </div>
              <div className="flex flex-col">
                <span className="self-center text-sm font-semibold">OR</span>
                <button
                  onClick={handleOpenRegister}
                  className="mt-2 font-semibold underline"
                >
                  Register New Account
                </button>
                {openRegister && <Register></Register>}
              </div>
            </div>
          </div>
        </>
      </MuiModal>
    </>
  );
};

export default RegistrationFrom;
