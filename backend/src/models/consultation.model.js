import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    currentIllNess: {
      type: String,
      required: true,
    },
    recentSurgery: {
      name: { type: String, require: true },
      timespan: { type: String, require: true },
    },
    familyHistory: {
      isDiabetic: { type: Boolean, required: true },
      allergies: { type: String, default: "" },
      other: { type: String, default: "" },
    },
    payment: {
      transitionId: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Consultation = mongoose.model("Consultation", consultationSchema);
