import { useSession } from "next-auth/react";
import HomePage from "../../components/pages/home/HomePage";

export default function Component(props: any) {
  const { data: session } = useSession();

  return (
    <>
      <HomePage session={session}></HomePage>
    </>
  );
}
