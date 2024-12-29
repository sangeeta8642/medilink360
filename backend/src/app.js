import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import PatientRoute from "./routes/patient.route.js";
import DoctorRoute from "./routes/doctor.route.js";
import ConsultationRoute from "./routes/consultation.route.js";
import Prescription from "./routes/prescription.route.js";
import { sendResponse } from "./utils/apiResponse.js";

const app = e();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(e.json({ limit: "16kb" }));
app.use(e.urlencoded({ extended: true, limit: "16kb" }));
app.use(e.static("public"));
app.use(cookieParser());

app.get("/", (_, res) => {
  return res.json("Im running");
});

app.use("/api/v1/patient", PatientRoute);
app.use("/api/v1/doctor", DoctorRoute);
app.use("/api/v1/consultation", ConsultationRoute);
app.use("/api/v1/prescription", Prescription);

app.post("/api/v1/logout", async (_, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return sendResponse(res, 200, "logout successfull", true);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
});

export { app };
