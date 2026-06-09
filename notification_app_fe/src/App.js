import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllNotificationsPage from "./pages/AllNotificationsPage";
import PriorityPage from "./pages/PriorityPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllNotificationsPage />} />
        <Route path="/priority" element={<PriorityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
