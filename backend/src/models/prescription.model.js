import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },
    careToBeTaken: {
      type: String,
      required: true,
    },
    Medicines: {
      type: String,
      required: true,
    },
    pdf: {
      type: String, //url of the pdf
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
