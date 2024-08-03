import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';//main css file SH
import Landing from './components/Landing';
import Navbar from './components/Nav';
import Main from './components/Main';
import JoinCohort from './components/JoinCohort';
import Cohort from './components/Cohort';
import CreateCohort from './components/CreateCohort';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/main" element={<Main />} />
          <Route path="/create-cohort" element={<CreateCohort />} />
          <Route path="/join-cohort" element={<JoinCohort />} />
          <Route path="/cohort/:cohortName" element={<Cohort />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
