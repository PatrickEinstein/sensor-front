import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sensor from "./pages/Sensor";
import Dashboard from "./pages/DashBoard";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/" element={<Sensor />} />
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
        </Route>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
