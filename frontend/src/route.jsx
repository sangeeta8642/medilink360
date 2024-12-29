import { createBrowserRouter } from "react-router-dom";
import PatientDashboard from "./pages/patient/dashboard";
import DoctorDashboard from "./pages/doctor/dashboard";
import PatientSignUp from './pages/patient/signup'
import Home from "./pages/home";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // element: Home(),

  },
  {
    path: "/patient/signup",
    element: <PatientSignUp />,
    // element: PatientDashboard(),
  },
  {
    path: "/doctor",
    element: <DoctorDashboard />,
    // element: DoctorDashboard(),
  },
]);
