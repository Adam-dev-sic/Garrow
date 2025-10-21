import React, { useEffect, useRef, useState } from "react";
import Daily from "../components/Daily";
import Weekly from "../components/Weekly";
import Monthly from "../components/Monthly";
import Yearly from "../components/Yearly";


function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addParticle = (x, y) => {
      particles.push({ x, y, alpha: 1 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.alpha > 0);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.alpha -= 0.02;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    const handleMouseMove = (e) => addParticle(e.clientX, e.clientY);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute top-0 left-0 w-full h-full"
    />
  );
}
function Tasks() {
  const [dailyOpen, setDailyOpen] = useState(false);
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [monthlyOpen, setMonthlyOpen] = useState(false);
  const [yearlyOpen, setYearlyOpen] = useState(false);

  return (
    <div className="relative @container bg-[url('/images/wallpaperflare.com_wallpaper.jpg')] bg-cover bg-no-repeat bg-center h-screen flex flex-col space-y-10 xl:flex-row xl:space-x-150 xl:justify-center xl:items-center">
     <ParticleBackground/>
      <div className="flex space-x-10 mt-40 items-center justify-center xl:m-0 xl:mr-80">
        <button
          onClick={() => {
            setDailyOpen(!dailyOpen);
          }}
          className="task-button btn-glow"
        >
          Daily
        </button>
        <button
          className="task-button btn-glow"
          onClick={() => {
            setWeeklyOpen(!weeklyOpen);
          }}
        >
          Weekly
        </button>
      </div>
      <div className="flex space-x-10 items-center justify-center xl:m-0">
        <button
          className="task-button btn-glow"
          onClick={() => {
            setMonthlyOpen(!monthlyOpen);
          }}
        >
          Monthly
        </button>
        <button
          className="task-button btn-glow"
          onClick={() => {
            setYearlyOpen(!yearlyOpen);
          }}
        >
          Yearly
        </button>
      </div>
      {dailyOpen && (
        <div className="fixed inset-0.5 bg-black/50 flex items-center justify-center mt-10">
          <Daily dailyOpen={dailyOpen} setDailyOpen={setDailyOpen} />
        </div>
      )}
      {weeklyOpen && (
        <div className="fixed inset-0.5 bg-black/50 flex items-center justify-center mt-10">
          <Weekly weeklyOpen={weeklyOpen} setWeeklyOpen={setWeeklyOpen} />
        </div>
      )}
      {monthlyOpen && (
        <div className="fixed inset-0.5 bg-black/50 flex items-center justify-center mt-10">
          <Monthly monthlyOpen={monthlyOpen} setMonthlyOpen={setMonthlyOpen} />
        </div>
      )}{" "}
      {yearlyOpen && (
        <div className="fixed inset-0.5 bg-black/50 flex items-center justify-center mt-10">
          <Yearly yearlyOpen={yearlyOpen} setYearlyOpen={setYearlyOpen} />
        </div>
      )}
    </div>
  );
}

export default Tasks;
