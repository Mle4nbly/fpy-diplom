import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AuthPage } from "./pages/AuthPage";
import { RegPage } from "./pages/RegPage";

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="/auth/reg" element={<RegPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App
