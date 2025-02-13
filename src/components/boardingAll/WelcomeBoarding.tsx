import { Stepper } from "./stepper";

export default function WelcomeBoarding() {
  return (
    <div className=" flex justify-center ">
       
      <form className="bg-white w-[90%] p-2  ">
      <Stepper/>
       
      </form>
    </div>
  );
}
