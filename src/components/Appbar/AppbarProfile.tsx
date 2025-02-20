import { useEffect, useState } from "react";
import { Usercard } from "./usercard";
import { UserProp } from "@/types";



export function AppbarProfile() {
  const [appuser, setAppUser] = useState<UserProp[]>([]);
  async function getUser() {
    try {
      console.log("before");

      const res = await fetch(`/api/stepper/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      console.log(data.getprofile, "yashuser");

      // Check if the response contains a valid user object
      if (data && typeof data === "object" && !Array.isArray(data)) {
        setAppUser([data.getprofile]); // Directly set the user data
      } else {
        console.error("Expected an object, but received:", data);
        setAppUser([]); // or handle it as appropriate
      }
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-gray-50">
      <h2>Profile</h2>
      <div>
        {appuser.map((userdetails) => (
          <Usercard userdetail={userdetails} key={userdetails.id} />
        ))}
      </div>
    </div>
  );
}
