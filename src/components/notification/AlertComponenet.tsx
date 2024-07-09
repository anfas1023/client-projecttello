import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoMdNotificationsOutline } from "react-icons/io";
const AlertComponenet = ({
  setShowAlert,
  showAlert,
}: {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert: boolean;
}) => {
  const handleCancel = () => {
    setShowAlert(!showAlert);
  };

//   console.log("showAlert", showAlert);

  return (
    <div>
      {showAlert ? (
        <Alert className="h-20 bg-rose-600 w-64 flex flex-col items-center gap-1 ">
           
          {/* <AlertTitle className="">
           Notification Alert
          </AlertTitle> */}

         <div className="flex gap-2">
         < IoMdNotificationsOutline className="text-gray-700" size={20} />
         <h6 className="text-base text-slate-700">You Have An Notification</h6>
         </div>
          {/* <p className="text-center">chek on notification</p> */}
          {/* <AlertDescription>Hey You Have An Notification</AlertDescription> */}
          <button onClick={handleCancel} className="text-slate-800 ">
            Cancel
          </button>
        </Alert>
      ) : null}
    </div>
  );
};

export default AlertComponenet;
