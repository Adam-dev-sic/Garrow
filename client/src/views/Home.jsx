import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="@container animate-fade-in bg-[url('/images/berserk.jpg')] relative overflow-hidden bg-cover bg-no-repeat bg-center space-y-10 h-screen flex text-white flex-col items-center justify-center  max-md:bg-cover obect-fit ">
        <h1 className="berserk-h1 text-4xl text-center  font-black">
          Take actions and your goals are yours
        </h1>
        <p className="p-5 space-y-10 text-center font-bold text-lg berserk-p">
          Every dream starts with a single step. <br />
          Set your goals, commit to the grind, and move forward — one action at
          a time. <br />
          The results come to those who stay consistent, not perfect. <br />
        </p>
        <Link
          className="berserk-button items-center justify-center rounded-full w-40 h-13 text-center text-lg text-white  flex"
          to={"/goals"}
        >
          Get Started{" "}
        </Link>
        <img
          className="absolute w-70 h-70 -bottom-10 -right-15 lg:-right-25 lg:w-130 lg:h-130"
          src="images/sword-of-the-berserk-guts-rage-casca-manga-mothman.png"
          alt=""
        />
      </div>
    </>
  );
}

export default Home;
