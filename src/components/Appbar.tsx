"use client";

import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Appbar() {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-5 py-4 md:px-10 xl:px-20 bg-white shadow-md">
      <div className="text-emerald-500 font-bold text-3xl">JobSync</div>
      <div className="flex justify-between  w-[25%]">
      <div className=" font-semibold hover:text-emerald-500  text-xl hover:underline">Features</div>
      <div className=" font-semibold hover:text-emerald-500 hover:underline text-xl">Blog</div>
      <div className=" font-semibold hover:text-emerald-500 hover:underline text-xl">Reviews</div>
      </div>
      <div className="flex items-center space-x-4">
        {session.data?.user ? (
          <Button
            className="bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              className="text-emerald-500  text-lg border border-emerald-500 hover:bg-emerald-500 hover:text-white transition duration-200"
              onClick={() => {
                router.push("/auth");
              }}
            >
              I am a Job Seeker
            </Button>

            <Link
              href={{
                pathname: "/Employeeauth",
                query: {
                  authtype: "signUp",
                },
              }}
              className="relative rounded px-5 py-2.5 overflow-hidden group bg-emerald-500 relative hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-emerald-400 transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Employer Login </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
