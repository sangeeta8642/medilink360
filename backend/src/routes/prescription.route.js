import e from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import {
  createPrescription,
  getPrescriptionById,
  getPrescriptionsOfDoctor,
  getPrescriptionsOfPatient,
} from "../controllers/prescription.controller.js";
import { getConsultationsOfPatient } from "../controllers/consultation.controller.js";

const router = e.Router();

router.route("/").post(isAuthenticate, createPrescription);
router.route("/get/by/doctor").get(isAuthenticate, getPrescriptionsOfDoctor);
router.route("/get/by/patient").get(isAuthenticate, getPrescriptionsOfPatient);
router.route("/:id").get(isAuthenticate, getPrescriptionById);

export default router;
