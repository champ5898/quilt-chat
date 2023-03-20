import { useUser } from "@/context/AuthContext";
import Login from "@/components/Login";
import Chat from "@/components/Chat";


export default function Home() {
  const { user } = useUser();
 

  if (!user) {
    return <Login />;
  }

  return (
    <Chat />
  );
}
