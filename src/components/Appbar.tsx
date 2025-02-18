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
              className="text-emerald-500 font-bold text-lg"  
              onClick={() => {  
                router.push("/auth");  
              }}  
            >  
              Login  
            </Button>  
            <Link href={{  
              pathname: '/auth',  
              query: {  
                authtype: 'signUp'  
              }  
            }}>  
              <Button className="text-emerald-500 font-bold text-lg border border-emerald-500 hover:bg-emerald-500 hover:text-white transition duration-200">  
                Signup  
              </Button>  
            </Link>  
            <Link href={{  
              pathname: '/Employeeauth',  
              query: {  
                authtype: 'signUp'  
              }  
            }}>  
              <Button className="text-emerald-500 font-bold text-lg border border-emerald-500 hover:bg-emerald-500 hover:text-white transition duration-200">  
                Employer Login  
              </Button>  
            </Link>  
          </>  
        )}  
      </div>  
    </div>  
  );  
}