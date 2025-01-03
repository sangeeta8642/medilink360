import { Patient } from "../models/patient.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/apiResponse.js";

export const registerPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      password,
      phone,
      surgeryHistory,
      illnessHistory,
    } = req.body;

    if (!name || !age || !email || !password || !phone) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const isEmailExists = await Patient.findOne({ email });
    const isMobNOExists = await Patient.findOne({ phone });

    if (isEmailExists) {
      return sendResponse(
        res,
        400,
        "this email already exists,please provide the new one"
      );
    }

    if (isMobNOExists) {
      return sendResponse(
        res,
        400,
        "this mobile number already exists,please provide the new one"
      );
    }

    const image = req.file;

    if (!image) {
      return sendResponse(res, 400, "please provide the profile image");
    }

    const imageUri = getDataUri(image);
    const cloudRes = await cloudinary.uploader.upload(imageUri.content);
    await Patient.create({
      name,
      age,
      email,
      password,
      phone,
      surgeryHistory,
      illnessHistory,
      profilePic: cloudRes.secure_url || "",
      role: "patient",
    });

    return sendResponse(res, 201, "patient created successfully", true);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return sendResponse(res, 404, "No patient found");
    }

    const isPasswordMatched = await patient.matchPassword(password);

    if (!isPasswordMatched) {
      return sendResponse(res, 400, "Invalid Password");
    }
    const patientData = await Patient.findById(patient._id).select("-password");

    const token = await jwt.sign(
      { patientId: patient._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const Options = {
      httpOnly: process.env.COOKIE_HTTPONLY,
      secure: process.env.COOKIE_SECURE,
      sameSite: process.env.COOKIE_SAMESITE,
      maxAge: parseInt(process.env.COOKIE_MAXAGE, 10),
    };

    
    return res
      .status(200)
      .cookie("token", token, Options)
      .json({ message: "login successfull", success: true, data: patientData });
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "please provide the patientId");
    }

    const patient = await Patient.findById(id);
    if (!patient) {
      return sendResponse(res, 404, "No patient found");
    }

    return sendResponse(res, 201, "", patient);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
