import { NextPageContext } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface SignInProps {
  providers: any;
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const handleLogin = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email: email,
      password,
      redirect: false,
      callbackUrl: "/home",
    }).then(function (result: any) {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError(
            "Your username/password combination was incorrect. Please try again!"
          );
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-1">
      <label className="flex justify-between items-center">
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputField"
        />
      </label>
      <label className="flex justify-between items-center gap-2">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputField"
        />
      </label>
      <button type="submit" className="w-full mt-4 border-2 py-1 font-semibold">
        <span className="">Login</span>
      </button>
      <div className="w-64 h-8 my-2 flex justify-center items-center self-center text-center">
        <span className="text-sm">{loginError}</span>
      </div>
    </form>
  );
};

export default SignIn;

export const getServerSideProps = async (context: NextPageContext) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
