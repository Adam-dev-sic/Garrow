import React from "react";

function GoalsData({
  isLoading,
  userData,
  isMobile,
  goal,
  progression,
  point,
  linked,
  type,
}) {
  const iterationKey =
    type === "daily"
      ? "dailies"
      : type === "weekly"
      ? "weeklies"
      : type === "monthly"
      ? "monthlies"
      : "yearlies";

  const iterationValue = userData[iterationKey] || [];
  const progressKey =
    type === "daily"
      ? "weeklyProgress"
      : type === "weekly"
      ? "monthlyProgress"
      : type === "monthly"
      ? "yearlyProgress"
      : "";
        const progressText =
    type === "daily"
      ? "Weekly Progress is"
      : type === "weekly"
      ? "Monthly Progress is"
      : type === "monthly"
      ? "Yearly Progress is"
      : "";

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">Fetching Data...</div>
      ) : !isMobile ? (
        <>
          {iterationValue.map((goalType) => {
            let linkedDaily, linkedWeekly, linkedMonthly, linkedYearly;
            if (type === "daily") {
              linkedWeekly = userData.weeklies.find(
                (w) => w.id === goalType.weeklyId
              );
              linkedMonthly = userData.monthlies.find(
                (m) => m.id === goalType.monthlyId
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.id === goalType.yearlyId
              );
            } else if (type === "weekly") {
              linkedDaily = goalType.dailies.map((connectedDailies) => {
                return connectedDailies.goal;
              });
              linkedMonthly = userData.monthlies.find(
                (m) => m.id === goalType.monthlyId
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.id === goalType.yearlyId
              );
            } else if (type === "monthly") {
              linkedYearly = userData.yearlies.find(
                (y) => y.id === goalType.yearlyId
              );
            }

            return (
              <div
                key={goalType.id}
                className="flex rounded-lg p-5 bg-[#181818] items-start overflow-x-auto flex-shrink-0  overflow-y-visible font-bold h-30 space-x-10 w-full border-b-white"
              >
                <div className="flex-shrink-0 mt-[2.5%] w-[33.33%]">
                  <h1>{goalType.goal}</h1>
                </div>
                <div className="flex-shrink-0 w-[33.33%] mt-0 overflow-y-auto">
                  <h1>
                    {linkedDaily ? linkedDaily : "No dailies"}
                    {linkedWeekly ? linkedWeekly.goal : "No weekly linked"}
                    <br />
                    {linkedMonthly ? linkedMonthly.goal : "No monthly linked"}
                    <br />
                    {linkedYearly ? linkedYearly.goal : "No yearly linked"}
                  </h1>
                </div>
                <div className="flex-shrink-0 mt-[2.5%] w-[33.33%]">
                  <h1>Weekly progress will be: {goalType.weeklyProgress}%</h1>
                </div>
                <div className="flex-shrink-0 mt-[2.5%] w-[33.33%]">
                  <h1>Points: {goalType.points}</h1>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {iterationValue.map((goalType) => {
            let linkedDaily, linkedWeekly, linkedMonthly, linkedYearly;

            if (type === "daily") {
              linkedWeekly = userData.weeklies.find(
                (w) => w.id === goalType.weeklyId
              );
              linkedMonthly = userData.monthlies.find(
                (m) => m.id === goalType.monthlyId
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.id === goalType.yearlyId
              );
            } else if (type === "weekly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.id || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedMonthly = userData.monthlies.find(
                (m) => m.id === goalType.monthlyId
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.id === goalType.yearlyId
              );
            } else if (type === "monthly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.id || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedWeekly = goalType.weeklies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.id || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
              linkedYearly = userData.yearlies.find(
                (y) => y.id === goalType.yearlyId
              );
            } else if (type === "yearly") {
              linkedDaily = goalType.dailies.map((connectedDailies, index) => (
                <React.Fragment key={connectedDailies.id || index}>
                  {connectedDailies.goal}
                  <br />
                </React.Fragment>
              ));
              linkedWeekly = goalType.weeklies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.id || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
              linkedMonthly = goalType.monthlies.map(
                (connectedDailies, index) => (
                  <React.Fragment key={connectedDailies.id || index}>
                    {connectedDailies.goal}
                    <br />
                  </React.Fragment>
                )
              );
            }
            return (
              <div
                key={goalType.id}
                className="flex rounded-lg flex-shrink-0 p-5 bg-[#181818] items-start overflow-x-auto overflow-y-visible font-bold h-30 space-x-10 w-full border-b-white"
              >
                {goal ? (
                  <div className="flex-shrink-0 mt-[3%] w-full">
                    <h1>{goalType.goal}</h1>
                  </div>
                ) : linked ? (
                  <div className="flex-shrink-0 w-full mt-0 overflow-y-auto">
                    <h1>
                      {type != "daily" ? (
                        linkedDaily ? (
                          <>
                            {" "}
                            {linkedDaily} <br />
                          </>
                        ) : (
                          "No linked dailies"
                        )
                      ) : (
                        ""
                      )}

                      {type === "monthly" || type === "yearly"
                        ? linkedWeekly != ""
                          ? linkedWeekly
                          : "no weekly included"
                        : linkedWeekly
                        ? linkedWeekly.goal
                        : "No weekly linked"}

                      <br />
                      {type === "yearly"
                        ? linkedMonthly != ""
                          ? linkedMonthly
                          : "No Monthly linked"
                        : linkedMonthly
                        ? linkedMonthly.goal
                        : "No Monthly goals"}
                      <br />
                      <br />
                      {type != "yearly"
                        ? linkedYearly
                          ? linkedYearly.goal
                          : "No Yearly linked"
                        : null}
                    </h1>
                  </div>
                ) : progression ? (
                  <div className="flex-shrink-0 mt-[3%] w-full">
                    <h1>
                      {progressText}:    {goalType[progressKey] ?? 0}%
                    </h1>
                  </div>
                ) : point ? (
                  <div className="flex-shrink-0 mt-[3%] w-full">
                    <h1>Points: {goalType.points}</h1>
                  </div>
                ) : null}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default GoalsData;
