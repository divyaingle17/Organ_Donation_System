import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import DonorsPage from "./pages/DonorsPage";
import RecipientsPage from "./pages/RecipientsPage";
import AdminLogin from "./pages/AdminLogin";
import HospitalsPage from "./pages/HospitalsPage";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import OrganRequestForm from "./components/OrganRequestForm";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donors" element={<DonorsPage />} />
        <Route path="/recipients" element={<RecipientsPage />} />
        <Route path="/request-organ" element={<OrganRequestForm />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
