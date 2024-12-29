import { sendResponse } from "../utils/apiResponse.js";
import { Consultation } from "../models/consultation.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";

export const createConsultation = async (req, res) => {
  try {
    const {
      doctorId,
      illness,
      recentSurgeryName,
      recentSurgeryTimespan,
      isDiabetic,
      transitionId,
      allergies,
      other,
    } = req.body;

    const patientId = req.id;
    console.log("reqbody", patientId);
    if (
      !doctorId ||
      !patientId ||
      !illness ||
      !recentSurgeryName ||
      !recentSurgeryTimespan ||
      !isDiabetic ||
      !transitionId
    ) {
      return sendResponse(res, 400, "Please provide complete data");
    }

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor) {
      return sendResponse(res, 400, "No doctor found");
    }
    if (!patient) {
      return sendResponse(res, 400, "No patient found");
    }

    let consultation = await Consultation.create({
      doctor: doctorId,
      patient: patientId,
      currentIllNess: illness,
      recentSurgery: {
        name: recentSurgeryName,
        timespan: recentSurgeryTimespan,
      },
      familyHistory: {
        isDiabetic,
        allergies,
        other,
      },
      payment: {
        transitionId,
      },
    });

    await consultation.save();

    return sendResponse(
      res,
      201,
      "consultation created !!",
      true,
      consultation
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getConsultationsOfDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    if (!doctorId) {
      return sendResponse(res, 400, "Please provide the doctorId");
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    const consultations = await Consultation.find({ doctor: doctorId })
      .populate("patient")
      .populate("doctor");
    if (!consultations || !consultations.length > 0) {
      return sendResponse(res, 404, "This doctor has no consultations");
    }
    return sendResponse(res, 200, "", true, consultations);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getConsultationsOfPatient = async (req, res) => {
  try {
    // const { patientId } = req.body;
    const patientId = req.id;

    if (!patientId) {
      return sendResponse(res, 400, "Please provide the patientId");
    }

    const doctor = await Patient.findById(patientId);

    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    const consultations = await Consultation.find({
      patient: patientId,
    }).populate({ path: "doctor" });
    if (!consultations || !consultations.length > 0) {
      return sendResponse(res, 404, "This doctor has no consultations");
    }
    return sendResponse(res, 200, "", true, consultations);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const getConsultationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "Please provide the consultation id");
    }
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return sendResponse(res, 404, "No consultation found");
    }
    return sendResponse(res, 200, "", true, consultation);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
