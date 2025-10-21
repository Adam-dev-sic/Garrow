import React from "react";

function Yearly({ yearlyOpen, setYearlyOpen }) {
  return (
    <div
      className="flex flex-col w-full   space-y-10 min-h-1/2 
     max-h-4/5 overflow-y-auto  bg-[#020201] border-2 border-white overflow-auto rounded-2xl text-white  absolute p-5 lg:w-[70%] lg:min-h-[80%] animate-expand-vertically"
    >
      <div className="flex w-full text-center  justify-end">
        <button
          onClick={() => setYearlyOpen(!yearlyOpen)}
          className="task-button lg:!w-30"
        >
          Close
        </button>
      </div>
      <div className="flex justify-between overflow-x-auto  h-15 space-x-10 w-full border-b-2 border-b-white">
        <h1 className="min-w-[50px]">Goal</h1>
        <h1 className="min-w-[50px]">Linked with</h1>
        <h1 className="min-w-[50px]">Points</h1>
        <h1 className="min-w-[50px]">Progress</h1>
      </div>
    </div>
  );
}

export default Yearly;
