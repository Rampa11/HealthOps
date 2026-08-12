import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function ScheduleCalendar({ events }) {

  console.log("CALENDAR EVENTS:", events); // 🔥 debug

  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Scheduling Calendar
        </h3>

        <span className="text-sm text-green-400">
          ● Live
        </span>
      </div>

      {/* CALENDAR */}
      <div className="bg-white rounded-lg p-2" style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"

          defaultView="week"
          views={["month", "week", "day"]}

          popup
          selectable

          step={60}
          timeslots={1}

          // 🔥 BETTER EVENT STYLING
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "6px",
              border: "none",
              padding: "4px 6px",
              fontSize: "12px",
              fontWeight: "500",
            },
          })}

          // 🔥 TOOLTIP (HOVER INFO)
          tooltipAccessor={(event) =>
            `${event.title} | ${event.start.toLocaleTimeString()}`
          }

          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}

export default ScheduleCalendar;