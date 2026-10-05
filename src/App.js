import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Inventory from "./pages/Inventory";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import Assignments from "./pages/Assignments";
import "./App.css"
import AIAssistant from "./pages/AIAssistant";

function Layout({children}) {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="content-layout">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/assets" element={<Layout><Assets /></Layout>} />
        <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
        <Route path="/assignments" element={<Layout><Assignments /></Layout>} />
        <Route path="/tickets" element={<Layout><Tickets /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/ai" element={<Layout><AIAssistant /></Layout>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
