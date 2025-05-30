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
      <Navbar />
      <Timer />
      <h1 className="flex justify-center">{title}</h1>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-lg shadow-lg">
          <div className="bg-gray-700 p-6 rounded-md w-200 text-white">
            {problemData ? (
              <>
                <h2 className="text-xl font-bold mb-2">{problemData.Title}</h2>
                <p className="italic mb-2">Difficulty: {problemData.Difficulty}</p>
                <p className="mb-4">{problemData.Description}</p>
                <p><strong>Testcase:</strong> {problemData.Testcase}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="bg-gray-600 p-6 rounded-md w-100 text-center text-white">
            {/* Optional problem editor or code runner */}
            Code Panel Here
            <Codearena/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler_LCS;
