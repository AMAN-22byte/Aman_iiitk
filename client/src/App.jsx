import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
// import calendar from "./components/ui/calendar";
import LoginPage from "./components/Loginkaro";
import RegisterPage from "./components/SignUp";
import Compiler_LCS from "./components/Problems/Compiler_LCS";
import SetProblem from "./components/Problems/SetProblem";
import Home from "./Pages/Home";
import Basecontest from "./components/Contest/Basecontest";
import Setcontest from "./components/Contest/SetContest";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/LCS" element={<Compiler_LCS/>} />
          <Route path="/set" element={<SetProblem/>}/>
          <Route path="/contest" element={<Basecontest/>}/>
          <Route path="/contestset" element={<Setcontest/>}/>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navbar/>
               <Home/>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
