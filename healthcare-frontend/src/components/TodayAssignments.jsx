import moment from "moment";

function TodayAssignments({ assignments }) {

  const now = moment();

  // 🔥 TODAY RANGE
  const startOfDay = moment().startOf("day");
  const endOfDay = moment().endOf("day");

  // 🔥 FILTER TODAY
  const todaysAssignments = assignments.filter((a) => {
    const start = moment(a.start_time);
    return start.isBetween(startOfDay, endOfDay, null, "[]");
  });

  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Today’s Operations
        </h3>

        <span className="text-sm text-gray-400">
          {todaysAssignments.length} shifts
        </span>
      </div>

      {/* EMPTY STATE */}
      {todaysAssignments.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No assignments scheduled today
        </p>
      ) : (
        <div className="space-y-3">

          {todaysAssignments.map((a) => {
            const start = moment(a.start_time);
            const end = moment(a.end_time);

            const isActive = now.isBetween(start, end);
            const isUpcoming = now.isBefore(start);

            return (
              <div
                key={a.id}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
              >

                {/* LEFT */}
                <div>
                  <p className="text-white font-medium">
                    {a.patient_name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {a.nurse_name || "Assigned"}
                  </p>

                  {/* STATUS */}
                  <div className="mt-1 text-xs">
                    {isActive && (
                      <span className="text-green-400">
                        ● In Progress
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="text-yellow-400">
                        ● Upcoming
                      </span>
                    )}
                    {!isActive && !isUpcoming && (
                      <span className="text-gray-500">
                        ● Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="text-sm text-white font-semibold">
                    {start.format("HH:mm")} - {end.format("HH:mm")}
                  </p>

                  <p className="text-xs text-gray-400">
                    {start.fromNow()}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default TodayAssignments;