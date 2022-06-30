import MuiModal from "@mui/material/Modal";
import Credentials from "next-auth/providers/credentials";
import React, { ReactNode, useState } from "react";
import useStore from "../../../../states/store/useStore";
import Register from "./Register";
import SignIn from "./SignIn";

interface RegistrationFromProps {
  children?: ReactNode;
}

// TODO registration form existing user check and notification

const RegistrationFrom: React.FC<RegistrationFromProps> = ({ children }) => {
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const [openRegister, setOpenRegister] = useState(false);

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
            <div className="relative p-10 border-2 bg-primary-400">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
              ></button>
              <div>
                <span>Already have an account? </span>
                <SignIn providers={Credentials}></SignIn>
              </div>
              <div className="flex flex-col">
                <span className="self-center">OR</span>
                <button onClick={handleOpenRegister} className="underline">
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
