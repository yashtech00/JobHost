"use client";  

import { useSession } from "next-auth/react";  
import { useRouter } from "next/navigation";  
import { useSearchParams } from "next/navigation"; // Import the useSearchParams hook  
import { SignInFlow } from "../../types/auth-types";
import AuthScreen from "@/components/auth/AuthScreen";
import Empauthscreen from "@/components/Empauth/Empauthscreen";



export default function Employeeauth() {  
  const searchParams = useSearchParams(); // Use the useSearchParams hook  
  const formType = searchParams.get("authtype") as SignInFlow; // Access authType from searchParams  
  const session = useSession();  
  const router = useRouter(); 
  console.log(session);   

  if (session.status === "authenticated") {  
    router.push("/Empdashboard"); // Use router.push without return  
  }  

  return <Empauthscreen authtype={formType} />;  
}