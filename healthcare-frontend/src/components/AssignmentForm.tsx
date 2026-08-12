function AssignmentForm({ form, handleChange, handleSubmit, nurses }) {

  console.log("ASSIGNMENT FORM NURSES:", nurses); // 🔥 debug

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow mb-8 border border-gray-800">

      <h3 className="text-lg font-semibold text-white mb-4">
        Create Assignment
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >

        {/* NURSE SELECT */}
        <select
          name="nurse_id"
          value={form.nurse_id}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-700 p-2 rounded"
          required
        >
          <option value="">Select Nurse</option>

          {nurses.map((n) => (
            <option key={n.id} value={n.id}>
              {n.full_name}
            </option>
          ))}
        </select>

        {/* PATIENT NAME */}
        <input
          type="text"
          name="patient_name"
          placeholder="Patient Name"
          value={form.patient_name}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-700 p-2 rounded"
          required
        />

        {/* START TIME */}
        <input
          type="datetime-local"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-700 p-2 rounded"
          required
        />

        {/* END TIME */}
        <input
          type="datetime-local"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-700 p-2 rounded"
          required
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4"
        >
          Create
        </button>

      </form>
    </div>
  );
}

export default AssignmentForm;