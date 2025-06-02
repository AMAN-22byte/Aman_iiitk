import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Timer from "../Stopwatch/Timer";
import Codearena from "../Codearena/Codearena";

const Compiler_LCS = () => {
  const { title } = useParams();
  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/problems/${title}`); // Or /api/problems/${title}
        setProblemData(res.data);
      } catch (err) {
        console.error("Failed to fetch problem:", err);
      }
    };

    fetchProblem();
  }, [title]);

  return (
    <>
     <div className="min-h-screen bg-gray-100">
  <Navbar />
  <div className="flex h-screen">
    {/* Problem Description Panel */}
    <div className="w-full md:w-2/5 bg-white p-6 border-r overflow-y-auto">
      {problemData ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{problemData.Title}</h2>
          <p className="text-sm text-gray-500 italic mb-2">Difficulty: {problemData.Difficulty}</p>
          <p className="text-gray-700 mb-6">{problemData.Description}</p>
          <p className="text-sm text-gray-800"><strong>Testcase:</strong> {problemData.Testcase}</p>
        </>
      ) : (
        <p className="text-gray-600">Loading problem...</p>
      )}
    </div>

    {/* Codearena Panel */}
    <div className="w-full md:w-3/5 p-6 bg-gray-50 overflow-y-auto">
      <Codearena />
    </div>
  </div>
</div>

    </>
  );
};

export default Compiler_LCS;
