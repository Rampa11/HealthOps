// src/pages/PatientDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

// ── PUZZLE BANK ──────────────────────────────────────────────────
const PUZZLE_BANK = [
  // Health trivia
  { type: "trivia", q: "What vitamin is produced by the body when exposed to sunlight?", a: "d", options: ["A", "B12", "C", "D"] },
  { type: "trivia", q: "What is the normal resting heart rate for adults (beats per minute)?", a: "60-100", options: ["20-40", "40-60", "60-100", "100-140"] },
  { type: "trivia", q: "Which organ produces insulin?", a: "pancreas", options: ["Liver", "Kidney", "Pancreas", "Spleen"] },
  { type: "trivia", q: "What vitamin prevents rickets?", a: "d", options: ["A", "B6", "C", "D"] },
  { type: "trivia", q: "How many bones are in the adult human body?", a: "206", options: ["106", "156", "206", "256"] },
  { type: "trivia", q: "What is the most common blood type?", a: "o+", options: ["A+", "B+", "AB+", "O+"] },
  { type: "trivia", q: "Which mineral is essential for strong bones and teeth?", a: "calcium", options: ["Iron", "Calcium", "Zinc", "Magnesium"] },
  { type: "trivia", q: "What does the abbreviation 'BMI' stand for?", a: "body mass index", options: ["Body Mass Index", "Bone Mineral Intake", "Blood Measure Indicator", "Body Metabolism Index"] },
  // Riddles
  { type: "riddle", q: "I have a heart that doesn't beat, I have a body that doesn't sweat. I can run but have no feet. What am I?", a: "a watch", options: ["A clock", "A robot", "A watch", "A river"] },
  { type: "riddle", q: "The more you take, the more you leave behind. What am I?", a: "footsteps", options: ["Footsteps", "Time", "Money", "Air"] },
  { type: "riddle", q: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", a: "an echo", options: ["A shadow", "An echo", "A thought", "Music"] },
  { type: "riddle", q: "I have cities, but no houses live there. I have mountains, but no trees grow there. I have water, but no fish swim there. What am I?", a: "a map", options: ["A dream", "A painting", "A map", "The sky"] },
  // Math
  { type: "math", q: "A nurse works 8 hours a day, 5 days a week. How many hours does she work in 4 weeks?", a: "160", options: ["120", "140", "160", "200"] },
  { type: "math", q: "A doctor sees 12 patients in the morning and 9 in the afternoon. How many patients in total over 3 days?", a: "63", options: ["42", "56", "63", "72"] },
  { type: "math", q: "If a medication dosage is 2.5mg per kg and a patient weighs 60kg, what is the total dose?", a: "150mg", options: ["100mg", "125mg", "150mg", "175mg"] },
  { type: "math", q: "A hospital has 240 beds. If 75% are occupied, how many beds are empty?", a: "60", options: ["40", "60", "80", "100"] },
];

// Deterministic daily selection based on date
function getDailyPuzzles() {
  const today = new Date().toDateString();
  let seed = 0;
  for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);
  const idx1 = seed % PUZZLE_BANK.length;
  const idx2 = (seed + 7) % PUZZLE_BANK.length;
  return [PUZZLE_BANK[idx1], PUZZLE_BANK[idx2 === idx1 ? (idx2 + 1) % PUZZLE_BANK.length : idx2]];
}

const PUZZLE_TYPE_COLORS = {
  trivia: "bg-blue-900/40 text-blue-400 border-blue-700/40",
  riddle: "bg-purple-900/40 text-purple-400 border-purple-700/40",
  math: "bg-teal-900/40 text-teal-400 border-teal-700/40",
};

const SPECIALIZATIONS = [
  "General Practice", "Internal Medicine", "Pediatrics",
  "Obstetrics & Gynecology", "Surgery — General", "Surgery — Orthopedic",
  "Cardiology", "Neurology", "Dermatology", "Psychiatry",
  "Ophthalmology", "ENT (Otolaryngology)", "Radiology",
  "Anesthesiology", "Oncology", "Emergency Medicine",
  "Urology", "Nephrology", "Endocrinology", "Pulmonology",
  "Gastroenterology", "Pathology",
];

