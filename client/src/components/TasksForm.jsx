import React from "react";

function TasksForm() {
  return (
    <div>
      goal ? (
      <div className="flex flex-col items-center justify-center mt-25 space-y-2">
        <label htmlFor="Goal">
          <h1 className="text-lg">Write Down Your Goal</h1>
        </label>
        <input
          type="text"
          className="bg-gradient-to-r from-white via-[#a8a8a8] text-black to-[#282727] h-12 text-lg w-full rounded-2xl p-3 z-50 focus:bg-[#251f19] lg:w-1/2"
        />
        <button
          onClick={() => {
            setGoal(false);
            setLinked(true);
            setProgression(false);
            setPoints(false);
          }}
          className="next-button w-30 mt-5 h-10 !rounded-full"
        >
          Next
        </button>
      </div>
      ) : linked ? (
      <div className="flex flex-col items-center justify-center mt-10 space-y-2">
        <Linked type={type} />
        <button
          onClick={() => {
            setGoal(false);
            setLinked(false);
            setProgression(false);
            setPoints(true);
          }}
          className="next-button w-30 mt-5 h-10 !rounded-full"
        >
          Next
        </button>
      </div>
      ) : point ? (
      <div className="flex flex-col items-center justify-center mt-25 space-y-2">
        <label htmlFor="Goal">
          <h1 className="text-lg">Points reward</h1>
        </label>
        <input
          type="text"
          className="bg-gradient-to-r from-[#dcdcdc] via-[#f5f5f5] to-[#a0a0a0] w-30 text-black font-semibold h-12 text-lg text-center rounded-full p-3 z-50 focus:bg-[#251f19] lg:w-1/2"
        />
        <button
          onClick={() => {
            setGoal(false);
            setLinked(true);
            setProgression(false);
            setPoints(false);
          }}
          className="next-button w-30 mt-5 h-10 !rounded-full"
        >
          Submit
        </button>
      </div>
      ) : ( "" )
    </div>
  );
}

export default TasksForm;
