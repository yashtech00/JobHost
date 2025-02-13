import Appbar from "@/components/Appbar";
import { Stepper } from "@/components/boardingAll/stepper";
import WelcomeBoarding from "@/components/boardingAll/WelcomeBoarding";



export default function Boarding(){
    return <div className="flex min-h-screen flex-col ">
        <Appbar/>
        <div>
            
        <Stepper/>
        </div>
        </div>
}