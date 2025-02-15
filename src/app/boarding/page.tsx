import Appbar from "@/components/Appbar";
import { FormProvider } from "@/components/boardingAll/FormContext";
import { Stepper } from "@/components/boardingAll/stepper";

export default function Boarding() {
  return (
    <div className=" ">
      <Appbar />
      <FormProvider>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Stepper />
      </div>
    </FormProvider>
    </div>
  );
}
