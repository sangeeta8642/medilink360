import { Consultation } from "../models/consultation.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import { Prescription } from "../models/prescription.model.js";
import { sendResponse } from "../utils/apiResponse.js";
import PDFDocument from "pdfkit";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";

export const createPrescription = async (req, res) => {
  try {
    const { consultationId, careToBeTaken, Medicines, name, address } =
      req.body;

    if (!consultationId || !careToBeTaken || !Medicines) {
      return sendResponse(res, 400, "Please provide the complete data");
    }

    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return sendResponse(res, 404, "No consultation found");
    }

    const doc = new PDFDocument({ size: "A4", margin: 30 });
    let pdfBuffer = [];
    doc.on("data", (chunk) => pdfBuffer.push(chunk));
    doc.on("end", async () => {
      try {
        const pdfData = Buffer.concat(pdfBuffer);
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw", 
            folder: "prescriptions", 
            public_id: `prescription_${consultationId}.pdf`, 
          },
          async (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              return sendResponse(
                res,
                500,
                "Failed to upload PDF to Cloudinary"
              );
            }

            const pdfUrl = result.secure_url;

            let prescription = await Prescription.create({
              consultation: consultationId,
              careToBeTaken,
              Medicines,
              pdf: pdfUrl,
            });

            return sendResponse(
              res,
              200,
              "Prescription created",
              true,
              prescription
            );
          }
        );

        streamifier.createReadStream(pdfData).pipe(uploadStream);
      } catch (uploadError) {
        console.error("Error during PDF upload:", uploadError);
        return sendResponse(res, 500, "Error processing the PDF file");
      }
    });

    doc.fontSize(12);

    doc.font("Helvetica-Bold").text("Dr." + name, 30, 30);
    doc.font("Helvetica").text("Address:", 30, 50);
    doc.text(address, 90, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 400, 30, {
      align: "right",
    });

    doc.moveTo(30, 70).lineTo(570, 70).stroke("navy");

    doc.font("Helvetica-Bold").text("Care to be taken", 30, 100);
    doc.rect(30, 120, 540, 50).stroke(); 
    doc.text(careToBeTaken, 35, 125, { width: 530, height: 40 });

    doc.font("Helvetica-Bold").text("Medicine", 30, 200);
    doc.rect(30, 220, 540, 100).stroke(); 
    doc.text(Medicines, 35, 225, { width: 530, height: 90 });

    doc.moveTo(30, 330).lineTo(570, 330).stroke("navy");

    doc.font("Helvetica").text("Dr." + name, 400, 350, { align: "right" });

    doc.end(); 
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, error.message);
  }
};

export const getPrescriptionsOfDoctor = async (req, res) => {
  try {
    const doctorId  = req.id;

    if (!doctorId) {
      return sendResponse(res, 400, "Please provide the doctorId");
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return sendResponse(res, 404, "No doctor found");
    }

    const consultations = await Consultation.find({ doctor: doctorId });

    const consultationIds = consultations.map((c) => c._id);

    const prescriptions = await Prescription.find({
      consultation: { $in: consultationIds },
    }).populate({
      path: "consultation",
      populate: [{ path: "patient" }, { path: "doctor" }],
    });
    
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

export const getPrescriptionsOfPatient = async (req, res) => {
  try {
     const patientId = req.id;

    if (!patientId) {
      return sendResponse(res, 400, "Please provide the patientId");
    }

    const patient = await Patient.findById(patientId);
   
    if (!patient) {
      return sendResponse(res, 404, "No patient found");
    }

     const consultations = await Consultation.find({ patient: patientId });
   
    const consultationIds = consultations.map((c) => c._id);
   
    const prescriptions = await Prescription.find({
      consultation: { $in: consultationIds }, 
    }).populate({
      path: "consultation",
      populate: [{ path: "patient" }, { path: "doctor" }],
    });
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