// ── GAMIFICATION HELPERS ──────────────────────────────────────────
function loadGameState() {
  try {
    const saved = localStorage.getItem("patient_game_state");
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    streak: 0,
    totalCorrect: 0,
    points: 0,
    lastPlayed: null,
    todayAnswered: [false, false],
    todayCorrect: [false, false],
    attempts: [0, 0],
  };
}

function saveGameState(state) {
  localStorage.setItem("patient_game_state", JSON.stringify(state));
}

function calcPoints(totalCorrect) {
  return Math.min(10, Math.floor(totalCorrect / 5) * 0.5);
}

// ── PUZZLE WIDGET ─────────────────────────────────────────────────
function PuzzleWidget({ puzzle, index, gameState, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const answered = gameState.todayAnswered[index];
  const correct = gameState.todayCorrect[index];
  const attemptsLeft = 2 - (gameState.attempts[index] || 0);

  const handleSelect = (option) => {
    if (answered || attemptsLeft <= 0) return;
    setSelected(option);
    const isCorrect = option.toLowerCase() === puzzle.a.toLowerCase();
    if (isCorrect || attemptsLeft === 1) {
      setRevealed(true);
      onAnswer(index, isCorrect);
    } else {
      // Wrong but has another attempt
      onAnswer(index, false, true);
    }
  };

  return (
    <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border capitalize ${PUZZLE_TYPE_COLORS[puzzle.type]}`}>
          {puzzle.type === "trivia" ? "🏥 Health Trivia" : puzzle.type === "riddle" ? "🧩 Riddle" : "🔢 Math"}
        </span>
        <span className={`text-xs ${attemptsLeft > 0 && !answered ? "text-yellow-400" : "text-gray-600"}`}>
          {answered ? (correct ? "✓ Correct" : "✗ Incorrect") : `${attemptsLeft} attempt${attemptsLeft !== 1 ? "s" : ""} left`}
        </span>
      </div>

      <p className="text-white text-sm font-medium mb-4 leading-relaxed">{puzzle.q}</p>

      <div className="grid grid-cols-2 gap-2">
        {puzzle.options.map((option) => {
          const isCorrectOption = option.toLowerCase() === puzzle.a.toLowerCase();
          let btnClass = "text-sm p-2.5 rounded-lg border text-left transition-all ";

          if (revealed || answered) {
            if (isCorrectOption) {
              btnClass += "bg-green-900/40 text-green-400 border-green-700/40";
            } else if (selected?.toLowerCase() === option.toLowerCase()) {
              btnClass += "bg-red-900/40 text-red-400 border-red-700/40";
            } else {
              btnClass += "bg-[#060f1e] text-gray-600 border-[#1e3a5f]";
            }
          } else {
            btnClass += "bg-[#060f1e] text-gray-300 border-[#1e3a5f] hover:border-teal-600 hover:text-white cursor-pointer";
          }

          return (
            <button key={option} onClick={() => handleSelect(option)} className={btnClass}
              disabled={answered || revealed}>
              {option}
            </button>
          );
        })}
      </div>

      {(revealed || answered) && (
        <p className={`text-xs mt-3 font-medium ${correct ? "text-green-400" : "text-red-400"}`}>
          {correct
            ? "🎉 Correct! +1 streak point"
            : `The correct answer was: ${puzzle.options.find(o => o.toLowerCase() === puzzle.a.toLowerCase())}`}
        </p>
      )}
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────
function PatientDashboard({ setPatientToken }) {
  const navigate = useNavigate();
  const patientName = localStorage.getItem("patient_name") || "Patient";
  const token = localStorage.getItem("patient_token");

  const [gameState, setGameState] = useState(loadGameState());
  const [dailyPuzzles] = useState(getDailyPuzzles());

  const [selectedSpec, setSelectedSpec] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [requestingDoctor, setRequestingDoctor] = useState(null);
  const [requestNote, setRequestNote] = useState("");
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const [consultations, setConsultations] = useState([]);

  const points = calcPoints(gameState.totalCorrect);
  const discount = points;
  const progressToNext = ((gameState.totalCorrect % 5) / 5) * 100;

  // Check if already played today
  const today = new Date().toDateString();
  const playedToday = gameState.lastPlayed === today;
  const currentGameState = playedToday ? gameState : {
    ...gameState,
    todayAnswered: [false, false],
    todayCorrect: [false, false],
    attempts: [0, 0],
  };

  const handleAnswer = (index, isCorrect, partialWrong = false) => {
    const newState = { ...currentGameState };
    newState.lastPlayed = today;

    if (partialWrong) {
      newState.attempts = [...newState.attempts];
      newState.attempts[index] = (newState.attempts[index] || 0) + 1;
    } else {
      newState.todayAnswered = [...newState.todayAnswered];
      newState.todayAnswered[index] = true;
      newState.todayCorrect = [...newState.todayCorrect];
      newState.todayCorrect[index] = isCorrect;
      newState.attempts = [...newState.attempts];
      newState.attempts[index] = (newState.attempts[index] || 0) + 1;

      if (isCorrect) {
        newState.streak = (newState.streak || 0) + 1;
        newState.totalCorrect = (newState.totalCorrect || 0) + 1;
      }
      newState.points = calcPoints(newState.totalCorrect);
    }

    setGameState(newState);
    saveGameState(newState);
  };

  const fetchDoctors = async (spec) => {
    try {
      setLoadingDoctors(true);
      setDoctors([]);
      const res = await api.get("/patients/doctors/by-specialization", {
        params: { specialization: spec },
      });
      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ DOCTOR FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    if (selectedSpec) fetchDoctors(selectedSpec);
  }, [selectedSpec]);

  const handleRequestConsultation = async (doctorId) => {
    try {
      setRequestSubmitting(true);
      await api.post("/patients/consultation-request",
        { specialization: selectedSpec, notes: requestNote, doctor_id: doctorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequestSuccess(true);
      setRequestingDoctor(null);
      setRequestNote("");
      setTimeout(() => setRequestSuccess(false), 4000);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to submit request ❌");
    } finally {
      setRequestSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("patient_token");
    localStorage.removeItem("patient_name");
    localStorage.removeItem("patient_id");
    setPatientToken(null);
    navigate("/patient-login");
  };

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      {/* TOP NAV */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#060f1e]/95 backdrop-blur-sm border-b border-[#1e3a5f]">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">H</div>
            <div>
              <span className="text-white font-bold text-lg leading-none">HealthOps</span>
              <p className="text-[10px] text-teal-500 tracking-widest uppercase leading-none mt-0.5">Patient Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">👋 {patientName}</span>
            <span className="text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-700/30 px-3 py-1 rounded-full">
              🔥 {gameState.streak} streak
            </span>
            <button onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-white border border-[#1e3a5f] hover:border-red-800 hover:bg-red-950/40 px-4 py-1.5 rounded-lg transition">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="border-b border-[#1e3a5f] pb-8">
          <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Patient Dashboard</p>
          <h1 className="text-4xl font-bold text-white">Welcome, {patientName.split(" ")[0]} 👋</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* LOYALTY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: "Loyalty Points", value: `${points}/10`, color: "text-yellow-400", icon: "⭐", bg: "bg-yellow-900/20 border-yellow-700/30" },
            { label: "Current Streak", value: gameState.streak, color: "text-orange-400", icon: "🔥", bg: "bg-orange-900/20 border-orange-700/30" },
            { label: "Total Correct", value: gameState.totalCorrect, color: "text-teal-400", icon: "✓", bg: "bg-teal-900/20 border-teal-700/30" },
            { label: "Discount Earned", value: `${discount}%`, color: "text-green-400", icon: "🎁", bg: "bg-green-900/20 border-green-700/30" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border rounded-xl p-4`}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* POINTS PROGRESS */}
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white font-semibold">Progress to Next Point</h2>
              <p className="text-gray-500 text-sm">
                {gameState.totalCorrect % 5} of 5 correct answers to earn 0.5 points
              </p>
            </div>
            <span className="text-yellow-400 font-bold text-lg">{points} pts</span>
          </div>
          <div className="w-full bg-[#0d1f3c] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-3 rounded-full transition-all duration-700"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1.5">
            <span>{gameState.totalCorrect % 5}/5 correct answers</span>
            <span>10 pts = 10% discount on consultation</span>
          </div>
        </div>

        {/* DAILY PUZZLES */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">
                Daily Challenges
              </h2>
              <p className="text-gray-600 text-xs mt-0.5">2 puzzles per day • 2 attempts each • Resets at midnight</p>
            </div>
            {currentGameState.todayAnswered.every(Boolean) && (
              <span className="text-xs text-green-400 bg-green-900/20 border border-green-700/30 px-3 py-1 rounded-full">
                ✓ All done for today
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dailyPuzzles.map((puzzle, i) => (
              <PuzzleWidget
                key={i}
                puzzle={puzzle}
                index={i}
                gameState={currentGameState}
                onAnswer={handleAnswer}
              />
            ))}
          </div>
        </div>

        {/* FIND A DOCTOR */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
            Find a Doctor
          </h2>

          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">Select a Specialization</h3>
            <p className="text-gray-500 text-sm mb-4">
              Choose the type of doctor you need. We'll show you available physicians and notify both admin and the doctor when you make a request.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
              {SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                    selectedSpec === spec
                      ? "bg-teal-900/60 text-teal-300 border-teal-700"
                      : "bg-[#060f1e] text-gray-400 border-[#1e3a5f] hover:border-teal-800 hover:text-gray-200"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Doctor results */}
            {selectedSpec && (
              <div>
                <div className="flex items-center gap-2 mb-4 pt-4 border-t border-[#1e3a5f]">
                  <h4 className="text-sm font-semibold text-white">
                    {selectedSpec} Physicians
                  </h4>
                  {loadingDoctors && (
                    <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                  )}
                </div>

                {!loadingDoctors && doctors.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-[#1e3a5f] rounded-xl">
                    <p className="text-gray-500 text-sm">No {selectedSpec} doctors registered yet.</p>
                    <p className="text-gray-600 text-xs mt-1">Please contact the clinic directly.</p>
                  </div>
                )}

                {requestSuccess && (
                  <div className="mb-4 bg-green-900/30 border border-green-700/40 rounded-xl px-4 py-3 text-green-400 text-sm">
                    ✓ Consultation request submitted! Admin and the doctor have been notified.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((d) => (
                    <div key={d.id} className="bg-[#060f1e] border border-[#1e3a5f] rounded-xl p-4 hover:border-teal-800 transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {d.full_name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Dr. {d.full_name}</p>
                          <p className="text-gray-500 text-xs">{d.years_experience} yrs experience</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-indigo-400 bg-indigo-900/30 border border-indigo-800/40 px-2 py-0.5 rounded-full">
                          {d.specialization}
                        </span>
                        <span className="text-sm text-white font-semibold">
                          ₦{(d.consultation_fee || 0).toLocaleString()}
                          {discount > 0 && (
                            <span className="text-green-400 text-xs ml-1">(-{discount}%)</span>
                          )}
                        </span>
                      </div>

                      {requestingDoctor === d.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={requestNote}
                            onChange={(e) => setRequestNote(e.target.value)}
                            placeholder="Briefly describe your symptoms or reason for visit..."
                            rows={2}
                            className="w-full bg-[#0a1628] text-white border border-[#1e3a5f] p-2 rounded-lg text-xs resize-none focus:outline-none focus:border-teal-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRequestConsultation(d.id)}
                              disabled={requestSubmitting}
                              className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white py-1.5 rounded-lg text-xs font-medium transition"
                            >
                              {requestSubmitting ? "Sending..." : "Submit Request"}
                            </button>
                            <button
                              onClick={() => setRequestingDoctor(null)}
                              className="px-3 py-1.5 border border-[#1e3a5f] text-gray-400 rounded-lg text-xs hover:text-white transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setRequestingDoctor(d.id)}
                          className="w-full bg-[#0d1f3c] hover:bg-teal-900/30 border border-[#1e3a5f] hover:border-teal-700 text-gray-300 hover:text-white py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          Request Consultation
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "The greatest medicine of all is to teach people how not to need it."
          </p>
          <p className="text-gray-700 text-xs mt-2">— Hippocrates</p>
        </div>

      </div>
    </div>
  );
}

export default PatientDashboard;
