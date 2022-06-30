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
      setErrorPassword("Password need to have at least 6 characters");
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
      <div>
        <form onSubmit={RegisterUser} className="flex flex-col">
          <label>
            Name:
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
          {errorName && <div className="text-secondary-200">{errorName}</div>}
          <label>
            Email:
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            ></input>
          </label>
          {errorEmail && <div className="text-secondary-200">{errorEmail}</div>}
          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          {errorPassword && (
            <div className="text-secondary-200">{errorPassword}</div>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Register;
