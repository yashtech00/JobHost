"use client";

import { useState } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFlow } from "../../types/auth-types"; // Ensure correct path and type imports
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignupProp {
  setFormType: (state: SignInFlow) => void; // Defining prop type for form type
}

export default function SignUpcard({ setFormType: setState }: SignupProp) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter(); 


  const signupWithProvider = async (provider: "github" | "credentials") => {
   
    try {
      if (provider === "credentials") {
        const res = signIn(provider, {
          email,
          password,
          redirect: false,
          callbackUrl: "/boarding",
        });
        res.then((res) => {
          if (res?.error) {
            setError(res.error);
          }
          if (!res?.error) {
            router.push("/");
          }
          setPending(false);
        });
      }
      if (provider === "github") {
        const res = signIn(provider, {
          redirect: false,
          callbackUrl: "/boarding",
        });
        res.then((res) => {
          if (res?.error) {
            console.error(res.error);
            
            setError(res.error);
          }
          console.log(res);
          setPending(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    signupWithProvider("credentials");
  };

  const handleGithub = (provider: "github") => {
    setError(""); // Clear previous errors
    setPending(true);
    signupWithProvider(provider);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Join us
          </CardTitle>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Create a HackerRank account
          </CardTitle>
          <CardDescription className="text-zinc-400 mt-4">
            Be part of a 23 million-strong community of developers
          </CardDescription>
        </CardHeader>
        {error && <div className="text-red-600 text-center">{error}</div>}{" "}
        {/* Error message display */}
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
            disabled={pending}
            onClick={() => handleGithub("github")}
          >
            <Github className="mr-2 h-4 w-4" /> Continue with GitHub
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleCredentials} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                value={name}
                type="text"
                placeholder="John Doe"
                disabled={pending}
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                value={email}
                type="email"
                placeholder="m@example.com"
                disabled={pending}
                required
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                type="password"
                value={password}
                disabled={pending}
                placeholder="*******"
                required
                className="bg-zinc-800 border-zinc-700 text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
              disabled={pending} // Maintain button state based on pending
            >
              {pending ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-teal-500 hover:underline"
              onClick={() => setState("signIn")} // Switch to sign-in state
            >
              Sign in
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
