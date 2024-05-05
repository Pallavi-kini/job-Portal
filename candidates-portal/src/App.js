import { MenuItem } from "@mui/material";
import "./App.css";
import CompanyData from "./components/CompanyData";
import Dashboard from "./components/Dashboard";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SavedItem from "./components/SavedItem";

function App() {
  return (
    <div className="App">
      {/* <Menubar></Menubar> */}
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="company" element={<CompanyData />}></Route>
        <Route path="savedItem" element={<SavedItem />}></Route>
      </Routes>
    </div>
  );
}

export default App;
