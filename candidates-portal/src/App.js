import { MenuItem } from "@mui/material";
import "./App.css";
import CompanyData from "./components/CompanyData";
import Dashboard from "./components/Dashboard";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Menubar from "./components/Menubar";

function App() {
  return (
    <div className="App">
      {/* <Menubar></Menubar> */}
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="company" element={<CompanyData />}></Route>
      </Routes>
    </div>
  );
}

export default App;
