import React, { useEffect, useRef, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useMediaQuery } from "react-responsive";
import Linked from "./Linked";
import TasksForm from "./TasksForm";
import GoalsData from "./GoalsData";
import Done from "./Done";
import { handleLoadingList } from "../utils/handleLoadingList";
import { handleSavingList } from "../utils/handleSavingList";
import { handleDeteteListTask } from "../utils/handleDeteteListTask";

export default function Monthly({ monthlyOpen, setMonthlyOpen }) {
  const [goal, setGoal] = useState(true);
  const [linked, setLinked] = useState(false);
  const [progression, setProgression] = useState(false);
  const [point, setPoints] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [type, setType] = useState("monthly");
  const { userData, fetchUserData, triggerRefetch, isLoading } = useUserStore();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [listId, setList] = useState(null);
  const [listButtons, setListButtons] = useState(false);
  const listButtonsRef = useRef(null);
  const editList = userData.savedtaskslist.find((e) => e.id === Number(listId));
  const containerRef = useRef(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!overlayOpen) return;

    const el = containerRef.current;

    // wait a tick so DOM/layout has settled (ensures the element exists & is scrollable)
    requestAnimationFrame(() => {
      // If native smooth is supported, use it:
      try {
        if ("scrollBehavior" in document.documentElement.style) {
          el.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      } catch (err) {
        // some rare environments throw; fall back to JS animation below
        console.warn("native smooth scroll failed, falling back", err);
      }

      // Fallback smooth scroll (works everywhere)
      const start = el.scrollTop;
      const duration = 350;
      const startTime = performance.now();

      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.scrollTop = Math.round(start * (1 - easeInOutQuad(progress)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  }, [overlayOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        listButtonsRef.current &&
        !listButtonsRef.current.contains(event.target)
      ) {
        setListButtons(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (overlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflow = overlayOpen ? "hidden" : "auto";
    }
  }, [overlayOpen]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col w-full space-y-10 min-h-2/3 

     max-h-4/5 overflow-y-auto overflow-x-auto bg-[#020201] border-2 border-white rounded-2xl text-white absolute p-5 lg:w-[70%] lg:min-h-[80%] animate-expand-vertically"
    >
      <div className="flex w-full text-center space-x-2 justify-between">
        <button
          onClick={() => {
            setFormIsOpen(!formIsOpen),
              setEditId(null),
              setGoal(true),
              setLinked(false),
              setProgression(false),
              setPoints(false);
          }}
          className="task-button h-14 lg:!w-35"
        >
          {!formIsOpen ? <h1>New Goals</h1> : <h1>Your Goals</h1>}
        </button>
        <Done type={type} />

        <button
          onClick={() => setMonthlyOpen(!monthlyOpen)}
          className="task-button h-14 lg:!w-35"
        >
          Close
        </button>
      </div>
      <div>
        <form
          onSubmit={(e) =>
            handleSavingList({
              e,
              userData,
              type,
              listId,
            })
          }
          className="w-full flex-row-reverse space-x-reverse flex items-center justify-center space-x-3"
          action=""
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLoadingList({ userData, type, listId, fetchUserData });
              fetchUserData();
            }}
            className="next-button lg:!w-30 !w-25"
            type="button"
          >
            Load
          </button>
          <select
            className="border-2 lg:w-50 w-40 border-white p-2 text-xl font-black rounded-2xl mini-animation"
            name=""
            id=""
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue !== "none") {
                // Do something here when user selects a non-"None" option

                // Example: call a function

                setList(Number(selectedValue));
                console.log(listId);
              } else {
                setList("");
              }
            }}
          >
            <option className="font-black" value="none">
              Select List
            </option>
            <option
              className="font-black text-xl"
              value={userData.savedtaskslist[0].id}
            >
              {userData.savedtaskslist[0].name.charAt(0).toUpperCase() +
                userData.savedtaskslist[0].name.slice(1)}
            </option>
            <option
              className="font-black text-xl"
              value={userData.savedtaskslist[1].id}
            >
              {userData.savedtaskslist[1].name.charAt(0).toUpperCase() +
                userData.savedtaskslist[1].name.slice(1)}
            </option>
            <option
              className="font-black text-xl"
              value={userData.savedtaskslist[2].id}
            >
              {userData.savedtaskslist[2].name.charAt(0).toUpperCase() +
                userData.savedtaskslist[2].name.slice(1)}
            </option>
          </select>
          {/* <button className="next-button !w-35">Save</button> */}
          <div
            ref={listButtonsRef}
            onClick={() => setListButtons((prev) => !prev)}
            className="w-10 cursor-pointer  h-10"
          >
            <img
              src="/images/show-more-svgrepo-com.svg"
              className="w-full h-full mini-animation"
              alt=""
            />
            <div
              className={`absolute flex flex-col   mt-1 lg:-ml-2 h-20 bg-[#181818] w-30 border border-gray-600 rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${
                listButtons
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <button className="block px-4 py-2 text-white hover:bg-gray-600">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  if (listId) {
                    fetchUserData();
                    setOverlayOpen(true);
                  } else alert("Choose a list first");
                }}
                className="block px-4 py-2 text-white hover:bg-gray-600"
              >
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
      {overlayOpen && (
        <div
          id="overlay"
          className="fixed w-full h-full z-50 mt-auto bg-black/50 flex items-center justify-center"
          onClick={() => setOverlayOpen(false)} // optional close on outside click
        >
          <div
            className="relative lg:w-1/2 w-[80%] overflow-x-clip mr-10 h-[80%] lg:h-4/5 rounded-xl overflow-auto space-y-1 bg-[#181818] border border-white"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="w-full sticky top-0 bg-[#181818] z-50 p-3">
              <div className="flex justify-center sticky top-0 ">
                <button
                  className="next-button mt-2 ml-2 !w-40 !animate-none"
                  onClick={() => {
                    setOverlayOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
              <div className="w-full h-[1%] border-b-2 border-white-500 animate-pulse p-3"></div>
            </div>
            {editList?.savedtasks.map((item) => (
              <>
                {item.type === type ? (
                  <div
                    key={item.id}
                    className="flex w-full border-b h-35 border-white p-4 justify-between"
                  >
                    <div className="ml-auto w-[60%] overflow-auto">
                      <h1 className="underline font-black text-lg">Goal</h1>
                      <h1>{item.goal}</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 space-x-2 w-[40%]">
                      <button
                        type="button"
                        className="next-button h-12 max-md:!w-28 "
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="delete-button h-12 max-md:!w-28"
                        onClick={() => {
                          handleDeteteListTask({
                            type,
                            id: item.id,
                            fetchUserData,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}{" "}
              </>
            ))}
          </div>
        </div>
      )}

      {!formIsOpen ? (
        isMobile ? (
          <>
            <div className="flex flex-shrink-0 justify-between overflow-x-auto h-15 space-x-10 w-full border-b-2 border-b-white">
              <h1
                onClick={() => {
                  setGoal(true);
                  setLinked(false);
                  setProgression(false);
                  setPoints(false);
                }}
                className={`min-w-[30%] flex-shrink-0 text-lg ${
                  goal ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
                }`}
              >
                Goal
              </h1>
              <h1
                onClick={() => {
                  setGoal(false);
                  setLinked(true);
                  setProgression(false);
                  setPoints(false);
                }}
                className={`min-w-[30%] flex-shrink-0 text-lg ${
                  linked
                    ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                    : ""
                }`}
              >
                Linked with
              </h1>
              {/* <h1
                onClick={() => {
                  setGoal(false);
                  setLinked(false);
                  setProgression(true);
                  setPoints(false);
                }}
                className={`min-w-[30%] flex-shrink-0 text-lg ${
                  progression
                    ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                    : ""
                }`}
              >
                Progression M
              </h1>

              <h1
                onClick={() => {
                  setGoal(false);
                  setLinked(false);
                  setProgression(false);
                  setPoints(true);
                }}
                className={`min-w-[30%] flex-shrink-0 text-lg ${
                  point
                    ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                    : ""
                }`}
              >
                Points
              </h1> */}
            </div>

            <GoalsData
              isLoading={isLoading}
              userData={userData}
              isMobile={isMobile}
              goal={goal}
              progression={progression}
              point={point}
              linked={linked}
              type={type}
              editId={editId}
              setEditId={setEditId}
              formIsOpen={formIsOpen}
              setFormIsOpen={setFormIsOpen}
            />
          </>
        ) : (
          <>
            <div className="flex flex-shrink-0 justify-between overflow-x-auto h-15 space-x-10 w-full border-b-2 border-b-white">
              <h1
                onClick={() => {
                  setGoal(true);
                  setLinked(false);
                  setProgression(false);
                  setPoints(false);
                }}
                className={`min-w-[20%] flex-shrink-0 text-lg  ml-30 ${
                  goal ? "underline !text-2xl lg:!no-underline lg:!text-lg" : ""
                }`}
              >
                Goal
              </h1>

              {type != "daily" && (
                <h1
                  onClick={() => {
                    setGoal(false);
                    setLinked(true);
                    setProgression(false);
                    setPoints(false);
                  }}
                  className={`min-w-[20%] flex-shrink-0 text-lg ${
                    linked
                      ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                      : ""
                  }`}
                >
                  Progress
                </h1>
              )}
              <h1
                onClick={() => {
                  setGoal(false);
                  setLinked(false);
                  setProgression(true);
                  setPoints(false);
                }}
                className={`min-w-[20%] flex-shrink-0 text-lg ${
                  progression
                    ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                    : ""
                }`}
              >
                Progression/Points
              </h1>

              <h1
                onClick={() => {
                  setGoal(false);
                  setLinked(true);
                  setProgression(false);
                  setPoints(false);
                }}
                className={`min-w-[20%] flex-shrink-0 text-lg ${
                  linked
                    ? "underline !text-2xl lg:!no-underline lg:!text-lg"
                    : ""
                }`}
              >
                Linked with
              </h1>
            </div>

            <GoalsData
              isLoading={isLoading}
              userData={userData}
              isMobile={isMobile}
              goal={goal}
              progression={progression}
              point={point}
              linked={linked}
              type={type}
              editId={editId}
              setEditId={setEditId}
              formIsOpen={formIsOpen}
              setFormIsOpen={setFormIsOpen}
            />
          </>
        )
      ) : (
        <TasksForm
          setFormIsOpen={setFormIsOpen}
          goal={goal}
          point={point}
          linked={linked}
          progression={progression}
          type={type}
          isMobile={isMobile}
          setGoal={setGoal}
          setLinked={setLinked}
          setProgression={setProgression}
          setPoints={setPoints}
          editId={editId}
          setEditId={setEditId}
        />
      )}
    </div>
  );
}
