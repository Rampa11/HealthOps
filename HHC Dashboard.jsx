import { useEffect, useState } from "react";
import axios from "axios";

// COMPONENTS
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import AssignmentForm from "./components/AssignmentForm";
import NurseCards from "./components/NurseCards";
import ScheduleCalendar from "./components/ScheduleCalendar";
import TopNav from "./components/TopNav";
import TodayAssignments from "./components/TodayAssignments";

function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState("");

  const [form, setForm] = useState({
    nurse_id: "",
    patient_name: "",
    start_time: "",
    end_time: "",
  });

  const token = localStorage.getItem("token");



  // ================= FETCH =================

const fetchAssignments = async () => {
  try {
    const freshToken = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:8000/assignments/",
      {
        headers: {
          Authorization: `Bearer ${freshToken}`,
        },
      }
    );

    console.log("FETCH ASSIGNMENTS SUCCESS:", res.data);

    setAssignments(res.data);
  } catch (err) {
    console.log("❌ ASSIGNMENT ERROR FULL:", err);
    console.log("❌ RESPONSE:", err.response);
    console.log("❌ DATA:", err.response?.data);
  }
};

const fetchNurses = async () => {
  try {
    const freshToken = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:8000/nurses/",
      {
        headers: {
          Authorization: `Bearer ${freshToken}`,
        },
      }
    );

    console.log("FETCH NURSES SUCCESS:", res.data);

    setNurses(res.data);
  } catch (err) {
    console.log("❌ NURSE ERROR FULL:", err);
    console.log("❌ RESPONSE:", err.response);
    console.log("❌ DATA:", err.response?.data);
  }
};

  useEffect(() => {
    fetchAssignments();
    fetchNurses();
  }, []);

  // ================= FORM =================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/assignments/",
        {
          ...form,
          start_time: new Date(form.start_time).toISOString(),
          end_time: new Date(form.end_time).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Assignment created ✅");

      setForm({
        nurse_id: "",
        patient_name: "",
        start_time: "",
        end_time: "",
      });

      fetchAssignments();
    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data);
      console.log("❌ RESPONSE:", err.response);
      console.log("❌ DATA:", err.response?.data);
    }
  };

  // ================= DATA =================

  const filteredAssignments = assignments.filter((a) =>
    selectedNurse ? a.nurse_id === selectedNurse : true
  );

  const events = filteredAssignments.map((a) => ({
    id: a.id,
    title: `${a.patient_name} • ${a.nurse_name || "Nurse"}`,
    start: new Date(a.start_time),
    end: new Date(a.end_time),
  }));

  console.log("NURSES STATE:", nurses);
  console.log("TOKEN:", token);
  console.log("ASSIGNMENTS STATE:", assignments);

  // ================= UI =================

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-8 pb-10">

        <TopNav />

        
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold text-white">
            
              Healthcare Workforce Operations
            </h1>
            <p className="text-gray-400">
              Manage nurse scheduling, assignments and operations
            </p>
                   
        </div>

          
          {/* STATS */}
        <div className="relative z-10 mt-6">
          <StatsCards
            assignments={assignments}
            nurses={nurses}            
          />
          </div>

          {/* FORM */}
          <AssignmentForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            nurses={nurses}
          />

          {/* FILTER */}
          <div className="mb-6 text-left">
            <label className="block text-sm text-gray-400 mb-2">
              Filter by Nurse
            </label>

            <select
              value={selectedNurse}
              onChange={(e) => setSelectedNurse(e.target.value)}
              className="border p-2 rounded w-64 bg-gray-800 text-white"
            >
              <option value="">All Nurses</option>
              {nurses.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="col-span-2">
              <ScheduleCalendar events={events} />
            </div>

            {/* RIGHT */}
            <div>
              <TodayAssignments assignments={assignments} />
            </div>

          </div>

          {/* NURSE CARDS */}
          
          <NurseCards nurses={nurses} />
        </div>
       </div>
      
      </div>

        
  );
}

export default Dashboard;