// src/components/Achievements.jsx
import React, { useState, useEffect, useRef } from "react";

function Achievements({ userData }) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const containerRef = useRef(null);

  const difficultyColors = {
    easy: "text-green-400",
    medium: "text-blue-400",
    hard: "text-orange-400",
    extreme: "text-red-500",
    challenging: "text-purple-400",
    champion: "text-yellow-400",
    unobtainable:
      "text-red-600 [text-shadow:0_0_8px_#ff0000,0_0_12px_#ff0000,0_0_16px_#ff0000]",
    special:
      "text-pink-400 font-medium tracking-wide drop-shadow-[0_0_8px_rgba(255,192,203,0.8)]",
  };

  const imageMap = {
    easy: "easyachievement.png",
    medium: "mediumachievement.png",
    hard: "hardachievement.png",
    extreme: "extremeachievement.png",
    challenging: "challengingachievement.png",
    champion: "championachievement.jpg",
    unobtainable:
      "HD-wallpaper-alucard-death-hellsing-smile-gun-darkness-anime-dark-vampire.jpg",
    special: "specialachiev.jpg",
  };

  // disable body scroll when modal open
  // useEffect(() => {
  //   if (selectedAchievement) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [selectedAchievement]);
  const waitForScrollTop = (
    el,
    targetTop = 0,
    { tolerance = 1, timeout = 1200 } = {}
  ) => {
    if (!el) return Promise.resolve();
    return new Promise((resolve) => {
      const start = performance.now();
      let rafId;

      const check = () => {
        // If within tolerance, resolve
        if (Math.abs(el.scrollTop - targetTop) <= tolerance) {
          cancel();
          resolve();
          return;
        }
        // Timeout fallback
        if (performance.now() - start >= timeout) {
          cancel();
          resolve();
          return;
        }
        rafId = requestAnimationFrame(check);
      };

      const cancel = () => {
        if (rafId) cancelAnimationFrame(rafId);
      };

      check();
    });
  };

  // Async handler: scroll first, wait for it to finish, then lock scrolling.
  const handleShowMore = async (achievement) => {
    setSelectedAchievement(achievement);

    const el = containerRef.current;
    if (!el) return;

    // start smooth scroll to top
    el.scrollTo({ top: 0, behavior: "smooth" });

    // wait until scroll reaches top (or timeout)
    await waitForScrollTop(el, 0, { tolerance: 2, timeout: 1000 });

    // now disable container scrolling so modal can't be scrolled under
    // (only after scroll has completed/settled)
    el.style.overflow = "hidden";

    // Optionally also lock body to be safe (uncomment if desired)
    // document.body.style.overflow = "hidden";
  };

  // Re-enable scrolling when modal closes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!selectedAchievement) {
      // modal closed — re-enable
      el.style.overflow = "auto";
      document.body.style.overflow = ""; // in case you enabled body lock elsewhere
    }

    // no cleanup needed here
  }, [selectedAchievement]);
  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col w-[95%] space-y-10 min-h-2/3 max-h-4/5 overflow-y-auto bg-[#020201] border-2 border-white rounded-2xl text-white absolute p-5 lg:w-[60%] lg:min-h-[60%] animate-expand-vertically"
    >
      <h1 className="text-3xl font-bold text-center mb-4">Achievements</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData?.userAchievements?.map((achievement, idx) => {
          const difficulty = achievement.difficulty?.toLowerCase();
          const color = difficultyColors[difficulty] || "text-gray-300";
          const imageSrc =
            `/images/${imageMap[difficulty]}` || "easyachievement.png";

          return (
            <div
              key={idx}
              className="bg-[#111] border border-gray-700 rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={imageSrc}
                alt={achievement.title}
                className="w-42 h-42 object-contain mb-4 "
              />
              <h2 className="text-xl font-semibold">{achievement.title}</h2>
              <p className={`capitalize mt-2 ${color}`}>
                {achievement.difficulty}
              </p>
              <button
                onClick={() => handleShowMore(achievement)}
                className="mt-4 bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Show More
              </button>
            </div>
          );
        })}
      </div>

      {selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111] border border-gray-600 rounded-2xl p-6 max-w-lg w-full text-center relative">
            <img
              src={`/images/${
                imageMap[selectedAchievement.difficulty?.toLowerCase()]
              }`}
              alt={selectedAchievement.title}
              className="w-40 h-40 object-contain mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{selectedAchievement.title}</h2>
            <p
              className={`capitalize mt-2 ${
                difficultyColors[selectedAchievement.difficulty?.toLowerCase()]
              }`}
            >
              {selectedAchievement.difficulty}
            </p>
            <p className="mt-4 text-gray-300">
              {selectedAchievement.description}
            </p>
            <button
              onClick={() => setSelectedAchievement(null)}
              className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Achievements;
