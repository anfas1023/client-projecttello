import { SiGoogledocs } from "react-icons/si";
export default function Home() {
  return (
    <>
      <div className="bg-indigo-900 max-h-full flex flex-col g justify-center items-center text-white text-center ">
        <div className="flex-col gap-4">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">
            ProjectTello
          </h1>
          <h3 className="text-lg lg:text-xl font-bold">
            Productivity, reimagined
          </h3>
        </div>
        <div className="mt-4 flex-col gap-2 lg:mt-6 ">
          <h6 className="text-sm lg:text-base">
            Shockingly simple and more powerful than ever before
          </h6>
          <h6 className="text-sm lg:text-base">
            Get started now to experience the future of work.
          </h6>
        </div>
        <div className="flex gap-4 mt-5 ">
          <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold py-2 px-4 rounded-lg">
            Get Started
          </button>
          <button className=" border-violet-700 border-2 text-white font-semibold py-2 px-4 rounded-lg">
            Learn More
          </button>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600  h-[80%] w-[80%] relative my-12 flex justify-center items-center rounded-lg">
          <img
            className="w-[80%] h-[80%]  object-cover -translate-y-8 "
            src="https://clickup.com/images/clickup-v3/CU_3.0_Teaser_LP_Task_View_Redesign.png"
            alt="Example Image"
          />
        </div>

        <div className="flex justify-center items-center gap-3 my-7 ">
          <div className="border-2 border-violet-700 p-10 rounded-lg flex flex-col items-center gap-3 w-[25%] h-[25%]">
            <SiGoogledocs className="text-5xl text-white" />
            <h3 className="text-xl font-semibold text-white mb-1">Docs</h3>
            <div>
              <p className="text-white text-sm font-medium text-left">
                One or more users can collaborate here   One or more users can collaborate here    One or more users can collaborate here  
              </p>
            </div>
          </div>

          <div className="border-2 border-violet-700 p-10 rounded-lg flex flex-col items-center gap-3 w-[25%] h-[25%]">
            <SiGoogledocs className="text-5xl text-white" />
            <h3 className="text-xl font-semibold text-white mb-1">Docs</h3>
            <div>
              <p className="text-white text-sm font-medium text-left">
                One or more users can collaborate here   One or more users can collaborate here    One or more users can collaborate here  
              </p>
            </div>
          </div>

          <div className="border-2 border-violet-700 p-10 rounded-lg flex flex-col items-center gap-3 w-[25%] h-[25%]">
            <SiGoogledocs className="text-5xl text-white" />
            <h3 className="text-xl font-semibold text-white mb-1">Docs</h3>
            <div>
              <p className="text-white text-sm font-medium text-left">
                One or more users can collaborate here   One or more users can collaborate here    One or more users can collaborate here  
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
