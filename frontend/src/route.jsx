import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./pages/patient/dashboard";
import Home from "./pages/home";
import ConsultantPage from "./pages/patient/consultantPage";
import PatientSignup from "./pages/patient/signup";
import PatientSignin from "./pages/patient/signin";
import Signup from "./pages/doctor/signup";
import Signin from "./pages/doctor/signin";
import PatientConsultations from "./pages/patient/myconsultations";
import PatientPrescriptions from "./pages/patient/myprescriptions";
import PatientProfile from "./pages/patient/profile";
import Consultations from "./pages/doctor/myconsultations";
import PriscribePage from "./pages/doctor/priscribePage";
import DoctorProfile from "./pages/doctor/profile";
import Prescriptions from "./pages/doctor/myprescriptions";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/patient",
    element: <ProtectedRoute allowedRoles={["patient"]} />,
    children: [
      { path: "/patient", element: <PatientDashboard /> },
      { path: "/patient/consultant/:doctorId", element: <ConsultantPage /> },
      { path: "/patient/consultations", element: <PatientConsultations /> },
      { path: "/patient/prescriptions", element: <PatientPrescriptions /> },
      { path: "/patient/profile", element: <PatientProfile /> },
    ],
  },
  {
    path: "/doctor",
    element: <ProtectedRoute allowedRoles={["doctor"]} />, // Only 'doctor' role can access
    children: [
      { path: "/doctor", element: <Consultations /> },
      { path: "/doctor/profile", element: <DoctorProfile /> },
      { path: "/doctor/prescribe/:id", element: <PriscribePage /> },
      { path: "/doctor/prescriptions", element: <Prescriptions /> },
    ],
  },
  {
    path: "/patient/signup",
    element: <PatientSignup />,
  },
  {
    path: "/patient/signin",
    element: <PatientSignin />,
  },
  {
    path: "/doctor/signup",
    element: <Signup />,
  },
  {
    path: "/doctor/signin",
    element: <Signin />,
  },
]);
