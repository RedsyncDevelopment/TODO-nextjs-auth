import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState<string>();
  const [errorName, setErrorName] = useState<string>();
  const [errorPassword, setErrorPassword] = useState<string>();

  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const RegisterUser = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length < 1) {
      setErrorName("Name need to have at least 2 characters");
      return;
    } else {
      setErrorName("");
    }
    if (email.match(emailFormat)) {
      setErrorEmail("");
    } else {
      setErrorEmail("You have entered an invalid email address!");
      return;
    }
    if (password.length <= 5) {
      setErrorPassword("Password needs to have at least 6 characters");
      return;
    } else {
      setErrorPassword("");
    }
    const data = {
      email: email,
      name: name,
      password: password,
    };

    await axios.post("/api/register", data).catch((err: any) => {
      setErrorEmail(err.response.data.err);
    });
    signIn("credentials", {
      email: email,
      password,
      callbackUrl: `${window.location.origin}/home`,
      redirect: false,
    })
      .then(function (result: any) {
        router.push(result.url);
      })
      .catch((err) => {
        console.log("Failed to register: " + err.toString());
      });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="mt-4">
        <form onSubmit={RegisterUser} className="flex flex-col gap-1">
          <label className="flex justify-between items-center">
            Full name:
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputField"
            ></input>
          </label>
          {errorName && (
            <div className="w-64 sm:w-80 ">
              <p className="text-sm font-semibold leading-4">{errorName}</p>
            </div>
          )}
          <label className="flex justify-between items-center">
            Email:
            <input
              name="email"
              type="text"
              value={email}
              onChange={handleEmail}
              className="inputField"
            ></input>
          </label>
          {errorEmail && (
            <div className="w-64 sm:w-80 ">
              <p className="text-sm font-semibold leading-4">{errorEmail}</p>
            </div>
          )}
          <label className="flex justify-between items-center">
            Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputField"
            ></input>
          </label>
          {errorPassword && (
            <div className="w-64 sm:w-80 ">
              <p className="text-sm font-semibold leading-4">{errorPassword}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full mt-4 border-2 py-1 font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
