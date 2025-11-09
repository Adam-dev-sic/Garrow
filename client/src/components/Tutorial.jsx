// src/components/Tutorial.jsx
import React from "react";

function Tutorial() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col w-full lg:w-[30%] max-h-[80%] min-h-2/3 
      overflow-y-auto overflow-x-hidden bg-[#0a0a0a]/95 border border-white/30 
      rounded-2xl text-white absolute p-8 space-y-8 shadow-2xl
      backdrop-blur-md animate-expand-vertically"
    >
      <h1 className="text-2xl font-bold text-center text-white/90 mb-2">
        Tutorial on the whole system
      </h1>

      <h2 className="text-base text-gray-300 leading-relaxed">
        So the goals page is where you'll do most of the work, you have 4
        different goal types yearly monthly weekly daily and here's few points
        you have to know.
      </h2>

      <div className="flex flex-col space-y-2.5">
        <h2 className="text-lg font-semibold text-white">
          ● Always start your list with your yearly goals
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          This is important as those will be the source of the inspiration for
          ur other goals and you will be linking the list very smoothly as u
          won't have to edit it much later on.
        </p>
      </div>

      <div className="flex flex-col space-y-2.5">
        <h2 className="text-lg font-semibold text-white">
          ● Try to keep your goals linked as much as you can
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          This is helpful as your progress will all be linked together and you
          will see your getting closer to all of ur goals as ur getting things
          done it feels great to see progress go up everywhere (though keep in
          mind that some goals just wont link to anything which is fine).
        </p>
      </div>

      <div className="flex flex-col space-y-2.5">
        <h2 className="text-lg font-semibold text-white">
          ● Think of how many times you're gonna have to do the goal to get the
          100% progress done
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          As you will be making goals and linking them you will have the option
          to set how much progress will each goal give u so if you are making a
          daily goal for example and then about to link it to a weekly goal
          think about how many times will you have to do this daily goal
          throughout the week to get it done then divide that number by 100, (so
          if u gotta do it 5 times just do 100/5 which is 20) and set that as ur
          progress.{" "}
        </p>
      </div>

      <div className="flex flex-col space-y-2.5">
        <h2 className="text-lg font-semibold text-white">
          ● Make good use of the saved list
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Most of ur daily goals and weekly and monthly will be repetetive as
          you will be doing them alot to achieve ur yearly goal so make sure to
          save them on the list after you are done writing all of the goals on
          every single goal type (daily,weekly,monthly,yearly) this is important
          as if not done this way u wont have ur goals linked to these other
          goals from other goal types list.
        </p>
      </div>

      <div className="flex flex-col space-y-2.5">
        <h2 className="text-lg font-semibold text-white">
          ● Keep a good points balance
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Spread ur points fairly well dont put too much points in a daily task
          and just make the point reward reasonable based on the goal type to
          what make sense to u, it essentially doesnt matter too much even if u
          put insanely big numbers if thats what you want but just good to make
          a good reasonable balance between the goal types.
        </p>
      </div>

      <div className="flex flex-col space-y-2.5">
        <h2 className="text-lg font-semibold text-white">
          ● Grind Points for achievements
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          The idea behind the point system is to essentially get achievement as
          u progress and get more points, keep in mind that the achievement wont
          come if u make insanely big numbers on point as it calculate based on
          percentage so just set the point to whatever you like and you'll get
          the achievement whenever you reach a certain threshold.
        </p>
      </div>

      <div className="flex flex-col space-y-2.5">
        <h2 className="text-lg font-semibold text-white">● Have fun!</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Believe in ur self work hard, be disciplined and enjoy it, it
          seriously is enjoyable have fun working on them everyday have fun and
          be proud looking at ur self making progress everyday share this
          website with your loved ones and compete with them and thank you for
          using my website, Hope you have a great time and an amazing journey.
        </p>
      </div>
    </div>
  );
}

export default Tutorial;
