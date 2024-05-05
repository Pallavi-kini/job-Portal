import CompanyData from "./components/CompanyData";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import SavedItem from "./components/SavedItem";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="company" element={<CompanyData />}></Route>
        <Route path="savedItem" element={<SavedItem />}></Route>
      </Routes>
    </div>
  );
}

export default App;
