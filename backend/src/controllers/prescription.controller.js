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

    const consultations = await Consultation.find({ doctor: doctorId });
    console.log("Consultations Linked to doctor:", consultations);

    const consultationIds = consultations.map((c) => c._id);
    console.log("Consultation IDs:", consultationIds);

    // Fetch prescriptions and populate the consultation field
    const prescriptions = await Prescription.find({
      consultation: { $in: consultationIds }, // Match consultation IDs
    }).populate({
      path: "consultation",
      populate: [{ path: "patient" }, { path: "doctor" }],
    });
    // Filter prescriptions that successfully populated the consultation field
    // const filteredPrescriptions = prescriptions.filter(
    //   (prescription) => prescription.consultation !== null
    // );

    // if (!filteredPrescriptions.length) {
    //   return sendResponse(res, 404, "This doctor has no prescriptions");
    // }

    if (!prescriptions || prescriptions.length === 0) {
      return sendResponse(res, 404, "This doctor has no prescriptions");
    }

    return sendResponse(
      res,
      200,
      "Prescriptions retrieved successfully",
      true,
      prescriptions
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

// export const getPrescriptionsOfPatient = async (req, res) => {
//   try {
//     const { patientId } = req.body;

//     if (!patientId) {
//       return sendResponse(res, 400, "Please provide the patientId");
//     }

//     const patient = await Patient.findById(patientId);

//     if (!patient) {
//       return sendResponse(res, 404, "No patient found");
//     }

//     const prescriptions = await Prescription.find({
//       "consultation.patient": patientId, // Filter prescriptions by the patientId in the consultation field
//     }).populate({
//       path: "consultation",
//       populate: [{ path: "patient" }, { path: "doctor" }],
//     });

//     if (!prescriptions || prescriptions.length === 0) {
//       return sendResponse(res, 404, "This patient has no prescriptions");
//     }
//     return sendResponse(res, 200, "", true, prescriptions);
//   } catch (error) {
//     return sendResponse(res, 500, error.message);
//   }
// };

export const getPrescriptionsOfPatient = async (req, res) => {
  try {
    // const { patientId } = req.body;
    const patientId = req.id;

    if (!patientId) {
      return sendResponse(res, 400, "Please provide the patientId");
    }

    const patient = await Patient.findById(patientId);
    console.log("Patient Found:", patient);

    if (!patient) {
      return sendResponse(res, 404, "No patient found");
    }

    // Fetch consultations linked to the patient
    const consultations = await Consultation.find({ patient: patientId });
    console.log("Consultations Linked to Patient:", consultations);

    // Extract consultation IDs
    const consultationIds = consultations.map((c) => c._id);
    console.log("Consultation IDs:", consultationIds);

    // Fetch prescriptions linked to the consultations
    const prescriptions = await Prescription.find({
      consultation: { $in: consultationIds }, // Match consultation IDs
    }).populate({
      path: "consultation",
      populate: [{ path: "patient" }, { path: "doctor" }],
    });
    console.log("Prescriptions Found:", prescriptions);

    if (!prescriptions || prescriptions.length === 0) {
      return sendResponse(res, 404, "This patient has no prescriptions");
    }

    return sendResponse(res, 200, "", true, prescriptions);
  } catch (error) {
    console.error("Error in getPrescriptionsOfPatient:", error.message);
    return sendResponse(res, 500, error.message);
  }
};

export const getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "Please provide the consultation id");
    }
    const prescription = await Prescription.findById(id).populate({
      path: "consultation",
    });
    if (!prescription) {
      return sendResponse(res, 404, "No prescription found");
    }
    return sendResponse(res, 200, "", true, prescription);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
