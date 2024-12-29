import { Consultation } from "../models/consultation.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import { Prescription } from "../models/prescription.model.js";
import { sendResponse } from "../utils/apiResponse.js";

export const createPrescription = async (req, res) => {
  try {
    const { consultationId, careToBeTaken, Medicines, pdf } = req.body;

    if (!consultationId || !careToBeTaken || !Medicines || !pdf) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return sendResponse(res, 404, "No consultation found");
    }

    let prescription = await Prescription.create({
      consultation: consultationId,
      careToBeTaken,
      Medicines,
      pdf,
    });
    await prescription.save();
    return sendResponse(res, 200, "Prescription created", true, prescription);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

// export const getPrescriptionsOfDoctor = async (req, res) => {
//   try {
//     const { doctorId } = req.body;

//     if (!doctorId) {
//       return sendResponse(res, 400, "Please provide the doctorId");
//     }

//     const doctor = await Doctor.findById(doctorId);

//     if (!doctor) {
//       return sendResponse(res, 404, "No doctor found");
//     }

//     const prescriptions = await Prescription.find({ doctor: doctorId });
//     if (!prescriptions || !prescriptions.length > 0) {
//       return sendResponse(res, 404, "This doctor has no prescriptions");
//     }
//     return sendResponse(res, 200, "", true, prescriptions);
//   } catch (error) {
//     return sendResponse(res, 500, error.message);
//   }
// };

export const getPrescriptionsOfDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    // Validate doctorId
    if (!doctorId) {
      return sendResponse(res, 400, "Please provide the doctorId");
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    // Fetch prescriptions and populate the consultation field
    const prescriptions = await Prescription.find().populate({
      path: "consultation",
    //   match: { doctor:doctorId },
    });

    // Filter prescriptions that successfully populated the consultation field
    const filteredPrescriptions = prescriptions.filter(
      (prescription) => prescription.consultation !== null
    );

    if (!filteredPrescriptions.length) {
      return sendResponse(res, 404, "This doctor has no prescriptions");
    }

    return sendResponse(
      res,
      200,
      "Prescriptions retrieved successfully",
      true,
      filteredPrescriptions
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getPrescriptionsOfPatient = async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return sendResponse(res, 400, "Please provide the patientId");
    }

    const doctor = await Patient.findById(patientId);

    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    const prescriptions = await Prescription.find({ patient: patientId });
    if (!prescriptions || !prescriptions.length > 0) {
      return sendResponse(res, 404, "This doctor has no prescriptions");
    }
    return sendResponse(res, 200, "", true, prescriptions);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "Please provide the consultation id");
    }
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return sendResponse(res, 404, "No prescription found");
    }
    return sendResponse(res, 200, "", true, prescription);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
