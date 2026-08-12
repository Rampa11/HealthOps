function NurseCards({ nurses }) {

  console.log("NURSE CARDS:", nurses); // 🔥 debug

  return (
    <div className="mt-8">

      <h3 className="text-lg font-semibold text-white mb-4">
        Nurses
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {Array.from(new Map(nurses.map(n => [n.id, n])).values()).map((n) => (
          <div
            key={n.id}
            className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* HEADER */}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {n.full_name?.charAt(0)}
              </div>

              <div className="ml-3">
                <h4 className="text-white font-semibold">
                  {n.full_name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {n.specialization}
                </p>
              </div>
            </div>

            {/* STATUS */}
            <div className="flex justify-between items-center text-sm">

              <span className="text-gray-400">
                Status
              </span>

              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">
                Active
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default NurseCards;