import { useState } from "react";
import { useUser } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Nav() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { handleLogout, user } = useUser();
  const router = useRouter();
  return (
    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 ">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-end lg:w-auto lg:justify-between">
          <a
            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            href="#"
          >
            {user?.name}
          </a>

          <h1
            onClick={() => {
              handleLogout();
              router.replace(router.asPath);
            }}
            className="bg-slate-500 text-center cursor-pointer w-40 text-white rounded-md hover:scale-105 hover:backdrop-blur-3xl px-2 py-2"
          >
            {" "}
            Log out{" "}
          </h1>
        </div>
      </div>
    </nav>
  );
}
