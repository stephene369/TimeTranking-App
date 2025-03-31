import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StudentLayout from "./components/layout/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import TimeTracker from "./pages/student/TimeTracker";
import Tasks from "./pages/student/Tasks";
import Resources from "./pages/student/Resources";
import Settings from "./pages/student/Settings";
import "./styles/layout-fix.css";





const Empty = () => {
  return (
    <div>App</div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/student/dashboard" replace />}
        />
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* <Route path="time-tracker" element={<TimeTracker />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} /> */}

          <Route path="time-tracker" element={<Empty />} />
          <Route path="tasks" element={<Empty />} />
          <Route path="resources" element={<Empty />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

