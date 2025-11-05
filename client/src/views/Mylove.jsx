import React, { useEffect } from "react";

function Mylove() {
  useEffect(() => {
    const rain = () => {
      const heart = document.querySelector(".heart");
      const e = document.createElement("div");
      e.classList.add("drop");
      heart.appendChild(e);
      const left = Math.floor(Math.random() * 300);
      const duration = Math.random() * 0.5;
      e.style.left = left + "px";
      e.style.animationDuration = 1 + duration + "s";

      setTimeout(() => {
        heart.removeChild(e);
      }, 5000);
    };

    const interval = setInterval(rain, 50);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  return (
    <div className="flex justify-center items-center min-h-[100vh] w-full bg-[radial-gradient(#4c0c0c,#000)] overflow-hidden ">
      <div id="" className="lilypage">
        <div className="heart"></div>
        <div className="absolute z-[100000000]  mt-7 text-center">
          <h1
            class="text-2xl font-semibold  text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] 
             animate-softGlow"
          >
            My beautfiul princess lily <br /> I love you so much{" "}
          </h1>
        </div>
      </div>
      <div class="absolute bottom-15 z-[100000000] mt-7 text-center">
        <h1 class="text-3xl font-[Great_Vibes] text-pink-400 font-medium tracking-wide drop-shadow-[0_0_8px_rgba(255,192,203,0.8)] animate-romanticGlow">
          I love you so much my baby <br /> You're mine forever :p
        </h1>
      </div>
    </div>
  );
}

export default Mylove;
