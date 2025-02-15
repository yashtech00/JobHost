"use client"
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Appbar() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className=" flex justify-between px-5 py-4 md:px-10 xl:px-20">
      <div className="text-emerald-500 font-bold px-10 text-3xl">JobSync</div>
      {session.data?.user && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Logout
          </Button>
        )}
      {!session?.data?.user && (
        <div className="px-10">
          <Button
            className="text-emerald-500   font-bold px-2 text-lg"
            onClick={() => {
              router.push("/auth");
            }}
          >
             Login 
          </Button>
          <Link href={{
            pathname:'/auth',
            query:{
                authtype:'signUp'
            }
          }}>
          <Button className="text-emerald-500 font-bold text-lg">Signup</Button>
          </Link>

          <Link href={{
            pathname:'/Employeeauth',
            query:{
                authtype:'signUp'
            }
          }}>
          <Button className="text-emerald-500 font-bold text-lg border-s-2">Employer Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
