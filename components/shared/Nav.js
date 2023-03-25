import { useState } from "react";
import { useUser } from "@/context/AuthContext";
import { useRouter } from "next/router";
import logo from "../Logo/logo.svg";

export default function Nav() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { handleLogout, user } = useUser();
  const router = useRouter();
  return (
    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 ">
      <div
        className="container px-4 mx-auto flex  items-center justify-between"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <img
          src={
            "https://ipfs.io/ipfs/bafybeigieawtulhl3vgycbx6hsezqf7jczralrxvkvhrbqfn3obgf222p4/logo.svg"
          }
          alt="Quilt"
          style={{
            width: "150",
            height: "50",

            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/");
            setIsDrawerOpen(false);
          }}
        />
        <div
          className="w-full relative   lg:w-auto xl:justify-between"
          style={{
            display: "flex",
            flexDirection: "row",
            right: "0",
            gap: 10,
          }}
        >
          <a
            style={{ color: "rgb(66, 71, 81)" }}
            className="  text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            href="#"
          >
            {user?.name}
          </a>

          <h1
            onClick={() => {
              handleLogout();
              router.replace(router.asPath);
            }}
            style={{ backgroundColor: "rgb(0,228,103)" }}
            className="  text-center cursor-pointer w-40 text-white rounded-md hover:scale-105 hover:backdrop-blur-3xl px-2 py-2"
          >
            Log out
          </h1>
        </div>
      </div>
    </nav>
  );
}
