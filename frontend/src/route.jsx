import { createBrowserRouter } from "react-router-dom";
import PatientDashboard from "./pages/patient/dashboard";
import DoctorDashboard from "./pages/doctor/dashboard";
import Home from "./pages/home";
import ConsultantPage from "./pages/patient/consultantPage";
import PatientSignup from "./pages/patient/signup";
import PatientSignin from "./pages/patient/signin";
import Signup from "./pages/doctor/signup";
import Signin from "./pages/doctor/signin";
import Consultations from "./pages/patient/myconsultations";
import Prescriptions from "./pages/patient/myprescriptions";
import PatientProfile from "./pages/patient/profile";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // element: Home(),
  },
  {
    path: "/patient",
    element: <PatientDashboard />,
  },
  {
    path: "/patient/signup",
    element: <PatientSignup />,
    // element: PatientDashboard(),
  },
  {
    path: "/patient/signin",
    element: <PatientSignin />,
    // element: PatientDashboard(),
  },
  {
    path: "/patient/consultant/:doctorId",
    element: <ConsultantPage />,
  },
  {
    path: "/patient/consultations",
    element: <Consultations />,
  },
  {
    path: "/patient/prescriptions",
    element: <Prescriptions />,
  },
  {
    path: "/patient/profile",
    element: <PatientProfile />,
  },
  {
    path: "/doctor",
    element: <DoctorDashboard />,
    // element: DoctorDashboard(),
  },
  {
    path: "/doctor/signup",
    element: <Signup />,
    // element: DoctorDashboard(),
  },
  {
    path: "/doctor/signin",
    element: <Signin />,
    // element: DoctorDashboard(),
  },
]);
