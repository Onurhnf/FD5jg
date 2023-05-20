import { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { logout } from "@/store/UserSlice";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <header className="flex items-center justify-between p-10 drop-shadow-sm mx-[30px] bg-white">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/logo.svg"
            alt="Image"
            width={60}
            height={39}
            className="object-cover"
          />
        </div>

        <div className="flex justify-center flex-grow px-28">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full "
          />
        </div>

        <button
          data-cy="logout-button"
          className="px-4 py-2 text-white bg-MainOrange rounded-md"
          onClick={() => {
            localStorage.removeItem("pitonToken");
            router.push("/auth");
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </header>
    </>
  );
}

export default memo(Header);
